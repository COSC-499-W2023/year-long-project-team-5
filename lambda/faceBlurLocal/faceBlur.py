# import the necessary packages
from utils.face_blurring import anonymize_face_pixelate
from utils.face_blurring import anonymize_face_simple
import numpy as np
import argparse
import imutils
import time
import cv2
import os


# load our serialized face detector model from disk
print("[INFO] loading face detector model...")
prototxtPath = os.path.sep.join(["face_detector", "deploy.prototxt"])
weightsPath = os.path.sep.join(["face_detector",
	"res10_300x300_ssd_iter_140000.caffemodel"])
net = cv2.dnn.readNet(prototxtPath, weightsPath)


video1 = "images/video1.webm"
video2 = "images/video2.mp4"
curr = video2
# load the input image and construct an input blob for the image
cap = cv2.VideoCapture(curr)
toSave = curr.replace('images/', 'output/')
# video writer
cap.set(3,640)
cap.set(4,480)

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
# May need to adjust for video speed -10-
out = cv2.VideoWriter(toSave, fourcc, 10.0, (640,480))
if (cap.isOpened()== False): 
    print("Error opening video file") 
  
# Read until video is completed 
while(cap.isOpened()): 
      
# Capture frame-by-frame 
	ret, frame2 = cap.read() 
	if (ret == True) :
    # Display the resulting frame  
		(h, w) = frame2.shape[:2]
		blob = cv2.dnn.blobFromImage(frame2, 1.0, (300, 300),
			(104.0, 177.0, 123.0))

		# pass the blob through the network and obtain the face detections
		net.setInput(blob)
		detections = net.forward()
		for i in range(0, detections.shape[2]):
		# extract the confidence (i.e., probability) associated with
		# the detection
			confidence = detections[0, 0, i, 2]

			# filter out weak detections by ensuring the confidence is
			# greater than the minimum confidence

			# WILL NEED TO BE CHANGED AS CONFIDENCE WILL BE AT A DEFAULT ----------------!
			if confidence > 0.5:
				# compute the (x, y)-coordinates of the bounding box for
				# the object

				# Confusing piece of code what is 3:7? 
				# Will need to stare at this for a bit longer ----------------!
				box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
				(startX, startY, endX, endY) = box.astype("int")

				# extract the face ROI
				# Bounding box coordinates ----------------!
				face = frame2[startY:endY, startX:endX]

				# check to see if we are applying the "simple" face
				# blurring method
				# We will need to pick one of these options for the project
				# I think simple will be best! ----------------!
				method = "simple"
				if method == "simple":
					face = anonymize_face_simple(face, factor=3.0)

				# otherwise, we must be applying the "pixelated" face
				# anonymization method
				else:
					face = anonymize_face_pixelate(face,
						blocks=1)

				# store the blurred face in the output image
				frame2[startY:endY, startX:endX] = face
        
		out.write(frame2)
  
# Break the loop 
	else: 
		break
  
print("Done!")
# When everything done, release 
# the video capture object 
cap.release() 
out.release()
# Closes all the frames 
cv2.destroyAllWindows() 