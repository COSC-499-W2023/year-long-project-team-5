import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import '../my-components/filterMenu.css';

import { getSubmissions } from "../Helpers/Getters";
import { Auth, Storage, API } from 'aws-amplify';
import { filterSubmissions } from "../Helpers/Search";
import { ToolTip } from '../my-components/ToolTip';
import {BsInfoCircle } from "react-icons/bs";

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
  Button,
  Pagination,
  Loader
} from '@aws-amplify/ui-react';
import { SubmissionCard } from "../my-components/SubmissionCard";
import { SubmissionRow } from "../my-components/SubmissionRow";
import { SubmissionTable } from '../my-components/SubmissionTable';
import { IoClose } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { deleteSubmission as deleteSubmissionMutation } from "../graphql/mutations";


/**
 * Submissions TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Submissions></Submissions>
 */
export function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [filteredsubmissions, setFilteredSubmissions] = useState([]);
  const [displayedSubmissions, setDisplayedSubmissions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [dashView, setDashView] = useState('table');
  const [sideBarToggled, setSideBarToggled] = useState(false);
  const sidebarRef = useRef(null);
  const { tokens } = useTheme();
  const [sentDate, setSentDate] = useState('');
  const [receivedDate, setReceivedDate] = useState('');
  const [videoStatus, setVideoStatus] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [loading, setLoading] = useState('true');

  document.title = "Blur | Your Video Submissions";

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
  //This dependency array is needed to stop constant refreshing

  async function fetchSubmissions() {
    setLoading(true);
    let filteredSubmissions = await getSubmissions()
    filteredSubmissions = filteredSubmissions.filter((submission) => {
      // filter admin submissions
      const condition = submission.adminId === Auth.user.username;
      return condition;
    });

    await Promise.all(
      filteredSubmissions.map(async (submission) => {
        if (submission.Video && submission.Video.videoURL) {
          const url = await Storage.get(submission.Video.videoURL.replace("toBlur/", ""));
          submission.Video.videoName = submission.Video.videoURL;
          submission.Video.videoURL = url;
        }
        return submission;
      })
    );
    filteredSubmissions.sort(dateSorting);
    setSubmissions(filteredSubmissions);
    setFilteredSubmissions(filteredSubmissions)
    setTotalPageNum(Math.ceil((filteredSubmissions.length + 1)/7));
    setCurrentPageIndex(1);
    setDisplayedSubmissions(filteredSubmissions.slice((currentPageIndex-1)*7, (currentPageIndex*7)-1));
    setLoading(false);
  }

  async function deletePrompt(submissionID, videolink) {
    const shouldRemove = window.confirm("Are you sure you want to delete this submission?")
    if(shouldRemove) {
      try {
        await API.graphql({
          query: deleteSubmissionMutation,
          variables: { input: { id: submissionID } },
          authMode: "AWS_IAM"
        });
        if (videolink != 'N/A') {
          await Storage.remove(videolink);
        }
      } catch (error) {
        console.log('error deleting submission:', error);
      } finally {
        let temp = currentPageIndex;
        await fetchSubmissions();
        setCurrentPageIndex(temp);
      }
    }
  }

  function dateSorting(a, b) {
    if ( a.createdAt < b.createdAt ){
      return 1;
    }
    if ( a.createdAt > b.createdAt ){
      return -1;
    }
    return 0;
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
    setCurrentPageIndex(1);
    setFilteredSubmissions(filteredSubmissions);
  }

  //clear filters and the current filter values
  function clearFilters () {
    setFilteredSubmissions(submissions);
    setSentDate('');
    setReceivedDate('');
    setVideoStatus('');
    setCurrentPageIndex(1);
  }

  //Handle user going to next page
  function handleNextPage () {
    if(currentPageIndex !== totalPageNum) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  //Handle user going to previous page
  function handlePreviousPage () {
    if(currentPageIndex !== 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  //Handle user changing to specific page
  function handleOnChange (newPageIndex) {
    setCurrentPageIndex(newPageIndex);
  };

  //This use effect sorts all submissions into pages
  useEffect(() => {
    let filteredSubmissions = filteredsubmissions;
    setTotalPageNum(Math.ceil((filteredSubmissions.length + 1)/7));
    
    let lowerBound = Math.min((currentPageIndex-1)*7, filteredSubmissions.length - 1)
    let upperBound = Math.min((currentPageIndex*7)-1, filteredSubmissions.length)
    filteredSubmissions = filteredSubmissions.slice(lowerBound, upperBound);
    setDisplayedSubmissions(filteredSubmissions);
  }, [currentPageIndex, filteredsubmissions]);

  //Rendering submission and search or no submissions message
  function renderDash () {
    if(loading === false && submissions.length === 0) {
      return (
        <View>
          <Flex height='20vh'/>
          <Text>No Submissions Found!</Text>
          <Text>Click "Request a Video" to make a new submission!</Text>
        </View>
      );
    } else if(loading === true && displayedSubmissions.length === 0) {
      return (
        <View>
          <Flex height='20vh'/>
          <Text>Hold on, we're loading your submissions...</Text>
          <Flex height='3vh'/>
          <Loader width="5%" size="large"/>
        </View>
      );
    } else {
      return (
        <View>
          <Flex alignItems="center" justifyContent="center">
            <Text>
              <CiFilter size = '30' className = 'sidebar-toggle' onClick={()=>setSideBarToggled(!sideBarToggled)}/>
            </Text>
            <SearchField variation = 'quiet' textAlign="left" placeholder="Search submissions..." padding={tokens.space.large} onChange={(e) => {
              setCurrentPageIndex(1);
              setFilteredSubmissions(filterSubmissions(e.target.value,submissions))}
              } />
            {!isMobile && (
            <ToggleButtonGroup isSelectionRequired isExclusive value={dashView}  onChange={(newDashView) => setDashView(newDashView)}>      
              <ToggleButton value = "table"> Table </ToggleButton>
              <ToggleButton value = "card"> Card </ToggleButton>
            </ToggleButtonGroup>
            )}
          </Flex>
          <View id = 'submissions' padding={tokens.space.large}>
            {renderSubmissions()}
            <Pagination
              padding={tokens.space.large}
              currentPage={currentPageIndex}
              totalPages={totalPageNum}
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              onChange={handleOnChange}
            />
          </View>
        </View>
      );
    }
  }
  
  //This renders the actual submissions whether that be table or cards
  function renderSubmissions () {
    if(!isMobile && dashView === "table"){
      return(
        <SubmissionTable
          rowsToDisplay={displayedSubmissions.map((submission) => (
            <SubmissionRow key={submission.User.id}
              name={submission.User.name}
              email={submission.User.email}
              description={submission.note}
              dateSent={submission.createdAt == null ? null : new Date(submission.createdAt).toLocaleDateString()}
              dateReceived={submission.submittedAt == null ? null : new Date(submission.submittedAt).toLocaleDateString()}
              videoLink={submission.Video ? submission.Video.videoURL : "N/A"}
              submissionID={submission.id}
              delete={deletePrompt}
            />
          ))}
        />
      );
    } else {
      const gridLayout = !isMobile ? "1fr 1fr" : "1fr";
      return (
        <Grid templateColumns={gridLayout} gap={tokens.space.small}>
          {displayedSubmissions.map((submission) => (
            <SubmissionCard key={submission.User.id}
              margin="1rem"
              name={submission.User.name}
              email={submission.User.email}
              description={submission.note}
              dateSent={submission.createdAt == null ? null : new Date(submission.createdAt).toLocaleDateString()}
              dateReceived={submission.submittedAt == null ? null : new Date(submission.submittedAt).toLocaleDateString()}
              videoLink={submission.Video ? submission.Video.videoURL : "N/A"}
              submissionID={submission.id}
              delete={deletePrompt}
            />
          ))}
        </Grid>
      );
    }
  }

  //Filters and main render function
  return (
    <View className="App">
      <Flex direction = 'row' id = 'aside' ref = {sidebarRef} className ={`sidebar ${sideBarToggled ? "visible" : ""} `} backgroundColor={tokens.colors.background.secondary}>
        <Flex direction = 'column' backgroundColor={tokens.colors.background.secondary}>
          <Flex alignItems = {'flex-start'} justifyContent={'flex-start'} className="filter-close-container"><Text><IoClose className = 'filter_closeButton' size='30' onClick={()=>setSideBarToggled(false)}/></Text></Flex>
            <Heading level = {4}>Filter Submissions <ToolTip text = "You can stack as many filters as you'd like. To remove a filter, simply clear the respective filter and hit apply filters again."><BsInfoCircle style = {{width:'50%'}}/></ToolTip></Heading>
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
              <option value = "noVideo">No video submitted</option>
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
            <Flex direction = 'row'>
              <Button variation = {'warning'} id = "clearFilters" onClick = {() => clearFilters()}>Clear Filters</Button>
              <Button id = "submitFilters" onClick={() => handleFilteringSubmissions(receivedDate, sentDate, videoStatus)}>Apply Filters</Button>
            </Flex>
          </Flex>
        </Flex>
      <Flex className ={`content ${sideBarToggled ? "pushed" : ""} `} direction={'column'}>
        <Heading level={2}>Your Video Submissions</Heading>
        {renderDash()}
      </Flex>
    </View>
  )
}