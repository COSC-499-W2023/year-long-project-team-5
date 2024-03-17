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


async function send_email(thedata) {
  let recipientName = thedata?.data?.getSubmission?.User?.name;
  let adminName = thedata?.data?.getSubmission?.adminName;
  let adminNote = thedata?.data?.getSubmission?.note
  let otpCode = thedata?.data?.getSubmission?.otpCode
  let email = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Blur - Validation Code</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
          }
          h1 {
              color: #1a73e8;
              font-size: 24px;
              margin-bottom: 20px;
          }
          p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 20px;
          }
          .code {
              font-size: 32px;
              font-weight: bold;
              color: #1a73e8;
              margin-bottom: 20px;
        text-align: center;
          }
          .footer {
              font-size: 12px;
              color: #777777;
              text-align: center;
              margin-top: 40px;
          }
          .footer img {
              max-width: 100px;
              margin-bottom: 10px; /* Adjust the spacing between logo and copyright */
          }
          .notes {
              background-color: #f0f0f0; /* Change background color */
              padding: 10px;
              border-left: 5px solid #1a73e8; /* Add border to make it stand out */
              margin-bottom: 20px;
              text-align: left; /* Align notes content to the left */
          }
          .record-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #1a73e8;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              margin-bottom: 20px; /* Add margin to the button for spacing */
        text-align: center;
          }
          .record-button:hover {
              background-color: #0d47a1;
          }
      .center-button {
              text-align: center; /* Center align the button */
          }
      </style>
  </head>
  <body>
  <div class="container">
      <p>Hello <span id="recipientName">${recipientName}</span>,</p>
  
      <p><span id="adminName">${adminName}</span> has requested you record a video to send them. These are the notes they left:</p>
  
      <div class="notes" id="adminNote">${adminNote}</div>
  
      <p>Your verification code for entering the platform is</p>
      <div class="code">${otpCode}</div>
  
    <div class="center-button">
      <a href="https://develop.d1tz6jy97536kp.amplifyapp.com/recording/" target=”_blank”  class="record-button">
      <span style="color:#ffffff;font-weight:bolder">Record Video</span>
      </a>
    </div>
      <div class="footer">
          <img src="https://i.imgur.com/ZXQ4FTp.gif" alt="Blur Logo">
          <br>
          &copy; 2023 Blur. All rights reserved.
      </div>
  </div>
  </body>
  </html>
  `;
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [thedata?.data?.getSubmission?.User?.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: email,
        },
      },

      Subject: { Data: "Blur: " + thedata?.data?.getSubmission?.adminName + " is requesting a video from you" },
    },
    Source: "blur.video.app@gmail.com",
  });

  try {
    if(typeof otpCode === 'string' && otpCode.length > 2) {
      let response = await ses.send(command);
      console.log("EMAIL RESPONSE:", response)
      // process data.
      return response;
    } else {
      console.log("ERROR: OTP CODE NOT VALID")
    }
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
  const query = /* GraphQL */ `
  query MyQuery {
    getSubmission(id: "${event.Records[0].dynamodb.Keys.id.S}") {
      id
      User {
        id
        name
        email
      }
      note
      adminName
      otpCode
    }
  }
  `;
  console.log(`QUERY: ${query}`);
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
    response = await fetch(request);
    let res = await response.json();
    console.log("RES:", res)
    await send_email(res)
    body = res
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