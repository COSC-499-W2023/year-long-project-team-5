import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import {API, Storage, Auth, Amplify } from 'aws-amplify';
import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
    Card, 
    useTheme
  } from '@aws-amplify/ui-react';
import { listSubmissions } from "../graphql/queries";
import { getSubmissionByOTP } from "../Helpers/Getters"

import {
  createVideo as createVideoMutation,
  createUser as createUserMutation,
  createSubmission as createSubmissionMutation
} from "../graphql/mutations";
export function VideoRequestForm(){
    
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state variable
    
    async function createUser(email,name) {
      const data = {
        email: email,
        name: name
      };
      return await API.graphql({
        query: createUserMutation,
        variables: { input: data },
      });
    }

    async function createSubmission(event){
      event.preventDefault();
      const form = new FormData(event.target);
      let user = await createUser(form.get("email"),form.get("name"));
      let userId = user.data.createUser.id
      let otp = await generateOTP()

      const data = {
        adminId: Auth.user.username,
        adminName: Auth.user.attributes.name,
        note: form.get("description"),
        submissionUserId: userId,
        otpCode: otp
      };
      await API.graphql({
        query: createSubmissionMutation,
        variables: { input: data },
      });
      event.target.reset();
      setIsFormSubmitted(true); // Set the form submission state to true
    }

    // these states and functions below are to help dynamically adjust the width of the parent Card component (i.e the form)
    // depending on browser width, takes less % of screen width if screen is large, and greater % when mobile.
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
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function generateOTP() {
      //Some gross config code for the generation API since v5 sucks:(
      Amplify.configure({
        API: {
          endpoints: [
            {
              name: 'OTP API',
              endpoint: 'https://bl8n32nbn5.execute-api.ca-central-1.amazonaws.com/otp_test'
            }
          ]
        }
      });
      let tempOTP = ['null']
      let dataJSON = ''
      do {
        let data = await API.post('OTP API', '/generate', {})
        dataJSON = JSON.parse(data.body);
        //Search and thus compare OTP against database
        tempOTP = await getSubmissionByOTP(dataJSON.otp);
        //keep looping if comparison comes back with a results
      } while (tempOTP.length !== 0)

      return(dataJSON.otp);
    }

    return (
      // hardcoding the widths and heights was causing previous clipping 
      // this form should have multiple breakpoints for its width: mobile & large screens
      // this form IS NOT VALIDATED!! needs testing!
      <Card as="form" backgroundColor={tokens.colors.background.secondary} variation="elevated" onSubmit={createSubmission} style={cardStyle}>
        <Flex direction="column" justifyContent = "center" textAlign = "left" gap='2em'>
          <TextField
            name="name"
            placeholder="Bilbo Baggins"
            label="Recipient Name"
            required
          />
          <TextField
            name="email"
            placeholder="bilbobaggins@mordor.com"
            label="Recipient Email"
            required
          />
          <TextField
            name="description"
            placeholder="Instructions/notes"
            label="Video Instructions"
            inputStyles={{
              paddingBottom: "5em",
            }}
            required
          />
        <Button type="submit" variation="primary">Request Video </Button>
        </Flex>
      </Card>
    )
} export default VideoRequestForm;
