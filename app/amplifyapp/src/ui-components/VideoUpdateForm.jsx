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
import { getVideo } from "../graphql/queries";
import { updateVideo } from "../graphql/mutations";
export default function VideoUpdateForm(props) {
  const {
    id: idProp,
    video: videoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    videoURL: "",
  };
  const [videoURL, setVideoURL] = React.useState(initialValues.videoURL);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = videoRecord
      ? { ...initialValues, ...videoRecord }
      : initialValues;
    setVideoURL(cleanValues.videoURL);
    setErrors({});
  };
  const [videoRecord, setVideoRecord] = React.useState(videoModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getVideo.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getVideo
        : videoModelProp;
      setVideoRecord(record);
    };
    queryData();
  }, [idProp, videoModelProp]);
  React.useEffect(resetStateValues, [videoRecord]);
  const validations = {
    videoURL: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          videoURL: videoURL ?? null,
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
            query: updateVideo.replaceAll("__typename", ""),
            variables: {
              input: {
                id: videoRecord.id,
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
      {...getOverrideProps(overrides, "VideoUpdateForm")}
      {...rest}
    >
      <TextField
        label="Video url"
        isRequired={false}
        isReadOnly={false}
        value={videoURL}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              videoURL: value,
            };
            const result = onChange(modelFields);
            value = result?.videoURL ?? value;
          }
          if (errors.videoURL?.hasError) {
            runValidationTasks("videoURL", value);
          }
          setVideoURL(value);
        }}
        onBlur={() => runValidationTasks("videoURL", videoURL)}
        errorMessage={errors.videoURL?.errorMessage}
        hasError={errors.videoURL?.hasError}
        {...getOverrideProps(overrides, "videoURL")}
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
          isDisabled={!(idProp || videoModelProp)}
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
              !(idProp || videoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
