import React, { useState, useEffect } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Authenticator, useAuthenticator} from "@aws-amplify/ui-react"


import {Amplify, Auth, API, Storage } from 'aws-amplify';

import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
    Card, 
    useTheme
  } from '@aws-amplify/ui-react';
  import { listNotes } from "../graphql/queries";

export function Profile(){
    const { tokens } = useTheme();
    const {user, route, signOut} = useAuthenticator((context) => [
        context.user,
        context.route,
        context.signOut,
    ]);
    const navigate = useNavigate();
    return(
        <View className="App">
        <Heading level={1}>Welcome, {user.attributes.name}!</Heading>
        <View as="form" margin="1rem 3rem" alignContent = "center" padding={tokens.space.medium}>
        <Heading textAlign = 'left' level={4}>Edit Profile</Heading>
          <Card variation="elevated">
          <Flex direction="column" justifyContent = "center" textAlign = "left">
          {<TextField
              name="name"
              placeholder={user.attributes.name}
              label="Name"
              variation="default"
              required
          />}
            <TextField
              name="name"
              placeholder={user.attributes.email}
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
        </View>
        <View as="form" margin="1rem 3rem" alignContent = "center" padding={tokens.space.medium}>
        <Heading textAlign = 'left' level={4}>Change password</Heading>
          <Card variation="elevated">
          <Flex direction="column" justifyContent = "center" textAlign = "left">
          {<TextField
              name="currPassword"
              placeholder="Current password"
              label="currPassword"
              labelHidden
              variation="default"
              required
          />}
            <TextField
              name="newPass1"
              placeholder="New password"
              label="newPass1"
              labelHidden
              variation="default"
              required
            />
            {<TextField
              name="newPass2"
              placeholder="Confirm your new password"
              label="newPass2"
              labelHidden
              variation="default"
              required
            />}
           <Button type="submit" variation="primary">Change Password</Button>
            </Flex>
            </Card>
        </View>
    </View>
    )
}