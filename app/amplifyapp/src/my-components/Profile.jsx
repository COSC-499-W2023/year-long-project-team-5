import React, {  } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import {API, Storage, Auth } from 'aws-amplify';
import { updateUser } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { useAuthenticator} from "@aws-amplify/ui-react"

import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
    Card, 
    useTheme
  } from '@aws-amplify/ui-react';

export const ProfileInfo = (props) => {
    const { tokens } = useTheme();
    return (
    <View backgroundColor={tokens.colors.background.primary}>
        <Heading level={1}>Welcome, {props.name}!</Heading>
        <Flex direction = 'column' width = '100%' justifyContent='space-evenly' alignItems='center' marginTop = '2rem' rowGap='2.5rem'>
                <Card variation="elevated" width = '80%'>
                <Flex direction="column" justifyContent = "center" textAlign = "left">
                {<TextField
                    name="name"
                    placeholder={props.name}
                    label="Name"
                    variation="default"
                    isDisabled
                />}
                    <TextField
                    name="email"
                    placeholder={props.email}
                    label="Email"
                    variation="default"
                    isDisabled
                    />
                    </Flex>
                </Card>
            </Flex>
                    
        </View>
    )
}
export default ProfileInfo;
