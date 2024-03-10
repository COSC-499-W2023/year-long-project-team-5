import * as React from "react";
import {TableRow,TableCell, Text, Button, Flex } from "@aws-amplify/ui-react";
import { VideoPreviewButton } from "./VideoPreviewButton";

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
 * @param {string} props.description - description of submission
 * @param {string} props.dateReceived - date received
 * @param {string} props.videoLink - video link
 * @param {string} [props.subLink] - full submission link (optional)
 * @returns {JSX.Element}
 */

    return(
        <TableRow className='subRow' width={'100%'}>
            <TableCell className  = 'subClientName' width={'15%'}> {props.name === undefined || props.name === null ? <Text variation='tertiary' isTruncated>N/A</Text> :  <Text isTruncated> {props.name} </Text> }</TableCell>
            <TableCell className = 'subEmail' width={'15%'}> 
                <Text isTruncated>{props.email}</Text>
            </TableCell>
            <TableCell className="subDesc" width="40%">
                <Text 
                variation="primary"
                as="p"
                lineHeight="1.5em"
                fontWeight={500}
                fontSize="1em"
                fontStyle="normal"
                textDecoration="none"
                textAlign="left"
                isTruncated
                >
                    {props.description}
                </Text>         
            </TableCell>
            <TableCell className = 'subDS' width={'10%'}><Text isTruncated>{props.dateSent}</Text> </TableCell>
            <TableCell className = 'subDR' width={'10%'}> {props.videoLink===null || props.dateReceived ==null ?  <Text variation='tertiary' isTruncated>N/A</Text> : <Text isTruncated>{props.dateReceived}</Text>}</TableCell>
            <TableCell className='subLink' width={'10%'}> {props.videoLink===null || props.dateReceived ==null ? <Button variation="primary" size='small' disabled>No Submission</Button> : <VideoPreviewButton videoUrl={props.videoLink} name = {props.name} description={props.description}></VideoPreviewButton>}</TableCell>
        </TableRow>
    );
}

    