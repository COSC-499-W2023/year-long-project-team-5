/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReceiverNavOverridesProps = {
    ReceiverNav?: PrimitiveOverrideProps<FlexProps>;
    "Frame 5"?: PrimitiveOverrideProps<FlexProps>;
    Home?: PrimitiveOverrideProps<TextProps>;
    actions?: PrimitiveOverrideProps<FlexProps>;
    Button1741104?: PrimitiveOverrideProps<FlexProps>;
    Button1741105?: PrimitiveOverrideProps<FlexProps>;
} & EscapeHatchProps;
export declare type ReceiverNavProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: ReceiverNavOverridesProps | undefined | null;
}>;
export default function ReceiverNav(props: ReceiverNavProps): React.ReactElement;
