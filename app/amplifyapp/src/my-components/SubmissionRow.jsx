import * as React from "react";
import {Card, Flex, Heading, Link, Button, useTheme, View, Text} from "@aws-amplify/ui-react";

export const SubmissionRow = (props) => {
    const {tokens} = useTheme();
    return(
        <View>
            <Text> props.id</Text>
            <Text> props.email</Text>
            <Text> props.dateSent</Text>
            <Text> props.dateReceived</Text>
            <Link href={props.videoLink}>Video Link</Link>
        </View>
    );
}
