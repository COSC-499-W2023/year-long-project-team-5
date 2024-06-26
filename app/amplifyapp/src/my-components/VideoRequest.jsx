import React, { useState, useRef } from "react";
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

import { RequestPreview } from "./RequestPreview";

export function VideoRequestForm({previewData, setPreviewData, isMobile = false}){
    
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 
  const [isFormWrong, setFormWrong] = useState(false);
  const [errorMessages, setErrorMessages] = useState(new Set());
  const [touchedFields, setTouchedFields] = useState(new Set());
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [mobileToSubmit, setMobileToSubmit] = useState(false);
  const formSubmitRef = useRef(null);

  const handleFieldEvent = (event, fieldType, eventAction) => {
    const fieldValue = event.target.value;
    const validateEmail = (emailInput) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(emailInput) && emailInput !== Auth.user.attributes.email;
    };
    const validateDescription = (description) => description.length >= 20;
    let newErrors = new Set(errorMessages);
    let newTouchedFields = new Set(touchedFields);

    const validationMap = {
      email: {
        validate: validateEmail,
        errorMessage: "Invalid email address. Emails addresses must: Exist and be valid, and not be the account's email"
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
      setPreviewData((currentPreviewData) => ({ ...currentPreviewData, [fieldType]: fieldValue }));
      if (newTouchedFields.has(fieldType)){
        updateErrors();
      }
    } else if (eventAction === 'blur') {
      newTouchedFields.add(fieldType);
      if (fieldValue === "") {
        newErrors.delete(errorMessage);
      } 
      updateErrors();
    }
    setErrorMessages(newErrors);
    setTouchedFields(newTouchedFields);
    setFormWrong(newErrors.size > 0);
  }
  
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
  

  const handleFormAction = async (event) => {
    if (event) {
      event.preventDefault();
    }
  
    if (isMobile) {
      if (showMobilePreview && mobileToSubmit) {
        await createSubmission();
        setShowMobilePreview(false); 
        setMobileToSubmit(false); 
      } else {
        if (isFormWrong) {
          setIsFormSubmitted(false);
          return;
        }
        setShowMobilePreview(true);
      }
    } else {
      await createSubmission();
    }
  };
  
  async function createSubmission(event){
    if (isFormWrong) {
      setIsFormSubmitted(false);
      return;
    }
    const formElement = formSubmitRef.current; 
    const form = new FormData(formElement);
    setIsFormSubmitted(false);
    setFormWrong(false);
    setErrorMessages([]);
    setIsSubmitting(true);
  
    try {
      const email = previewData.email
      const recipientName = previewData.recipientName
      const description = previewData.description
      const user = await createUser(email, recipientName);
      setSubmittedEmail(form.get("email")) 
      const userId = user.data.createUser.id
      const otp = await generateOTP()

      const data = {
        adminId: Auth.user.username,
        adminName: Auth.user.attributes.name,
        note: description,
        submissionUserId: userId,
        otpCode: otp
      };
      await API.graphql({
        query: createSubmissionMutation,
        variables: { input: data },
      });
      formElement.reset();
      setPreviewData({});
      setIsFormSubmitted(true);
      setTouchedFields(new Set());
      setErrorMessages(new Set());
    } catch (error) {
      console.log('error creating submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  }
    const cardStyle = {
      margin: '0 auto',
      padding: '20px',
      width: 'inherit',
      minHeight: 'inherit',
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
          return <Text as="p" variation="info" style={{wordWrap: 'break-word'}}>Sends an email with a one-time password to allow the recipient to record a video.<br/> {isMobile ?  "Email preview will be shown on the next page." : "Email will be sent as shown in the preview on the right."} </Text>;
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
          width={'100%'}
        >
          {messageContent()}
        </Alert>
      );
    }
    
    return (
      (isMobile && showMobilePreview) ?
      <Flex direction={'column'}>
        <RequestPreview previewData={previewData} />
        <Flex direction="row" justifyContent="space-between">
          <Button onClick={() => 
            setShowMobilePreview(false)
            } variation="secondary">Go back</Button>
          <Button onClick={async () => {
            setShowMobilePreview(false);
            await new Promise(resolve => setTimeout(resolve, 0));
            await createSubmission();
            setMobileToSubmit(false);
          }} variation="primary">Send Request</Button>

        </Flex>
      </Flex>
      :
      <Card as="form" ref={formSubmitRef} backgroundColor={tokens.colors.background.secondary} variation="elevated" onSubmit={handleFormAction} style={cardStyle}>
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
            onChange={(event) => handleFieldEvent(event, 'recipientName', 'change')}
            value={previewData.recipientName || ""}
            isDisabled={isSubmitting}
            required
          />
          <TextField
            name="email"
            placeholder="bilbobaggins@mordor.com"
            label="Recipient Email"
            type="email"
            required
            onBlur ={(event) => handleFieldEvent(event, 'email', 'blur')}
            onChange={(event) => handleFieldEvent(event, 'email', 'change')}
            value={previewData.email || ""}
            isDisabled={isSubmitting}
            hasError={isFormWrong && errorMessages.has("Invalid email address.")}
          />
          <TextAreaField
            name="description"
            placeholder="Instructions/notes"
            label="Video Instructions"
            inputStyles={{
              paddingBottom: "3em",
              wordWrap: "break-word",
            }}
            onBlur = {(event) => handleFieldEvent(event, 'description', 'blur')}
            onChange = {(event) => handleFieldEvent(event, 'description', 'change')}
            hasError = {isFormWrong && errorMessages.has("Description must be at least 20 characters.")}
            value={previewData.description || ""}
            isDisabled={isSubmitting}
            required
          />
          <Button type="submit" variation="primary" isDisabled={isSubmitting}>
            <Flex direction="row" alignItems = "center" gap="0.5em">
              {isMobile ? (isSubmitting ? <><Loader/>Sending...</> : "Preview Email") : (isSubmitting ? <><Loader/>Sending...</> : "Send Request")}
            </Flex>
          </Button>
        </Flex>
      </Card> 
    )
} export default VideoRequestForm;
