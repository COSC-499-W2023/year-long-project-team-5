import React, { Auth } from "react";
import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate } from "react-router-dom";
import { useAuthenticator} from "@aws-amplify/ui-react"
import ProfileInfo from "../my-components/Profile";

import {
    Button,
    Flex,
    TextField,
    View,
    Heading,
    Card, 
    useTheme
  } from '@aws-amplify/ui-react';

export function Profile(){
    const {user, route, signOut} = useAuthenticator((context) => [
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