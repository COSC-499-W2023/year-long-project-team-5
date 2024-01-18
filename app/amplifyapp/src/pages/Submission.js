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
    useTheme,
    Card
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

      const { tokens } = useTheme();

    return(
        <View className="App">
        <Heading level={2}>Video Request</Heading>
        <View as="form" margin="2rem 3rem" alignContent = "center" onSubmit={createSubmission} padding={tokens.space.medium}>
          <Flex alignItems="center" justifyContent="center" height="50vh">
            <Card variation="elevated" width="30em" padding='1em'>
              <Flex direction="column" justifyContent = "center" textAlign = "left" gap='2em' padding='1em'>
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
          </Flex>
        </View>
          
       {/* Will enable popup once submission code is finalized
      <Popup open={isFormSubmitted} modal closeOnDocumentClick>
        <View>
          <Heading level={2}>Success!</Heading>
          <p>Your form was successfully submitted.</p>
          <Button onClick={() => setIsFormSubmitted(false)}>Close</Button>
        </View>
      </Popup>
    */} 
    </View>

)
}