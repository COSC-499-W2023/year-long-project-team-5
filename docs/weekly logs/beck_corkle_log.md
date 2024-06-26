# Weekly Personal Log (April 1st-April 7th)
## Screenshot from peer eval
<img src="https://i.imgur.com/Y5DQxMP.png">

## Non-feature work
- class Tuesday, meeting thursday
- code review
- FINISHED final document!!! (wooohooo)

## All of my features for **this week**
### **Feature**: Added explanations to readme
- **Description**: For our final document I added more setup instructions to our readme such as email verification and amplify CLI setup
- **Issue number**: #243
- **Context**:
  
## Status of work for the week
- ITS ALL OVER!!!!!!!!

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/243]
  
## Other notes


# Weekly Personal Log (March 24th-March 31st)
## Screenshot from peer eval
<img src="https://i.imgur.com/K3iGpr5.png">

## Non-feature work
- Class Tuesday, Class thursday
- Code review
- Got a website to redirect to our develop page so we don't have to find the big URL with random letters that AWS auto generates us. http://www.blurapp.tech
- Worked on final document

## All of my features for **this week**
### **Feature**: Loading circle after submitting video
- **Description**: This communicates to the user the video is being sent with a spinning loading circle
- **Issue number**: #236
- **Context**:
  
## Status of work for the week
- Loading circle is in review
- Face blurring in progress, kael and josh are leading this

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/236]
  
## Other notes

# Weekly Personal Log (March 18th-March 24th)
## Screenshot from peer eval
<img src="https://i.imgur.com/AIPBj8E.png">

## Non-feature work
- Class Tuesday, Team meeting Thursday

## All of my features for **this week**
### **Feature**: Create a dark and light mode website favicon
- **Description**: We have been using the default react favicon, so I made one for us, in black and white. It dynamically changes based on your system theme
- **Issue number**: #223
- **Context**:
  
## Status of work for the week
- Backend AWS Lambda for face blurring (working with kael)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/223]
  
## Other notes

# Weekly Personal Log (March 11th-March 18th)
## Screenshot from peer eval
<img src="https://i.imgur.com/FHbrAOD.png">

## Non-feature work
- Class Tuesday, Team meeting Thursday

## All of my features for **this week**
### **Feature**: Push a minimal build of a lambda function using open-cv to aws
- **Description**: We have face blurring working locally we just need to deploy it! Getting the environment set up is the hardest part
- **Issue number**: #215
- **Context**: This was a big blocker for us, the inability to get a simple backend build working with opencv was blocking us from having face blurring in our website for a long time, so this is a big win!

### **Feature**: New email template
- **Description**: Mostly finished this last week, I committed the backend files to github this week cause amplify was reverting my code for some reason and I dont want to lose the code!
- **Issue number**: #193
- **Context**:

## Status of work for the week
- Emailing improvements (small fixes finished, but done)
- Backend AWS Lambda for face blurring (done for now, passed on to kael)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/215]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/193]
  
## Other notes

# Weekly Personal Log (March 4th-March 10th)
## Screenshot from peer eval
<img src="https://i.imgur.com/LOWniSS.png">

## Non-feature work
- Peer testing Tuesday, Team meeting Thursday

## All of my features for **this week**
### **Feature**: Emailing improvements
- **Description**: Since we got the logic for emailing down, I refined the process more this week. The emails look beautiful now and I squashed some bugs to do with the OTP code being sent to the email
- **Issue number**: #200, #199, #193
- **Context**: This was all backend stuff so no PR

### **Feature**: Video Rendering Bugs
- **Description**: I was having a lot of trouble with certain video formats not rendering correctly on certain browsers, it's really inconsistent, but I think I mostly have it all fixed. I'm monitoring to see if they come up again.
- **Issue number**: #178
- **Context**:


## Status of work for the week
- Emailing improvements (mostly done)
- Video Rendering Bugs (done for now)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/200]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/199]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/193]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/178]
  
## Other notes

# Weekly Personal Log (February 26th-March 3rd)
## Screenshot from peer eval
<img src="https://i.imgur.com/QDF7UD0.png">

## Non-feature work
- Team meetings
- Reviewing PRs

## All of my features for **this week**
### **Feature**: connect videos to a submission when they are recorded
- **Description**: When a video is recorded, it makes a entry in the graphql DB. This entry is not connected to the corresponding submission in the graphQL DB. Currently the video page has no way of knowing what submission it is being recorded for, josh made a lamba function for generating one time codes which will connect the video page to the submission
- **Issue number**: #164
- **Context**: Implemented! Got past the blocker

