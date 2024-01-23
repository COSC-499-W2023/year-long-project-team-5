import NavBar from '../my-components/NavBar';
import React from "react";
import {useTheme, ThemeProvider,  View,  defaultDarkModeOverride, Link as AmplifyLink} from '@aws-amplify/ui-react';

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
    const {tokens} = useTheme();
    const [colorMode, setColorMode] = React.useState('light');
    return(
        <ThemeProvider theme={theme} colorMode={colorMode}>
        <View className="App" backgroundColor={tokens.colors.background.primary}>
            <NavBar/>    
        </View>
        </ThemeProvider>
    )
}