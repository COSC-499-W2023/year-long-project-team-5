import React, { useState } from "react";
import { Button, View, Flex, Card, Heading, Text } from "@aws-amplify/ui-react";
import "./VideoPreviewButton.css"
import { IoMdCloseCircleOutline } from "react-icons/io";

export const VideoPreviewButton = ({ videoUrl, name, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openVideo = () => {
    setIsOpen(true);
  };

  const closeVideo = () => {
    setIsOpen(false);
  };

  const handleDownload = () => {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = videoUrl;
      a.download = "react-webcam-stream-capture.mp4";
      a.click();
    };

  return (
    <View>
        <Button variation="primary" size='small' width='100%' onClick={openVideo} cursor='pointer'>Video</Button>
        {isOpen && (
          <Flex id="overlay" justifyContent="center" alignItems="center">
            <Card>
              <Flex justifyContent="space-between" wrap="wrap">
                <Heading level={3}>{name}</Heading>
                <IoMdCloseCircleOutline cursor='pointer' size='4%' onClick={closeVideo}/>
              </Flex>
              <Text>{description}</Text>
              <Flex direction = 'column'>
              <video controls width = {720} height = {480}>
                <source src={videoUrl} type="video/webm" />
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Button onClick = {handleDownload}>Download Video</Button>
              </Flex>
            </Card>
          </Flex>
        )}
  </View>
  );
};
