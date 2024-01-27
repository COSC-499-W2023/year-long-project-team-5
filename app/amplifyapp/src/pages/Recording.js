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
        <div>
            <div>
                <h1>Video Recording</h1>
                <VideoRecorder/>
            </div>
        </div>
    )
}