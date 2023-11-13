import * as React from "react";
import {Card, Flex, Heading, Link, Button, useTheme, View, Text} from "@aws-amplify/ui-react";

export const SubmissionCard = (props) => {
    const {tokens} = useTheme();
    return(
        <View
        backgroundColor={tokens.colors.background.secondary}
        padding={tokens.space.large}
        >
            <Card variation="outlined">
                <Flex direction='column' alignItems='flex-start'>
                    <Heading level = {4}> Title: {props.id}</Heading>
                    <Text as='span' style={{ textAlign: "left" }}>
                        {props.description}
                    </Text>
                    <Link href={props.image}>Video Submission</Link>
                    <Button variation="primary">Open Submission</Button>
                </Flex>
            </Card>
        </View>
    )
  }