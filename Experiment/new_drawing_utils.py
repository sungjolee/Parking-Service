import cv2 as OpenCV
from Colors import violet_color

# 지정한 주차장 영역의 외곽선을 그려주고 영역 중심에 주차칸 번호를 표시
def draw_contours(image, coordinates, label, font_color, border_color = violet_color, line_thickness = 1, font = OpenCV.FONT_HERSHEY_SIMPLEX, font_scale = 0.5):
    # image 외곽선을 그릴 이미지
    # [coordinates] 다각형을 표현하는 포인트 집합 데이터
    # contourIdx 음수(-1)으로 지정하면 모든 외곽선을 그림
    # color 외곽선의 BGR 색 코드
    # thickness 외곽선의 선 두께
    # lineType 외곽선 선 종류
    OpenCV.drawContours(image, [coordinates], contourIdx = -1, color = border_color, thickness = 2, lineType = OpenCV.LINE_8)
    
    # 외곽선이나 이미지의 0~3차 모멘트까지 계산하는 함수
    # 사용자가 지정한 주차칸 영역의 중심 좌표를 하기 위해 사용
    moments = OpenCV.moments(coordinates)
    
    # 사용자가 지정한 주차칸 영역안의 중심 좌표 계산 (x, y)
    center = (int(moments["m10"] / moments["m00"]) - 3, int(moments["m01"] / moments["m00"]) + 3)
    
    ### 주차칸 번호를 지정한 영역의 중심에 출력
    # image 텍스트를 넣을 이미지
    # label 넣은 텍스트
    # center 텍스트를 넣을 좌표
    # font 텍스트 폰트 종류
    # font_scale 텍스트 폰트 크기
    # font_color 텍스트 폰트 BGR 색 코드
    # line_thickness 텍스트 선 두께
    # LINE_AA 텍스트 폰트의 선 종류
    OpenCV.putText(image, label, center, font, font_scale, font_color, line_thickness, OpenCV.LINE_AA)