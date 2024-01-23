import { Outlet, useNavigate } from "react-router-dom";
import NavBar from '../my-components/NavBar';
import  NavBarMobile  from '../my-components/NavBarMobile';
import DarkLightToggle from "../my-components/DarkLightToggle"
import React, { useState, useEffect } from "react";
import {Button, ToggleButton, Theme,useTheme, ThemeProvider, useAuthenticator,View, Flex, Tabs, TabItem, Text, defaultDarkModeOverride, Link as AmplifyLink} from '@aws-amplify/ui-react';

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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    const {tokens} = useTheme();
    const [colorMode, setColorMode] = React.useState('light');

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return(
        <ThemeProvider theme={theme} colorMode={colorMode}>
        <View className="App" backgroundColor={tokens.colors.background.primary}>
            {isMobile ? (
                    <NavBarMobile/>
                ):
            <NavBar/>    
            }
        </View>
        </ThemeProvider>
    )
}