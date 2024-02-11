import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import {API, Storage, Auth} from 'aws-amplify';
import VideoRecorder from "../my-components/VideoRecorder";

import {
    Button,
    Flex,
    Input,
    View,
    Heading,
    Card,
    Text,
    Divider,
    useTheme
  } from '@aws-amplify/ui-react';

/**
 * Recording TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Recording></Recording>
 */

export function Recording(){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const resizeCenterComps = (windowWidth) => {
      return {
          width: (windowWidth > 1024) ? '50%' : (windowWidth > 600) ? '80%' : '100%',
          margin: '0 auto',
          padding: '20px',
          maxWidth: '800px', // You can adjust this value
      };
    }; 
    const cardStyle = resizeCenterComps(windowWidth);
    const { tokens } = useTheme();
    const [isAuthCodeGiven, setIsAuthCodeGiven] = useState(false);
    const [value, setValue] = useState('');

    //This function removes non-digit characters and limits input to 5 digits
    const handleChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        if (inputValue.length <= 5) {
          setValue(inputValue);
        }
      };

    //This call to the backend to validate an OTP
    async function validateOTP(event){
        event.preventDefault();
        const form = new FormData(event.target);
        let unValidatedOTP = form.get("code");

        
    }

    function renderRecordingPage(){
        if(!isAuthCodeGiven) {
            return(
                <Flex justifyContent = "center" alignContent={"center"}>
                    <Card as="form" backgroundColor={tokens.colors.background.secondary} variation="elevated" onSubmit={validateOTP} style={cardStyle}>
                        <Flex justifyContent = "center" textAlign = "left" gap='2em'>
                            <Heading>Please enter your unique code given by the one requesting the video</Heading>
                            <Input
                                width={'6em'}
                                name="code"
                                type="text"
                                placeholder="_ _ _ _ _"
                                label="Unique Code:"
                                onChange={handleChange}
                                value={value}
                                required
                            />
                            <Button type="submit" variation="primary">Submit</Button>
                        </Flex>
                    </Card>
                </Flex>
            )
        } else {
            return(
                <Flex direction='column' alignItems={'center'} justifyContent={'space-evenly'}>
                    <Card variation="elevated" backgroundColor={'background.secondary'} margin={'2em'} padding={'2em 3em'} textAlign={'left'} >
                        <Flex direction="row" justifyContent='space-between'>
                            <Text> <b>To:</b> John Doe</Text>
                            <Text> <b>From:</b> Dr. Jim </Text>
                        </Flex>
                        <Divider orientation="horizontal" marginBottom={'0.5em'}/>
                        <Flex direction="column">
                            <Text> <b>Instructions:</b></Text>
                            <Text> Please take a video of the areas of your body affected by the rash.</Text>
                        </Flex>
                    </Card> 
                    <VideoRecorder/>
                </Flex>
            )
        }
    }

    return(
        <View className="App">
            {renderRecordingPage()}
        </View>
    )
}