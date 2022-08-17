# 라즈베리 파이 4 개발 환경 설정

### 1. [OpenCV 준비](#opencv-준비)
### 2. [예제 코드 테스트](#예제-코드-테스트)
<br/>

---
<br/>

## OpenCV 준비
<bt/>

#### 1. 라즈베리 파이 4 Python 설치 (`python 3.x version` / `python 3.7` 사용)<br/>
(Python Download : https://www.python.org/downloads/)
<br/><br/>

#### 2. 라즈베리 파이 4 터미널을 열어 OpenCV에 필요한 Python 라이브러리 및 패키지 설치 명령어 입력
```
pip install numpy
pip install matplotlib
pip install pickle
pip install schedule
pip install mysql.connector
pip install opencv-python
```
* `numpy` : 행렬이나 일반적으로 대규모 다차원 배열을 쉽게 처리할 수 있도록 지원합니다.

* `matplotlib` : Tkinter , wxPython , Qt 또는 GTK 와 같은 범용 GUI 툴킷을 사용하여 애플리케이션에 플롯을 포함 하기 위한 객체 지향 API를 제공합니다.

* `pickle` : 텍스트 상태의 데이터가 아닌 파이썬 객체 자체를 파일로 저장해줍니다.

* `schedule` : 정해진 시간에 Python Script를 자동 실행하는, 작업 예약용 기능을 제공해줍니다.

* `mysql.connector` : Python에서 MySQL DB를 사용하기 위한 라이브러리입니다.

* `opencv-python` : 실시간 컴퓨터 비전을 목적으로 만들어진 라이브러리입니다.
<br/><br/>

#### 3. OpenCV 설치 확인
```py
import cv2

# 설치된 cv2 버젼 출력
# OpenCV 버젼이 화면에 출력되면 정상적으로 설치가 완료된 것입니다.
print(cv2.__version__)
```
<br/><br/>

## 예제 코드 테스트
```py
import cv2

# 이미지 파일 불러오기
img = cv2.imread('image/testing_img.jpg')

# Image 이름의 창에 불러온 이미지 띄우기
cv2.imshow("Image", img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
* 결과

![Result](./image//result_img.jpg)