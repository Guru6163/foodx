/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CreateUSerInputValues = {
    name?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    lat?: number;
    lng?: number;
    sub?: string;
};
export declare type CreateUSerValidationValues = {
    name?: ValidationFunction<string>;
    phoneNumber?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    lat?: ValidationFunction<number>;
    lng?: ValidationFunction<number>;
    sub?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreateUSerOverridesProps = {
    CreateUSerGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNumber?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    lat?: PrimitiveOverrideProps<TextFieldProps>;
    lng?: PrimitiveOverrideProps<TextFieldProps>;
    sub?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CreateUSerProps = React.PropsWithChildren<{
    overrides?: CreateUSerOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CreateUSerInputValues) => CreateUSerInputValues;
    onSuccess?: (fields: CreateUSerInputValues) => void;
    onError?: (fields: CreateUSerInputValues, errorMessage: string) => void;
    onChange?: (fields: CreateUSerInputValues) => CreateUSerInputValues;
    onValidate?: CreateUSerValidationValues;
} & React.CSSProperties>;
export default function CreateUSer(props: CreateUSerProps): React.ReactElement;
