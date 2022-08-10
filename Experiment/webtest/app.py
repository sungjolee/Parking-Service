from flask import Flask, render_template, Response
import cv2, mysql.connector, schedule, os, pickle
import numpy as np

from Colors import *
from DrawingUtil import draw_contours

LAPLACIAN = 1.4
DETECT_DELAY = 1

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
    
# 주차칸 좌표 데이터 파일을 읽기 전용으로 열기
with open(data_path, 'rb') as data:
    # 주차칸 좌표 데이터에서 좌표 값 불러와 저장
    points = pickle.load(data)

db = mysql.connector.connect(host='i7c103.p.ssafy.io', port='3306', user='root', password='parkingC103!', database='parking', auth_plugin='mysql_native_password')
cur = db.cursor()
# 라즈베리 파이 4의 시리얼 번호를 알아내기 위한 명령어
serial_id_command = "cat /proc/cpuinfo | grep Serial | awk '{print $3}'"
# 명령어를 실행하여 출력될 결과를 변수에 저장
serial_id = os.popen(serial_id_command).read()

coordinates_data = points

contours = []
bounds = []
mask_list = []

app = Flask(__name__)

def generate_frames():
    global mask_list, bounds, contours, coordinates_data, serial_id, LAPLACIAN, DETECT_DELAY
    cap = cv2.VideoCapture(0)
    
    for p in coordinates_data:            
        rect = cv2.boundingRect(p)
        
        # 4개 좌표 저장 리스트 복사하여 저장
        new_coordinates = p.copy()
        # 복사한 배열의 전체 row의 1번째 요소를 배열 전체 row의 1번째 요소에
        new_coordinates[:, 0] = p[:, 0] - rect[0]
        # 복사한 배열의 전체 row의 2번째 요소를 배열 전체 row의 2번째 요소에
        new_coordinates[:, 1] = p[:, 1] - rect[1]
        
        contours.append(p)
        bounds.append(rect)
        
        mask = cv2.drawContours(np.zeros((rect[3],rect[2]), dtype=np.uint8), [new_coordinates], contourIdx = -1, color = 255, thickness = -1, lineType=cv2.LINE_8)
        mask = mask == 255
        mask_list.append(mask)
        
    statuses = [False] * len(coordinates_data)
    times = [None] * len(coordinates_data)
    
    while True:
        # schedule.run_pending()
        
        ret, frame = cap.read()
        
        blurred = cv2.GaussianBlur(frame, (5, 5), 3)
        grayed = cv2.cvtColor(blurred, cv2.COLOR_BGR2GRAY)
        
        position_in_seconds = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
        
        for index, c in enumerate(coordinates_data):
            status = __apply(grayed, index, c)
            
            if times[index] is not None and same_status(statuses, index, status):
                times[index] = None
                continue
            
            if times[index] is not None and status_changed(statuses, index, status):
                if position_in_seconds - times[index] >= DETECT_DELAY:
                    statuses[index] = status
                    times[index] = None
                continue
            
            if times[index] is None and status_changed(statuses, index, status):
                times[index] = position_in_seconds
        
        for index, c in enumerate(coordinates_data):            
            color = green_color if statuses[index] else red_color
            draw_contours(frame, c, str(index + 1), white_color, color)
        
        # print([index+1 for index, value in enumerate(statuses) if value != False])
        # cv2.imshow("CAMERA", frame)
        
        key = cv2.waitKey(1)
        # 'q' 키를 눌렀을 경우
        if key == ord('q'):
            # 무한 반복 종료
            break
            
        result, buffer = cv2.imencode('.jpg',frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    cur.close()
    db.close()
    # 모든 윈도우창 닫기
    cv2.destroyAllWindows()
    
def send_log(statuses_list):
    global mask_list, bounds, contours, coordinates_data, serial_id, LAPLACIAN, DETECT_DELAY

    enable_list = [index + 1 for index, value in enumerate(statuses_list) if value != False]
    enable = ','.join(list(map(str, enable_list)))
    disable_list = [index + 1 for index, value in enumerate(statuses_list) if value == False]
    disable = ','.join(list(map(str, disable_list)))
    
    sendcommand = "INSERT INTO TB_PARKING_LOG (SERIAL_ID, TOTAL, ENABLE, ENABLELIST, OCUPIEDLIST) VALUES (%s, %s, %s, %s, %s)"
    val = (serial_id, len(statuses_list), len(enable_list) , enable, disable)
    cur.execute(sendcommand, val)
    db.commit()
    
# schedule.every(20).seconds.do(send_log, statuses)       
    
def __apply(grayed, index, p):
    global mask_list, bounds, contours, coordinates_data, serial_id, LAPLACIAN, DETECT_DELAY

    coordinates = _coordinates(p)
    
    rect = bounds[index]
    
    roi_gray = grayed[rect[1]:(rect[1] + rect[3]), rect[0]:(rect[0] + rect[2])]
    laplacian = cv2.Laplacian(roi_gray, cv2.CV_64F)
    
    coordinates[:, 0] = coordinates[:, 0] - rect[0]
    coordinates[:, 1] = coordinates[:, 1] - rect[1]
    
    status = np.mean(np.abs(laplacian * mask_list[index])) < LAPLACIAN
    
    return status

def _coordinates(p):
    return np.array(p)

def same_status(coordinates_status, index, status):
    return status == coordinates_status[index]

def status_changed(coordinates_status, index, status):
    return status != coordinates_status[index]

@app.route('/video')
def video():
    return Response(generate_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # defining server ip address and port
    app.run(debug=True, host='0.0.0.0')