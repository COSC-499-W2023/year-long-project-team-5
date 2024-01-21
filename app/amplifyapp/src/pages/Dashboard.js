import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import { Auth, API, Storage } from 'aws-amplify';
import { filterSubmissions } from "../Helpers/Search";
import {
  View,
  useAuthenticator,
  Heading,
  useTheme,
  SearchField,
} from '@aws-amplify/ui-react';
import { listSubmissions } from "../graphql/queries";

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
  const [submissions, setSubmissions] = useState([]);
  const [filteredsubmissions, setFilteredSubmissions] = useState([])
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
  //this useEffect is used to fetch submissions data from the database: calls fetchsubmissions() which is below..
  useEffect(() => {
    fetchSubmissions();
  }, []);
  async function fetchSubmissions() {
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
      filteredSubmissions.map(async (submission) => {
        if (submission.Video && submission.Video.videoURL) {
          const url = await Storage.get(submission.Video.videoURL);
          submission.Video.videoName = submission.Video.videoURL;
          submission.Video.videoURL = url;
        }
        return submission;
      })
    );
    setSubmissions(filteredSubmissions);
    setFilteredSubmissions(filteredSubmissions);
  }

  const { tokens } = useTheme();

  return (
    <View className="App">
      <Heading level={2}>Video Log</Heading>
      <SearchField padding={tokens.space.large} onChange={(e) => setFilteredSubmissions(filterSubmissions(e.target.value,submissions))} />
      <View padding={tokens.space.large}>
        {/* this line is a conditional JSX expression, renders SubmissionTable if it's not mobile and SubmissionCard if it's mobile */}
        {!isMobile ? (
          <SubmissionTable
            rowsToDisplay={filteredsubmissions.map((submission) => (
              <SubmissionRow
                name={submission.User.name}
                email={submission.User.email}
                description={submission.note}
                dateSent={submission.createdAt}
                dateReceived={submission.submittedAt}
                videoLink={submission.Video ? submission.Video.videoURL : "N/A"}
              />
            ))}
          />
        ) : (
          filteredsubmissions.map((submission) => (
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