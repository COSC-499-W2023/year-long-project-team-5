import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import VideoRecorder from "../my-components/VideoRecorder";

import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
    Card,
    Text,
    Divider
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
        </div>
    )
}