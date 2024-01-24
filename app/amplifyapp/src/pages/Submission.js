import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { VideoRequestForm } from "../my-components/VideoRequest";
import { View } from "@aws-amplify/ui-react";

/**
 * Submission TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Submission></Submission>
 */
export const  Submission = () =>{
    return(
      <View className="App">
        <VideoRequestForm/>
      </View>
    )
}