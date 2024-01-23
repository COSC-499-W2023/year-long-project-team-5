import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DarkLightToggle from "../my-components/DarkLightToggle"

import {Button, defaultDarkModeOverride, ToggleButton, Theme, ThemeProvider,useTheme, useAuthenticator,View, Flex, Link as AmplifyLink, Menu, MenuItem } from '@aws-amplify/ui-react';
/**
 * NavBar component used to display NavBar on smaller displays (mobile), 
 * for users in both a logged in and logged out state
 * @component {Object} NavBarMobile
 * @returns JSX.Element
 * @exampleNa
 * <NavBarMobile/>
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
    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
      };
      const [colorMode, setColorMode] = React.useState('light');
      React.useState('light');

    return (
        <ThemeProvider theme = {theme} colorMode = {colorMode}>
        <View
        class = "App" backgroundColor={tokens.colors.background.primary}
        >
                <Flex backgroundColor = {tokens.colors.primary} boxShadow={tokens.shadows.medium} padding={tokens.space.small} justifyContent='space-between' alignItems='center' marginBottom={tokens.space.large}>
                 
                {route !== 'authenticated' ? (
                <Menu direction = 'column'>    
                    <MenuItem onClick={()=> navigate('/')}> Home</MenuItem>
                </Menu>
                ):
                <Menu>       
                    <MenuItem onClick={()=> navigate('/')}> Home</MenuItem>
                    <MenuItem onClick={()=> navigate('/Dashboard')}>Dashboard</MenuItem>
                    <MenuItem onClick={()=> navigate('/Submission')}>Request a video</MenuItem>
                </Menu>
                }
                
                {route !== 'authenticated' ? (
                     <Flex direction='row' alignItems='center'>
                     <DarkLightToggle colorMode={colorMode} setColorMode={setColorMode}/>
                     <Button onClick={() => navigate('/Login')}> Login</Button>
                 </Flex>
                ): 
                <Flex direction='row' alignItems='center'>
                    <DarkLightToggle colorMode={colorMode} setColorMode={setColorMode}/>
                    <AmplifyLink onClick={()=> navigate('/Profile')}>Hello, {user.attributes.name}!</AmplifyLink>
                    <Button onClick={() => logOut()}> Sign Out</Button>
                </Flex>
                }
                </Flex>
            <Outlet/>
        </View>
        </ThemeProvider>
    )
}

export default NavBar;