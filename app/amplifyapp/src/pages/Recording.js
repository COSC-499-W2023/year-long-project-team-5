import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import VideoRecorder from "../my-components/VideoRecorder";
import Webcam from "react-webcam";
import {Amplify, Auth, API, Storage } from 'aws-amplify';

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
} from "../graphql/mutations";

/**
 * Recording TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Recording></Recording>
 */
export function Recording(){
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

    return(
        <div>
            <div>
                <h1>Video Recording</h1>
                <VideoRecorder/>
            </div>
        </div>
    )
}