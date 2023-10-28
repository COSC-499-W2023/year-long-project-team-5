import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";

import { API, Storage } from 'aws-amplify';

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
} from '@aws-amplify/ui-react';
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import {
  SearchSubmission,
  FilterTabs,
} from "./ui-components"

import './App.css';


// ---MY COMPONENTS (using Primitives) --- 
export const SubmissionCard = () => {
  const {tokens} = useTheme();
  return(
      <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
      >
          <Card variation="outlined">
              <Flex direction='column' alignItems='flex-start'>
                  <Heading level = {4}> ID: 1010</Heading>
                  <Text as='span' style={{ textAlign: "left" }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus possimus voluptatibus modi ipsum porro explicabo soluta eum, dolores quaerat iste voluptas quibusdam delectus distinctio, quo reprehenderit in. Totam sit reiciendis necessitatibus nesciunt quo laborum eligendi ipsam doloribus voluptate, harum est. Dignissimos id exercitationem velit unde ea quam consequatur dolore quibusdam?
                  </Text>
                  <Link href='#'>emailtodisplay@gmail.com</Link>
                  <Link href='#'>videoFileName.mp4</Link>
                  <Button variation="primary">Open Submission</Button>
              </Flex>
          </Card>
      </View>
  )
}
const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

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
  const {tokens} = useTheme();

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View justifyContent='center'>
        <SearchSubmission/>
        <FilterTabs/>
      </View> 
      <SubmissionCard/>
      <SubmissionCard/>

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
            Create Note
          </Button>
        </Flex>
        <View
        name="image"
        as="input"
        type="file"
        style={{ alignSelf: "end" }}
      />
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View>
        {notes.map((note) => (
          <View backgroundColor={tokens.colors.background.secondary}
          padding={tokens.space.medium}>
              <Card variation="outlined">
                  <Flex direction='column' alignItems='flex-start' justifyContent='center'>
                      <Heading level = {4}> ID: {note.name}</Heading>
                      <Text as='span' style={{ textAlign: "left" }}>
                        {note.description}
                      </Text>
                      <Link href='#'>emailtodisplay@gmail.com</Link>
                      <Image
                        src = {note.image}
                      />
                      <Button variation="primary" isFullWidth={true}>Open Submission</Button>
                  </Flex>
              </Card>
          </View>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);