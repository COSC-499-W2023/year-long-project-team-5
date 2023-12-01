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
  } from '@aws-amplify/ui-react';
  import { listNotes } from "../graphql/queries";
import {
  createNote as createNoteMutation,
  createVideo as createVideoMutation,
  createUser as createUserMutation
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

      async function createUser(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
          email: form.get("email"),
          name: form.get("name"),
        };
        await API.graphql({
          query: createUserMutation,
          variables: { input: data },
        });
        event.target.reset();
      }

      async function createSubmission(event){
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
          note: form.get("note"),
          description: form.get("description"),
        };
        await API.graphql({
          query: createNoteMutation,
          variables: { input: data },
        });
        fetchNotes();
        event.target.reset();
      }
    return(
        <View className="App">
        <Heading level={1}>Request a video</Heading>
        <View as="form" margin="3rem 0" onSubmit={createNote}>
          <Flex direction="row" justifyContent="center">
            <TextField
              name="email"
              placeholder="Recipient email"
              label="Note Name"
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
            <Button type="submit" variation="primary">
              Request Video
            </Button>
          </Flex>
        </View>
        </View>
    )
}