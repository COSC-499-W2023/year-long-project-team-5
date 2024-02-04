import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Flex, View, Button, Heading, Card, Divider, ButtonGroup } from "@aws-amplify/ui-react";

import {Amplify, Auth, API, Storage } from 'aws-amplify';
import { BsFillRecordFill } from "react-icons/bs";
import { MdDownloadForOffline } from "react-icons/md";
import { FaRedoAlt } from "react-icons/fa";
import { RiVideoUploadFill } from "react-icons/ri";
import { FaCircleStop } from "react-icons/fa6";
import {
  createVideo as createVideoMutation
} from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

export default function WebcamVideo() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  
  useEffect(() => {
    if (recordedChunks.length > 0 && !capturing) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      setVideoPreviewUrl(url);
    }
  }, [recordedChunks, capturing]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

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
      
      try {
        await Storage.put(videoNameS3, blob); // store video in s3 bucket under the key
        await API.graphql({ // store the key for the video in DynamoDB
          query: createVideoMutation,
          variables: { input: data },
        });

        setRecordedChunks([]);
        
        // Redirect to another page after successful upload
        navigate('/confirmation');
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } 
  }, [recordedChunks]);

  const handleRetakeClick = useCallback(() => {
    setRecordedChunks([]); // Reset recorded chunks when retaking the video
    
  }, [setRecordedChunks]);

  const renderVideoPreview = () => {
    if(videoPreviewUrl) {
      return (
        <div>
          <video controls width = {620} height = {480} src = {videoPreviewUrl} />
        </div>
      );
    }
    return null;
  };

  const videoConstraints = {
    width: 720,
    height: 480,
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
    padding: 0px;
  }`:
  `.recorder {
    padding: 0px;
    border-radius: 8px;
  }`;
  return (
    <View>
      <Flex justifyContent={"center"}>
        <style>{styles}</style>
        {recordedChunks.length > 0 ? (
            <Card backgroundColor={'background.secondary'} padding={'1em 2em'} variation="elevated">
              <Heading level={3} textAlign={'left'}>Preview</Heading>
              <Divider orientation="horizontal" marginBottom={'0.5em'}/>
              <div justifyContent={"center"}>
                {renderVideoPreview()}
              </div>
              <Flex justifyContent={"space-evenly"} marginTop={'0.5em'}>
                <ButtonGroup size="small">
                  <Button onClick={handleDownload}> <MdDownloadForOffline style={{marginRight: '4px'}}/> Download</Button>
                  <Button onClick={handleUpload}> <RiVideoUploadFill style={{marginRight: '4px'}}/>Submit</Button>
                  <Button onClick={handleRetakeClick }> <FaRedoAlt style={{marginRight: '4px'}}/> Retake</Button>
                </ButtonGroup>
              </Flex>
            </Card>
        ):
        <Card backgroundColor={'background.secondary'} padding={'1em 2em'} variation="elevated">
          {capturing ? 
              (<Heading level={3} textAlign={'left'}> Recording...</Heading>)
            : ( <Heading level={3} textAlign={'left'}>Record video</Heading>)
          }
          
          <Divider orientation="horizontal"/>
          <View marginTop={'1em'}>
            <Webcam
            className="recorder"
            muted={true}
            audio={true}
            mirrored={true}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            />
          </View> 
          {capturing ? (
            <Button onClick={handleStopCaptureClick} variation='warning' minWidth={"100%"}><FaCircleStop style={{ marginRight: '4px', color: 'red' }}/> Finish</Button>
            ) : recordedChunks.length === 0 ? (
              <Button onClick={handleStartCaptureClick} variation='outline' minWidth={'100%'}><BsFillRecordFill style={{ marginRight: '4px', color: 'red'}}/> Record</Button>
            ) : null}
        </Card>
        }
      </Flex>
    </View>
  );
}