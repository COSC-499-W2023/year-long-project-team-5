import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import {Amplify, Auth } from 'aws-amplify';
import { SubmissionRow } from "../my-components/SubmissionRow";
import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
    Card, 
    useTheme
  } from '@aws-amplify/ui-react';
  import { listNotes } from "../graphql/queries";
import {
  createVideo as createVideoMutation,
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

const client = generateClient();
export function Submission(){
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([])
    useEffect(() => {
      fetchNotes();
    }, []);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state variable

    async function fetchNotes() {
        const apiData = await client.graphql({ query: listNotes });
        const notesFromAPI = apiData.data.listNotes.items;
        await Promise.all(
          notesFromAPI.map(async (note) => {
            if (note.image) {
              const url = await getUrl({ key: note.name });
              note.image = url;
            }
            return note;
          })
        );
        setNotes(notesFromAPI);
        setFilteredNotes(notesFromAPI);
      }
      async function createNote(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = {
          videoURL: image.name,
        };
        if (!!data.image) await uploadData(image.name, image);
        await client.graphql({
          query: createVideoMutation,
          variables: { input: data },
        });
        fetchNotes();
        event.target.reset();
      }

      async function createUser(email,name) {
        const data = {
          email: email,
          name: name
        };
        return await client.graphql({
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
          note: form.get("note"),
          submissionUserId: userId
        };
        await client.graphql({
          query: createSubmissionMutation,
          variables: { input: data },
        });
        fetchNotes();
        event.target.reset();
        setIsFormSubmitted(true); // Set the form submission state to true

      }
      const { tokens } = useTheme();
    return(
        <View className="App">
        <Heading level={2}>Video Request</Heading>
        <View as="form" margin="2rem 3rem" alignContent = "center" onSubmit={createNote} padding={tokens.space.medium}>
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