/**
 * Login TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Login></Login>
 */

import { Authenticator, Flex, useAuthenticator} from "@aws-amplify/ui-react"
import {useEffect} from "react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate, useLocation } from "react-router";
export function Login(){
    const {route} = useAuthenticator((context) => [context.route])
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";

    useEffect(()=> {
        if(route === "authenticated")
            navigate(from, {replace:true});
    }, [route, navigate, from]);
    return (
        <Flex direction = 'column' className="auth-wrapper" >
            <Authenticator></Authenticator>
        </Flex>
    )
}