##### 카메라 사진 촬영 함수 #####
import cv2, os
from time import sleep

from Common import cap, img_folder_path, img_path, End_Key

def shoot_pic():
    # 사진 폴더가 없는 경우
    if not os.path.isdir(img_folder_path):
        # 사진 폴더 생성
        os.mkdir(img_folder_path)
        
    # 불러오기 성공 True / 실패 False, 카메라가 찍고 있는 영상 Frame
    ret, frame = cap.read()
    
    # 영상 불러오기 성공한 경우
    if ret:
        # 카메라 연결 대기
        sleep(3)
        # 카메라 영상에서 1 Frame을 사진으로 저장
        cv2.imwrite(img_path, frame)
    # 영상 불러오기 실패한 경우
    else:
        print("Failed to load Frame. Please check Camera again")
    
    # 저장한 사진을 원래 색상으로 불러오기
    img = cv2.imread(img_path, cv2.IMREAD_COLOR)

    # 무한 반복
    while True:
        # 윈도우 창에 저장한 사진 띄우기
        cv2.imshow("Check Parking Image (Press 'q' for Close)", img)
        
        # 키보드 입력 감지
        Key = cv2.waitKey(0)
        # 'q' 입력을 감지하면 무한 반복 종료
        if Key == End_Key:
            break
    
    # 웹캠 연결 해제
    cap.release()
    # 모든 윈도우창 닫기
    cv2.destroyAllWindows()