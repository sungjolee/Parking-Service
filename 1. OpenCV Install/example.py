import cv2

img = cv2.imread('testing_img.jpg')

cv2.imshow("Image", img)
cv2.waitKey(0)
cv2.destroyAllWindows()