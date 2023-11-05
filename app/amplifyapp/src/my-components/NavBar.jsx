import * as React from "react";
import {Card, Flex, Heading, Link, Button, useTheme, View, Text, Tabs, TabItem} from "@aws-amplify/ui-react";

export const NavBar = (props) => {
    const {tokens} = useTheme()
    return (
        <View
        backgroundColor={tokens.colors.background.primary}
        padding={tokens.space.large}
        >
            <Tabs justifyContent="flex-start">
                <TabItem title="Home">
                    {props.home}
                </TabItem>
                <TabItem title="Dashboard">
                    {props.dashboard}
                </TabItem>
                <TabItem title="Settings" isDisabled={true}>
                    {props.settings}
                </TabItem>
            </Tabs>
        </View>
    )
}