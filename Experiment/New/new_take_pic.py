from new_paths import img_path, End_Key

import cv2 as OpenCV
from time import sleep

# 카메라를 연결
cap = OpenCV.VideoCapture(0)

# 정상적으로 불러왔을 경우 ret은 true를 반환, 아닌 경우 false를 반환
# cap을 읽을 frame 단위
ret, frame = cap.read()
if ret:
    sleep(2)
    OpenCV.imwrite(img_path, frame)
else:
    print("Failed to load Frame. Please check again")
    
img = OpenCV.imread(img_path, OpenCV.IMREAD_COLOR)

while True:
    OpenCV.imshow("Check Parking Image", img)
    Key = OpenCV.waitKey(0)
    if Key == End_Key:
        break

# 웹캠 연결 해제
cap.release()
# 모든 윈도우창 닫기
OpenCV.destroyAllWindows()