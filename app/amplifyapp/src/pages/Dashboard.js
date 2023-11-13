import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import {Amplify, Auth, API, Storage } from 'aws-amplify';

import {
  Button,
  Flex,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
  Card,
  Heading,
  Badge,
  Link,
  useTheme,
  SearchField,
} from '@aws-amplify/ui-react';
import { listNotes } from "../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../graphql/mutations";

import { SubmissionCard } from "../my-components/SubmissionCard";

import awsconfig from '../aws-exports';
export function Dashboard(){
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
    
    
      async function deleteNote({ id, name }) {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
        await Storage.remove(name);
        await API.graphql({
          query: deleteNoteMutation,
          variables: { input: { id } },
        });
      }
    
      function filterNotes(searchInput){
        let newNotes = notes.filter((note)=> note.name.includes(searchInput))
        setFilteredNotes(newNotes);
      }
    const {tokens} = useTheme();
    return(
        <View className="App">
        <Heading level={1}>Patient Submissions</Heading>
        <View as="form" margin="3rem 0" onSubmit={createNote}>
          <Flex direction="row" justifyContent="center">
            <TextField
              name="name"
              placeholder="Note Name"
              label="Note Name"
              labelHidden
              variation="quiet"
              required
            />
            <TextField
              name="description"
              placeholder="Note Description"
              label="Note Description"
              labelHidden
              variation="quiet"
              required
            />
            <Button type="submit" variation="primary">
              Request Video
            </Button>
          </Flex>
          <View
          name="image"
          as="input"
          type="file"
          style={{ alignSelf: "end" }}
        />
        </View>
        <Heading level={2}></Heading>
        <SearchField padding={tokens.space.large} onChange={(e) => filterNotes(e.target.value)}/>
        <View>
          {filteredNotes.map((note) => (
            <SubmissionCard margin="1rem" id = {note.name} description = {note.description} image = {note.image}/>
          ))}
        </View>
      </View>
    )
}