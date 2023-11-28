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
export declare type SubmissionRequestCreateFormInputValues = {
    adminID?: string;
    userEmail?: string;
    note?: string;
};
export declare type SubmissionRequestCreateFormValidationValues = {
    adminID?: ValidationFunction<string>;
    userEmail?: ValidationFunction<string>;
    note?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubmissionRequestCreateFormOverridesProps = {
    SubmissionRequestCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    adminID?: PrimitiveOverrideProps<TextFieldProps>;
    userEmail?: PrimitiveOverrideProps<TextFieldProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SubmissionRequestCreateFormProps = React.PropsWithChildren<{
    overrides?: SubmissionRequestCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SubmissionRequestCreateFormInputValues) => SubmissionRequestCreateFormInputValues;
    onSuccess?: (fields: SubmissionRequestCreateFormInputValues) => void;
    onError?: (fields: SubmissionRequestCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubmissionRequestCreateFormInputValues) => SubmissionRequestCreateFormInputValues;
    onValidate?: SubmissionRequestCreateFormValidationValues;
} & React.CSSProperties>;
export default function SubmissionRequestCreateForm(props: SubmissionRequestCreateFormProps): React.ReactElement;
