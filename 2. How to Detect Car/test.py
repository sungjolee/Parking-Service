import os
folder_path = os.path.dirname(os.path.realpath(__file__))
folder_name = 'IMAGE'
full_path = folder_path + '/' + folder_name
os.mkdir(full_path)


def asdf():
    print("1")