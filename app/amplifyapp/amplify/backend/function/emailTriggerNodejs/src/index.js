/* Amplify Params - DO NOT EDIT
  API_YEARLONGPROJECTTEAM5_GRAPHQLAPIENDPOINTOUTPUT
  API_YEARLONGPROJECTTEAM5_GRAPHQLAPIIDOUTPUT
  API_YEARLONGPROJECTTEAM5_GRAPHQLAPIKEYOUTPUT
  AUTH_YEARLONGPROJECTTEAM5_USERPOOLID
  ENV
  REGION
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const GRAPHQL_ENDPOINT = process.env.API_YEARLONGPROJECTTEAM5_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'ca-central-1';
const { Sha256 } = crypto;

const ses = new SESClient({ region: AWS_REGION });
const query = /* GraphQL */ `
query MyQuery {
  getSubmission(id: "d85e0053-19e2-49ea-98bb-f3b16bbabab8") {
    id
    User {
      id
      email
    }
  }
}

`;


let send_email = async(body) => {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ["corklebeck@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: "test body" },
      },

      Subject: { Data: "Test Email" },
    },
    Source: "corklebeck@gmail.com",
  });

  try {
    let response = await ses.send(command);
    console.log("EMAIL RESPONSE:",response)
    // process data.
    return response;
  }
  catch (error) {
    console.log("EMAIL ERROR:", error)
    // error handling.
  }
  finally {
    console.log("Finally done sending email")
    // finally.
  }
};


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    await send_email(body)
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // }, 
    body: JSON.stringify(body)
  };
};