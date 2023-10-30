/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, SearchField, Text } from "@aws-amplify/ui-react";
export default function SearchSubmission(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="24px"
      direction="column"
      width="823px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      borderRadius="8px"
      padding="32px 32px 32px 32px"
      backgroundColor="rgba(250,250,250,1)"
      {...getOverrideProps(overrides, "SearchSubmission")}
      {...rest}
    >
      <Flex
        gap="0"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Heading")}
      >
        <Text
          fontFamily="Inter"
          fontSize="48px"
          fontWeight="300"
          color="rgba(13,26,38,1)"
          lineHeight="60px"
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
          children="Search"
          {...getOverrideProps(overrides, "label")}
        ></Text>
      </Flex>
      <SearchField
        width="unset"
        height="unset"
        placeholder="Search by ID, email or video link"
        shrink="0"
        alignSelf="stretch"
        size="default"
        isDisabled={false}
        labelHidden={true}
        variation="default"
        {...getOverrideProps(overrides, "SearchField")}
      ></SearchField>
    </Flex>
  );
}
