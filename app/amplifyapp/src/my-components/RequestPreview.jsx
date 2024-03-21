import React from 'react';
import {View, Button, useAuthenticator } from '@aws-amplify/ui-react'
import "./RequestPreview.css"


export const RequestPreview = ({previewData}) => {
  let {recipientName, description} = previewData;
  const {user} = useAuthenticator((context) => [
    context.user,
  ]);
  return (
      <View className={"body"} textAlign={"left"} backgroundColor={"white"} borderRadius={"8px"} padding={"4%"} minHeight={'inherit'} boxShadow={"0px 2px 6px hsla(210, 50%, 10%, 0.15)"}> 
        <div className="container">
          <p>Hello <span id="recipientName">{recipientName}</span>,</p>
          <p><span id="adminName">{user.attributes.name}</span> has requested you record a video to send them. These are the notes they left:</p>
          <div className="notes" id="adminNote">{description}</div>
          <p>Your verification code for entering the platform is</p>
          <div className="code">#######</div>
          <div className="center-button">
            <Button className="record-button" disabled>
              <span style={{ color: '#ffffff', fontWeight: 'bolder' }}>Record Video</span>
            </Button>
          </div>
          <div className="footer">
            <img src="https://i.imgur.com/ZXQ4FTp.gif" alt="Blur Logo" width='100' height='50' />
            <br />
            &copy; 2023 Blur. All rights reserved.
          </div>
        </div>
    </View>
  );};

