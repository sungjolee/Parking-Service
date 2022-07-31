import cv2, os, pickle
# 마우스 클릭 이벤트를 사용하기 위한 라이브러리
from cv2 import setMouseCallback

isDragging = False # 마우스 드래그를 하고 있는지 상태 확인
# 마우스 드래그로 선택한 영역의 시작점 x, y 좌표값과 너비, 높이 길이
x_start, y_start, width, height = -1, -1, -1, -1

# 현재 실행 중인 Select_Parking_Area.py이 있는 폴더 위치
folder_path = os.path.dirname(os.path.realpath(__file__))
# 불러올 binary 파일명
binary_name = 'CarParkPos'
# 저장할 jpg 파일명
jpg_name = 'Parking_Zone_Pic.jpg'
# binary 파일이 있는 경로
binary_file_path = folder_path + '/' + binary_name
# jpg 파일이 있는 경로
jpg_file_path = folder_path + '/' + jpg_name


try: # 실행할 코드
    # 파이썬에서 파일 입출력을 할 경우 open, close가 필요함
    # open, close를 하나로 묶어 with으로 사용
    # 'CarParkPos' 라는 파일을 'rb' Binary 포맷으로 읽기 모드 진행
    # 한줄씩 파일 f('CarParkPos')를 읽어오고, 더 이상 로드할 데이터가 없는 경우 EOFError 발생
    with open(binary_file_path, 'rb') as f:
        # 한줄씩 읽은 데이터를 리스트에 저장
        posList = pickle.load(f)
except: # 예외가 발생하였을 경우 실행하는 코드 / 불러올 파일이 없는 경우
    posList = [] # 리스트 새로 생성

# 마우스 드래그 함수
def onMouse(event, x, y, flags, param):
    # 함수 안에서 사용할 전역 변수들 선언
    global isDragging, x_start, y_start, width, height, img
    
    # 마우스 좌클릭 이벤트가 발생하였을 경우
    if event == cv2.EVENT_LBUTTONDOWN:
        isDragging = True # 마우스 드래그가 가능한 상태로 전환
        x_start = x # 좌클릭 이벤트가 발생한 시점에서 시작점 x 좌표값 저장
        y_start = y # 좌클릭 이벤트가 발생한 시점에서 시작점 y 좌표값 저장
    
    # 마우스가 움직이는 이벤트가 발생하였을 경우
    if event == cv2.EVENT_MOUSEMOVE:
        if isDragging: # 마우스 드래그가 가능한 상태인 경우 (좌클릭을 꾹 하고 있는 경우)
            
            # 마우스 드래그를 왼쪽, 아래로 움직일 경우에만 영역 지정을 하고 있다는 사각형 영역을 보여주기 위해 조건을 추가
            if x > x_start and y > y_start:
                # 마우스가 움직임에 따라 계속 img 사진에 (x_start, y_start) 시작점에서 (x, y) 움직인 점까지
                # BGR 값이 (255, 0, 0)인 색으로 굵기 2인 선으로 사각형 그리기
                cv2.rectangle(img, (x_start, y_start), (x, y), (255, 0, 0), 2)
            
            cv2.imshow("Image", img) # "Image" 윈도우 창에 img 사진 띄우기
    
    # 마우스 좌클릭에서 손가락을 뗐을 경우
    if event == cv2.EVENT_LBUTTONUP:
        if isDragging: # 마우스 드래그가 가능한 상태인 경우
            isDragging = False # 다시 마우스 드래그가 불가능한 상태로 전환 (좌클릭을 누르지 않고 있기 떄문에)
            width = x - x_start # 마우스 좌클릭에서 손가락을 뗀 시점의 x 좌표값에서 시작점 x 좌표값을 빼 너비를 구함
            height = y - y_start # 마우스 좌클릭에서 손가락을 뗀 시점의 y 좌표값에서 시작점 y 좌표값을 빼 높이를 구함
            # print("x%d, y%d, w%d, h%d" % (x_start, y_start, width, height) ) # 지정한 영역의 정보를 확인하기 위한 출력
            
            # 너비와 높이가 0보다 클 경우
            if width > 0 and height > 0:
                # 해당하는 경우에만 영역을 지정했다고 판단해 지정한 영역 정보 (시작 x 좌표, 시작 y 좌표, 너비, 높이)를 Binary 파일에 저장
                posList.append((x_start, y_start, width, height))
            # 너비와 높이가 0보다 같거나 작은 경우
            else:
                # 영역을 지정하지 않았다고 판단하여 경고 메시지 출력
                print('좌측 상단에서 우측 하단으로 영역을 드래그하세요.')
    
    # 마우스 우클릭 이벤트가 발생하였을 경우
    if event == cv2.EVENT_RBUTTONDOWN:
        # posList = [(1,1,10,10),(2,2,20,20),...] 의 형식으로 저장된 리스트를
        # enumerate 메소드를 거치면 (0,(1,1,10,10)),(1,(2,2,20,20)),... 형식으로 변환하여
        # i는 0,1,...번째를 의미, pos = (1,1,10,10),(2,2,20,20),...를 의미
        for i, pos in enumerate(posList):
            # pos = (1,1,10,10) 인 경우 x0 = 1, y0 = 1, w = 10, h = 10으로 저장
            x0, y0, w, h = pos
            # 우클릭한 시점에서의 x, y 좌표값이 지정한 영역 안에 있는 경우
            if x0 < x < x0 + w and y0 < y < y0 + h:
                # 해당하는 영역을 리스트에서 제거
                posList.pop(i)
    
    with open(binary_file_path, 'wb') as f:
        pickle.dump(posList, f) # posList 리스트 데이터를 집어넣기 위해 f 파일에 데이터를 쓰는 용도 # 주의 : pickle.dumps 는 데이터를 리턴하는 용도, dump와 dumps 구별 필요
        
while True: # 무한 반복
    img = cv2.imread(jpg_file_path) # 같은 폴더안에 있는 'Our_parking_area.jpg'이라는 사진 파일을 읽어 img 에 저장
        
    for pos in posList:
        # pos = (1,1,10,10) 인 경우 x = 1, y = 1, w = 10, h = 10으로 저장
        x, y, w, h = pos
        # posList 안에 있는 좌표값들 읽어 해당 좌표로부터 설정한 너비, 높이 길이를 읽어 RGB값 (255,0,255) 색이고 굵기가 2 만큼의 선으로 사각형 그리기
        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 255), 2)

    cv2.imshow("Image", img) # "Image"라는 윈도우 창에 img를 띄우기
    cv2.setMouseCallback("Image", onMouse) # "Image"라는 윈도우 창에 마우스클릭 이벤트를 불러오기 
    # cv2.setMouseCallback("Image", MouseClick) # "Image"라는 윈도우 창에 마우스클릭 이벤트를 불러오기

    keyVal = cv2.waitKey(1) & 0xFF # 키보드 입력 감지
    if keyVal == ord('q'): # 'q'를 입력하면 반복 종료
        break

    # cv2.waitKey(1) # 1ms 대기