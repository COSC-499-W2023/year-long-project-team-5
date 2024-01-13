import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import { Auth, API, Storage } from 'aws-amplify';

import {
  View,
  useAuthenticator,
  Heading,
  useTheme,
  SearchField,
} from '@aws-amplify/ui-react';
import { listSubmissions } from "../graphql/queries";
import {
  deleteNote as deleteNoteMutation,
  createVideo as createVideoMutation
} from "../graphql/mutations";

import { SubmissionCard } from "../my-components/SubmissionCard";
import { SubmissionRow } from "../my-components/SubmissionRow";
import {SubmissionTable} from '../my-components/SubmissionTable'


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

  function filterNotes(searchInput) {
    let newNotes = notes.filter((note) => note.name.includes(searchInput))
    setFilteredNotes(newNotes);
  }

  const { tokens } = useTheme();

  return (
    <View className="App">
      <Heading level={2}>Video Log</Heading>
      <SearchField padding={tokens.space.large} onChange={(e) => filterNotes(e.target.value)} />
      <View padding={tokens.space.large}>
        {/* this line is a conditional JSX expression, renders SubmissionTable if it's not mobile and SubmissionCard if it's mobile */}
        {!isMobile ? (
          <SubmissionTable
            rowsToDisplay={filteredNotes.map((submission) => (
              <SubmissionRow
                id={submission.id}
                email={submission.User.email}
                description={submission.note}
                dateSent={submission.createdAt}
                dateReceived={submission.submittedAt}
                videoLink={submission.Video ? submission.Video.videoURL : "N/A"}
              />
            ))}
          />
        ) : (
          filteredNotes.map((submission) => (
            <SubmissionCard
              margin="1rem"
              id={submission.id}
              description={submission.note}
              image={submission.Video ? submission.Video.videoURL : "N/A"}
            />
          ))
        )}
      </View>
    </View>
  )
}