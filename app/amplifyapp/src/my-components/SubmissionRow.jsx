import * as React from "react";
import {TableRow,TableCell, Link,useTheme, Button, Flex, useAuthenticator} from "@aws-amplify/ui-react";
import {useNavigate} from 'react-router-dom';
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

    // const navigate = useNavigate();
    const handleButtonClick = () => {
        // Navigate to the '/Submission' page when the button is clicked - should be different custom page!
        // navigate('/Submission');
        console.log('should navigate to new page')
    };

    return(
        <TableRow className='subRow'>
            <TableCell className = 'subID'> {props.id}</TableCell>
            <TableCell className = 'subEmail'> {props.email}</TableCell>
            <TableCell className = 'subDS'> {props.dateSent}</TableCell>
            <TableCell className = 'subDR'> {props.dateReceived}</TableCell>
            <TableCell className="vidLink"><Link href={props.videoLink}>Video Link</Link></TableCell>
            <TableCell className='subLink'><Button variation="primary" onClick={handleButtonClick}> Open Submission</Button></TableCell>
        </TableRow>
    );
}

