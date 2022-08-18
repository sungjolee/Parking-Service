from genericpath import isfile
from flask import Flask, render_template, Response
import cv2, mysql.connector, schedule, os, pickle
import numpy as np

from Colors import *
from DrawingUtil import draw_contours

# 라플라스 수
LAPLACIAN = 1.4
# 탐지 지연 시간 ms
DETECT_DELAY = 1

# 접속할 DB 서버 설정
db = mysql.connector.connect(host='your_DB_address', port='your_DB_port', user='your_user', password='your_DB_password!', database='your_DB_name', auth_plugin='mysql_native_password')
cur = db.cursor()

# 라즈베리 파이 4의 시리얼 번호를 알아내기 위한 명령어
serial_id_command = "cat /proc/cpuinfo | grep Serial | awk '{print $3}'"
# 명령어를 실행하여 출력될 결과를 변수에 저장
serial_id = os.popen(serial_id_command).read()

# 현재 이 파일이 있는 경로
current_path = os.path.dirname(os.path.realpath(__file__))
# 주차칸 좌표 데이터 저장 폴더 이름
data_folder = 'data'
# 주차칸 좌표 데이터 저장 폴더 경로
data_folder_path = current_path + '/' + data_folder
# 주차칸 좌표 데이터 이름
data_name = 'parking_coordinates'
# 주차칸 좌표 데이터 경로
data_path = data_folder_path + '/' + data_name

# 주차칸 정보 데이터가 있는 경우
if os.path.isfile(data_path):
    # 주차칸 좌표 데이터 파일을 읽기 전용으로 열기
    with open(data_path, 'rb') as data:
        # 주차칸 좌표 데이터에서 좌표 값 불러와 저장
        points = pickle.load(data)
# 주차칸 정보 데이터가 없는 경우
else:
    points = []

# 주차칸 좌표값 데이터 리스트
coordinates_data = points

# 윤곽선 리스트
contours = []
# 윤곽선이 그린 다각형을 포함할 수 있는 직사각형 리스트
bounds = []
# mask 값이 0이 아닌 픽셀 리스트
mask_list = []

job = ''

# __main__이라는 값을 가지게 되면 해당 모듈이 주 프로그램이라고 설정
app = Flask(__name__)

# 웹에 띄우기 위한 카메라 프레임을 생성하기 위한 함수
def generate_frames():
    # 전역변수를 사용하기 위한 선언
    global cur, db, mask_list, bounds, contours, coordinates_data, serial_id, LAPLACIAN, DETECT_DELAY, job
    
    # 연결할 카메라
    cap = cv2.VideoCapture(0)
    
    # 주차칸 좌표 데이터의 값을 각각 읽기
    for p in coordinates_data:
        # 1개의 주차칸에 있는 4개 좌표들을 둘러쌀 수 있는 직사각형을 구해 저장 
        rect = cv2.boundingRect(p)
        
        # 4개 좌표 저장 리스트 복사하여 저장
        new_coordinates = p.copy()
        # 복사한 배열의 전체 row의 1번째 요소를 배열 전체 row의 1번째 요소에
        new_coordinates[:, 0] = p[:, 0] - rect[0]
        # 복사한 배열의 전체 row의 2번째 요소를 배열 전체 row의 2번째 요소에
        new_coordinates[:, 1] = p[:, 1] - rect[1]
        
        # 검출한 윤곽선을 리스트에 저장
        contours.append(p)
        # 검출한 직사각형을 리스트에 저장
        bounds.append(rect)
        
        # 검출한 윤곽선을 화면에 그리기
        mask = cv2.drawContours(np.zeros((rect[3],rect[2]), dtype=np.uint8), [new_coordinates], contourIdx = -1, color = 255, thickness = -1, lineType=cv2.LINE_8)
        # 255를 초과하는 mask 값일 경우 255로 고정
        mask = mask == 255
        # 검출한 mask 값들을 mask 리스트에 저장
        mask_list.append(mask)
    
    # 주차칸 상태를 저장할 리스트
    statuses = [False] * len(coordinates_data)
    # 주차칸에서 차량을 탐지하기 시작해 카운트한 시간 리스트
    times = [None] * len(coordinates_data)
    
    # 주기적으로 DB 서버에 정보를 보내는 함수를 실행
    job = schedule.every().minute.at(":30").do(send_log, statuses)
    
    # 무한 반복
    while True:        
        # 주기적으로 데이터를 전송하는 함수를 실행시키기 시작
        schedule.run_pending()
        
        # 카메라 영상의 프레임 읽기
        ret, frame = cap.read()
        
        # 프레임에 가우시안 필터 사용
        blurred = cv2.GaussianBlur(frame, (5, 5), 3)
        # 가우시안 필터링한 프레임을 흑백으로 변환
        grayed = cv2.cvtColor(blurred, cv2.COLOR_BGR2GRAY)
        
        # 카메라 영상에서 사용할 1초 시간 정의
        position_in_seconds = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
        
        # 주차칸 좌표 데이터를 순서, 4개의 좌표 데이터로 리스트에서 나누기
        for index, c in enumerate(coordinates_data):
            # 특정 순서 주차칸의 상태를 함수에서 계산 반환하여 저장
            status = __apply(grayed, index, c)
            
            # 탐지 시간 기록이 있고 주차칸의 이전 상태와 현재 상태가 같은 경우
            if times[index] is not None and same_status(statuses, index, status):
                # 탐지 시간에 변화없음을 인지
                times[index] = None
                continue
            
            # 탐지 시간 기록이 있고 주차칸의 이전 상태와 현재 상태가 같지 않은 경우
            if times[index] is not None and status_changed(statuses, index, status):
                # 탐지되는 시간이 기준으로 정한 탐지 시간 이상인 경우
                if position_in_seconds - times[index] >= DETECT_DELAY:
                    # 주차칸 상태를 현재 상태로 저장
                    statuses[index] = status
                    # 탐지 시간 기록 초기화
                    times[index] = None
                continue
            
            # 탐지 시간 기록이 없고 주차칸의 이전 상태와 현재 상태가 같지 않은 경우
            if times[index] is None and status_changed(statuses, index, status):
                # 탐지 시간 카운트 시작
                times[index] = position_in_seconds
        
        # 주차칸 좌표 데이터를 순서, 4개의 좌표 데티어로 리스트에서 나누기
        for index, c in enumerate(coordinates_data):
            # 주차칸 현재 상태가 True면 녹색(주차 가능) / False면 빨간색(주차 불가능)으로 구분하기
            color = green_color if statuses[index] else red_color
            # 주차칸 가장자리, 가운데에 주차칸 번호를 그리기
            draw_contours(frame, c, str(index + 1), white_color, color)
                
        key = cv2.waitKey(1)
        # 'q' 키를 눌렀을 경우
        if key == ord('q'):
            # 무한 반복 종료
            break
        
        # 프레임을 jpg 파일로 인코딩하기 (배열로 변환해 buffer 저장)
        result, buffer = cv2.imencode('.jpg',frame)
        # 배열 데이터를 바이트 문자열로 변환
        frame = buffer.tobytes()
        # Generate 생성
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    # DB 서버와 연결 해제
    cur.close()
    db.close()
    # 모든 윈도우창 닫기
    cv2.destroyAllWindows()

