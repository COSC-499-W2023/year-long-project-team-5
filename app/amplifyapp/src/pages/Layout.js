import { Outlet, useNavigate } from "react-router-dom";
import {NavBar} from '../my-components/NavBar';
import React, { useEffect, useState } from "react";
import { fetchUserAttributes } from 'aws-amplify/auth';
import {Button, useTheme, useAuthenticator,View, Flex, Tabs, Text, Link as AmplifyLink} from '@aws-amplify/ui-react';

/**
 * Layout TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Layout></Layout>
 */
export function Layout(){
    const {user, route, signOut} = useAuthenticator((context) => [
        context.user,
        context.route,
        context.signOut,
    ]);

    const [attributes, setAttributes] = useState(null);
    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const userAttributes = await fetchUserAttributes();
                setAttributes(userAttributes);
            } catch (error) {
                // Handle any errors
            }
        };

        fetchAttributes();
    }, []);

    const navigate = useNavigate();
    function logOut() {
        signOut();
        navigate('/login');
    }
    const {tokens} = useTheme();
    return(
        <View className="App">
            <Flex boxShadow={tokens.shadows.medium} padding={tokens.space.small} justifyContent='space-between' alignItems='center' marginBottom={tokens.space.large}>
                <Flex direction="row">
                    <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                    <AmplifyLink onClick={()=> navigate('/Dashboard')}> Dashboard</AmplifyLink>
                    <AmplifyLink onClick={()=> navigate('/Submission')}>Request a video</AmplifyLink>
                </Flex>
                {route !== 'authenticated' ? (
                    <Button onClick={() => navigate('/Login')}> Login</Button>
                ):
                    <Flex direction='row' alignItems='center'>
                        <AmplifyLink onClick={()=>navigate('/Profile')}>Hello, {attributes ? attributes.name : ""}!</AmplifyLink>
                        <Button onClick={() => logOut()}> Sign Out</Button>
                    </Flex>
                }
            </Flex>
            <Outlet/>
        </View>
    )
}