# 사용할 라이브러리 및 패키지
import cv2, cvzone, pickle, os, mysql.connector
import numpy as np
from matplotlib.style import available
from sre_constants import SUCCESS


# 초기 설정 및 전역 변수 선언
# 카메라 연결
cap = cv2.VideoCapture(0)
# 현재 실행 중인 Main.py이 있는 폴더 위치
folder_path = os.path.dirname(os.path.realpath(__file__))
# 불러올 binary 파일명
binary_name = 'CarParkPos'
# binary 파일이 있는 경로
full_path = folder_path + '/' + binary_name
# 주차칸 위치를 저장한 파일 읽어오기
with open(full_path, 'rb') as f:
    posList = pickle.load(f)
# 각 주차칸이 비었을 때 기준
parking_zone_empty = [213456790] * len(posList)
# 주차 가능한 칸 저장 리스트
parking_zone_info = [-1] * len(posList)
# DB 서버에 접속
# db = mysql.connector.connect(host='my_ip', port=my_port, user='my_name', password='my_password', database='my_DB_name', auth_plugin='mysql_native_password')
# cur = db.cursor()


def Set_empty_init():
    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    
    success, img = cap.read()
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray, (3,3), 1)
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
    imgMedian = cv2.medianBlur(imgThreshold, 5)
    kernel = np.ones((3,3), np.uint8)
    # iterations 값을 조정할 수 있지만 너무 크게하면 윤곽선이 뚜렷하게 보이지 않을 수도 있음
    imDilate = cv2.dilate(imgMedian, kernel, iterations = 1)
    
    for i, pos in enumerate(posList):
        x, y, width, height = pos
        imgCrop = imDilate[y:y+height, x:x+width]
        
        count = cv2.countNonZero(imgCrop)
        
        parking_zone_empty[i] = count + 500
        
        

# 주차칸 위치를 저장한 파일에서 읽은 주차칸 리스트를 읽어 출력하기
def Check_Parking_Area(imgPro):
    spaceCounter = 0
    
    for i, pos in enumerate(posList):
        x, y, width, height = pos
        imgCrop = imgPro[y:y+height, x:x+width]
        
        count = cv2.countNonZero(imgCrop)
        
        if count < parking_zone_empty[i]:
            color = (0, 255, 0)
            tickness = 5
            spaceCounter += 1
            parking_zone_info[i] = i
        else:
            color = (0, 0, 255)
            tickness = 2
            parking_zone_info[i] = -1
            
        cv2.rectangle(img, (x, y + 10), (x + width, y + height), color, tickness)
        cvzone.putTextRect(img, str(i), (x, y), scale = 1.5, thickness = 2, offset = 0, colorR = color)
        cvzone.putTextRect(img, str(count), (x, y + height), scale = 1.5, thickness = 2, offset = 0, colorR = color)
        
    # cvzone.putTextRect(img, f'Parking Area : {spaceCounter}/{len(posList)}', (100, 50), scale = 3, thickness = 5, offset = 20, colorR = (0, 200, 0))
    cvzone.putTextRect(img, f'Available : {[x for x in parking_zone_info if x != -1]}', (20, 40), scale = 1.7, thickness = 2, offset = 10, colorR = (0, 200, 0))

Set_empty_init()

# 무한 반복
while True:
    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    
    success, img = cap.read()
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray, (3,3), 1)
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
    imgMedian = cv2.medianBlur(imgThreshold, 5)
    kernel = np.ones((3,3), np.uint8)
    # iterations 값을 조정할 수 있지만 너무 크게하면 윤곽선이 뚜렷하게 보이지 않을 수도 있음
    imDilate = cv2.dilate(imgMedian, kernel, iterations = 1)
    
    Check_Parking_Area(imDilate)
       
    cv2.imshow("Image", img)
    # cv2.imshow("ImageBlur", imgBlur)
    # cv2.imshow("ImageThreshold", imgThreshold)
    # cv2.imshow("ImageMedian", imgMedian)
    
    keyVal = cv2.waitKey(1) & 0xFF # 키보드 입력 감지
    if keyVal == ord('q'): # 'q'를 입력하면 반복 종료
        break
    
# cur.close()
# db.close()