import NavBar from '../my-components/NavBar';
import React from "react";
import {useTheme,  View, Link as AmplifyLink} from '@aws-amplify/ui-react';

/**
 * Layout TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Layout></Layout>
 */
export function Layout(props){
    const {tokens} = useTheme();
    return(
        <View className="App" backgroundColor={tokens.colors.background.primary}>
            <NavBar colorMode = {props.colorMode} setColorMode={props.setColorMode}/>    
        </View>
    )
}