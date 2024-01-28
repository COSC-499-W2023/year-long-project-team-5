import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Flex, View, Button } from "@aws-amplify/ui-react";

import {Amplify, Auth, API, Storage } from 'aws-amplify';

import {
  createVideo as createVideoMutation
} from "../graphql/mutations";

export default function WebcamVideo() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setVideoPreviewUrl(null);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleRecordingStop = useCallback(() => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      setVideoPreviewUrl(url);
    }
  }, [videoPreviewUrl, recordedChunks]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);


  const handleUpload= useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      const randNum = parseInt(Math.random() * 10000000);
      const videoNameS3 = "video" + randNum + ".webm";
      console.log(randNum)
      const data = {
        videoURL: videoNameS3, // videoNameS3 is the key (not the url) for the s3 bucket, get video URL with Storage.get(name)
      };
      
      await Storage.put(videoNameS3, blob); // store video in s3 bucket under the key
      await API.graphql({ //store the key for the video in DynamoDB
        query: createVideoMutation,
        variables: { input: data },
      });
      setRecordedChunks([]);
    }
  }, [recordedChunks]);
  const handleRetakeClick = useCallback(() => {
    setRecordedChunks([]); // Reset recorded chunks when retaking the video
  }, [setRecordedChunks]);

  const renderVideoPreview = () => {
    if(videoPreviewUrl) {
      return (
        <div>
          <video controls width = {640} height = {360} src = {videoPreviewUrl} />
        </div>
      );
    }
    return null;
  };
  const videoConstraints = {
    width: 1240,
    height: 960,
    facingMode: "user",
  };

  const styles = 
  capturing ?
  `@keyframes pulseAnimation {
    0% {
      border-color: red;
    }
    50% {
      border-color: darkred;
    }
    100% {
      border-color: red;
    }
  }

  .recorder {
    animation: pulseAnimation 3s infinite;
    border: 10px solid red;
    border-radius: 8px;
    margin: 20px;
    padding: 0px;
  }`:
  `.recorder {
    margin: 30px;
    padding: 0px;
  }`;

  return (
    <View>
      <Flex justifyContent={"center"}>
        <style>{styles}</style>
        <Webcam
          className="recorder"
          muted={true}
          audio={true}
          mirrored={true}
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />
      </Flex>
      <div justifyContent={"center"}>
        {capturing ? (
            <Button onClick={handleStopCaptureClick}>Stop Capture</Button>
            ) : recordedChunks.length === 0 ? (
              <Button onClick={handleStartCaptureClick}>Start Capture</Button>
            ) : null}
        {recordedChunks.length > 0 && (
            <>
            <Button onClick={handleDownload}>Download</Button>
            <Button onClick={handleUpload}>Upload</Button>
            <Button onClick={handleRetakeClick}>Retake</Button>
            <Button onClick = {handleRecordingStop}>View Preview</Button>
            <Flex justifyContent={"center"}>
              {renderVideoPreview()}
            </Flex>
            </>
        )}
      </div>
    </View>
  );
}