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
  useAuthenticator,
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
import { SubmissionRow } from "../my-components/SubmissionRow";

import awsconfig from '../aws-exports';

/**
 * dashboard TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Dashboard></Dashboard>
 */

export function Dashboard(){
  const {route} = useAuthenticator((context) => [context.route]);
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
        <Heading level={2}>Video Log</Heading>
        <SearchField padding={tokens.space.large} onChange={(e) => filterNotes(e.target.value)}/>
        <View>
          {filteredNotes.map((note) => (
            <SubmissionCard margin="1rem" id = {note.name} description = {note.description} image = {note.image}/>
          ))}
        </View>
      </View>
    )
}