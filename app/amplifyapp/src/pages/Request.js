import "../App.css";
import "@aws-amplify/ui-react/styles.css";
import { VideoRequestForm } from "../my-components/VideoRequest";
import { View, Heading, useTheme, Flex } from "@aws-amplify/ui-react";
import { RequestPreview } from "../my-components/RequestPreview";
import { useState, useEffect } from "react";

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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1000);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return(
    <View className="App">
      <Flex direction="row" padding={tokens.space.small} marginTop={"4em"} gap={"5em"} justifyContent={'center'}>
        <View minHeight={"590px"}>
          <VideoRequestForm setPreviewData={setPreviewData} previewData={previewData} isMobile={isMobile}/>
        </View>
        {!isMobile && 
          <View minHeight={"590px"}>
            <RequestPreview previewData={previewData}/>
          </View>
        }
      </Flex>
    </View>
  )
}