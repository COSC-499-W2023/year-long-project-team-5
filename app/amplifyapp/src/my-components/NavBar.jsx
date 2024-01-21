import * as React from "react";
import {Card, Flex, Heading, Link, Button, useTheme, View, Text, Tabs} from "@aws-amplify/ui-react";

/**
 * navbar TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <NavBar></NavBar>
 */

const NavBar = (props) => {
    const {tokens} = useTheme()
    return (
        <View
        backgroundColor={tokens.colors.background.primary}
        padding={tokens.space.large}
        >
            <Tabs justifyContent="flex-start">
                <Tabs.Item title="Home">
                    {props.home}
                </Tabs.Item>
                <Tabs.Item title="Dashboard">
                    {props.dashboard}
                </Tabs.Item>
                <Tabs.Item title="Settings" isDisabled={true}>
                    {props.settings}
                </Tabs.Item>
            </Tabs>
        </View>
    )
}

export default NavBar;