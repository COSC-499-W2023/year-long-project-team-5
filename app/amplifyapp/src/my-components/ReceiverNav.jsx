import * as React from "react";
import { Flex, Link, Button, useTheme, View, Icon } from "@aws-amplify/ui-react";
import { HiHome } from 'react-icons/hi';

/**
 * This component displays the header for all pages.
 * @param {Object} props - component props
 * @param {string} props.name - The name of the user
 * @param {boolean} props.loggedIn - Whether the user is logged in
 * @returns JSX.Element
 * @example
 * <ReceiverNav name = {"John"} loggedIn={true}></ReceiverNav>
 */

const ReceiverNav = (props) => {
    const { tokens } = useTheme();
    return (
        <View backgroundColor={tokens.colors.primary} height="70px" padding={'.2rem 2rem'} boxShadow={'small'}>
            <Flex height="100%" direction='row' justifyContent='space-between'>
                <Link alignSelf="center"><Icon ariaLabel="Javascript" as={HiHome} /> Home</Link>
                <h3>{props.name && props.loggedIn ? "Hello " + props.name : null}</h3>
                <View alignSelf="center">
                    {!props.loggedIn ?
                        <Button variation="link" label='Log in' marginRight='1rem'> Log in </Button>
                        : null}
                    {!props.loggedIn ?
                        <Button variation="primary" label='Sign up'> Sign Up </Button>
                        : null}
                </View>
            </Flex>
        </View>
    )
}

export default ReceiverNav;