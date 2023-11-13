import { Outlet, useNavigate } from "react-router-dom";
import {NavBar} from '../my-components/NavBar';
import * as React from "react";
import {Button, useTheme, useAuthenticator,View, Flex, Tabs, TabItem, Text, Link as AmplifyLink} from '@aws-amplify/ui-react';

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
    const {tokens} = useTheme();
    return(
        <View className="App">
            <Flex boxShadow={tokens.shadows.medium} padding={tokens.space.small} justifyContent='space-between' alignItems='center'>
                <Flex direction="row">
                    <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                    <AmplifyLink onClick={()=> navigate('/Dashboard')}> Dashboard</AmplifyLink>
                    <AmplifyLink onClick={()=> navigate('/')}>Request a video</AmplifyLink>
                </Flex>
                {route !== 'authenticated' ? (
                    <Button onClick={() => navigate('/Login')}> Login</Button>
                ):
                    <Flex direction='row' alignItems='center'>
                        <Text>Hello, user!</Text>
                        <Button onClick={() => logOut()}> Sign Out</Button>
                    </Flex>
                }
            </Flex>
            <Outlet/>
        </View>
    )
}