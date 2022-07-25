import cv2
import numpy as np
import schedule

# 웹캠에 연결하여 촬영 중인 모습을 cap에 저장
cap = cv2.VideoCapture(1)

# 사진을 찍어 파일로 저장하는 함수
def take_picture():
    # 정상적으로 불러왔을 경우 ret은 true를 반환, 아닌 경우 false를 반환
    # cap을 읽을 frame 단위
    ret, frame = cap.read()
    # 찍힌 영상의 프레임을 좌우 반전 시키기
    frame = cv2.flip(frame,1)

    # 찍힌 영상의 프레임을 사진으로 저장
    # 사진을 저장할 경로와 이름 지정 필수
    cv2.imwrite('Your_Save_Path\File_Name.jpg', frame)

# 10초마다 사진찍는 함수를 실행
schedule.every(10).seconds.do(take_picture)

# 무한 반복
while True:
    # 스케줄 실행
    schedule.run_pending()
    cv2.waitKey(0)

# 웹캠 연결 해제
cap.release()
# 모든 윈도우창 닫기
cv2.destroyAllWindows()
