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
export declare type SubmissionRequestUpdateFormInputValues = {
    adminID?: string;
    userEmail?: string;
    note?: string;
};
export declare type SubmissionRequestUpdateFormValidationValues = {
    adminID?: ValidationFunction<string>;
    userEmail?: ValidationFunction<string>;
    note?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubmissionRequestUpdateFormOverridesProps = {
    SubmissionRequestUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    adminID?: PrimitiveOverrideProps<TextFieldProps>;
    userEmail?: PrimitiveOverrideProps<TextFieldProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SubmissionRequestUpdateFormProps = React.PropsWithChildren<{
    overrides?: SubmissionRequestUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    submissionRequest?: any;
    onSubmit?: (fields: SubmissionRequestUpdateFormInputValues) => SubmissionRequestUpdateFormInputValues;
    onSuccess?: (fields: SubmissionRequestUpdateFormInputValues) => void;
    onError?: (fields: SubmissionRequestUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubmissionRequestUpdateFormInputValues) => SubmissionRequestUpdateFormInputValues;
    onValidate?: SubmissionRequestUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SubmissionRequestUpdateForm(props: SubmissionRequestUpdateFormProps): React.ReactElement;
