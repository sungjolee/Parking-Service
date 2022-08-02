import cv2 as OpenCV
import os, pickle, yaml

from new_create_parking_zone_coordinates import CreateParkingCoordinates
from new_motion_detector import CarMotionDetector
from Colors import *

# 카메라 연결
cap = OpenCV.VideoCapture(0)

# 현재 실행 파일이 있는 폴더 경로
current_folder_path = os.path.dirname(os.path.realpath(__file__))

# 촬영한 주차장 사진
parking_pic_file_path = current_folder_path + '\image\parking_area_pic.jpg'

# 주차칸 영역 정보를 저장한 파일의 폴더 경로
data_folder_path = current_folder_path + '\data'
# 폴더가 없는 경우 만들기
if os.path.isdir(data_folder_path) == False:
    os.mkdir(data_folder_path)
else:
    pass
# 각각의 주차칸의 좌표값와 주차칸 번호를 저장한 yaml 파일명
data_file_name = 'parking_zone_coordinates.yaml'
# 주차칸의 정보를 저장한 yaml 파일의 경로
data_file_path = data_folder_path + '\\' + data_file_name

def main():
    if os.path.isfile(data_file_path) == False:
        with open(data_file_path, "w+") as points:
            creater = CreateParkingCoordinates(parking_pic_file_path, points)
            creater.Create_Parking_Zone_INFO()
            
    if os.path.isfile(data_file_path) == True:
        with open(data_file_path, "r") as data:
            points = yaml.safe_load(data)
            detector = CarMotionDetector(cap, points, 400)
            detector.detect_motion()

if __name__ == '__main__':
    main()