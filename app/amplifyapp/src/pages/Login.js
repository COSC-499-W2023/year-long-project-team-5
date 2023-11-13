import { Authenticator, Flex } from "@aws-amplify/ui-react"
 
export function Login(){
    return (
        <Flex direction = 'column' className="auth-wrapper" >
            <Authenticator></Authenticator>
        </Flex>
    )
}