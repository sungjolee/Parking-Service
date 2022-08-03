from multiprocessing.spawn import prepare
import cv2 as OpenCV
import cvzone as OpenCV_Zone
from matplotlib.style import available
import numpy as np
from new_colors import *
import mysql.connector, time, schedule

from new_drawing_utils import draw_contours

db = mysql.connector.connect(host='i7c103.p.ssafy.io', port='3306', user='root', password='parkingC103!', database='parking', auth_plugin='mysql_native_password')
cur = db.cursor()
statuses = []

class CarMotionDetector:
    LAPLACIAN = 1.4
    DETECT_DELAY = 1
    
    def __init__(self, video, coordinates, start_frame):
        self.video = video
        self.coordinates_data = coordinates
        self.start_frame = start_frame
        self.contours = []
        self.bounds = []
        self.mask = []
        
    def DB_Send_Log(self):
        #ENABLE = 현재 이용 가능 자리수
        #OCCUPIEDLIST = 주차된 자리 리스트
        #TOTAL = 총 자리수
        #ENABLELIST = 주차 가능 자리 리스트
        
        self.serial_id = 'temp11111111'
        self.spotscount = len(self.coordinates_data)
        self.enable_list = [index+1 for index, value in enumerate(statuses) if value != False]
        # self.enable = ','.join(self.enable_list)
        self.enable = ','.join(list(map(str, self.enable_list)))
        
        self.disable_list = [index+1 for index, value in enumerate(statuses) if value == False]
        # self.disable = ','.join(self.disable_list)
        self.disable = ','.join(list(map(str, self.disable_list)))
        
        command = "INSERT INTO TB_PARKING_LOG (SERIAL_ID, ENABLE, OCUPIEDLIST, TOTAL, ENABLELIST) VALUES (%s, %s, %s, %s, %s)"
        val = (self.serial_id, int(1), self.disable, self.spotscount, self.enable)
        cur.execute(command, val)
        db.commit()
        
        
    def detect_motion(self):
        cap = OpenCV.VideoCapture(0)
        # # 카메라 촬영 해상도 설정
        # cap.set(OpenCV.CAP_PROP_FRAME_WIDTH, 720)
        # cap.set(OpenCV.CAP_PROP_FRAME_HEIGHT, 600)
        # 카메라 촬영 프레임 설정
        cap.set(OpenCV.CAP_PROP_POS_FRAMES, self.start_frame)
        
        coordinates_data = self.coordinates_data
        
        for p in coordinates_data:
            coordinates = self._coordinates(p)
            
            rect = OpenCV.boundingRect(coordinates)
            
            # 배열 복사
            new_coordinates = coordinates.copy()
            # 복사한 배열의 전체 row의 1번째 요소를 배열 전체 row의 1번째 요소에
            new_coordinates[:, 0] = coordinates[:, 0] - rect[0]
            # 복사한 배열의 전체 row의 2번째 요소를 배열 전체 row의 2번째 요소에
            new_coordinates[:, 1] = coordinates[:, 1] - rect[1]
            
            self.contours.append(coordinates)
            self.bounds.append(rect)
            
            mask = OpenCV.drawContours(np.zeros((rect[3],rect[2]), dtype=np.uint8), [new_coordinates], contourIdx = -1, color = 255, thickness = -1, lineType=OpenCV.LINE_8)
            mask = mask == 255
            self.mask.append(mask)
            
        statuses = [False] * len(coordinates_data)
        times = [None] * len(coordinates_data)
        
        schedule.every(10).seconds.do(self.DB_Send_Log)
        
        while cap.isOpened():
            
            ret, frame = cap.read()
            if ret == False:
                raise CaptureReadError("Error reading video capture on frame %s" % str(frame))
            
            blurred = OpenCV.GaussianBlur(frame.copy(), (5, 5), 3)
            grayed = OpenCV.cvtColor(blurred, OpenCV.COLOR_BGR2GRAY)
            new_frame = frame.copy()
            
            position_in_seconds = cap.get(OpenCV.CAP_PROP_POS_MSEC) / 1000.0
            
            for index, c in enumerate(coordinates_data):
                status = self.__apply(grayed, index, c)
                
                if times[index] is not None and self.same_status(statuses, index, status):
                    times[index] = None
                    continue
                
                if times[index] is not None and self.status_changed(statuses, index, status):
                    if position_in_seconds - times[index] >= CarMotionDetector.DETECT_DELAY:
                        statuses[index] = status
                        times[index] = None
                    continue
                
                if times[index] is None and self.status_changed(statuses, index, status):
                    times[index] = position_in_seconds
            
            for index, p in enumerate(coordinates_data):
                coordinates = self._coordinates(p)
                
                color = green_color if statuses[index] else blue_color
                draw_contours(new_frame, coordinates, str(p["id"] + 1), white_color, color)
                # print(statuses)
                
            str1 = f'Available : {[index+1 for index, value in enumerate(statuses) if value != False]}'
            OpenCV_Zone.putTextRect(new_frame, str1, (20, 40), scale = 1.7, thickness = 2, offset = 10, colorR = (0, 200, 0))
            OpenCV.imshow("CAMERA", new_frame)
            
            schedule.run_pending()
            
            KEY = OpenCV.waitKey(1)
            if KEY == ord("q"):
                break
        cap.release()
        OpenCV.destroyAllWindows()
        
    def __apply(self, grayed, index, p):
        coordinates = self._coordinates(p)
        
        rect = self.bounds[index]
        
        roi_gray = grayed[rect[1]:(rect[1] + rect[3]), rect[0]:(rect[0] + rect[2])]
        laplacian = OpenCV.Laplacian(roi_gray, OpenCV.CV_64F)
        
        coordinates[:, 0] = coordinates[:, 0] - rect[0]
        coordinates[:, 1] = coordinates[:, 1] - rect[1]
        
        status = np.mean(np.abs(laplacian * self.mask[index])) < CarMotionDetector.LAPLACIAN
        
        return status
    
    @staticmethod
    def _coordinates(p):
        return np.array(p["coordinates"])
    
    @staticmethod
    def same_status(coordinates_status, index, status):
        return status == coordinates_status[index]

    @staticmethod
    def status_changed(coordinates_status, index, status):
        return status != coordinates_status[index]
        

class CaptureReadError(Exception):
    pass