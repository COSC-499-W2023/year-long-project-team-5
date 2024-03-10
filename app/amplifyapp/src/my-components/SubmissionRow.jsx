import * as React from "react";
import {TableRow,TableCell, Text, Button } from "@aws-amplify/ui-react";
import { VideoPreviewButton } from "./VideoPreviewButton";
import { SubmissionDeletionButton } from "./SubmissionDeletionButton";
import { FaVideoSlash } from "react-icons/fa";

/**
 * SubmissionRow is intended to be the data row for each submission (to display info better on larger screens)
 * @component
 * @example
 * // Example usage of SubmissionRow (but all arguments passed to props will be passed through api calls):
 * <SubmissionRow id=1021 email ='jsaon1@gmail.com' dateSent='2023-10-01T01:30:01' dateReceived='2023-10-15T15:30:50' videoLink='www.somevideo.com/watchassa1231' submissionLink = '/asdasdl1'/>'
 */


export const SubmissionRow = (props) => {
/**
 * @param {Object} props 
 * @param {number} props.id - customer/patient ID
 * @param {string} props.email - customer email
 * @param {string} props.dateSent - date sent
 * @param {string} props.dateReceived - date received
 * @param {string} props.videoLink - video link
 * @param {string} [props.subLink] - full submission link (optional)
 * @returns {JSX.Element}
 */

    return(
        <TableRow className='subRow'>
            <TableCell className  = 'subClientName' width='15%'> {props.name === undefined || props.name === null ? <Text variation='tertiary'>N/A</Text> :  <Text> {props.name} </Text> }</TableCell>
            <TableCell className = 'subEmail' width='15%'> {props.email}</TableCell>
            <TableCell style={{ flex: 1 }} className="description" width='50%'>{props.description}</TableCell>
            <TableCell className = 'subDS' width='10%'> {props.dateSent}</TableCell>
            <TableCell className = 'subDR' width='10%'> {props.videoLink===null || props.dateReceived ==null ?  <Text variation='tertiary'>No Video Recieved</Text> : <Text>{props.dateReceived}</Text>}</TableCell>
            <TableCell className='subLink' width='5%'> {props.videoLink===null || props.dateReceived ==null ? <Button variation="primary" width='100%' disabled><FaVideoSlash /></Button> : <VideoPreviewButton videoUrl={props.videoLink} name = {props.name} description={props.description}></VideoPreviewButton>}</TableCell>
            <TableCell className='subLink' width='5%'> <SubmissionDeletionButton submissionID={props.submissionID} refresh={props.refresh}></SubmissionDeletionButton></TableCell>
        </TableRow>
    );
}

    