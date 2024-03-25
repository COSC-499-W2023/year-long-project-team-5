import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import {API, Auth, Amplify } from 'aws-amplify';
import {
    Button,
    Flex,
    TextField,
    Card, 
    useTheme,
    Alert,
    TextAreaField,
    Text,
    Loader
  } from '@aws-amplify/ui-react';
import { getSubmissionByOTP } from "../Helpers/Getters"

import {
  createUser as createUserMutation,
  createSubmission as createSubmissionMutation
} from "../graphql/mutations";

import {debounce} from 'lodash';

export function VideoRequestForm({previewData, setPreviewData, isMobile = false}){
    
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 
  const [isFormWrong, setFormWrong] = useState(false);
  const [errorMessages, setErrorMessages] = useState(new Set());
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const showMobilePreview = (previewData) => {
   console.log(previewData);
  }
  const handleFieldEvent = (event, fieldType, eventAction) => {
    const fieldValue = event.target.value;
    const validateEmail = (emailInput) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(emailInput);
    };
    const validateDescription = (description) => description.length >= 20;
    let newErrors = new Set(errorMessages);
    const validationMap = {
      email: {
        validate: validateEmail,
        errorMessage: "Invalid email address."
      },
      description: {
        validate: validateDescription,
        errorMessage: "Description must be at least 20 characters."
      },
      recipientName: {
        validate: (name) => name.length > 0,
        errorMessage: "Recipient name is required."
      }
    };
    const { validate, errorMessage } = validationMap[fieldType];
    const updateErrors = () => {
      if (validate(fieldValue)) {
        newErrors.delete(errorMessage);
      } else {
        newErrors.add(errorMessage);
      }
    };
      if (eventAction === 'change') {
      setPreviewData({ ...previewData, [fieldType]: fieldValue });
    } else if (eventAction === 'blur') {
      if (fieldValue === "") {
        newErrors.delete(errorMessage);
      } else {
        updateErrors();
      }
    }
    setErrorMessages(newErrors);
    setFormWrong(newErrors.size > 0);
  }
  
  const debounceHandleFieldEvent = debounce((event, fieldType, eventAction) => {
    handleFieldEvent(event, fieldType, eventAction);
  }, 50);


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
    if (isFormWrong){
      setIsFormSubmitted(false);
      return
    }
    setIsSubmitting(true);
    const form = new FormData(event.target);
    setIsFormSubmitted(false);
    setFormWrong(false);
    setErrorMessages([]);

    try {
      const user = await createUser(form.get("email"),form.get("recipientName"));
      setSubmittedEmail(form.get("email")) 
      const userId = user.data.createUser.id
      const otp = await generateOTP()

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
      setIsFormSubmitted(true);
    } catch (error) {
      console.log('error creating submission:', error);
    } finally {
      setIsSubmitting(false);
    }
    // Set the form submission state to true
  }
    const cardStyle = {
      width: '100%',
      margin: '0 auto',
      padding: '20px',
      maxWidth: '600px',
    };
    const { tokens } = useTheme();

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

    const renderMessages = () => {
      const errorHeading = errorMessages.size > 1 ? `There are ${errorMessages.size} issues` : 'Uh oh.';     
      const defaultHeading = 'Video Request Form';
      const headingToDisplay = isFormWrong ? errorHeading : defaultHeading;
      const className = isFormWrong ?  "errorFeedback" : "infoFeedback";
      const variation = isFormWrong ?  "error" : "info";
    
      const messageContent = () => {
        if (isFormWrong) {
          return Array.from(errorMessages).map((message, index) => (
            <Text as="p" variation="error" key={index}>{errorMessages.size > 1 ? `${index + 1}. ${message}` : message}</Text>
          ));
        } else {
          return <Text as="p" variation="info">Sends an email with OTP to record a video. <br/> {isMobile ?  "Email preview will be shown once you click 'Send Request'" : "As shown in the preview on the right."} </Text>;
        }
      };
    
      return (
        <Alert
          className={className}
          textAlign="left"
          variation={variation}
          hasIcon={true}
          heading={headingToDisplay}
          marginBottom={'.5em'}
          minHeight={'6em'}
          minWidth={'500px'}
        >
          {messageContent()}
        </Alert>
      );
    }
    
    return (
      <Card as="form" backgroundColor={tokens.colors.background.secondary} variation="elevated" onSubmit={isMobile ? showMobilePreview : createSubmission} style={cardStyle} minHeight={'inherit'}>
        {isFormSubmitted && (
          <Alert className="successFeedback" textAlign ='left' variation="success" isDismissible={true} hasIcon={true} heading="Email Sent" marginBottom={'.5em'}>
            Your video request to {submittedEmail} has been sent!
          </Alert>
        )}
        {renderMessages()} 
        <Flex direction="column" justifyContent = "center" textAlign = "left" gap='2em'>
          <TextField
            name="recipientName"
            placeholder="Bilbo Baggins"
            label="Recipient Name"
            onChange={(event) => debounceHandleFieldEvent(event, 'recipientName', 'change')}
            required
          />
          <TextField
            name="email"
            placeholder="bilbobaggins@mordor.com"
            label="Recipient Email"
            type="email"
            required
            onBlur ={(event) => handleFieldEvent(event, 'email', 'blur')}
            onChange={(event) => debounceHandleFieldEvent(event, 'email', 'change')}
            hasError={isFormWrong && errorMessages.has("Invalid email address.")}
          />
          <TextAreaField
            name="description"
            placeholder="Instructions/notes"
            label="Video Instructions"
            inputStyles={{
              paddingBottom: "3em",
            }}
            onBlur = {(event) => handleFieldEvent(event, 'description', 'blur')}
            onChange = {(event) => debounceHandleFieldEvent(event, 'description', 'change')}
            hasError = {isFormWrong && errorMessages.has("Description must be at least 20 characters.")}
            required
          />
          <Button type="submit" variation="primary" isDisabled={isSubmitting}>
            <Flex direction="row" alignItems = "center" gap="0.5em">
              {isMobile ? "Preview Email" : (isSubmitting ? <><Loader/>Sending...</> : "Send Request")}
            </Flex>
          </Button>
        </Flex>
      </Card>
    )
} export default VideoRequestForm;
