import os


current_path = os.path.dirname(os.path.realpath(__file__))


img_folder = 'imgs'
img_folder_path = current_path + '\\' + img_folder
# 사진 폴더가 없는 경우
if not os.path.isdir(img_folder_path):
    # 사진 폴더 생성
    os.mkdir(img_folder_path)
# 사진 폴더가 있는 경우
else:
    # 아무런 동작을 하지 않고 지나감
    pass
img_name = 'parking_img.jpg'
img_path = img_folder_path + '\\' + img_name


data_folder = 'data'
data_folder_path = current_path + '\\' + data_folder
# 주차장 정보 폴더가 없는 경우
if not os.path.isdir(data_folder_path):
    # 주차장 정보 폴더 생성
    os.mkdir(data_folder_path)
# 주차장 정보 폴더가 있는 경우
else:
    # 아무런 작동하지 하지 않고 지나감
    pass
data_name = 'parking_coordinates.yaml'
data_path = data_folder_path + '\\' + data_name

End_Key = ord('q')