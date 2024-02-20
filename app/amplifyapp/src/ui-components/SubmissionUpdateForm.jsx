/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getSubmission } from "../graphql/queries";
import { updateSubmission } from "../graphql/mutations";
export default function SubmissionUpdateForm(props) {
  const {
    id: idProp,
    submission: submissionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    adminId: "",
    note: "",
    submittedAt: "",
  };
  const [adminId, setAdminId] = React.useState(initialValues.adminId);
  const [note, setNote] = React.useState(initialValues.note);
  const [submittedAt, setSubmittedAt] = React.useState(
    initialValues.submittedAt
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = submissionRecord
      ? { ...initialValues, ...submissionRecord }
      : initialValues;
    setAdminId(cleanValues.adminId);
    setNote(cleanValues.note);
    setSubmittedAt(cleanValues.submittedAt);
    setErrors({});
  };
  const [submissionRecord, setSubmissionRecord] =
    React.useState(submissionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getSubmission.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSubmission
        : submissionModelProp;
      setSubmissionRecord(record);
    };
    queryData();
  }, [idProp, submissionModelProp]);
  React.useEffect(resetStateValues, [submissionRecord]);
  const validations = {
    adminId: [],
    note: [],
    submittedAt: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          adminId: adminId ?? null,
          note: note ?? null,
          submittedAt: submittedAt ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateSubmission.replaceAll("__typename", ""),
            variables: {
              input: {
                id: submissionRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SubmissionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Admin id"
        isRequired={false}
        isReadOnly={false}
        value={adminId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              adminId: value,
              note,
              submittedAt,
            };
            const result = onChange(modelFields);
            value = result?.adminId ?? value;
          }
          if (errors.adminId?.hasError) {
            runValidationTasks("adminId", value);
          }
          setAdminId(value);
        }}
        onBlur={() => runValidationTasks("adminId", adminId)}
        errorMessage={errors.adminId?.errorMessage}
        hasError={errors.adminId?.hasError}
        {...getOverrideProps(overrides, "adminId")}
      ></TextField>
      <TextField
        label="Note"
        isRequired={false}
        isReadOnly={false}
        value={note}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              adminId,
              note: value,
              submittedAt,
            };
            const result = onChange(modelFields);
            value = result?.note ?? value;
          }
          if (errors.note?.hasError) {
            runValidationTasks("note", value);
          }
          setNote(value);
        }}
        onBlur={() => runValidationTasks("note", note)}
        errorMessage={errors.note?.errorMessage}
        hasError={errors.note?.hasError}
        {...getOverrideProps(overrides, "note")}
      ></TextField>
      <TextField
        label="Submitted at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={submittedAt && convertToLocal(new Date(submittedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              adminId,
              note,
              submittedAt: value,
            };
            const result = onChange(modelFields);
            value = result?.submittedAt ?? value;
          }
          if (errors.submittedAt?.hasError) {
            runValidationTasks("submittedAt", value);
          }
          setSubmittedAt(value);
        }}
        onBlur={() => runValidationTasks("submittedAt", submittedAt)}
        errorMessage={errors.submittedAt?.errorMessage}
        hasError={errors.submittedAt?.hasError}
        {...getOverrideProps(overrides, "submittedAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || submissionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || submissionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
