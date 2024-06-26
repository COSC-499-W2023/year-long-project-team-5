import { listSubmissions, submissionByOtp, getUser } from "../graphql/queries";
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth"

// fetches submissions from the database
export async function getSubmissions() {
      // add filter for only returning submissions you created
      // also limit to 1000 submissions, we need to implement pagination; this is a hacky way to get more submissions from one request
      const apiData = await API.graphql(graphqlOperation(listSubmissions,
            {
                  filter: {
                        adminId: { eq: Auth.userAttributes.username }
                  }, limit: 1000
            }
      ));
      return apiData.data.listSubmissions.items;
}

//fetches a submission by the OTP
export async function getSubmissionByOTP(givenOTP) {
      const apiData = await API.graphql({ query: submissionByOtp, variables: { otpCode: givenOTP }, authMode: GRAPHQL_AUTH_MODE.API_KEY });
      return apiData.data.submissionByOtp.items
}

export async function getUserByID(queryID) {
      const apiData = await API.graphql({ query: getUser, variables: { id: queryID }, authMode: GRAPHQL_AUTH_MODE.API_KEY });
      return apiData.data.getUser
}