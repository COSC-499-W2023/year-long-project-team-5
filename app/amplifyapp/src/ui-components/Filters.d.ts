/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type FiltersOverridesProps = {
    Filters?: PrimitiveOverrideProps<FlexProps>;
    SelectField252761?: PrimitiveOverrideProps<FlexProps>;
    label252762?: PrimitiveOverrideProps<TextProps>;
    InputGroup252764?: PrimitiveOverrideProps<FlexProps>;
    Input252765?: PrimitiveOverrideProps<FlexProps>;
    placeholder252766?: PrimitiveOverrideProps<TextProps>;
    "\uD83D\uDD12Icon252767"?: PrimitiveOverrideProps<ViewProps>;
    SelectField252814?: PrimitiveOverrideProps<FlexProps>;
    label252815?: PrimitiveOverrideProps<TextProps>;
    InputGroup252817?: PrimitiveOverrideProps<FlexProps>;
    Input252818?: PrimitiveOverrideProps<FlexProps>;
    placeholder252819?: PrimitiveOverrideProps<TextProps>;
    "\uD83D\uDD12Icon252820"?: PrimitiveOverrideProps<ViewProps>;
    Button?: PrimitiveOverrideProps<FlexProps>;
    label252869?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type FiltersProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: FiltersOverridesProps | undefined | null;
}>;
export default function Filters(props: FiltersProps): React.ReactElement;
