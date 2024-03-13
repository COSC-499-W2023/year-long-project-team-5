import * as React from "react";
import { Card, Flex, Heading, Button, useTheme, View, Text } from "@aws-amplify/ui-react";
import { VideoPreviewButton } from "./VideoPreviewButton";
import { FaVideoSlash } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

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
                <Flex direction='column' alignItems='flex-start'>
                    <Text fontWeight={"light"}>Email: {props.email}</Text>
                    <Text fontWeight={"semibold"}>Instructions:</Text>
                    <Text as='span' style={{ flex: 1 }}>
                        {props.description}
                    </Text>
                    <Text>&nbsp;&nbsp;</Text>
                </Flex>
                <Flex justifyContent="space-between">
                    <Flex/>
                    {props.videoLink===null || props.dateReceived==null ? (
                        <Button variation="primary" width='25%' disabled><FaVideoSlash /></Button>
                    ) : (
                    <Flex justifyContent='center' alignItems='center'>
                        <VideoPreviewButton videoUrl={props.videoLink} name = {props.name} description={props.description}></VideoPreviewButton>
                        <Text fontWeight={"light"}>Received: {props.dateReceived}</Text>
                    </Flex>
                    )}
                    <Button variation="primary" width='10%' onClick={ () => props.delete(props.submissionID)} cursor='pointer'><IoTrashBin/></Button>
                </Flex>
            </Card>
        </View>
    )
  }