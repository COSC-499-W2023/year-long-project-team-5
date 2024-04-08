/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Flex } from "@aws-amplify/ui-react";
export default function FilterTabs(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="6px"
      direction="row"
      width="823px"
      height="58px"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      padding="0px 31px 0px 31px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "FilterTabs")}
      {...rest}
    >
      <Button
        width="unset"
        height="unset"
        grow="1"
        shrink="1"
        basis="0"
        size="default"
        isDisabled={false}
        variation="default"
        children="Sent"
        {...getOverrideProps(overrides, "Button2651050")}
      ></Button>
      <Button
        width="unset"
        height="unset"
        grow="1"
        shrink="1"
        basis="0"
        size="default"
        isDisabled={false}
        variation="default"
        children="Received"
        {...getOverrideProps(overrides, "Button2651054")}
      ></Button>
    </Flex>
  );
}
