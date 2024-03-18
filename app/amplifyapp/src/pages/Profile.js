import React, { Auth } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator} from "@aws-amplify/ui-react"
import ProfileInfo from "../my-components/Profile";
import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
    Card
  } from '@aws-amplify/ui-react';

export function Profile(){
    const { user } = useAuthenticator((context) => [
        context.user,
        context.route,
        context.signOut
    ]);
    return(
      <View className="App">
        <ProfileInfo 
          name = {user.attributes.name}
          email = {user.attributes.email}
          id = {user.getUsername()}
        />
      </View>
    )
}