# DB 서버에 데이터를 전송하는 함수
def send_log(statuses_list):
    db = mysql.connector.connect(host='i7c103.p.ssafy.io', port='3306', user='root', password='parkingC103!', database='parking', auth_plugin='mysql_native_password')
    cur = db.cursor()
    
    # 전역변수를 사용하기 위한 선언
    global mask_list, bounds, contours, coordinates_data, serial_id, LAPLACIAN, DETECT_DELAY

    # 주차칸 현재 상태 리스트에서 순서, 상태로 나누어 읽어 주차 가능한 자리(True)인 경우 해당 순서 주차칸 번호를 리스트에 저장
    enable_list = [index + 1 for index, value in enumerate(statuses_list) if value != False]
    # 저장한 리스트를 문자열로 변환
    enable = ','.join(list(map(str, enable_list)))
    
    # 주차칸 현재 상태 리스트에서 순서, 상태로 나누어 읽어 주차 불가능한 자리(False)인 경우 해당 순서 주차칸 번호를 리스트에 저장
    disable_list = [index + 1 for index, value in enumerate(statuses_list) if value == False]
    # 저장한 리스트를 문자열로 변환
    disable = ','.join(list(map(str, disable_list)))
    
    # DB 서버에 기록 데이터를 보내 위한 mysql 명령어
    sendcommand = "CALL PD_LOG_INSERT(%s, %s, %s, %s, %s)"
    # sendcommand = "INSERT INTO TB_PARKING_LOG (SERIAL_ID, TOTAL, ENABLE, ENABLELIST, OCUPIEDLIST) VALUES (%s, %s, %s, %s, %s)"
    # DB 서버에 보낼 데이터들
    val = (serial_id, len(statuses_list), len(enable_list) , enable, disable)
    # DB 서버에 전송 시작
    cur.execute(sendcommand, val)
    db.commit()
    
def __apply(grayed, index, p):
    # 전역변수를 사용하기 위한 선언
    global mask_list, bounds, contours, coordinates_data, serial_id, LAPLACIAN, DETECT_DELAY

    # 좌표 데이터 리스트로 재정렬
    coordinates = _coordinates(p)
    
    # 1개의 주차칸의 4개 좌표를 둘러싼 직사각형
    rect = bounds[index]
    
    # 좌표를 둘러싼 직사각형을 흑백 변환
    roi_gray = grayed[rect[1]:(rect[1] + rect[3]), rect[0]:(rect[0] + rect[2])]
    # 흑백 변환한 영역의 가장자리를 검출
    laplacian = cv2.Laplacian(roi_gray, cv2.CV_64F)
    
    # 복사한 배열의 전체 row의 1번째 요소를 배열 전체 row의 1번째 요소에
    coordinates[:, 0] = coordinates[:, 0] - rect[0]
    # 복사한 배열의 전체 row의 2번째 요소를 배열 전체 row의 2번째 요소에
    coordinates[:, 1] = coordinates[:, 1] - rect[1]
    
    # 주차칸 상태를 검출
    status = np.mean(np.abs(laplacian * mask_list[index])) < LAPLACIAN
    
    # 주차칸 상태를 반환
    return status

# 배열로 재정렬 해주는 함수
def _coordinates(p):
    return np.array(p)

# 주차칸 이전 상태와 현재 상태가 같으면 True를 반환
def same_status(coordinates_status, index, status):
    return status == coordinates_status[index]

# 주차칸 이전 상태와 현재 상태가 같지 않으면 True를 반환
def status_changed(coordinates_status, index, status):
    return status != coordinates_status[index]

# 서버 url 호출을 위한 주소 '/video'의 정의
# 웹에 카메라 영상을 띄우기 위한 함수
@app.route('/video')
def video():    
    schedule.cancel_job(job)
    return Response(generate_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')

# 서버 url 호출을 위한 주소 '/'의 정의
# 웹 화면을 구성하는 html 파일 호출
@app.route('/')
def index():
    schedule.cancel_job(job)
    return render_template('index.html')

if __name__ == '__main__':
    # debug 가능, 같은 네트워크가 연결되있는 경우 어느 컴퓨터에서 접속 가능
    app.run(host='0.0.0.0')