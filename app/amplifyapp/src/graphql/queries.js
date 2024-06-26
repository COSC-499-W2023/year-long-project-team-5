/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubmission = /* GraphQL */ `
  query GetSubmission($id: ID!) {
    getSubmission(id: $id) {
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
export const listSubmissions = /* GraphQL */ `
  query ListSubmissions(
    $filter: ModelSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubmissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        adminId
        note
        submittedAt
        otpCode
        adminName
        createdAt
        updatedAt
        submissionVideoId
        submissionUserId
        __typename
        User {
          id
          email
          name
          createdAt
          updatedAt
          __typename
        }
        Video {
          id
          videoURL
          createdAt
          updatedAt
          __typename
        }
      }
      nextToken
      __typename
    }
  }
`;
export const submissionByOtp = /* GraphQL */ `
  query SubmissionByOtp(
    $otpCode: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    submissionByOtp(
      otpCode: $otpCode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        adminId
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
      nextToken
      __typename
    }
  }
`;
export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
      id
      videoURL
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        videoURL
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
