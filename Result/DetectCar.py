import cv2, mysql.connector, schedule
import numpy as np

from Common import serial_id, End_Key
from Colors import *
from DrawingUtil import draw_contours

class CarMotionDetector:
    LAPLACIAN = 1.4
    DETECT_DELAY = 1
    
    def __init__(self, coordinates, start_frame):
        # 주차장 정보를 보낼 DB 서버
        self.db = mysql.connector.connect(host='your_DB_address', port='your_DB_port', user='your_user', password='your_DB_password!', database='your_DB_name', auth_plugin='mysql_native_password')
        self.cur = self.db.cursor()
        self.serial_id = serial_id
        
        self.coordinates_data = coordinates
        self.start_frame = start_frame
        
        self.camera = cv2.VideoCapture(0)
        self.contours = []
        self.bounds = []
        self.mask = []
    
    def send_log(self, statuses_list):
        enable_list = [index + 1 for index, value in enumerate(statuses_list) if value != False]
        enable = ','.join(list(map(str, enable_list)))
        disable_list = [index + 1 for index, value in enumerate(statuses_list) if value == False]
        disable = ','.join(list(map(str, disable_list)))
        
        sendcommand = "INSERT INTO TB_PARKING_LOG (SERIAL_ID, TOTAL, ENABLE, ENABLELIST, OCUPIEDLIST) VALUES (%s, %s, %s, %s, %s)"
        val = (self.serial_id, len(statuses_list), len(enable_list) , enable, disable)
        self.cur.execute(sendcommand, val)
        self.db.commit()
         
    def detect_motion(self):
        # 카메라 촬영 프레임 설정
        self.camera.set(cv2.CAP_PROP_POS_FRAMES, self.start_frame)
        coordinates_data = self.coordinates_data
        
        for p in coordinates_data:            
            rect = cv2.boundingRect(p)
            
            # 4개 좌표 저장 리스트 복사하여 저장
            new_coordinates = p.copy()
            # 복사한 배열의 전체 row의 1번째 요소를 배열 전체 row의 1번째 요소에
            new_coordinates[:, 0] = p[:, 0] - rect[0]
            # 복사한 배열의 전체 row의 2번째 요소를 배열 전체 row의 2번째 요소에
            new_coordinates[:, 1] = p[:, 1] - rect[1]
            
            self.contours.append(p)
            self.bounds.append(rect)
            
            mask = cv2.drawContours(np.zeros((rect[3],rect[2]), dtype=np.uint8), [new_coordinates], contourIdx = -1, color = 255, thickness = -1, lineType=cv2.LINE_8)
            mask = mask == 255
            self.mask.append(mask)
            
        statuses = [False] * len(coordinates_data)
        times = [None] * len(coordinates_data)
        
        schedule.every(20).seconds.do(self.send_log, statuses)
        
        while True:
            schedule.run_pending()
            
            ret, frame = self.camera.read()
            if ret == False:
                raise CaptureReadError("Error reading video capture on frame %s" % str(frame))
            
            blurred = cv2.GaussianBlur(frame, (5, 5), 3)
            grayed = cv2.cvtColor(blurred, cv2.COLOR_BGR2GRAY)
            
            position_in_seconds = self.camera.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
            
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
            
            for index, c in enumerate(coordinates_data):            
                color = green_color if statuses[index] else red_color
                draw_contours(frame, c, str(index + 1), white_color, color)
            
            # print([index+1 for index, value in enumerate(statuses) if value != False])
            cv2.imshow("CAMERA", frame)
            
            key = cv2.waitKey(1)
            # 'q' 키를 눌렀을 경우
            if key == End_Key:
                # 무한 반복 종료
                break
        
        self.cur.close()
        self.db.close()
        # 모든 윈도우창 닫기
        cv2.destroyAllWindows()
        
    def __apply(self, grayed, index, p):
        coordinates = self._coordinates(p)
        
        rect = self.bounds[index]
        
        roi_gray = grayed[rect[1]:(rect[1] + rect[3]), rect[0]:(rect[0] + rect[2])]
        laplacian = cv2.Laplacian(roi_gray, cv2.CV_64F)
        
        coordinates[:, 0] = coordinates[:, 0] - rect[0]
        coordinates[:, 1] = coordinates[:, 1] - rect[1]
        
        status = np.mean(np.abs(laplacian * self.mask[index])) < CarMotionDetector.LAPLACIAN
        
        return status
    
    @staticmethod
    def _coordinates(p):
        return np.array(p)
    
    @staticmethod
    def same_status(coordinates_status, index, status):
        return status == coordinates_status[index]

    @staticmethod
    def status_changed(coordinates_status, index, status):
        return status != coordinates_status[index]
        

class CaptureReadError(Exception):
    pass