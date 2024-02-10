import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";

import { getSubmissions } from "../Helpers/Getters";
import { Auth, API, Storage } from 'aws-amplify';
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
  ToggleButtonGroup, 
  SelectField, 
  Input
} from '@aws-amplify/ui-react';
import { SubmissionCard } from "../my-components/SubmissionCard";
import { SubmissionRow } from "../my-components/SubmissionRow";
import { SubmissionTable } from '../my-components/SubmissionTable';
import { FaCalendarAlt } from "react-icons/fa";


/**
 * Submissions TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Submissions></Submissions>
 */
export function Submissions() {
  const { user, route } = useAuthenticator((context) => [context.user, context.route]);
  const [submissions, setSubmissions] = useState([]);
  const [filteredsubmissions, setFilteredSubmissions] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [dashView, setDashView] = useState('table');
  const [startDate,setStartDate]= useState(new Date());
  const [endDate,setEndDate]= useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // State to track if the date picker should be shown


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
    filteredSubmissions = filteredSubmissions.filter((submission) => {
      // filter admin submissions
      const condition = submission.adminId === Auth.user.username;
      return condition;
    });
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

  //filters submissions based on video submission status
  function handleVideoStatusFilterChange(filter){
    if(filter == ''){
      setFilteredSubmissions(submissions);
    }
    else {
    const filtered = submissions.filter(submission => {
      if(filter == 'all'){}
      else if (filter === 'submitted') {
        return submission.Video && submission.Video.videoURL;
      } else if (filter === 'noVideo') {
        return !submission.Video || !submission.Video.videoURL;
      }
    });
    setFilteredSubmissions(filtered);
    }
  }

  //filters submissions based on selected date range (video request date)
  function handleDateRangePicker(date){
    console.log(date)
    const filtered = submissions.filter(submission => {
      const submissionDate = new Date(submission.createdAt);
      return submissionDate.toISOString().split('T')[0] == date;
    });
  
    setFilteredSubmissions(filtered);
  }

  function handleDateReceivedHeaderClick() {
    setShowDatePicker(!showDatePicker);
  }

  function renderSubmissions(){
    if(!isMobile && dashView === "table"){
      return(
        <SubmissionTable
          rowsToDisplay={filteredsubmissions.map((submission) => (
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
          {filteredsubmissions.map((submission) => (
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
        <SearchField textAlign="left" placeholder="Search submissions..." padding={tokens.space.large} onChange={(e) => setFilteredSubmissions(filterSubmissions(e.target.value,submissions))} />
        <SelectField placeholder = "Filter by video submission status" padding={tokens.space.large} onChange={(e)=> handleVideoStatusFilterChange(e.target.value)}>
          <option value = "submitted">Submitted video</option>
          <option value = "noVideo">No video submitted</option>
        </SelectField>
        <FaCalendarAlt
          onClick={handleDateReceivedHeaderClick}
        />
        {showDatePicker && (
          <Input
            type='date'
            onChange={(e) => handleDateRangePicker(e.target.value)}
          />
        )}
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