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
import "./VideoRecorder.css"
import {clsx} from "clsx";

export default function WebcamVideo() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [isCamReady, setCamReady] = useState(false);
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false); //state variable to track if the recorded video is fully loaded and ready to upload
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [videoConstraints, setVideoConstraints] = useState({
    width: isMobile && 480,
    height: isMobile && 360,
    facingMode: "user",
  });
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      setVideoConstraints({
        width: mobile ? 480 : 800,
        height: mobile ? 360 : 480,
        facingMode: "user",
      });
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  // this useEffect checks to see if there's a video recorded and it's not currently recording (i.e time to show preview)
  useEffect(() => {
    if (recordedChunks.length > 0 && !capturing) {
      const blob = isMobile
  ? new Blob(recordedChunks, { type: "video/mp4" })
  : new Blob(recordedChunks, { type: "video/webm" });
       
      const url = URL.createObjectURL(blob);
      setVideoPreviewUrl(url);
    }
  }, [recordedChunks, capturing, isMobile]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setVideoPreviewUrl(null);
    try{
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    }
    catch{
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/mp4",
      });
    }
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = isMobile
  ? new Blob(recordedChunks, { type: "video/mp4" })
  : new Blob(recordedChunks, { type: "video/webm" });
       
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      {isMobile ? (a.download = "react-webcam-stream-capture.mp4"): (a.download = "react-webcam-stream-capture.webm")}
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks, isMobile]);

  //check that the video is fully loaded and processed before attempting upload
  useEffect(() => {
    const videoElement = webcamRef.current.video;
    const handleCanPlayThrough = () => {
      // Video is fully loaded
      setVideoLoaded(true);
    };
    videoElement.addEventListener('canplaythrough', handleCanPlayThrough);
    return () => {
      videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);
 
  const handleUpload= useCallback(async () => {
      if (recordedChunks.length && videoLoaded) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      const randNum = parseInt(Math.random() * 10000000);
      const videoNameS3 = "video" + randNum + ".webm";
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
  }, [recordedChunks, navigate, videoLoaded]);

  // so the react web cam has a prop, onUserMedia. 
  // This prop accepts functions to perform only when video stream is established
  // so I created handleUserMedia function which has a .5 sec delay and then sets the boolean (state) to true
  // so Record button can render.
  const handleUserMedia = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    setCamReady(true)
   }
 
  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      setVideoLoaded(false);
    };
  }, []);

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

  return (
    <View>
      <Flex justifyContent={"center"}>
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
            className = {clsx('webcam', { 'mobile-webcam': isMobile })}
            muted={true}
            audio={true}
            mirrored={true}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            onUserMedia={handleUserMedia} // this prop performs a function only when the video stream is established.
            />
          </View> 
          {capturing ? (
            <Button onTouchStart = {handleStopCaptureClick} onClick={handleStopCaptureClick} variation='warning' minWidth={"100%"}><FaCircleStop style={{ marginRight: '4px', color: 'red' }}/> Finish</Button>
            ) : recordedChunks.length === 0 && isCamReady? (
              <Button onClick={handleStartCaptureClick} variation='outline' minWidth={'100%'}><BsFillRecordFill style={{ marginRight: '4px', color: 'red'}}/> Record</Button>
            ) : null}
        </Card>
        }
      </Flex>
    </View>
  );
}