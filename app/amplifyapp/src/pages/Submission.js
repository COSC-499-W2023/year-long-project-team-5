import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { VideoRequestForm } from "../my-components/VideoRequest";
import { View, Heading, useTheme } from "@aws-amplify/ui-react";

/**
 * Submission TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Submission></Submission>
 */

export const  Submission = () =>{
  const {tokens} = useTheme();
    return(
      <View className="App">
        <Heading level={2}>Request Video</Heading>
        <View padding={tokens.space.xxxl}>
          <VideoRequestForm/>
        </View>
      </View>
    )
}