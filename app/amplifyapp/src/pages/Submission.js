import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import {Amplify, Auth, API, Storage } from 'aws-amplify';
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
export function Submission(){
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([])
    useEffect(() => {
      fetchNotes();
    }, []);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state variable

    async function fetchNotes() {
        const apiData = await API.graphql({ query: listNotes });
        const notesFromAPI = apiData.data.listNotes.items;
        await Promise.all(
          notesFromAPI.map(async (note) => {
            if (note.image) {
              const url = await Storage.get(note.name);
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
        if (!!data.image) await Storage.put(image.name, image);
        await API.graphql({
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
          note: form.get("note"),
          submissionUserId: userId
        };
        await API.graphql({
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
        <Heading level={1}>Request a video</Heading>
        <View as="form" margin="3rem 0" onSubmit={createSubmission}>
          <Flex direction="row" justifyContent="center">
            <TextField
              name="email"
              placeholder="Recipient email"
              label="name"
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
              name="note"
              placeholder="Instructions/notes"
              label="Note Description"
              labelHidden
              variation="quiet"
              required
            />
            {/*<TextField
              name="company"
              placeholder="Company name"
              label="company"
              labelHidden
              variation="quiet"
          />*/}
           <Button type="submit" variation="primary">Request Video </Button>
            </Flex>
            </Card>
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