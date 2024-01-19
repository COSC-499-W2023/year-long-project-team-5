import { Outlet, useNavigate } from "react-router-dom";
import NavBar from '../my-components/NavBar';
import  NavBarSignedOut  from '../my-components/NavBarSignedOut';
import * as React from "react";
import {Button, useTheme, useAuthenticator,View, Flex, Tabs, TabItem, Text, Link as AmplifyLink} from '@aws-amplify/ui-react';

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
    const navigate = useNavigate();
    function logOut() {
        signOut();
        navigate('/login');
    }
    const {tokens} = useTheme();
    return(
        <View className="App">
            {route !== 'authenticated' ? (
                    <NavBarSignedOut/>
                ):
            <NavBar/>    
            }
        </View>
    )
}