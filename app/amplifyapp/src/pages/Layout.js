import { Outlet, useNavigate } from "react-router-dom";
import {NavBar} from '../my-components/NavBar';
import DarkLightToggle from "../my-components/DarkLightToggle"
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
    const [colorMode, setColorMode] = React.useState('light');
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