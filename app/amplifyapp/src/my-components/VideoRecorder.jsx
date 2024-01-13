import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

import {Amplify, Auth, API, Storage } from 'aws-amplify';

import {
  createVideo as createVideoMutation
} from "../graphql/mutations";

export default function WebcamVideo() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

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
      const name = "video" + randNum + ".webm";
      console.log(randNum)
      const data = {
        videoURL: name, // name is the key (not the url) for the s3 bucket, get video URL with Storage.get(name)
      };
      
      await Storage.put(name, blob); // store video in s3 bucket under the key
      await API.graphql({ //store the key for the video in DynamoDB
        query: createVideoMutation,
        variables: { input: data },
      });
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const videoConstraints = {
    width: 5,
    height: 5,
    facingMode: "user",
  };

  return (
    <div className="Container">
      <Webcam
        height={360}
        width={640}
        audio={true}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      <div>
        {capturing ? (
            <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
            <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
            <button onClick={handleDownload}>Download</button>
        )}
        {recordedChunks.length > 0 && (
            <button onClick={handleUpload}>Upload</button>
        )}
      </div>
    </div>
  );
}