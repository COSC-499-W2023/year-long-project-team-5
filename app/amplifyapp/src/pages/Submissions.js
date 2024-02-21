import React, { useState, useEffect, useRef} from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import '../my-components/filterMenu.css';

import { getSubmissions } from "../Helpers/Getters";
import {  Storage } from 'aws-amplify';
import { filterSubmissions } from "../Helpers/Search";
import {
  Grid,
  Flex,
  View,
  Heading,
  useTheme,
  SearchField,
  ToggleButton,
  ToggleButtonGroup, 
  SelectField, 
  Input,
  Text, 
  Button
} from '@aws-amplify/ui-react';
import { SubmissionCard } from "../my-components/SubmissionCard";
import { SubmissionRow } from "../my-components/SubmissionRow";
import { SubmissionTable } from '../my-components/SubmissionTable';
import { IoClose } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";

/**
 * Submissions TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Submissions></Submissions>
 */
export function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [filteredsubmissions, setFilteredSubmissions] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [dashView, setDashView] = useState('table');
  const [sideBarToggled, setSideBarToggled] = useState(false);
  const sidebarRef = useRef(null);
  const { tokens } = useTheme();
  const [sentDate, setSentDate] = useState('');
  const [receivedDate, setReceivedDate] = useState('');
  const [videoStatus, setVideoStatus] = useState('');

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
    let filteredSubmissions = await getSubmissions()
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

  function handleFilteringSubmissions(received, sent, videoStatus){
    const selectedReceivedDate = new Date(received);
    const selectedSentDate = new Date(sent);

    let filteredSubmissions = submissions;

    //filter based on video status (submitted or not)
    filteredSubmissions = submissions.filter(submission => {
      if (videoStatus === 'submitted') {
        return submission.Video && submission.Video.videoURL;
      } else if (videoStatus === 'noVideo') {
        return !submission.Video || !submission.Video.videoURL;
      } else {
        return submissions;
      }
    });

    //filter based on date request was sent
    filteredSubmissions = filteredSubmissions.filter(submission => {
      if (selectedSentDate.toLocaleDateString() === 'Invalid Date') return submissions; // If no date is selected, return all submissions
      const submissionDate = new Date(submission.createdAt);
      return (
        selectedSentDate.getUTCDate() === submissionDate.getDate() &&
        selectedSentDate.getUTCMonth() === submissionDate.getMonth() &&
        selectedSentDate.getUTCFullYear() === submissionDate.getFullYear()
      );
    });
  
    // Filter submissions based on date submission was received
    filteredSubmissions = filteredSubmissions.filter(submission => {
      if (selectedReceivedDate.toLocaleDateString() === 'Invalid Date') return submissions; // If no date is selected, return all submissions
      const submissionDate = new Date(submission.submittedAt);
      return (
        selectedReceivedDate.getUTCDate() === submissionDate.getDate() &&
        selectedReceivedDate.getUTCMonth() === submissionDate.getMonth() &&
        selectedReceivedDate.getUTCFullYear() === submissionDate.getFullYear()
      );
    });
    setFilteredSubmissions(filteredSubmissions);
  }

  //clear filters and the current filter values
  function clearFilters(){
    setFilteredSubmissions(submissions);
    setSentDate('');
    setReceivedDate('');
    setVideoStatus('');
  }

  function renderSubmissions(){
    if(!isMobile && dashView === "table"){
      return(
        <SubmissionTable
          rowsToDisplay={filteredsubmissions.map((submission) => (
            <SubmissionRow key={submission.User.id}
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
          {filteredsubmissions.map((submission) => (
            <SubmissionCard key={submission.User.id}
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

  return (
    <View className="App">
      <Flex direction = 'row' id = 'aside' ref = {sidebarRef} className ={`sidebar ${sideBarToggled ? "visible" : ""} `} backgroundColor={tokens.colors.background.secondary}>
      <Flex alignItems={'center'} alignContent={'flex-start'}  direction = 'column' backgroundColor={tokens.colors.background.secondary}>
      <Flex alignItems = {'flex-end'} justifyContent={'flex-end'}><Text><IoClose className = 'filter_closeButton' size='30' onClick={()=>setSideBarToggled(false)}/></Text></Flex>
        <Text>Filter by submission status</Text>
        <SelectField 
          size = 'small' width = '100%' 
          placeholder = "All" 
          id = "videoStatusFilter"
          value = {videoStatus}
          onChange={(e)=> setVideoStatus(e.target.value)} 
          color={tokens.colors.background.secondary}
        >
          <option value = "submitted">Submitted video</option>
          <option value = "noVideo" >No video submitted</option>
        </SelectField>
        <Text>Filter by date sent</Text>
        <Input
          size = 'small'
          width={'100%'}
          type='date'
          id = "dateSent"
          value = {sentDate}
          onChange={(e) => setSentDate(e.target.value)}
        />
        <Text>Filter by date received</Text>
        <Input 
          size = 'small'
          width={'100%'}
          type='date'
          id = "dateReceived"
          value = {receivedDate}
          onChange={(e) => setReceivedDate(e.target.value)}
        />
        <Button id = "submitFilters" onClick={() => handleFilteringSubmissions(receivedDate, sentDate, videoStatus)}>Apply Filters</Button>
        <Button variation = {'warning'} id = "clearFilters" onClick = {() => clearFilters()}>Clear Filters</Button>
      </Flex>
      </Flex>
      <Flex className ={`content ${sideBarToggled ? "pushed" : ""} `} direction={'column'}>
        <Heading level={2}>Your Video Submissions</Heading>
          <Flex alignItems="center" justifyContent="center">
            <Text>
              <CiFilter size = '30' className = 'sidebar-toggle' onClick={()=>setSideBarToggled(!sideBarToggled)}/>
            </Text>
            <SearchField variation = 'quiet' textAlign="left" placeholder="Search submissions..." padding={tokens.space.large} onChange={(e) => setFilteredSubmissions(filterSubmissions(e.target.value,submissions))} />
            {!isMobile && (
              <ToggleButtonGroup isSelectionRequired isExclusive value={dashView}  onChange={(newDashView) => setDashView(newDashView)}>      
                <ToggleButton value = "table"> Table </ToggleButton>
                <ToggleButton value = "card"> Card </ToggleButton>
              </ToggleButtonGroup>
            )}
          </Flex>
        <View id = 'submissions' padding={tokens.space.large}>
          {renderSubmissions()}
        </View>
      </Flex>
    </View>
  )
}