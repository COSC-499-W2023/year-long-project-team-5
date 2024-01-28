import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import VideoRecorder from "../my-components/VideoRecorder";
import Webcam from "react-webcam";
import {Amplify, Auth, API, Storage } from 'aws-amplify';

import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
    Card,
  } from '@aws-amplify/ui-react';

/**
 * Recording TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Recording></Recording>
 */
export function Recording(){
    return(
        <div className="App">
            <Flex direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
                <Card variation="elevated" margin={'2em'} width = "30%" textAlign={'left'} >
                    <p><b>Name:</b> John Doe</p>
                    <p><b>Requester:</b> Dr. Jim </p>
                    <p><b>Instructions:</b> Please take a video of the areas of your body affected by the rash.</p>
                </Card>
                <VideoRecorder/>
            </Flex>
        </div>
    )
}