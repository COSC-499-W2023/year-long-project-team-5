/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubmission = /* GraphQL */ `
  subscription OnCreateSubmission(
    $filter: ModelSubscriptionSubmissionFilterInput
  ) {
    onCreateSubmission(filter: $filter) {
      id
      adminId
      Video {
        id
        videoURL
        createdAt
        updatedAt
        __typename
      }
      User {
        id
        email
        name
        createdAt
        updatedAt
        __typename
      }
      note
      submittedAt
      otpCode
      adminName
      createdAt
      updatedAt
      submissionVideoId
      submissionUserId
      __typename
    }
  }
`;
export const onUpdateSubmission = /* GraphQL */ `
  subscription OnUpdateSubmission(
    $filter: ModelSubscriptionSubmissionFilterInput
  ) {
    onUpdateSubmission(filter: $filter) {
      id
      adminId
      Video {
        id
        videoURL
        createdAt
        updatedAt
        __typename
      }
      User {
        id
        email
        name
        createdAt
        updatedAt
        __typename
      }
      note
      submittedAt
      otpCode
      adminName
      createdAt
      updatedAt
      submissionVideoId
      submissionUserId
      __typename
    }
  }
`;
export const onDeleteSubmission = /* GraphQL */ `
  subscription OnDeleteSubmission(
    $filter: ModelSubscriptionSubmissionFilterInput
  ) {
    onDeleteSubmission(filter: $filter) {
      id
      adminId
      Video {
        id
        videoURL
        createdAt
        updatedAt
        __typename
      }
      User {
        id
        email
        name
        createdAt
        updatedAt
        __typename
      }
      note
      submittedAt
      otpCode
      adminName
      createdAt
      updatedAt
      submissionVideoId
      submissionUserId
      __typename
    }
  }
`;
export const onCreateVideo = /* GraphQL */ `
  subscription OnCreateVideo($filter: ModelSubscriptionVideoFilterInput) {
    onCreateVideo(filter: $filter) {
      id
      videoURL
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateVideo = /* GraphQL */ `
  subscription OnUpdateVideo($filter: ModelSubscriptionVideoFilterInput) {
    onUpdateVideo(filter: $filter) {
      id
      videoURL
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteVideo = /* GraphQL */ `
  subscription OnDeleteVideo($filter: ModelSubscriptionVideoFilterInput) {
    onDeleteVideo(filter: $filter) {
      id
      videoURL
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      email
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      email
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      email
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
