import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { VideoRequestForm } from "../my-components/VideoRequest";
import { View, Heading, useTheme, Flex } from "@aws-amplify/ui-react";

/**
 * Request TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Request></Request>
 */

export const Request = () =>{
  const {tokens} = useTheme();
    return(
      <View className="App">
        <Flex direction="row" padding={tokens.space.small} gap={"8em"} justifyContent={'center'}>
          <View>
            <Heading level={2} marginBottom={"15px"} textAlign={"left"}>Request Video</Heading>
            <VideoRequestForm/>
          </View>
          <View>
            <Heading level={2} textAlign={'left'} marginBottom={"15px"}> Email Preview </Heading>
            <View style={{width: "100%", justifyContent:"center", alignContent:"center", backgroundColor: "lightgrey", height: "597px"}}>
              Form would go here blah blah blah blah blah blah blah blah
            </View>
          </View>
        </Flex>
      </View>
    )
}