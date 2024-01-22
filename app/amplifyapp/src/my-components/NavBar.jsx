import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {Button, useTheme, useAuthenticator,View, Flex, Link as AmplifyLink } from '@aws-amplify/ui-react';
/**
 * NavBar component used to display NavBar on larger displays (desktop), 
 * for users in both a logged in and logged out state
 * @component {Object} NavBar
 * @returns JSX.Element
 * @example
 * <NavBar/>
 */

const NavBar = (props) => {
    const {user, route, signOut} = useAuthenticator((context) => [
        context.user,
        context.route,
        context.signOut,
    ]);
    const navigate = useNavigate();
    function logOut() {
        signOut();
        navigate('/');
    }
    const {tokens} = useTheme();
    return (
        <View
        backgroundColor={tokens.colors.background.primary}
        >
           <Flex boxShadow={tokens.shadows.medium} padding={tokens.space.small} justifyContent='space-between' alignItems='center' marginBottom={tokens.space.large}>
                <Flex direction="row">
                    {route !== 'authenticated' ? (
                        <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                    ):
                        <Flex>
                            <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                            <AmplifyLink onClick={()=> navigate('/Dashboard')}> Dashboard</AmplifyLink>
                            <AmplifyLink onClick={()=> navigate('/Submission')}> Request a video</AmplifyLink>
                        </Flex>
                    }
                </Flex>
                {route !== 'authenticated' ? (
                    <Button onClick={() => navigate('/Login')}> Login</Button>
                ):
                <Flex direction='row' alignItems='center'>
                    <AmplifyLink onClick={()=> navigate('/Profile')}>Hello, {user.attributes.name}!</AmplifyLink>
                    <Button onClick={() => logOut()}> Sign Out</Button>
                </Flex>
                }
            </Flex>
            <Outlet/>
        </View>
    )
}

export default NavBar;