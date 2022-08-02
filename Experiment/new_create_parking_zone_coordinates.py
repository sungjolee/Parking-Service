import cv2 as OpenCV
import numpy as np

from new_drawing_utils import draw_contours
from Colors import blue_color, white_color

class CreateParkingCoordinates:
    CLOSE_KEYWORD = ord('q')
    
    def __init__(self, image, coordinates_output):
        self.parking_area = image
        self.coordinates_output = coordinates_output
        
        self.image = OpenCV.imread(image).copy()
        self.click_count = 0
        self.id = 0
        self.coordinates = []
        
        # WINDOW_GUI_EXPANDED : 좌표와 좌표의 RGB 값 확인 가능, 화면 크기 전환 가능 및 비율 유지
        OpenCV.namedWindow(self.parking_area, OpenCV.WINDOW_GUI_EXPANDED)
        OpenCV.setMouseCallback(self.parking_area, self.Mouse_Click)
    
    def Create_Parking_Zone_INFO(self):
        while True:
            OpenCV.imshow(self.parking_area, self.image)
            
            key = OpenCV.waitKey(0)
            if key == CreateParkingCoordinates.CLOSE_KEYWORD:
                break
            
        OpenCV.destroyAllWindows()
    
    def Mouse_Click(self, event, x, y, flags, params):
        if event == OpenCV.EVENT_LBUTTONDOWN:
            self.coordinates.append((x, y))
            self.click_count += 1
            
            if self.click_count >= 4:
                self.Set_Area_Done()
            
            elif self.click_count > 1:
                self.Mouse_Click_Progress()
        
        OpenCV.imshow(self.parking_area, self.image)
    
    def Mouse_Click_Progress(self):
        # cv2.line() : 2개 좌표를 잇는 선을 그림
        # 요소 : 이미지 파일, 시작 좌표, 끝 좌표, 색상, 선 두께
        # 시작 좌표 : coordinates 리스트의 끝에서 2번째 요소
        # 끝 좌표 : coordinates 리스트의 끝에서 1번째 요소
        # 색상 : Colors 파일에 정의된 Blue
        # 선 두께 : 크기 1
        OpenCV.line(self.image, self.coordinates[-2], self.coordinates[-1], blue_color, 1)
    
    def Set_Area_Done(self):
        OpenCV.line(self.image, self.coordinates[2], self.coordinates[3], blue_color, 1)
        OpenCV.line(self.image, self.coordinates[3], self.coordinates[0], blue_color, 1)
        
        self.click_count = 0
        
        # 클릭한 4개의 점을 1개의 배열로 만들어 저장
        coordinates = np.array(self.coordinates)
        
        
        self.coordinates_output.write("-\n          id: " + str(self.id) + "\n          coordinates: [" +
                          "[" + str(self.coordinates[0][0]) + "," + str(self.coordinates[0][1]) + "]," +
                          "[" + str(self.coordinates[1][0]) + "," + str(self.coordinates[1][1]) + "]," +
                          "[" + str(self.coordinates[2][0]) + "," + str(self.coordinates[2][1]) + "]," +
                          "[" + str(self.coordinates[3][0]) + "," + str(self.coordinates[3][1]) + "]]\n")

        draw_contours(self.image, coordinates, str(self.id + 1), white_color)
        
        for i in range(0, 4):
            self.coordinates.pop()
        
        self.id += 1
    