### **Feature**: email OTP codes when submission is made
- **Description**: We need unique codes on the email to allow patients to access the patient portal
- **Issue number**: #179
- **Context**: Implemented, last weeks block was dropped #164 is completely finished

## Status of work for the week
- Connect submission to video after recording (done)
- OTP Codes (done)
- email OTP Codes (done)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/179]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/164]
  
## Other notes
- This log includes things I coded during reading break

# Weekly Personal Log S2 Week 6

## Screenshot from peer eval
<img src="https://i.imgur.com/R6YRl6L.png">

## Non-feature work
- Team meetings
- Reviewing PRs

## All of my features for **this week**
### **Feature**: connect videos to a submission when they are recorded
- **Description**: When a video is recorded, it makes a entry in the graphql DB. This entry is not connected to the corresponding submission in the graphQL DB. Currently the video page has no way of knowing what submission it is being recorded for, josh made a lamba function for generating one time codes which will connect the video page to the submission
- **Issue number**: #164
- **Context**: Almost implemented, currently blocked due to a bug

### **Feature**: email OTP codes when submission is made
- **Description**: We need unique codes on the email to allow patients to access the patient portal
- **Issue number**: #179
- **Context**: in-progress, blocked until #164 is completely finished

## Status of work for the week
- Connect submission to video after recording (done, with a seperate bug making it not work compeltely)
- OTP Codes (done)
- email OTP Codes (in progress)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/179]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/164]
  
## Other notes
Apart from features, a tough bug has come up and I've spent enough time on it that I should list it here (videos wont render on submissions table only on firefox but it works fine on chrome):
https://github.com/COSC-499-W2023/year-long-project-team-5/issues/178
- Made the blur logo have a transparent background and put it on our readme!

# Weekly Personal Log S2 Week 5

## Screenshot from peer eval
<img src="https://i.imgur.com/bg5b7ku.png">

## Non-feature work
- Team meetings
- Reviewing PRs

## All of my features for **this week**
### **Feature**: Automatic emailing
- **Description**: When the admin sends a submission and types in the clients email, it should notify the client by email and send a link to the record page
- **Issue number**: #128
- **Context**: Merged this week!

### **Feature**: OTP Codes
- **Description**: We need unique codes on the email to allow patients to access the patient portal
- **Issue number**: #64
- **Context**: Josh is mainly working on this issue, but we are collaborating as the codes need to be emailed and IM working on emails

## Status of work for the week
- Automatic emailing (done)
- OTP Codes (in progress)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/128]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/64]
## Other notes

# Weekly Personal Log S2 Week 4

## Screenshot from peer eval
[<img src="https://i.imgur.com/5aTlQLT.png">](https://i.imgur.com/ShHFKoC.png)

## Non-feature work
- Team meetings
- Reviewing PRs
- Peer testing on tuesday
- Made lots of issues and requirements for all problems found during peer testing

## All of my features for **this week**
### **Feature**: Automatic emailing
- **Description**: When the admin sends a submission and types in the clients email, it should notify the client by email and send a link to the record page
- **Issue number**: #128
- **Context**: Currently a draft PR, most of the work for this issue is being done on the AWS dashboard, so you won't see a lot of commits here. But its hard work setting everything up trust me!

## Status of work for the week
- Automatic emailing (in progress)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/128]
  
## Other notes

# Weekly Personal Log S2 Week 3 (Jan 22 - Jan 28) 

## Screenshot from peer eval
<img src="https://i.imgur.com/5aTlQLT.png">

## Non-feature work
- Team meetings
- Reviewing PRs

## All of my features for **this week**
### **Feature**: Filter submissions by admin
- **Description**: Aim to have more description backend variable and function names, less code reuse and prettier overall code
- **Issue number**: #132
- **Context**: Currently a PR in review

## Status of work for the week
- Backend tests (in progress)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/132]
  
## Other notes
- We had a hackathon this week!

# Weekly Personal Log S2 Week 2 (Jan 15 - Jan 21) 

## Screenshot from peer eval
<img src="https://i.imgur.com/GcmTQ9n.png">

## Non-feature work
- Team meetings
- Reviewing PRs (PR 120)
- Resolving problems on my PRs (PR 109 and PR 119)

## All of my features for **this week**
### **Feature**: Refactor backend
- **Description**: Aim to have more description backend variable and function names, less code reuse and prettier overall code
- **Issue number**: #87
- **Context**: Worked on it last week, finished it all up this week, it is currently a PR

### **Feature**: Implement Jest
- **Description**: Get Jest working with our app.
- **Issue number**: #117
- **Context**: This was so much work, many problems were getting it installed for some reason!

### **Feature**: Fix searchbar
- **Description**: Get the searchbar on our dashboard working ie. it actually filters things when you type a search query
- **Issue number**: #116
- **Context**: Currently a PR in review

