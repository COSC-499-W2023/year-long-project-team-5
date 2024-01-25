import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import {API, Storage } from 'aws-amplify';
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
export function VideoRequestForm(){
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([])
    useEffect(() => {
      fetchNotes();
    }, []);
    
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state variable
    

    // potential for these functions to be a utility function? 
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
        note: form.get("description"),
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

    // these states and functions below are to help dynamically adjust the width of the parent Card component (i.e the form)
    // depending on browser width, takes less % of screen width if screen is large, and greater % when mobile.
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const resizeCenterComps = (windowWidth) => {
      return {
          width: (windowWidth > 1024) ? '50%' : (windowWidth > 600) ? '80%' : '100%',
          margin: '0 auto',
          padding: '20px',
          maxWidth: '800px', // You can adjust this value
      };
    };    
    const cardStyle = resizeCenterComps(windowWidth);
    const { tokens } = useTheme();
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      // hardcoding the widths and heights was causing previous clipping 
      // this form should have multiple breakpoints for its width: mobile & large screens
      // this form IS NOT VALIDATED!! needs testing!
      <Card as="form" backgroundColor={tokens.colors.background.secondary} variation="elevated" onSubmit={createSubmission} style={cardStyle}>
        <Flex direction="column" justifyContent = "center" textAlign = "left" gap='2em'>
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
    )
} export default VideoRequestForm;
