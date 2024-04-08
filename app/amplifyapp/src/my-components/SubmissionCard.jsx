import * as React from "react";
import { Card, Flex, Heading, Button, useTheme, View, Text } from "@aws-amplify/ui-react";
import { VideoPreviewButton } from "./VideoPreviewButton";
import { FaVideoSlash } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { DynamicText } from "./DynamicText";

export const SubmissionCard = (props) => {
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

    const {tokens} = useTheme();
    return(
        <View padding={tokens.space.large}>
            <Card variation="elevated" backgroundColor={tokens.colors.background.secondary}>
                <Flex justifyContent="space-between" wrap="wrap">
                    <Heading level = {4}> {props.name === undefined || props.name === null ? "N/A" : props.name}</Heading>
                    <Text fontWeight={"light"}>Sent: {props.dateSent}</Text>
                </Flex>
                <Flex direction='column' style={{ maxWidth: '800px' }}>
                    <Flex justifyContent="space-between" wrap="wrap">
                        <Text fontWeight={"light"}>Email: {props.email}</Text>
                        {props.videoLink===null || props.dateReceived==null ? ( <Text/>) : (<Text fontWeight={"light"}>Received: {props.dateReceived}</Text>)}
                    </Flex>
                    <Text alignSelf="flex-start" fontWeight={"semibold"}>Instructions:</Text>
                    <DynamicText alignSelf="flex-start" maxWidth="100%" textAlign='left' numLinesSpecified={2}>
                        {props.description}
                    </DynamicText>
                    <span>&nbsp;&nbsp;</span>
                </Flex>
                <Flex justifyContent="space-between">
                    <Flex width='6%'/>
                    {props.videoLink===null || props.dateReceived==null ? (
                        <Button variation="primary" width='25%' disabled><FaVideoSlash/></Button>
                    ) : (
                    <Flex width='25%'>
                        <VideoPreviewButton videoUrl={props.videoLink} name={props.name} description={props.description}></VideoPreviewButton>
                    </Flex>
                    )}
                    <Button variation="primary" width='60px' onClick={ () => props.delete(props.submissionID)} cursor='pointer' backgroundColor={"#D2042D"}  borderColor={'border.error'}><IoTrashBin/></Button>
                </Flex>
            </Card>
        </View>
    )
  }