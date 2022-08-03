import cv2, os
import numpy as np
import schedule

# 웹캠에 연결하여 촬영 중인 모습을 cap에 저장
cap = cv2.VideoCapture(1)
# 현재 실행 중인 1_STEP_Take_Pic.py이 있는 폴더 위치
folder_path = os.path.dirname(os.path.realpath(__file__))
# 촬영한 주차장 사진을 저장할 폴더 이름
Image_folder_name = '1_STEP_Pics_Folder'
# 생성할 주차장 사진 저장 폴더의 경로
create_folder_path = folder_path + '/' + Image_folder_name
# 주차장 사진 저장 폴더 생성
# 주차장 사진 저장 폴더가 없는 경우 - 폴더 생성
# 주차장 사진 저장 폴더가 있는 경우 - 폴더 생성 생략
if os.path.isdir(create_folder_path) == False:
    os.mkdir(create_folder_path)
else :
    pass
# 저장할 jpg 파일명
jpg_name = 'Parking_Pic.jpg'
# jpg 파일이 있는 경로
save_jpg_path = folder_path + '/' + Image_folder_name + '/' + jpg_name

# 사진을 찍어 파일로 저장하는 함수
def take_picture():
    # 정상적으로 불러왔을 경우 ret은 true를 반환, 아닌 경우 false를 반환
    # cap을 읽을 frame 단위
    ret, frame = cap.read()

    # 찍힌 영상의 프레임을 사진으로 저장
    # 사진을 저장할 경로와 이름 지정 필수
    cv2.imwrite(save_jpg_path, frame)

# 10초마다 사진찍는 함수를 실행
schedule.every(10).seconds.do(take_picture)

try:
    # 무한 반복
    while True:
        # 스케줄 실행
        schedule.run_pending()
# Ctrl+C를 감지하면
except KeyboardInterrupt:
    print("프로그램 종료")

# 웹캠 연결 해제
cap.release()
