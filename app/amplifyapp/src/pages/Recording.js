import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import VideoRecorder from "../my-components/VideoRecorder";
import { getSubmissionByOTP, getUserByID } from "../Helpers/Getters";

import {
    Flex,
    Input,
    View,
    Heading,
    Card,
    Text,
    Divider,
    useTheme,
    Alert, 
    Button
  } from '@aws-amplify/ui-react';

/**
 * Recording TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Recording></Recording>
 */

export function Recording(){
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    const { tokens } = useTheme();
    const [isAuthCodeGiven, setIsAuthCodeGiven] = useState(false);
    const [value, setValue] = useState('');
    const [userData, setUserData] = useState([]);
    const [submissionData, setSubmissionData] = useState([]);
    const [errorCode, setErrorCode] = useState(false);

    document.title = "Blur | Secure Video Software";

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    //This function removes non-digit characters and limits input to 5 digits
    const handleChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        if (inputValue.length <= 7) {
          setValue(inputValue);
        }
      };

    //This is a call to the backend to validate an OTP and sets session data for user and submission
    async function checkOTP(event){
        event.preventDefault();
        const form = new FormData(event.target);
        let unValidatedOTP = form.get("code");

        let data = await getSubmissionByOTP(unValidatedOTP);
        if (data.length === 0 || unValidatedOTP.length < 7) {
            setErrorCode(true);
            event.target.reset();
            return
        } else {
            setErrorCode(false);
            setSubmissionData(data[0]);
            let queriedUserData = await getUserByID(data[0].submissionUserId);
            setUserData(queriedUserData);
            setIsAuthCodeGiven(true);
        }
    }

    function renderRecordingPage(){
        if(!isAuthCodeGiven) {
            return(
                <Flex direction = "column" alignItems = "center" justifyContent = "center" height = "100%">
                    <Flex height="25vh"> 
                        {errorCode && (
                            <Alert textAlign ='left' height = "10vh" width = "20em" variation="error" hasIcon={true} heading="Uh oh." marginBottom={'.5em'}>
                                Invalid code! Please try again.
                            </Alert>
                        )}
                    </Flex>
                    <Card as="form" backgroundColor={tokens.colors.background.secondary} variation="elevated" onSubmit={checkOTP}>
                        <Flex direction={isMobile && "column"} justifyContent = "center" textAlign = "left" gap='2em' alignItems={'center'}>
                            <Heading width={isMobile ? "100%" : "55%"}>Please enter your unique seven digit code.</Heading>
                            <Input
                                width={isMobile ? "100%" : "20%"}
                                name="code"
                                type="text"
                                textAlign='center'
                                placeholder="_ _ _ _ _ _ _"
                                label="Unique Code:"
                                onChange={handleChange}
                                value={value}
                                required
                            />
                            <Button type="submit" width={isMobile ? "100%" : "25%"} variation="primary">Submit</Button>
                        </Flex>
                    </Card>
                </Flex>
            )
        } else {
            return(
                <Flex direction='column' alignItems={'center'} justifyContent={'space-evenly'}>
                    <Card variation="elevated" backgroundColor={'background.secondary'} margin={'2em'} padding={'2em 3em'} textAlign={'left'} >
                        <Flex direction="row" justifyContent='space-between'>
                            <Text><b>To: </b> { userData.name } </Text>
                            <Text><b>From: </b> { submissionData.adminName }</Text>
                        </Flex>
                        <Divider orientation="horizontal" marginBottom={'0.5em'}/>
                        <Flex direction="column">
                            <Text> <b>Instructions:</b></Text>
                            <Text>{submissionData.note}</Text>
                        </Flex>
                    </Card> 
                    <VideoRecorder submissionData={submissionData}/>
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