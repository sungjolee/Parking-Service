from genericpath import isfile
import pickle, os

from Common import cap, img_path, data_path
from TakePic import shoot_pic
from CreateData import CreateCoordinateData
from DetectCar import CarMotionDetector

# main 함수
def main():
    # 무한 반복
    while True:
        # 안내 메시지 출력
        mode = input("\n\n1. 주차장 사진 촬영\n2. 주차장 좌표 수정 및 저장\n3. 주차장 감시\n4. 종료\n\n모드를 선택해주세요 : ")
        
        if mode == '1':
            print("\n주차장을 촬영합니다.")
            
            # 사진 촬영 함수 실행
            shoot_pic()
            
            print("주차장 촬영 완료\n")
        
        # 주차칸 좌표 설정 및 수정
        elif mode == '2':
            # 저장된 이미지 파일이 있는 경우
            if os.path.isfile(img_path):
                print("\n주차장 좌표 수정 및 저장을 진행합니다.")
                
                # 주차칸 좌표 데이터 파일 생성 클래스에 주차장 사진 전달
                creater = CreateCoordinateData(img_path)
                # 주차칸 좌표 데이터 파일 생성 함수 실행
                creater.SetParkingCoordinates()
                
                print("주차장 좌표 수정 및 저장을 완료했습니다.\n")
            
            # 저장된 이미지 파일이 없는 경우
            else:
                print("\n불러올 이미지가 없습니다. 주차장 촬영을 먼저 진행해주세요.\n")
        
        # 주차장 감시 시작
        elif mode == '3':
            # 저장된 주차장 데이터가 있는 경우
            if os.path.isfile(data_path):
                print("\n주차장 감시를 시작합니다.")
                
                # 주차칸 좌표 데이터 파일을 읽기 전용으로 열기
                with open(data_path, 'rb') as data:
                    # 주차칸 좌표 데이터에서 좌표 값 불러와 저장
                    points = pickle.load(data)
                    # 불러온 좌표값과 카메라 프레임 설정 정보 자동차 감지 클래스에 전달
                    detector = CarMotionDetector(points, 400)
                    # 자동차 감지 함수 실행
                    detector.detect_motion()
                
                print("주차장 감시를 종료합니다.\n")
            
            # 저장된 주차장 데이터가 없는 경우
            else:
                print("\n저장된 주차장 데이터가 없습니다. 주차장 데이터를 먼저 만들어주세요.\n")
        
        # 프로그램 종료
        elif mode == '4':
            # 웹캠 연결 해제
            cap.release()
            
            print("\n프로그램을 종료합니다. 이용해주셔서 감사합니다.\n")
            break

if __name__ == '__main__':
    main()
