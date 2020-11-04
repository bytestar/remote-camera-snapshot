# Author: Lucas Tseng
import cv2


def capture():
	cap = cv2.VideoCapture(0)
	ret, frame = cap.read()
	cv2.imwrite("snap.jpg", frame)
	cap.release()


capture()
