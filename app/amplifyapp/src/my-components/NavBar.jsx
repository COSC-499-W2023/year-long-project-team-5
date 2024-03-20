import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import DarkLightToggle from "../my-components/DarkLightToggle"
import {Button, useTheme, useAuthenticator,View, Flex, Link as AmplifyLink, Menu, MenuItem } from '@aws-amplify/ui-react';
/**
 * NavBar component used to display NavBar on larger displays (desktop), 
 * for users in both a logged in and logged out state
 * @component {Object} NavBar
 * @returns JSX.Element
 * @example
 * <NavBar/>
 */

export const NavBar = (props) => {
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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const {tokens} = useTheme();
    const location = useLocation()

    if(location.pathname === "/recording") {
      return null
    }
    return (
        <View
         backgroundColor={tokens.colors.background.primary}
        >
           {isMobile ? (
            <Flex backgroundColor = {tokens.colors.primary} boxShadow={tokens.shadows.medium} padding={tokens.space.small} justifyContent='space-between' alignItems='center' marginBottom={tokens.space.large}>
                 
                 {route !== 'authenticated' ? (
                 <Menu direction = 'column'>    
                     <MenuItem onClick={()=> navigate('/')}> Home</MenuItem>
                 </Menu>
                 ):
                 <Menu>       
                     <MenuItem onClick={()=> navigate('/')}> Home</MenuItem>
                     <MenuItem onClick={()=> navigate('/Submissions')}>Video Submissions</MenuItem>
                     <MenuItem onClick={()=> navigate('/Request')}>Request a video</MenuItem>
                 </Menu>
                 }
                 
                 {route !== 'authenticated' ? (
                      <Flex direction='row' alignItems='center'>
                      <DarkLightToggle colorMode={props.colorMode} setColorMode={props.setColorMode}/>
                      <Button onClick={() => navigate('/Login')}> Login</Button>
                  </Flex>
                 ): 
                 <Flex direction='row' alignItems='center'>
                     <DarkLightToggle colorMode={props.colorMode} setColorMode={props.setColorMode}/>
                     <AmplifyLink onClick={()=> navigate('/Profile')}>Hello, {user.attributes.name}!</AmplifyLink>
                     <Button onClick={() => logOut()}> Sign Out</Button>
                 </Flex>
                 }
                 </Flex>
           ):
           
           <Flex backgroundColor = {tokens.colors.primary} boxShadow={tokens.shadows.medium} padding={tokens.space.small} justifyContent='space-between' alignItems='center' marginBottom={tokens.space.large}>
                <Flex direction="row">
                    {route !== 'authenticated' ? (
                        <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                    ):
                        <Flex>
                            <AmplifyLink onClick={()=> navigate('/')}>Home</AmplifyLink>
                            <AmplifyLink onClick={()=> navigate('/Submissions')}> Video Submissions</AmplifyLink>
                            <AmplifyLink onClick={()=> navigate('/Request')}> Request a video</AmplifyLink>
                        </Flex>
                    }
                </Flex>
                {route !== 'authenticated' ? (
                    <Flex direction='row' alignItems='center'>
                    <DarkLightToggle colorMode={props.colorMode} setColorMode={props.setColorMode}/>
                    <Button onClick={() => navigate('/Login')}> Login</Button>
                    </Flex>
                ):
                <Flex direction='row' alignItems='center'>
                    <DarkLightToggle colorMode={props.colorMode} setColorMode={props.setColorMode}/>
                    <AmplifyLink onClick={()=> navigate('/Profile')}>Hello, {user.attributes.name}!</AmplifyLink>
                    <Button onClick={() => logOut()}> Sign Out</Button>
                </Flex>
                }
            </Flex>
            }
            <Outlet/>
        </View>
    )
}
export default NavBar;