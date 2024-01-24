import * as React from "react";
import { Card, Flex, Heading, Button, useTheme, View, Text } from "@aws-amplify/ui-react";

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
            <Card variation="elevated">
                <Flex color={tokens.colors.background.secondary} justifyContent="space-between" wrap="wrap">
                    <Heading level = {4}> {props.name === undefined || props.name === null ? "N/A" : props.name}</Heading>
                    <Text fontWeight={"light"}>Sent: {props.dateSent}</Text>
                </Flex>
                <Flex direction='column' alignItems='flex-start'>
                    <Text fontWeight={"light"}>Email: {props.email}</Text>
                    <Text fontWeight={"semibold"}>Instructions:</Text>
                    <Text numberOfLines={1} as='span' style={{ flex: 1 }}>
                        {props.description}
                    </Text>
                    <span>&nbsp;&nbsp;</span>
                </Flex>
                    {props.videoLink===null || props.dateReceived==null ? (
                        <Button variation="primary" size='small' disabled>No Video Received</Button>
                    ) : (
                    <Flex justifyContent='center' alignItems='center'>
                        <Button variation="primary" size='small' width='12em' onClick={()=>{window.open(props.videoLink)}}>Video</Button>
                        <Text fontWeight={"light"}>Received: {props.dateReceived}</Text>
                    </Flex>
                    )}
            </Card>
        </View>
    )
  }