/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type VideoCreateFormInputValues = {
    videoURL?: string;
};
export declare type VideoCreateFormValidationValues = {
    videoURL?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VideoCreateFormOverridesProps = {
    VideoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    videoURL?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VideoCreateFormProps = React.PropsWithChildren<{
    overrides?: VideoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VideoCreateFormInputValues) => VideoCreateFormInputValues;
    onSuccess?: (fields: VideoCreateFormInputValues) => void;
    onError?: (fields: VideoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VideoCreateFormInputValues) => VideoCreateFormInputValues;
    onValidate?: VideoCreateFormValidationValues;
} & React.CSSProperties>;
export default function VideoCreateForm(props: VideoCreateFormProps): React.ReactElement;
