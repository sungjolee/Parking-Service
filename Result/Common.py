##### 공통 변수 정의 #####
import cv2, os

serial_id = '12341234'

# 연결한 카메라
cap = cv2.VideoCapture(0)
# 무한 반복 종료 키
End_Key = ord('q')

# 현재 이 파일이 있는 경로
current_path = os.path.dirname(os.path.realpath(__file__))

### 주차장 사진 촬영 ###
# 사진 저장 폴더 이름
img_folder = 'imgs'
# 사진 저장 폴더 경로
img_folder_path = current_path + '/' + img_folder
# 저장할 사진 이름
img_name = 'parking_img.jpg'
# 저장할 사진 경로
img_path = img_folder_path + '/' + img_name

### 주차칸 좌표 데이터 저장 ###
# 주차칸 좌표 데이터 저장 폴더 이름
data_folder = 'data'
# 주차칸 좌표 데이터 저장 폴더 경로
data_folder_path = current_path + '/' + data_folder
# 주차칸 좌표 데이터 이름
data_name = 'parking_coordinates'
# 주차칸 좌표 데이터 경로
data_path = data_folder_path + '/' + data_name
# 주차장 정보 폴더가 없는 경우
if not os.path.isdir(data_folder_path):
    # 주차장 정보 폴더 생성
    os.mkdir(data_folder_path)
# 주차장 정보 폴더가 있는 경우
else:
    # 아무런 작동하지 하지 않고 지나감
    pass