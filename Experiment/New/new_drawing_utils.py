import cv2 as OpenCV
from new_colors import blue_color

# 지정한 주차장 영역의 외곽선을 그려주고 영역 중심에 주차칸 번호를 표시
def draw_contours(image, coordinates, label, font_color, border_color = blue_color, line_thickness = 1, font = OpenCV.FONT_HERSHEY_SIMPLEX, font_scale = 0.5):
    # 윤곽선을 그릴 이미지, 다각형을 표현하기 위한 점 집합 데이터, -1 음수로 설정시 모든 윤곽선을 그림, 윤곽선의 BGR 색상, 윤곽선의 선 두께, 윤곽선 선 종류
    OpenCV.drawContours(image, [coordinates], contourIdx = -1, color = border_color, thickness = 2, lineType = OpenCV.LINE_8)
    
    # 외곽선이나 이미지의 0~3차 모멘트까지 계산하는 함수 : 지정한 주차 영역의 중심 좌표를 구하기 위해 사용
    moments = OpenCV.moments(coordinates)
    
    # 지정한 주차 영역의 중심 좌표 (x, y)
    center = (int(moments["m10"] / moments["m00"]) - 3, int(moments["m01"] / moments["m00"]) + 3)
    
    ### 주차칸 번호를 주차 영역의 중심에 표시
    # 텍스트를 넣을 이미지, 넣은 텍스트, 텍스트를 넣을 좌표, 텍스트 폰트 종류, 텍스트 폰트 크기, 텍스트 폰트 BGR 색상, 텍스트 선 두께, 텍스트 선 종류
    OpenCV.putText(image, label, center, font, font_scale, font_color, line_thickness, OpenCV.LINE_AA)