import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

export function Confirmation(){
   return( 
   <view className="App">
    <h1>Thank you for your submission!</h1>
    <p>You can now safely close this browser</p>
    </view>
   )
}