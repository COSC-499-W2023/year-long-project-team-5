import json
from utils.face_blurring import anonymize_face_pixelate
from utils.face_blurring import anonymize_face_simple
import numpy as np
import boto3
import cv2
import os
import urllib.request
import urllib.parse
import urllib.error


def lambda_handler(event, context):
    s3 = boto3.client("s3")
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'])

    direc = "/tmp/"
    fileLocation = "/tmp/" + key
    fileLocation = fileLocation.replace(".mp4", "webm")
    print("File Location: " + fileLocation)
    # load our serialized face detector model from disk
    print("[INFO] loading face detector model...")
    prototxtPath = os.path.sep.join(["face_detector", "deploy.prototxt"])
    weightsPath = os.path.sep.join(["face_detector",
        "res10_300x300_ssd_iter_140000.caffemodel"])
    net = cv2.dnn.readNet(prototxtPath, weightsPath)

    url = s3.generate_presigned_url( ClientMethod='get_object', Params={ 'Bucket': bucket, 'Key': key } )
    cap = cv2.VideoCapture(url)

    fourcc = cv2.VideoWriter_fourcc(*'VP80')
    if(not os.path.exists(direc)):
        print("Making directory")
        os.mkdir(direc)
    else:
        print("EXISTS!")
    out = cv2.VideoWriter(fileLocation, fourcc, 10.0, (640,480))

    if(out.isOpened() == False):
        print("Error opening out location")

    if (cap.isOpened()== False): 
        print("Error opening video file") 

    # Read until video is completed 
    while(cap.isOpened()): 
        ret, frame = cap.read() 
        if (ret == True) :
        # Display the resulting frame  
            (h, w) = frame.shape[:2]
            blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300),
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
                if confidence > 0.5:
                    # compute the (x, y)-coordinates of the bounding box for
                    # the object
                    box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                    (startX, startY, endX, endY) = box.astype("int")
                    face = frame[startY:endY, startX:endX]
                    face = anonymize_face_simple(face, factor=3.0)

                    # store the blurred face in the output image
                    frame[startY:endY, startX:endX] = face
            
            out.write(frame)
        else: 
            break
    print("Done!")
    cap.release() 
    out.release()
    print("Size: ", os.path.getsize(fileLocation))
    s3.upload_file(fileLocation, "storagereko", key, ExtraArgs={'ContentType': 'video/mp4'})
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "hello WOWO!",
            # "location": ip.text.replace("\n", "")
        }),
    }
