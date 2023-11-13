import { Outlet, useNavigate } from "react-router-dom";
import {NavBar} from '../my-components/NavBar';
import * as React from "react";
import {Button, useAuthenticator,View, Flex, Tabs, TabItem, Text, Link as AmplifyLink} from '@aws-amplify/ui-react';

export function Layout(){
    const {route, signOut} = useAuthenticator((context) => [
        context.route,
        context.signOut
    ]);
    const navigate = useNavigate();

    function logOut() {
        signOut();
        navigate('/login');
    }

    return(
        <View className="App">
            <Flex justifyContent='space-between' alignItems='center'>
                <Flex direction="row">
                    <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                    <AmplifyLink onClick={()=> navigate('/Dashboard')}> Dashboard</AmplifyLink>
                    <AmplifyLink onClick={()=> navigate('/')}>Request a video</AmplifyLink>
                </Flex>
                <Flex direction='row' alignItems='center'>
                    <Text>Hello, user!</Text>
                    <Button> Sign Out</Button>
                </Flex>
            </Flex>
            <Outlet/>
        </View>
    )
}