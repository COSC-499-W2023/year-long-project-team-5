/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function SubmissionCard(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="24px"
      direction="column"
      width="827px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      borderRadius="8px"
      padding="32px 29px 32px 29px"
      backgroundColor="rgba(250,250,250,1)"
      {...getOverrideProps(overrides, "SubmissionCard")}
      {...rest}
    >
      <Flex
        gap="0"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 13px 0px 13px"
        {...getOverrideProps(overrides, "Heading")}
      >
        <Text
          fontFamily="Inter"
          fontSize="24px"
          fontWeight="600"
          color="rgba(13,26,38,1)"
          lineHeight="30px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="ID# 1010"
          {...getOverrideProps(overrides, "label252458")}
        ></Text>
      </Flex>
      <Flex
        gap="14px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflow="hidden"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="10px 0px 9px 0px"
        backgroundColor="rgba(255,255,255,0)"
        {...getOverrideProps(overrides, "Card Contents")}
      >
        <Flex
          gap="25px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          overflow="hidden"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 15px 0px 15px"
          {...getOverrideProps(overrides, "Label Row")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="600"
            color="rgba(0,0,0,1)"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            grow="1"
            shrink="1"
            basis="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Email address:"
            {...getOverrideProps(overrides, "Email address:")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="600"
            color="rgba(0,0,0,1)"
            lineHeight="24px"
            textAlign="center"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            grow="1"
            shrink="1"
            basis="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Date Sent:"
            {...getOverrideProps(overrides, "Date Sent:")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="600"
            color="rgba(0,0,0,1)"
            lineHeight="24px"
            textAlign="center"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            grow="1"
            shrink="1"
            basis="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Video Submitted:"
            {...getOverrideProps(overrides, "Video Submitted:")}
          ></Text>
        </Flex>
        <Flex
          gap="25px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          overflow="hidden"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 15px 0px 15px"
          {...getOverrideProps(overrides, "Data field")}
        >
          <Button
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            padding="5px 0px 5px 0px"
            grow="1"
            shrink="1"
            basis="0"
            size="default"
            isDisabled={false}
            variation="link"
            children="email@gmail.com"
            {...getOverrideProps(overrides, "Button288994")}
          ></Button>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="300"
            color="rgba(0,0,0,1)"
            lineHeight="24px"
            textAlign="center"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            grow="1"
            shrink="1"
            basis="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="2031-10-12"
            {...getOverrideProps(overrides, "date sent")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="300"
            color="rgba(0,0,0,1)"
            lineHeight="24px"
            textAlign="center"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            grow="1"
            shrink="1"
            basis="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="2031-10-15"
            {...getOverrideProps(overrides, "date received")}
          ></Text>
        </Flex>
        <Button
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          padding="5px 15px 5px 15px"
          shrink="0"
          alignSelf="stretch"
          size="default"
          isDisabled={false}
          variation="link"
          children="Video Link"
          {...getOverrideProps(overrides, "Button2881001")}
        ></Button>
      </Flex>
      <Flex
        gap="3px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        border="1px SOLID rgba(0,0,0,0)"
        borderRadius="4px"
        padding="7px 15px 7px 15px"
        backgroundColor="rgba(4,125,149,1)"
        {...getOverrideProps(overrides, "Button174833")}
      >
        <View
          width="21px"
          height="21px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Open Icon")}
        >
          <Icon
            width="21px"
            height="21px"
            viewBox={{ minX: 0, minY: 0, width: 21, height: 21 }}
            paths={[
              {
                d: "M18.6667 18.6667L2.33333 18.6667L2.33333 2.33333L10.5 2.33333L10.5 0L2.33333 0C1.03833 0 0 1.05 0 2.33333L0 18.6667C0 19.95 1.03833 21 2.33333 21L18.6667 21C19.95 21 21 19.95 21 18.6667L21 10.5L18.6667 10.5L18.6667 18.6667ZM12.8333 0L12.8333 2.33333L17.0217 2.33333L5.55333 13.8017L7.19833 15.4467L18.6667 3.97833L18.6667 8.16667L21 8.16667L21 0L12.8333 0Z",
                fill: "rgba(255,255,255,1)",
                fillRule: "nonzero",
              },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="0px"
            left="-1px"
            {...getOverrideProps(overrides, "Vector")}
          ></Icon>
        </View>
        <Text
          fontFamily="Inter"
          fontSize="20px"
          fontWeight="700"
          color="rgba(255,255,255,1)"
          lineHeight="30px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Open Submission"
          {...getOverrideProps(overrides, "label174836")}
        ></Text>
      </Flex>
    </Flex>
  );
}
