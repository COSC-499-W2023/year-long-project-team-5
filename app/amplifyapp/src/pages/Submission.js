import React, {  } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import {API } from 'aws-amplify';
import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
  } from '@aws-amplify/ui-react';
import {
  createUser as createUserMutation,
  createSubmission as createSubmissionMutation
} from "../graphql/mutations";

/**
 * Submission TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Submission></Submission>
 */
export function Submission(){
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
        const data = {
          adminId: "testadminID",
          submission: form.get("submission"),
          submissionUserId: userId
        };
        await API.graphql({
          query: createSubmissionMutation,
          variables: { input: data },
        });
        event.target.reset();
      }
    return(
        <View className="App">
        <Heading level={1}>Request a video</Heading>
        <View as="form" margin="3rem 0" onSubmit={createSubmission}>
          <Flex direction="row" justifyContent="center">
            <TextField
              name="email"
              placeholder="Recipient email"
              label="Submission Name"
              labelHidden
              variation="quiet"
              required
            />
            <TextField
              name="name"
              placeholder="Full name of recipient"
              label="Full Name"
              labelHidden
              variation="quiet"
              required
            />
            <TextField
              name="submission"
              placeholder="Instructions/submissions"
              label="Submission Description"
              labelHidden
              variation="quiet"
              required
            />
            <Button type="submit" variation="primary">
              Request Video
            </Button>
          </Flex>
        </View>
        </View>
    )
}