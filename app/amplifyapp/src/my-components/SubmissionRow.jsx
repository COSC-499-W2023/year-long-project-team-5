import {TableRow,TableCell, Button, Text} from "@aws-amplify/ui-react";
import { DynamicText } from "./DynamicText";
import { VideoPreviewButton } from "./VideoPreviewButton";
import { FaVideoSlash } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

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
    const getNameText = () => {
        return props.name || 'N/A';
    };

    const getVariation = (text) => {
        return text === 'No Video Received' ? 'tertiary' : 'primary';
    };

    const getDateReceivedText = () => {
        return props.videoLink === null || props.dateReceived === null ? 'No Video Received' : props.dateReceived;
    };

    return (
        <TableRow className='subRow' width={'100%'}>
            <TableCell className='subClientName' width={'10%'}>
                <Text 
                    variation={getVariation(getNameText())} 
                    style={{ overflowWrap: 'break-word' }}
                >
                    {getNameText()}
                </Text>
            </TableCell>
            <TableCell className='subEmail' width={'16%'}>
                <Text 
                    variation={getVariation(props.email)} 
                    style={{ overflowWrap: 'break-word' }}
                >
                    {props.email}
                </Text>
            </TableCell>
            <TableCell className="subDesc" width="35%">
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
            <TableCell className='subDS' width={'10%'}>
                <Text 
                    variation='primary' 
                    style={{ overflowWrap: 'break-word' }}
                >
                    {props.dateSent}
                </Text> 
            </TableCell>
            <TableCell className='subDR' width={'10%'}>
                <Text 
                    variation={getVariation(getDateReceivedText())} 
                    style={{ overflowWrap: 'break-word' }}
                >
                    {getDateReceivedText()}
                </Text>
            </TableCell>
            <TableCell className='subLink' width={'11%'}>
                {props.videoLink === null || props.dateReceived === null ? (
                    <Button variation="primary" size='small' width='100%' disabled>
                        <FaVideoSlash/>
                    </Button>
                ) : (
                    <VideoPreviewButton videoUrl={props.videoLink} name={props.name} description={props.description}></VideoPreviewButton>
                )}
            </TableCell>
            <TableCell className='subLink' width='7%'> 
                <Button variation="primary" width='100%' onClick={ () => props.delete(props.submissionID, props.videoLink)} cursor='pointer' backgroundColor={"#D2042D"}  borderColor={'border.error'}>
                    <IoTrashBin/>
                </Button>
            </TableCell>
        </TableRow>
    );
}
