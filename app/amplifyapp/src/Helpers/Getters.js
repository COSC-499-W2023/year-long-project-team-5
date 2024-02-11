import { listSubmissions, submissionByOtp } from "../graphql/queries";
import {API} from 'aws-amplify';

// fetches submissions from the database
export async function getSubmissions() {
      const apiData = await API.graphql({ query: listSubmissions });
      return apiData.data.listSubmissions.items;
}

//fetches a submission by the OTP
export async function getSubmissionByOTP(givenOTP) {
      const apiData = await API.graphql({ query: submissionByOtp, variables: { otpCode: givenOTP }});
      return apiData.data.submissionByOtp.items
}