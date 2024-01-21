import { Outlet, useNavigate } from "react-router-dom";
import NavBar from '../my-components/NavBar';
import  NavBarMobile  from '../my-components/NavBarMobile';
import React, { useState, useEffect } from "react";
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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    const {tokens} = useTheme();
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
        <View className="App">
            {isMobile ? (
                    <NavBarMobile/>
                ):
            <NavBar/>    
            }
        </View>
    )
}