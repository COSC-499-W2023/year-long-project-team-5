# Team 5 Project Github (Option 3)
Access the deployed web-app [here.](HTTP://blurapp.tech)

[Current Week: Project Complete](https://github.com/orgs/COSC-499-W2023/projects/43)

![logo-dark-bg](https://github.com/COSC-499-W2023/year-long-project-team-5/assets/36575231/09d7017e-7226-40fe-bf3d-62fef6d73d0e)

<table>
  <tr><th>Name</th><th>Student #</th><th>Username</th></tr>
  <tr><td>Abhinav Thota</td><td>38811428</td><td>@abeeto</td></tr>
  <tr><td>Kael Pearson</td><td>74280314</td><td>@kaelpearson</td></tr>
  <tr><td>Beck Corkle</td><td>51664670</td><td>@namesnipes</td></tr>
  <tr><td>Abby Kiehlbauch</td><td>75290593</td><td>@abbykiehlbauch</td></tr>
  <tr><td>Joshua Medina-Quiaro</td><td>35231729</td><td>@joshmed27</td></tr>
</table>

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11930276&assignment_repo_type=AssignmentRepo)

# Project Purpose:
The purpose of our software is to allow admins (such as doctors, managers, professors, etc.) to receive videos from users. From this we can enable asynchronized communication which allows for more efficient communication, enhancing the experience for both the user and admin. The intention of our software is to provide an easy to use, secure solution to asynchronous video sharing.

# **Usage**
## AWS Amplify CLI Installation

### Prerequisites
- **Node.js v14.x or later**
- **npm v6.14.4 or later**
- **git v2.14.1 or later**

### Setup and configure AWS Amplify CLI
- [Follow this guide by Amazon for up to date instructions](https://docs.amplify.aws/react/start/getting-started/installation/)

## Run website locally
1. Git pull all files from the repo
2. Change directory to `app\amplifyapp`
3. Run `npm install` to install all the node modules locally
4. Run `amplify init` to initialize amplify (if you want the backend to work)
5. Run `amplify pull` to update your local backend environment (if you want the backend to work)
6. Run `npm start` 
7. The website should open in your browser on localhost:3000

## Running Testing
1. Git pull all files from the repo
2. Change directory to `app\amplifyapp`
3. Run `npx cypress run` (if you want just component tests or just e2e tests add `--component` or `--e2e` respectively)
4. This will run all the specs for e2e or component respectively

## Working with Emails
By default, every email recipient will not be able to receive emails from Amazon Simple Email Service unless the email is manually verified (this doesn't apply to account creation, only OTP code sending). This behaviour can be mitigated only after you have a production app. These are the steps to verify an email:
1. Go to Amazon SES Dashboard
2. Under the configuration dropdown, click "identities"
3. Click "Create Identity" and input the email you want to verify
4. AWS will send a verification link to that email, once clicked the email will be verified. You can verify this by checking if a green checkmark is next to the email in the Identities tab.


# Project Design Documents:
## Design Checkpoint (Document and Video) (Halfway-point)
[Design Document (PDF)](https://github.com/COSC-499-W2023/year-long-project-team-5/blob/master/docs/design/Team%205%20Design%20Document.pdf)

[Design Demo Video (Google Drive Link)](https://drive.google.com/file/d/1hsxgtyWNExZPvq0keI0xe8E0u1FqfNyJ/view?usp=drive_link)

## Data Flow Diagram:
![Dataflow Diagram](https://github.com/COSC-499-W2023/year-long-project-team-5/blob/master/docs/design/DataFlowDiagram.png)

## Back-end Database Design Diagram:
![Database Design Diagram](https://github.com/COSC-499-W2023/year-long-project-team-5/blob/master/docs/design/ER_Design.png)

# Documentation
- Documentation for common errors and their fixes [can be found in this file](docs/error_documention.md)
- Documentation for react components [can be found in this file](app/amplifyapp/docs/index.html)

## License
   Copyright [2023] [COSC499 Team 5]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0



