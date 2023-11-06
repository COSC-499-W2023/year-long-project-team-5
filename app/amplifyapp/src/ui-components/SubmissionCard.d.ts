/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type SubmissionCardOverridesProps = {
    SubmissionCard?: PrimitiveOverrideProps<FlexProps>;
    Heading?: PrimitiveOverrideProps<FlexProps>;
    label252458?: PrimitiveOverrideProps<TextProps>;
    "Card Contents"?: PrimitiveOverrideProps<FlexProps>;
    "Label Row"?: PrimitiveOverrideProps<FlexProps>;
    "Email address:"?: PrimitiveOverrideProps<TextProps>;
    "Date Sent:"?: PrimitiveOverrideProps<TextProps>;
    "Video Submitted:"?: PrimitiveOverrideProps<TextProps>;
    "Data field"?: PrimitiveOverrideProps<FlexProps>;
    Button288994?: PrimitiveOverrideProps<ButtonProps>;
    "date sent"?: PrimitiveOverrideProps<TextProps>;
    "date received"?: PrimitiveOverrideProps<TextProps>;
    Button2881001?: PrimitiveOverrideProps<ButtonProps>;
    Button174833?: PrimitiveOverrideProps<FlexProps>;
    "Open Icon"?: PrimitiveOverrideProps<ViewProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
    label174836?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type SubmissionCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: SubmissionCardOverridesProps | undefined | null;
}>;
export default function SubmissionCard(props: SubmissionCardProps): React.ReactElement;
