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
    async function updateUserInfo(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
            input: {
                id: props.id,
                name: form.get("name"),
                email: props.email
            },
            condition: {
                id: props.id
            }
        };
        try {
            await API.graphql({
                query: updateUser,
                variables: { input: data },
            });
            // Handle success, e.g., show a success message or navigate to another page
            console.log("User updated successfully!");
        } catch (error) {
            // Log the actual error object
            console.error("Error updating user:", error);
        }
    }

    return (
    <View backgroundColor={tokens.colors.background.primary}>
        <Heading level={1}>Welcome, {props.name}!</Heading>
        <Flex direction = 'column' width = '100%' justifyContent='space-evenly' alignItems='center' marginTop = '2rem' rowGap='2.5rem'>
                <Heading textAlign = 'left' marginBottom='1rem' level={4}>Edit Profile</Heading>
                <Card as = "form" onSubmit = {updateUserInfo} variation="elevated" width = '80%'>
                <Flex direction="column" justifyContent = "center" textAlign = "left">
                {<TextField
                    name="name"
                    placeholder={props.name}
                    label="Name"
                    variation="default"
                    required
                />}
                    <TextField
                    name="email"
                    placeholder={props.email}
                    label="Email"
                    variation="default"
                    required
                    isDisabled
                    />
                    {<TextField
                    name="company"
                    placeholder="Company name"
                    label="Company Name"
                    variation="default"
                    />}
                    <Button type="submit" variation="primary">Save Changes </Button>
                    </Flex>
                </Card>
                {/*
                <View as="form" minWidth ='80%'>
                <Heading textAlign = 'left' marginBottom='1rem' level={4}>Change password</Heading>
                <Card variation="elevated">
                <Flex direction="column" justifyContent = "center" textAlign = "left">
                {<TextField
                    name="currPassword"
                    label="Enter your current password"
                    variation="default"
                    required
                />}
                    <TextField
                    name="newPass1"
                    label="Enter your new password"
                    variation="default"
                    required
                    />
                    {<TextField
                    name="newPass2"
                    label="Confirm your new password"
                    variation="default"
                    required
                    />}
                <Button type="submit" variation="primary">Change Password</Button>
                    </Flex>
                    </Card>
                </View>
                    */}
            </Flex>
                    
        </View>
    )
}
export default ProfileInfo;
