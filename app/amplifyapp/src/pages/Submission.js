import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import {Amplify, Auth, API, Storage } from 'aws-amplify';

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
  createNote as createNoteMutation,
} from "../graphql/mutations";
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
          name: form.get("name"),
          description: form.get("description"),
          image: image.name,
        };
        if (!!data.image) await Storage.put(data.name, image);
        await API.graphql({
          query: createNoteMutation,
          variables: { input: data },
        });
        fetchNotes();
        event.target.reset();
      }
      const { tokens } = useTheme();
    return(
        <View className="App">
        <Heading level={1}>Request a video</Heading>
        <View as="form" margin="1rem 3rem" alignContent = "center" onSubmit={createNote} padding={tokens.space.medium}>
          <Card variation="elevated">
          <Flex direction="column" justifyContent = "center" textAlign = "left">
          <TextField
              name="name"
              placeholder="Recipient name"
              label="Name"
              labelHidden
              variation="quiet"
              required
            />
            <TextField
              name="email"
              placeholder="Recipient email"
              label="email"
              labelHidden
              variation="quiet"
              required
            />
            <TextField
              name="description"
              placeholder="Instructions/notes"
              label="Note Description"
              labelHidden
              variation="quiet"
              required
            />
            <TextField
              name="company"
              placeholder="Company name"
              label="company"
              labelHidden
              variation="quiet"
              required
            />
            <Button type="submit" variation="primary">
              Request Video
            </Button>
            </Flex>

            </Card>
        </View>
        </View>
    )
}