## Status of work for the week
- Backend tests (in progress)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/87]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/117]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/116]
  
## Other notes
- N/A


# Weekly Personal Log S2 Week 1 (Jan 8 - Jan 14) 

## Screenshot from peer eval
<img src="https://i.imgur.com/BsTaDhu.png">

## Non-feature work
- Team meetings
- Reviewing PRs (PR 107)
- Resolving problems on my PRs (PR 109 and PR 89)
- Solving merge conflicts for refactor-dash

## All of my features for **this week**
### **Feature**: Refactor backend
- **Description**: Aim to have more description backend variable and function names, less code reuse and prettier overall code
- **Issue number**: #87
- **Context**: Got a good start on this problem, had to get a refresher on all the code we wrote last semester

## Status of work for the week
- Backend tests (in progress)
- Backend refactor (in progress)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/87]
  
## Other notes
- N/A


# Weekly Personal Log Week 13 (November 27 - December 3) 

## Screenshot from peer eval
<img src="https://i.imgur.com/hHVvDDN.png">

## Non-feature work
- Met on Nov 27, Nov 30 for meetings
- Made changes to design document for database design
- Made new ER diagram
- Helped create design video

## All of my features for **this milestone**
### **Feature**: Create ER updated diagram
- **Description**: Created a new ER diagram for our current database design, this also involved a lot of discussion on what design is right for our system
- **Issue number**: #53
- **Context**:

### **Feature**: Help Create Demo Video
- **Description**: Create demo video for the design presentation
- **Issue number**: #55
- **Context**: I didn't edit or record the video I was just there to discuss ideas and want to record/say

### **Feature**: Make the backend database schema
- **Description**: After the creation of the ER diagram, I created the schema in code on the backend in AWS which reflects the diagram
- **Issue number**: #49
- **Context**:

### **Feature**: Connect the database with the frontend
- **Description**: Involves things like querying the db to populate a dashboard, saving videos in the database, and creating tables on user input
- **Issue number**: #57
- **Context**:

### **Feature**: Build dashboard
- **Description**: Complete the doctor dashboard
- **Issue number**: #19
- **Context**: I helped abhinav connect the backend to the dashboard

## Status of work for the week
- Create ER updated diagram (Complete)
- Video Demo (Complete)
- Backend database schema (Complete)
- Connect the database with the frontend (Complete)
- Build dashboard (Complete)
- Backend tests (in progress)
- Backend refactor (in progress)

