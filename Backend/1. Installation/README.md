# 장고(Django) 개발환경 설정

### 1. [python(파이썬) 설치](#python(파이썬)-설치)
### 2. [예제 코드 테스트](#예제-코드-테스트)
<br/>

---
<br/>

## python(파이썬) 설치
<br/>

#### 1. Python 설치 ( `python 3.x version` / `python 3.8.10` 사용 )<br/>
(Python Download : https://www.python.org/downloads/)
<br/><br/>

#### 2. Django 개발환경 세팅을 위한 Python 라이브러리 및 패키지 설치 명령어 입력
```
pip install Django
pip install Django-cors-header
pip install Django-sslserver
pip install mysql.connector
```
* `Django` : 파이썬으로 작성된 오픈 소스 웹 프레임워크.

* `Django-cors-header` : 다른 도메인에서 장고의 리소스에 액세스할 수 있게 하는 라이브러리.

* `Django-sslserver` : 명령어로 http, https를 지원하는 장고 패키지.

* `mysql.connector` : Python에서 MySQL DB와 연결하기 위한를 사용하기 위한 라이브러리.
<br/><br/>

#### 3. OpenCV 설치 확인 ( `4.6.0` 사용 )
```py
import cv2

# 설치된 cv2 버젼 출력
# OpenCV 버젼이 화면에 출력되면 정상적으로 설치가 완료된 것입니다.
print(cv2.__version__)
```
<br/>

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

![Result](./image/result_img.jpg)