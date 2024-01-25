import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import { Amplify, Auth, API, Storage } from 'aws-amplify';
import { filterSubmissions } from "../Helpers/Search";
import {
  Grid,
  Flex,
  View,
  useAuthenticator,
  Heading,
  useTheme,
  SearchField,
  ToggleButton,
  ToggleButtonGroup
} from '@aws-amplify/ui-react';
import { listSubmissions } from "../graphql/queries";
import { listNotes } from "../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
  createVideo as createVideoMutation
} from "../graphql/mutations";

import { SubmissionCard } from "../my-components/SubmissionCard";
import { SubmissionRow } from "../my-components/SubmissionRow";
import { SubmissionTable } from '../my-components/SubmissionTable'
import awsconfig from '../aws-exports';

/**
 * dashboard TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Dashboard></Dashboard>
 */
export function Dashboard() {
  const { user, route } = useAuthenticator((context) => [context.user, context.route]);
  console.log(Auth.user.username)
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [dashView, setDashView] = useState('table');
  
  //this useEffect is used to look at the window and update width so it knows when to snap isMobile to True.
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //this useEffect is used to fetch submissions data from the database: calls fetchNotes() which is below..
  useEffect(() => {
    fetchNotes();
  }, []);
  //This handles the click when the button is pressed to switch the layout to isMobile
 


  async function fetchNotes() {
    const apiData = await API.graphql({ query: listSubmissions });
    const submissions = apiData.data.listSubmissions.items;
    const filteredSubmissions = submissions;
    /*
    const filteredSubmissions = submissions.filter((submission) => {
      // filter admin submissions
      console.log("Filtered submissions")
      const condition = submission.adminId === Auth.user.username;
      return condition;
    });
    */
    // uncomment when we implement submissions
    await Promise.all(
      filteredSubmissions.map(async (note) => {
        if (note.Video && note.Video.videoURL) {
          const url = await Storage.get(note.Video.videoURL);
          note.Video.videoName = note.Video.videoURL;
          note.Video.videoURL = url;
        }
        return note;
      })
    );
    setNotes(filteredSubmissions);
    setFilteredNotes(filteredSubmissions);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    console.log(form)
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    console.log(data)
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createVideoMutation,
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

  function renderSubmissions(){
    if(!isMobile && dashView === "table"){
      return(
        <SubmissionTable
          rowsToDisplay={filteredNotes.map((submission) => (
            <SubmissionRow
              name={submission.User.name}
              email={submission.User.email}
              description={submission.note}
              dateSent={submission.createdAt == null ? null : new Date(submission.createdAt).toLocaleDateString()}
              dateReceived={submission.submittedAt == null ? null : new Date(submission.submittedAt).toLocaleDateString()}
              videoLink={submission.Video ? submission.Video.videoURL : "N/A"}
            />
          ))}
        />
      );
    }else{
      const gridLayout = !isMobile ? "1fr 1fr" : "1fr";
      return (
        <Grid templateColumns={gridLayout} gap={tokens.space.small}>
          {filteredNotes.map((submission) => (
            <SubmissionCard
              margin="1rem"
              name={submission.User.name}
              email={submission.User.email}
              description={submission.note}
              dateSent={submission.createdAt == null ? null : new Date(submission.createdAt).toLocaleDateString()}
              dateReceived={submission.submittedAt == null ? null : new Date(submission.submittedAt).toLocaleDateString()}
              videoLink={submission.Video ? submission.Video.videoURL : "N/A"}
            />
          ))}
        </Grid>
      );
    }
  }

  const { tokens } = useTheme();
  return (
    <View className="App">
      <Heading level={2}>Your Video Submissions</Heading>
      <Flex alignItems="center" justifyContent="center">
        <SearchField padding={tokens.space.large} onChange={(e) => setFilteredNotes(filterSubmissions(e.target.value,notes))} />
        {!isMobile && (
          <ToggleButtonGroup isSelectionRequired isExclusive value={dashView}  onChange={(newDashView) => setDashView(newDashView)}>      
            <ToggleButton value = "table"> Table </ToggleButton>
            <ToggleButton value = "card"> Card </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Flex>
      <View padding={tokens.space.large}>
        {renderSubmissions()}
      </View>
    </View>
  )
}