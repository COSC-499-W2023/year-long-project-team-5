import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {Button, useTheme, useAuthenticator,View, Flex, Tabs, TabItem, Text, Link as AmplifyLink} from '@aws-amplify/ui-react';
/**
 * navbar TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <NavBar></NavBar>
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
                    <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                    <AmplifyLink onClick={()=> navigate('/Dashboard')}> Dashboard</AmplifyLink>
                    <AmplifyLink onClick={()=> navigate('/Submission')}>Request a video</AmplifyLink>
                </Flex>
                    <Flex direction='row' alignItems='center'>
                        <AmplifyLink onClick={()=> navigate('/Profile')}>Hello, {user.attributes.name}!</AmplifyLink>
                        <Button onClick={() => logOut()}> Sign Out</Button>
                    </Flex>
            </Flex>
            <Outlet/>
        </View>
    )
}

export default NavBar;