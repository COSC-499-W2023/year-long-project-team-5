import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Flex, View, Button, Heading, Card, Divider, ButtonGroup, SwitchField } from "@aws-amplify/ui-react";

import { API, Storage } from 'aws-amplify';
import { BsFillRecordFill, BsInfoCircle } from "react-icons/bs";
import { MdDownloadForOffline } from "react-icons/md";
import { FaRedoAlt } from "react-icons/fa";
import { RiVideoUploadFill } from "react-icons/ri";
import { FaCircleStop } from "react-icons/fa6";
import { ToolTip } from './ToolTip';
import {
  createVideo as createVideoMutation,
  updateSubmission as updateSubmissionMutation
} from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import "./VideoRecorder.css"
import {clsx} from "clsx";
import { getSupportedMimeTypes, getFileExtensionForMimeType } from "../Helpers/Other";

const bestMimeType = getSupportedMimeTypes("video")[0];
const fileExt = getFileExtensionForMimeType(bestMimeType);

export default function WebcamVideo(props) {
  
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
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingIntervalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      setVideoConstraints({
        width: mobile && 480,
        height: mobile && 360,
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
  : new Blob(recordedChunks, { type: bestMimeType });
       
      const url = URL.createObjectURL(blob);
      setVideoPreviewUrl(url);
    }
  }, [recordedChunks, capturing, isMobile]);
  

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    clearInterval(recordingIntervalRef.current);
  }, [mediaRecorderRef, setCapturing]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setVideoPreviewUrl(null);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);  
    try{
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: bestMimeType
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

  const formatRecordingTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };  

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = isMobile
  ? new Blob(recordedChunks, { type: "video/mp4" })
  : new Blob(recordedChunks, { type: bestMimeType });
       
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      isMobile ? (a.download = "react-webcam-stream-capture.mp4"): (a.download = "react-webcam-stream-capture" + fileExt)
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
 
  const handleUpload = useCallback( async () => {
      const submissionId = props.submissionData.id
      let videoId;
      if (recordedChunks.length && videoLoaded) {
      const blob = new Blob(recordedChunks, {
        type: bestMimeType,
      });

      //UPLOAD VIDEO TO S3 DB, also make a entry in  the graphql videos table
      const randNum = parseInt(Math.random() * 10000000);
      const videoNameS3 = "video" + randNum + fileExt;
      const data = {
        videoURL: videoNameS3, // videoNameS3 is the key (not the url) for the s3 bucket, get video URL with Storage.get(name)
      };
      
      try {
        await Storage.put(videoNameS3, blob); // store video in s3 bucket under the key
        const result_video = await API.graphql({ // store the key for the video in DynamoDB
          query: createVideoMutation,
          variables: { input: data },
          authMode: "API_KEY"
        });
        videoId = result_video.data.createVideo.id;

        setRecordedChunks([]);
        
        // Redirect to another page after successful upload
        navigate('/confirmation');
      } catch (error) {
        console.error("Error uploading video: ", error);
      }

      // now we want to associate the video with the submission
      const data2 = {
        id: submissionId,
        submissionVideoId: videoId,
        otpCode: 0,
        submittedAt: new Date().toISOString(),
      };

      try {
        await API.graphql({
          query: updateSubmissionMutation,
          variables: { input: data2 },
          authMode: "API_KEY"
        });
      } catch(error){
        console.error("Error associating video with submission:", error);
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
          <video controls className={"responsive-video"} src = {videoPreviewUrl} />
        </div>
      );
    }
    return null;
  };

  return (
    <View>
      <Flex justifyContent={"center"} marginBottom={'1em'}>
        {recordedChunks.length > 0 ? (
            <Card backgroundColor={'background.secondary'} padding={'1em 1em'} variation="elevated">
              <Heading level={3} textAlign={'left'}>Preview <ToolTip text = "Please note that once you submit your video, you will no longer have access to it. If you would like a copy for your records please download your video BEFORE submitting."><BsInfoCircle style = {{width:'50%'}}/></ToolTip></Heading>
              <Divider orientation="horizontal" marginBottom={'0.5em'}/>
              <div>
                {renderVideoPreview()}
              </div>
              <Flex justifyContent={"space-evenly"} marginTop={'0.5em'}>
                <ButtonGroup size="small">
                  <Button className = "retakeButton" onClick={handleRetakeClick }> <FaRedoAlt style={{marginRight: '4px'}}/> Retake</Button>
                  <Button className = "downloadButton" onClick={handleDownload}> <MdDownloadForOffline style={{marginRight: '4px'}}/> Download</Button>
                  <Button className = "submitButton" onClick={handleUpload}> <RiVideoUploadFill style={{marginRight: '4px'}}/>Submit</Button>
                  <SwitchField label="Enable Face Blurring"/>
                </ButtonGroup>
              </Flex>
            </Card>
        ):
        <Card backgroundColor={'background.secondary'} padding={'1em 1em'} variation="elevated">
          {capturing ? 
              (
              <Flex direction={'row'} justifyContent={'space-between'}>
                <Heading level={3} textAlign={'left'}>Recording...</Heading>
              </Flex>)
            : ( <Heading level={3} textAlign={'left'}>Record video<ToolTip text = "Start recording your video at anytime. Once you have finished recording you will have the opportunity to: review your video, retake, download, and then submit."><BsInfoCircle style = {{width:'50%'}}/></ToolTip></Heading>)
          }
          
          <Divider orientation="horizontal"/>
          <View marginTop={'1em'} className="recordingOverlayContainer">
            <Flex className={clsx("recordingOverlay", { "hidden": !capturing })}  direction={'row'}>
                    <div className="recordingDotContainer">
                      <div className="recordingDot"></div>
                    </div>
                    <div className="recordingTimerText">{formatRecordingTime(recordingTime)}</div>
            </Flex>
            <Webcam
            className = {clsx( { 'mobile-webcam' : isMobile }, { 'webcam': !isMobile }, { "recorderOn": capturing }, { "recorderOff": !capturing })}
            muted={true}
            audio={true}
            mirrored={true}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            onUserMedia={handleUserMedia} // this prop performs a function only when the video stream is established.
            />
          </View> 
          {capturing ? (
            <Button className = "stopButton" onTouchStart = {handleStopCaptureClick} onClick={handleStopCaptureClick} variation='warning' minWidth={"100%"}><FaCircleStop style={{ marginRight: '4px', color: 'red' }}/> Finish</Button>
            ) : recordedChunks.length === 0 && isCamReady? (
              <Button className = "recordButton" onClick = {handleStartCaptureClick} variation='outline' minWidth={'100%'}><BsFillRecordFill style={{ marginRight: '4px', color: 'red'}}/> Record</Button>
            ) : null}
        </Card>
        }
      </Flex>
    </View>
  );
}