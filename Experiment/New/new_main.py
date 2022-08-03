from new_paths import os, img_path, data_path
from new_create_parking_zone_coordinates import CreateParkingCoordinates
from new_motion_detector import CarMotionDetector

import cv2 as OpenCV
import schedule, mysql.connector, yaml

# 카메라 연결
cap = OpenCV.VideoCapture(0)

# main 함수
def main():
    if not os.path.isfile(data_path):
        with open(data_path, "w+") as points:
            creater = CreateParkingCoordinates(img_path, points)
            creater.Create_Parking_Zone_INFO()
            
    with open(data_path, "r") as data:
        points = yaml.safe_load(data)        
        detector = CarMotionDetector(cap, points, 400)
        detector.detect_motion()

if __name__ == '__main__':
    main()