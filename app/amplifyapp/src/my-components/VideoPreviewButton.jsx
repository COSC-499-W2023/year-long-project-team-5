import React, { useState } from "react";
import { Button, View, Flex, Card, Heading, Text } from "@aws-amplify/ui-react";
import "./overlay.css"
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaVideo } from "react-icons/fa";

export const VideoPreviewButton = ({ videoUrl, name, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openVideo = () => {
    setIsOpen(true);
  };

  const closeVideo = () => {
    setIsOpen(false);
  };

  const handleDownload = () => {
    fetch(videoUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
  };

  return (
    <View width='100%'>
        <Button variation="primary" width='100%' onClick={openVideo} cursor='pointer'>
          <FaVideo style={{marginRight: "4px"}}/> Video
        </Button>
        {isOpen && (
          <Flex id="overlay" justifyContent="center" alignItems="center">
            <Card>
              <Flex justifyContent="space-between" wrap="wrap">
                <Heading level={3}>{name}</Heading>
                <IoMdCloseCircleOutline cursor='pointer' size='4%' onClick={closeVideo}/>
              </Flex>
              <Text>{description}</Text>
              <Flex direction = 'column' justifyContent={'center'} alignItems={'center'}>
              <video controls width = {720} height = {480}>
                <source src={videoUrl} type="video/webm" />
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Button width = '25%' onClick = {handleDownload}>Download Video</Button>
              </Flex>
            </Card>
          </Flex>
        )}
  </View>
  );
};
