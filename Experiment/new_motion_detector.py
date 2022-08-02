import cv2 as OpenCV
import numpy as np
from Colors import *

from new_drawing_utils import draw_contours

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
        
    def detect_motion(self):
        cap = OpenCV.VideoCapture(0)
        # 카메라 촬영 해상도 설정
        cap.set(OpenCV.CAP_PROP_FRAME_WIDTH, 720)
        cap.set(OpenCV.CAP_PROP_FRAME_HEIGHT, 600)
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
                
            OpenCV.imshow("CAMERA", new_frame)
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