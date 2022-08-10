import cv2, pickle, os, mysql.connector
import numpy as np

from Common import serial_id, End_Key, data_path
from DrawingUtil import draw_contours
from Colors import blue_color, white_color

##### 주차칸 좌표 데이터 생성 클래스
class CreateCoordinateData:
    ### 초기 설정
    def __init__(self, image):
        # 주차장 정보를 보낼 DB 서버
        self.db = mysql.connector.connect(host='i7c103.p.ssafy.io', port='3306', user='root', password='parkingC103!', database='parking', auth_plugin='mysql_native_password')
        self.cur = self.db.cursor()
        
        self.serial_id = serial_id
        self.enable = '1'
        
        # 촬영한 주차장 사진
        self.parking_area = image
        
        # 주차칸 좌표 데이터가 존재하는 경우
        if os.path.isfile(data_path):
            # 읽기 전용으로 열기
            with open(data_path, 'rb') as data:
                # 저장된 좌표 데이터들을 읽어와 리스트로 저장
                self.coordinates_list = pickle.load(data)
        # 주차칸 좌표 데이터가 존재하지 않는 경우
        else:
            # 좌표 데이터들을 저장할 빈 리스트 생성
            self.coordinates_list = []
                
        # 마우스 좌클릭 횟수
        self.click_count = 0
        
        # 1개의 주차칸을 설정할 때 필요한 4개 좌표를 저장하는 리스트
        self.coordinates = []
        
        # 저장된 주차칸의 개수
        self.id = len(self.coordinates_list)
    
    
    ### 주차칸 좌표 설정 함수
    def SetParkingCoordinates(self):
        # 무한 반복
        while True:
            # 주차장 사진 읽어오기 
            self.image = cv2.imread(self.parking_area)
            
            # 다수의 주차칸 좌표값이 저장된 데이터를 리스트 순서와 1개의 주차칸 좌표값으로 나누기
            for id, points in enumerate(self.coordinates_list):
                # 1개의 주차칸이 가진 4개의 좌표값들을 배열로 재정렬하여 저장
                coordinates = self._coordinates(points)
                
                # 흰색 설정
                color = white_color
                # 저장된 주차칸을 흰색 선으로 테두리로 표시, 중앙에 주차칸 번호 표시
                draw_contours(self.image, coordinates, str(int(id) + 1), white_color, color)
            
            # 주차장 사진을 새로운 윈도우 창에 띄우기
            cv2.imshow("Set Coordinates", self.image)
            # 띄운 윈도우 창에서 마우스 사용 함수 호출
            cv2.setMouseCallback("Set Coordinates", self.UseMouse)
            
            # 키보드 입력 감지
            key = cv2.waitKey(1)
            # 'q' 키 입력을 감지한 경우
            if key == End_Key:
                getcommand = "SELECT SERIAL_ID FROM TB_PARKING_DETAIL WHERE SERIAL_ID = %s"
                get_val = (self.serial_id, )
                self.cur.execute(getcommand, get_val)
                get_list = self.cur.fetchall()
                if len(get_list) == 0:
                    sendcommand = "INSERT INTO TB_PARKING_DETAIL VALUES(%s, %s, %s, %s)"
                    val = (self.serial_id, 'NULL', self.id, self.enable)
                    self.cur.execute(sendcommand, val)
                    self.db.commit()
                else:
                    sendcommand = "UPDATE TB_PARKING_DETAIL SET TOTALSPOTS = %s WHERE SERIAL_ID = %s"
                    val = (self.id, self.serial_id)
                    self.cur.execute(sendcommand, val)
                    self.db.commit()
                
                # 무한 반복 종료
                break
        
        self.cur.close()
        self.db.close()
        # 모든 윈도우 창 닫기
        cv2.destroyAllWindows()
    
    
    ### 마우스 사용 함수
    def UseMouse(self, event, x, y, flags, params):
        # 좌클릭을 한 경우
        if event == cv2.EVENT_LBUTTONDOWN:
            # 4개 좌표 저장 리스트에 붙여넣기
            self.coordinates.append((x, y))
            # 좌클릭한 횟수 1 증가
            self.click_count += 1
            
            # 좌클릭한 횟수가 4번 이상인 경우
            if self.click_count >= 4:
                # 1개의 주차칸에 필요한 좌표를 설정 완료했다고 판단
                # 좌클릭 완료 함수 호출
                self.Set_Area_Done()
            
            # 좌클릭한 횟수가 2번 이상인 경우 = 저장된 좌표가 2개 이상인 경우
            elif self.click_count > 1:
                # 클릭한 좌표가 2개 이상인 경우 선으로 이어 화면에 표시해야 하므로
                # 좌클릭 진행중 함수 호출
                self.Mouse_Click_Progress()
        
        # 우클릭을 한 경우
        elif event == cv2.EVENT_RBUTTONDOWN:
            # 4개 좌표 저장 리스트가 빈 리스트가 아닌 경우
            if len(self.coordinates_list) > 0:
                self.coordinates_list.pop()
                self.id = len(self.coordinates_list)
            else:
                print("There is no Coordinate Data, Please make Data")
        
        with open(data_path, 'wb') as f:
            pickle.dump(self.coordinates_list, f)
            
        cv2.imshow("Set Coordinates", self.image)
        
        
    ### 좌클릭 진행중 함수
    def Mouse_Click_Progress(self):
        # 2개 점를 잇는 선을 그리는 함수
        # 이미지 파일, 시작 좌표, 끝 좌표, 색상, 선 두께
        # self.coordinates[-2] : 리스트의 끝에서 2번째 요소
        cv2.line(self.image, self.coordinates[-2], self.coordinates[-1], blue_color, 1)
    
    
    ### 좌클릭 완료 함수
    def Set_Area_Done(self):
        cv2.line(self.image, self.coordinates[2], self.coordinates[3], blue_color, 1)
        cv2.line(self.image, self.coordinates[3], self.coordinates[0], blue_color, 1)
        
        self.click_count = 0
        
        # 클릭한 4개의 점을 1개의 배열로 만들어 저장
        coordinates = np.array(self.coordinates)
        
        self.coordinates_list.append(coordinates)
        
        draw_contours(self.image, coordinates, str(self.id + 1), white_color)
        self.id += 1
        
        for i in range(0, 4):
            self.coordinates.pop()
        
        with open(data_path, 'wb') as f:
            pickle.dump(self.coordinates_list, f)
    
    @staticmethod
    def _coordinates(p):
        return np.array(p)