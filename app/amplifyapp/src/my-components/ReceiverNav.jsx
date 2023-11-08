import * as React from "react";
import { Tabs, Flex, Heading, Link, Button, useTheme, View, Text, Icon, TabItem } from "@aws-amplify/ui-react";
import { HiHome } from 'react-icons/hi';

export const ReceiverNav = (props) => {
    const { tokens } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    return (
        <View backgroundColor={tokens.colors.primary} padding={'.2rem 2rem'} boxShadow={'small'}>
            <Flex direction='row' justifyContent='space-between'>
                <Link alignSelf='center'><Icon ariaLabel="Javascript" as={HiHome} /> Home</Link>
                <Text alignSelf='center'>{props.name !== null ?  "Hello " + props.name : null}</Text>
                <View>
                    {!isLoggedIn ?
                        <Button variation="link" label='Log in' marginRight='1rem'> Log in </Button>
                        : null}
                    {!isLoggedIn ?
                        <Button variation="primary" label='Sign up'> Sign Up </Button>
                        : null}
                </View>
            </Flex>
        </View>
    )
}