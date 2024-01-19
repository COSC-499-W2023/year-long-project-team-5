import { Outlet, useNavigate } from "react-router-dom";
import {NavBar} from '../my-components/NavBar';
import * as React from "react";
import {Button, defaultDarkModeOverride, ToggleButton, Theme, ThemeProvider, useTheme, useAuthenticator,View, Flex, Tabs, TabItem, Text, Link as AmplifyLink} from '@aws-amplify/ui-react';

/**
 * Layout TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Layout></Layout>
 */
export function Layout(){
    const [colorMode, setColorMode] = React.useState('light');
    const [isPressed, setIsPressed] = React.useState(false);
    const theme = {
      name: 'my-theme',
      overrides: [defaultDarkModeOverride],
    };
  
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
        <ThemeProvider theme={theme} colorMode={colorMode}>
            <View className="App" backgroundColor={tokens.colors.background.primary} minHeight='100vh'>
                <Flex backgroundColor={tokens.colors.primary} boxShadow={tokens.shadows.small} padding={tokens.space.small} justifyContent='space-between' alignItems='center' marginBottom={tokens.space.large}>
                    <Flex direction="row">
                        <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                        <AmplifyLink onClick={()=> navigate('/Dashboard')}> Dashboard</AmplifyLink>
                        <AmplifyLink onClick={()=> navigate('/Submission')}>Request a video</AmplifyLink>
                    </Flex>
                    {route !== 'authenticated' ? (
                        <Flex direction='row' alignItems='center'>
                            {/* <Button onClick={() => setColorMode('dark')}>{colorMode === 'dark' ? "Dark Mode" : "Light Mode"}</Button> */}
                            <ToggleButton 
                            isPressed={isPressed}
                            onChange ={()=> setIsPressed(!isPressed)} 
                            onClick={() => {colorMode === 'light' ? setColorMode('dark') : setColorMode('light')}}>{isPressed ? "Dark" : "Light"} </ToggleButton>
                            <Button onClick={() => navigate('/Login')}> Login</Button>
                        </Flex>
                    ):
                        <Flex direction='row' alignItems='center'>
                            {/* <Button onClick={() => {colorMode === 'light' ? setColorMode('dark') : setColorMode('light')}}>{colorMode === 'dark' ? "Dark Mode" : "Light Mode"}</Button> */}
                            <ToggleButton 
                            isPressed={isPressed}
                            onChange ={()=> setIsPressed(!isPressed)} 
                            onClick={() => {colorMode === 'light' ? setColorMode('dark') : setColorMode('light')}}> {isPressed ? "Light Mode" : "Dark Mode"}</ToggleButton>
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