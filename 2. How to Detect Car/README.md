## 목차
1. [어떻게 자동차를 감지할 것인가?](#어떻게-자동차를-감지할-것인가)
2. [자동차 감지 프로그램 구현](#자동차-감지-프로그램-구현)
---
## 어떻게 자동차를 감지할 것인가?
* 카메라를 사용해 자동차를 감지하는 방법엔 다양한 종류가 있습니다. 저희는 딥러닝을 사용해 자동차를 학습시켜 감지하는 방법과 색깔의 변화를 감지하는 방법으로 떠올렸습니다.

* 딥러닝을 사용해 자동차 학습 파일(.xml)을 만들어 감지하는 방법을 사용할 경우 Raspberry Pi 4에서 기기 성능의 한계로 자동차 감지 기능에 오류가 발생하여 인식률이 저하될 수 있는 가능성이 있습니다.

* 카메라로 찍고 있는 구역의 색깔 변화을 통해 감지하는 방법을 사용할 경우 외부 환경 요인(빛 밝기 및 비춰지는 각도 등)의 영향을 크게 받아 정확하지 않은 변화량을 얻어 정확하지 않은 감지가 발생할 수 있는 가능성이 있습니다.

* 선정된 방법 : 색의 변화량을 통해 자동차를 감지하는 방법
    * 외부 환경 요인은 고려하여 주차장의 바닥을 검은색으로 도색 및 매주기마다 주차장을 촬영한 사진에서 자동차를 인식하는 기준을 바꿔주는 방법을 사용하면 오차를 줄일 수 있습니다.
    * 인식률이 좋은 자동차 학습 파일을 만들기 위해서는 설치된 카메라가 찍은 몇 천장이상의 사진으로 학습 파일을 직접 만들어야 하는데 학습 파일을 만드는 시간과 인식률을 높이기 위해 학습 파일을 수정하는데 소비되는 시간이 프로젝트 기간안에 할 수 없어 선정되지 않았습니다.

## 자동차 감지 프로그램 구현
1. 주차장에 설치된 카메라로 매주기마다 사진을 촬영해주는 기능 구현
```py
import cv2, os
import numpy as np
import schedule

# 웹캠에 연결하여 촬영 중인 모습을 cap에 저장
cap = cv2.VideoCapture(0)
# 현재 실행 중인 1_STEP_Take_Pic.py이 있는 폴더 위치
folder_path = os.path.dirname(os.path.realpath(__file__))
# 촬영한 주차장 사진을 저장할 폴더 이름
Image_folder_name = '1_STEP_Parking_Area_Pics'
# 생성할 주차장 사진 저장 폴더의 경로
sub_path = folder_path + '/' + Image_folder_name
# 주차장 사진 저장 폴더 생성
# 주차장 사진 저장 폴더가 없는 경우 - 폴더 생성
# 주차장 사진 저장 폴더가 있는 경우 - 폴더 생성 생략
if os.path.isdir(sub_path) == False:
    os.mkdir(sub_path)
else :
    pass
# 저장할 jpg 파일명
jpg_name = 'Area_Pic.jpg'
# jpg 파일이 있는 경로
full_path = folder_path + '/' + Image_folder_name + '/' + jpg_name

# 사진을 찍어 파일로 저장하는 함수
def take_picture():
    # 정상적으로 불러왔을 경우 ret은 true를 반환, 아닌 경우 false를 반환
    # cap을 읽을 frame 단위
    ret, frame = cap.read()

    # 찍힌 영상의 프레임을 사진으로 저장
    # 사진을 저장할 경로와 이름 지정 필수
    cv2.imwrite(full_path, frame)

# 10초마다 사진찍는 함수를 실행
schedule.every(10).seconds.do(take_picture)

try:
    # 무한 반복
    while True:
        # 스케줄 실행
        schedule.run_pending()
except KeyboardInterrupt:   
    print("프로그램 종료")

# 웹캠 연결 해제
cap.release()
```

2. 