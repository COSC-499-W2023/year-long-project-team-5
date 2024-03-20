import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { VideoRequestForm } from "../my-components/VideoRequest";
import { View, Heading, useTheme, Flex } from "@aws-amplify/ui-react";
import { RequestPreview } from "../my-components/RequestPreview";
import { useState } from "react";

/**
 * Request TODO: finish docs
 * @param {Object} props - prop1 name
 * @returns JSX.Element
 * @example
 * <Request></Request>
 */

export const Request = () =>{
  const {tokens} = useTheme();
  const [previewData, setPreviewData] = useState({});
    return(
      <View className="App">
        <Flex direction="row" padding={tokens.space.small} gap={"8em"} justifyContent={'center'}>
          <View>
            <Heading level={2} marginBottom={"15px"} textAlign={"left"}>Request Video</Heading>
            <VideoRequestForm setPreviewData={setPreviewData} previewData={previewData}/>
          </View>
          <View>
            <Heading level={2} textAlign={'left'} marginBottom={"15px"}> Email Preview </Heading>
            <View>
              <RequestPreview previewData={previewData}/>
            </View>
          </View>
        </Flex>
      </View>
    )
}