## Issue number reference
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/53]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/55]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/49]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/57]
- [https://github.com/COSC-499-W2023/year-long-project-team-5/issues/19]
  
## Other notes
- N/A


# Personal Log (Nov 12-26)

## Screenshot from peer eval
![week12 work done](https://i.imgur.com/OMp9nuR.png)

## Non-feature work
- Team meetings
- Researched cypress testing
- Worked on the design document
- Code Reviews
- Added a Apache license to our repo

## Feature Work Done

### **Feature**: Set up documentation for react components
- **Description**: Used jsdoc and docstrings
- **Issue number**: #67
- **Context**: I had this issue completed last week, this week I PRed it into the main branch, there were enough merge conflicts and code review changes that I am including it again.

## Issues worked on:
- Documentation: [Issue 59](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/67)

### Other notes:
- no work done on reading break

# Weekly Personal Log (November 6-12)

## Screenshot from peer eval

![image](https://i.imgur.com/oD2N1Wb.png)

## Non-feature work
- Team meetings
- Debugged user authentication error
- Researched react documentation practices

## All of my features for **this milestone**

### **Feature**: Set up documentation for react components
- **Description**: Used jsdoc and docstrings
- **Issue number**: #67
- **Context**:

### **Feature**: Fix deployment error
- **Description**: Fixed deployment error in group meeting
- **Issue number**: #48
- **Context**:

### **Feature**: Created header w/ example react documentation
- **Description**: Fixed deployment error in group meeting
- **Issue number**: #61
- **Context**: Has been superseeded by a more formal navbar, still stands as an example for documentation

### **Feature**: Document how to setup the app
- **Description**: Described how to start the app in readme + how to document the app
- **Issue number**: #43
- **Context**:


## Status of work for the **last week** (in-progress or completed)
- automatic documentation generation complete
- readme files and documentation are much more encompassing in general
- react component created as an example completed
- no more deployment errors
  
## Issue number reference
- https://github.com/COSC-499-W2023/year-long-project-team-5/issues/67
- https://github.com/COSC-499-W2023/year-long-project-team-5/issues/48
- https://github.com/COSC-499-W2023/year-long-project-team-5/issues/61
- https://github.com/COSC-499-W2023/year-long-project-team-5/issues/43

## Other notes
- spent a lot of time debugging auth error
- better PRs

# Weekly Personal Log (October 30 - November 5)

## Screenshot from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/student/)

![image](https://i.imgur.com/VW4PRWU.png)

## Non-feature work
- Practiced Presentation (Monday)
- Presented (Tuesday)
- Team Meeting (Thursday)

## All of my features for **this milestone**

### **Feature**: Deployed web app on amplify
- **Description**:  Host website on aws instead of locally
- **Issue number**: issue #44
- **Context**: This one took a long time...

## Status of work for the **last week** (in-progress or completed)
- Feature #44 is complete

## Issue number reference
- Issue #44 (https://github.com/COSC-499-W2023/word-chain-exercise-team-5/issues/44)

## Other notes

# Weekly Personal Log (October 23 - 29)

## Screenshot from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/student/)

![image](https://i.imgur.com/OJzHvzk.png)

## Non-feature work
- Team meetings (Monday, Thursday)
- Working on all things for the mini-presentation 

## All of my features for **this milestone**

### **Feature**: Sent/received table
- **Description**:  Integrating the front end with the back end for the sent/received table page
- **Issue number**: issue #31
- **Context**: I worked on this with Abhinav, it's still in progress but we have a proof of concept which can connect to the database

### **Feature**: Work through the tutorial for setting up amplify
- **Description**:  Have a working amplify instance which can make queries to the graphql backend according to the tutorials instructions
- **Issue number**: issue #41
- **Context**: Our team decided last week to work through a tutorial because our experimenting with AWS technology ended up not working

## Status of work for the **last week** (in-progress or completed)
- Feature #31 "sent/received table" is still in progress
- Feature #41 is complete
- Our presentation is complete, we will review it on Monday

## Issue number reference
- Issue #31 (https://github.com/COSC-499-W2023/word-chain-exercise-team-5/issues/31)
- Issue #41 (https://github.com/COSC-499-W2023/word-chain-exercise-team-5/issues/41)

## Other notes

# Weekly Personal Log (October 9th-22th)

## Screenshot from peer evaluation

![image](https://i.imgur.com/svvGMs8.png)

## Non-feature work
- Team meetings
- Lots and lots of AWS experimentation
- Got to know AWS RDS databases and how they work (kind of)
- Discussions on tech stack and best database to use to integrate with aws: decided on NoSQL graphql database
- briefly learned graphql

## All of my features for **this milestone**

### **Feature**: Database Setup
- **Description**: Setting up a database on AWS and getting ready to integrate it to the front end
- **Issue number**: Issue #12
- **Context**: This issue is blocked currently due to team discussions about our tech stack. We found up that our previously setup RDS database was not compatible with the front end technologies, so we are in the process taking our old database down to learn and set up a new NoSQL GraphQL database.

## Status of work for the **last week**
- Database Setup: In-progress/blocked due to tech stack changes, should be able to continue next week
- Aws learning: In-progress probably forever

## Issue number reference
- Issue #12 [(https://github.com/COSC-499-W2023/word-chain-exercise-team-5/issues/6)](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/12)

## Other notes
- Majority of the work for the past 2 weeks was learning AWS and all of its services and how everything in our app will connect together

# Weekly Personal Log (October 2nd-8th)

## Screenshot from peer evaluation

![image](https://i.imgur.com/vsP3eQC.png)

## Non-feature work
- Discussed work in a team meeting
- Explored the AWS account given to us

## All of my features for **this milestone**

### **Feature**: Data Flow Diagrams
- **Description**: Data flow diagrams were created for the whole system, showing how data flows between client, server, and database
- **Issue number**: Issue #6
- **Context**: Individually researched how DFDs are made, made a rough draft on paper, and completed a final draft for the main system, excluding the register/login data flow

## Status of work for the **last week**
- Data flow diagram research and completion for most system features
- Still working on DFD for the register/login data flow
- Will begin work on getting to know AWS and setting up the database

## Issue number reference
- Issue #6 (https://github.com/COSC-499-W2023/word-chain-exercise-team-5/issues/6)

## Other notes
- N/A

# Weekly Personal Log (September 25-28)

## Screenshot from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/student/)

![image](https://i.imgur.com/MbXVum0.png)

## Non-feature work
- Our team had 2 two hour meetings where we all discussed and completed the project plan
- I did proof reading and styling of the project plan
- Added features and desciptions to each milestone to section 2 of the project plan
- Made a personal log template for everyone to use

## All of my features for **this milestone**
- Still deciding

## Status of work for the **last week**
- No feature work done this week

## Issue number reference

## Other notes
