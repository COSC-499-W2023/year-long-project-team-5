import * as React from "react";
import {TableRow,TableCell, Button} from "@aws-amplify/ui-react";
import { DynamicText } from "./DynamicText";
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
            <TableCell className  = 'subClientName' width={'12%'}> {props.name === undefined || props.name === null ? <DynamicText variation='tertiary'>N/A</DynamicText> :  <DynamicText> {props.name} </DynamicText> }</TableCell>
            <TableCell className = 'subEmail' width={'20%'}> 
                <DynamicText>{props.email}</DynamicText>
            </TableCell>
            <TableCell className="subDesc" width="40%">
                <DynamicText 
                variation="primary"
                as="p"
                lineHeight="1.5em"
                fontWeight={500}
                fontSize="1em"
                fontStyle="normal"
                textDecoration="none"
                textAlign="left"
                >
                    {props.description}
                </DynamicText>         
            </TableCell>
            <TableCell className = 'subDS' width={'10%'}><DynamicText>{props.dateSent}</DynamicText> </TableCell>
            <TableCell className = 'subDR' width={'10%'}> {props.videoLink===null || props.dateReceived ==null ?  <DynamicText variation='tertiary'>N/A</DynamicText> : <DynamicText>{props.dateReceived}</DynamicText>}</TableCell>
            <TableCell className='subLink' width={'8%'}> {props.videoLink===null || props.dateReceived ==null ? <Button variation="primary" size='small'  width='100%' disabled>No Video</Button> : <VideoPreviewButton videoUrl={props.videoLink} name = {props.name} description={props.description}></VideoPreviewButton>}</TableCell>
        </TableRow>
    );
}

    