import cv2, os
import numpy as np

# 웹캠에 연결하여 촬영 중인 모습을 cap에 저장
cap = cv2.VideoCapture(0)
# 현재 실행 중인 Take_Parking_Pic.py이 있는 폴더 위치
current_folder_path = os.path.dirname(os.path.realpath(__file__))
# 촬영한 사진을 저장할 폴더 경로
image_folder_path = current_folder_path + '\image'
if os.path.isdir(image_folder_path) == False:
    os.mkdir(image_folder_path)
else:
    pass
# 저장할 jpg 파일명
jpg_name = 'parking_area_pic.jpg'
# jpg 파일이 있는 경로
full_path = image_folder_path + '\\' + jpg_name

# 정상적으로 불러왔을 경우 ret은 true를 반환, 아닌 경우 false를 반환
# cap을 읽을 frame 단위
ret, frame = cap.read()

# 찍힌 영상의 프레임을 사진으로 저장
cv2.imwrite(full_path, frame)

# 웹캠 연결 해제
cap.release()
# 모든 윈도우창 닫기
cv2.destroyAllWindows()