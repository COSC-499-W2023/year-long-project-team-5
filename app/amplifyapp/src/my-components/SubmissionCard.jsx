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
        <View
        backgroundColor={tokens.colors.background.secondary}
        padding={tokens.space.large}
        >
            <Card variation="outlined">
                <Flex direction='column' alignItems='flex-start'>
                    <Flex color={tokens.colors.background.secondary} direction="row" justifyContent="flex-start" alignItems="flex-start"  alignContent="flex-start"  wrap="wrap">
                        <Heading level = {4}> {props.name === undefined || props.name === null ? "N/A" : props.name}</Heading>
                        <Heading style={{textAlign: "right" }} level = {6}> Sent: {props.dateSent}</Heading>
                    </Flex>
                    <Heading style={{textAlign: "right" }} level = {6}> Email: {props.email}</Heading>
                    <Text numberOfLines={1} as='span' style={{ flex: 1 }}>
                        {props.description}
                    </Text>
                    {props.videoLink===null || props.dateReceived ==null ? <Button variation="primary" size='small' disabled>No Video Received</Button> : <Button variation="primary" size='small' width='15%' onClick={()=>{window.open(props.videoLink)}}>Video</Button>}
                    {/*<Button variation="primary">Open Submission</Button>*/}
                </Flex>
            </Card>
        </View>
    )
  }