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

const NavBarSignedOut = (props) => {
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
    return (
        <View
        backgroundColor={tokens.colors.background.primary}
        >
           <Flex boxShadow={tokens.shadows.medium} padding={tokens.space.small} justifyContent='space-between' alignItems='center' marginBottom={tokens.space.large}>
                <Flex direction="row">
                    <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                </Flex>
            <Button onClick={() => navigate('/Login')}> Login</Button>
            </Flex>
            <Outlet/>
        </View>
    )
}

export default NavBarSignedOut;