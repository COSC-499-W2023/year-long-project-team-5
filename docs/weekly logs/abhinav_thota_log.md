# Personal Log (Mar 3 - Mar 10)
![T2W9](https://i.imgur.com/ca4FIVc.png)

## Non feature work:
- Team meetings
- Peer testing

## Feature worked on:
### Issue [#114](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/114)

-Feature: Make the notes field in the dashboard responsive

Description of Changes:
(Write a brief description of your changes.)
   - created a new custom component based on Amplify Text called PopupText.jsx (found in my-components folder)
   - This component will check whenever the content of its text is too long and then truncates it, also renders an option to trigger a pop up which then shows the full content
   - had to mess around with the Table component to find out why CSS wasn't working as expected. It was down to "tableLayout" not being fixed.
   - All the fields in table are now "responsive" in the sense that it will truncate if its contents exceed the column's width.
   - Using lodash library to debounce the useEffect, fixed my tests and reduces load on browser.

Reason for Changes:
(Write a brief reason for why these changes were made.)

    The UI of our table was being messed up with varying lengths of text, resulting in weird widths for each column on each page.
    Huge notes/descriptions would render in really large blocks of text that would not only ruin the look of our website but made it harder to navigate.

**Status:** 
The PR is ready for review. I spent a lot of time having to write tests for this, it was annoying but it did help me write better, more robust code. And now the entire table looks so much cleaner and is more responsive.

# Personal Log (Feb 18 - Mar 3)
![T2 W8](https://i.imgur.com/uJ3HvRP.png)

## Non feature work
- PR reviews
- Team meetings
## Feature worked on

### Issue [#161](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/161)

- My teammate requested changes on this implemented feature worked on before reading break, in summary:

      "warnings are super jarring because they appear when you first start typing, doesn't even give you a chance to put in a valid email or 20 chars"

      "apply the warning after a user leaves focus of the email input? Or even upon submission if that's too hard." 

      "Especially because it moves the field down so you slightly lose track of where you're typing. Might be worth making it animated or filling out a space for it so it doesn't move down everything else."

**Feature:** Fix UI of warning/account feedback

**Description of Changes:** (Over reading break)
FEB 21, 2024: addressed feedback by @joshmed27 and @Namesnipes :

    installed lodash library to write debounce functions to render in messages with delay/save cost on client side
    checks and updates states as user types, when typing goes idle and when user leaves a field
    adding conditional rendering for all fields and error messages but also to use submitting button
    Now validates email, description and only allows one submission click at a time.


**Status:** 
Fully done, tested and merged. Teammate's requirements were fully considered and I think my solution was well implemented.

**Additional Notes:**
Was a busy week. Hoping that the work done from reading break will suffice. I'm really proud of how I approached this feature over the break it was one that I'm excited to see how users use for peer test. 

# Personal log (Feb 12 -Feb 18)
## Weekly work done from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/39/student/results/)
![T2 W5 work done](https://i.imgur.com/IkSmtgg.png)

Features worked on:
## Issue [#150](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/150)

**Feature:** Fix UI of recording page on mobile

**Description of Changes:**
   - installed clsx library to conditionally apply classnames in React (pls run npm install  . on initial review )
   - useEffect to resize the card based on width, takes full width in smaller widths
   - applies appropriate styling to card, video preview and webcam using clsx and the .css file


**Status:** completed, with automated testing to see if the right styling has been applied. Might be a better way to check for validation.
Lot's of new merge conflicts due to developments to backend. Will need to be resolved. 

**Additional Notes:**
Hoping to do that over reading break. Hoping to also work on other feature (cleaning up the submission table) over the break.


# Personal log (Jan 05-Feb 11)
## Weekly work done from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/35/student/evaluated/1569/)
![T2 W4 work done](https://i.imgur.com/tQE59PZ.png)

Features worked on:
## Issue [#161](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/161)

Feature: Status alerts rendered on form to show success/error messages

Description of Changes:
(Write a brief description of your changes.)

    wrote a helper function that currently validates email by checking it against a RegEx expression
    renders either a success alert or error alert when user submits the form.

Status: completed, with automated testing to see if the email validation works. Might be a better way to check for validation. But ready to be pushed and merged as there is more feedback in the form.

Next week's goal is to make recording page repsonsive and functional on mobile.

# Personal log (Jan 29-Feb 05)
## Weekly work done from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/35/student/evaluated/1569/)
![T2 W4 work done](https://i.imgur.com/oRZ78Za.png)

Features worked on:
## Issue [#103](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/103)

- UI tweaks; videos recorder and preview now appear in cards. 
- changed elements to be amplify <Text> tags so that color changes with the theme. 
- added icons.
- made it so that video can be previewed without using a button. Using react useEffect() instead so it automatically renders

## Issue [#96](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/96) Extend default theme.

Work done so far:
built the overall skeleton for theme object file, should be relatively easy to navigate and add new tokens to theme over default.
redefine most of the token colors to suit dark/light mode theme

Some thoughts:

    it's quite a lot of work to theme over the default, right now it covers the basic components, but it's a lot of work to go over all the components. something to think about if we choose to go this route.
    I haven't settled on font, colors and weight. My focus was to set up the file and structure.

Additional work:
- helped Josh and Abby with their assigned tasks and did peer reviews

Notes:
I want to move away from theming, I spent time debugging it, the UI could be overhauled, but it has its caveats worth discussing with the team. I want to focus on fixing as many bugs and improving upon the feedback we've received from peer testing next week. 


# Personal log (Jan 22-28)
![T2 W3 work done](https://github.com/COSC-499-W2023/year-long-project-team-5/assets/59943893/4434c4b7-112d-4393-b49b-60430817a469)
## Issue [#96](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/96) As dev, extend default theme:
Please add context to why this is needed
We need a theme for our site and this can be done through fonts and colour palettes

List requirements of what the solution should look like

    Pick a colour palette and font to use on the site
    Colour palette should have a dark mode counterpart
    Implement colour palette in site

Progress made:
- got a basic Theme object created to hold the stylings and overrides for the Theme Provider we currently have.

Challenges:
- I'm finding it very tough to do the testing in a way that can accurately determine if themes are being applied correctly.
- It's lot of work to ensure the new theming is consistent across the website.

Other notes:
- I was very busy this week, didn't have much time, I tried to do some code reviews, but it was a week that I hope I can compensate for in the coming days.

# Personal log (Jan 14-21)
## Weekly tasks worked on from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/35/student/evaluated/1569/)


![T2 W2 work done](https://i.imgur.com/4lJlFXk.png)

## Feature work done this week:
## Issue [#113](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/113): As Dev, refine UI for dashboard table

- made big UI overhauls to table:
   - adjust widths of each column
   - make table striped (the contrast should help readability)
   - format date and time string (ended up being done by Josh in another branch)
   - choose better colors


## Issue [#95](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/95): As Dev, I'd like to implement light/dark mode
- wrote an E2E test to ensure toggle button was switching background color of the app throughout the webpage.
- made a togglebutton and integrated it into navbar (seperate component), wrote logic for it to update and change theme of website

 
## Other work done:
- Spent a lot of additional time doing pull request reviews, testing code and providing code suggestions/help.

## Other notes:
- Need to fix some merge conflicts and refactor more front end code, hoping to do that next week but we also need to have all the pages we need for peer testing.
 


# Personal log (Jan 07-14)
## Weekly tasks worked on from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/34/student/evaluated/1569/)
![T2 W1 work done](https://i.imgur.com/NUTw8CS.png)

## Feature Work done this week 

## Issue [#105]: As Dev, I want to shrink down video request tab to a card size

Helped Josh, reviewed PR, made new changes to UI for the video request page.

## Status of work done
The UI adjustments have been done and seem to be a considerable improvement to the previous version.

## Issue [#95]: As Dev, I want to add light and dark mode
Requirements:

    A button should be added that can change the theme of the application to light and dark mode
    This theme should be persistent when browsing around
    Should keep a consistent colour palette

## Status of work done:
Ongoing. Still need to work on it. Hope to do it by end of the night(!)

## Status of previous weeks
Everything from last term is intact. We will need to refactor some code by resolving some merge conflicts, this will provide us a good opportunity to review all the code as a team and make adjustments so that moving forward, there will be cleaner and more maintainable code.

## Issue number reference
- Improve UI of Request Video page, Issue [#95](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/95)
- Dark/Light mode for UI, Issue [#105](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/105)

## Other notes
I didn't get as much work as I'd liked to this week but I'm hoping to make up for it in the coming days. I seem to have an irrational fear towards integration/E2E testing and I hope to overcome it next week.


# Personal Log (Nov 26- Dec 3)
## Weekly tasks worked on from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/28/student/evaluated/1569/)
![week13 work done](https://i.imgur.com/58IzZIY.png)

## Feature Work Done This Week

## Issue [#80](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/80) : Make SubmissionTable

Requirements:

    The code for displaying submissions
    Documentation for the component
    Tests for the component

### Status of work done
Test driven development, wrote cypress tests before writing the component. Was capable of handing empty data values appropriately.
Documentation done using JSDocs.

## Issue [#81](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/81) : Make dashboard responsive 


Requirements:

    Dashboard.js will need to be reworked to include media queries
    SubmissionCard component will need to render for mobile devices
    SubmissionTable component rendered for larger displays
    Optional: search bar and navbar should be rendered differently based on devices

### Status of work done: 
managed to refactor dashboard, code is slightly cleaner, more readable and most importantly dynamically renders either SubmissionCard or SubmissionTable based on screen size. Done.

## Status of previous weeks
most of previous issues I worked on have been closed. There were a few things to keep in consideration; the components will likely need minor tweaks going into the next term as our needs change. But everything has been built and tested well so it should be very easy to make these changes. 

## Issue number reference
- Make SubmissionTable, Issue [#80](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/80) 
- Make dashboard responsive, Issue [#81](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/81)
## Other notes
This week was the most productive, I felt like I learned the most this week and I feel slightly more confident in my ability with React and test driven develpoement. Proud of the work the team has made in regards to our web app. Looking forward to learn more; especially, on the backend side of this project next term.



# Personal Log (Nov 12-26)
## Nov 12-18: Nothing significant done during reading break.
## Weekly tasks worked on from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/27/student/evaluated/1569/)
![week12 work done](https://i.imgur.com/HGnnHqQ.png)


## Feature Work Done

### Feature: work on having multiple pages on our React project. (issue 59)
- helped Abby finish up setting up ProtectedRoutes so you can't access certain pages without being authenticated. 
- pages are now set up as their own components. 
- figured out how to navigate between other pages outside App.js(I think...) 

#### Current status:
- I'd say this feature is done


### Feature: Cypress testing set up (issue 30)
- merged the installation Josh did into component-library branch so moving forward we can use Cypress to write and run tests as we make components
- facing a steep learning curve to write tests first and isolate components.

#### Current status:
- Cypress is up and running, learned how to make a few basic assertions and cypress commands to be able to test basic UI rendering
- I'd say I'm done working on this feature; I will be using cypress moving forward on each component I design and build.

## Feature: component/SubmissionRow (issue 31)
- built a UI component by writing tests on Cypress first.
- works well but hard to isolate and test if it renders if the component uses other components outside of it (maybe needs E2E testing)

#### Current status:
- need to figure out how to get tests fully working (ccurrently code works test fails)
- forgot to write tests that check for the component handles missing values, need to discuss with the team what's the best way to represent that.

## Other work done:
- started working on design documentation; might need to revise our designs to be more aligned with Nielsen's heuristics for design.

## Issues worked on:
- Router/Navigation: [Issue 59](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/59)
- Component/SubmissionRow [Issue No. 31](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/31)
- Cypress Testing: [Issue No. 30](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/32)
### Other notes:
A lot of the problems I faced could be down to a lack of experience and facing a steep learning curve. I anticipate way more problems ahead but I'm glad I managed to use Cypress to write a few component tests. The workflow is becoming more streamlined, yay...


# Personal Log (Nov 6 -12)
## Weekly tasks worked on from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/26/student/evaluated/1569/)
![week10 work done](https://i.imgur.com/eIqYdkd.png)

## Feature work: 

### Feature: work on having multiple pages on our React project.
- required Abby and I to research React-Router-DOM
   - spent a lot of time going over forums while also trying to understand code
   - felt the learning curve

- had to refactor existing code; App.js had to be completely  built up again from scratch.
- now have multiple pages as their own components that are rendered by using React  Router

### Feature: Cypress testing set up

- I didn't get the time to work on this; Josh has taken the lead on this.
- I hope to contribute and learn more about how to use Cypress as it will greatly improve our workflow.
- Cypress will allow us to move closer to test-driven development of our front end react components.

### Current status
 - router is 80% done; need to learn about redirecting users and protecting routes.
### Status of work from last week
 - we have put the react library on hold; want to set up testing first.
 - that being said, working on the router issue resulted in me needing to make a simple navbar.
   - in the future, each component needs to be tested to see how responsive it is. e.g how navbar looks on an iphone vs laptop.

### Issues worked on
- Router/Navigation: [Issue 59](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/59)

### Other notes
We're making good progress, I do wonder if our code will need to be cleaned up and refactored in the future given how we approach our tasks. We need to get closer to test driven development with good code reviews.


# Personal Log (Oct 30 - Nov 5)
## Weekly tasks worked on from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/23/student/)
![week9 work done](https://i.imgur.com/OsRtJlH.png)

## Non feature work:
- mini presentation, reviewing other presentations

## Feature work:

### Feature: build a library of React components 
overview: have a library of key ui elements as components that can be reused and would act as key building blocks of the website.
- created a new branch titled 'my-components' to mostly hold all custom react components that are being coded up from our Figma wireframes
      - researched ways to build my components by looking over the 'primitive' components in [Amplify UI Kit documentation](https://ui.docs.amplify.aws/react/components)
      - installed figma VS code extension to help build first component using React and JS. (receiverNav)
      - looking into how to make components dynamic
         - need to look into states and hooks in order to dynamically update content of components. (i.e update nav bar to show you're signed in for example.)

- [Issue No. 32](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/32)
### Current status:
Completed. We have pivoted to using the UI kit provided by AWS/Figma in combination with a few of our custom components. (New issue needs to be created)

### Feature:  As Dev, I want to create the basic reciever dashboard with React #19 
 - a functional search bar, nav bar and submission cards are being populated from the database. (ahead of schedule since we don't need to focus on functionality!)
 - might need to create a new component to hold data in a data row as opposed to cards for better viewing 
      - need to ask team for their opinion.
[Issue No. 19](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/19)

Current status:
   - might need one more week since Abby and I need to look into how to render multiple pages on React. I found a good webpage that might point us in the right direction.


## Status of work for last week:
- Issue No 32 is closed, being extended into issue No. 19.
- Still need to work with Beck to be able to build the basic receiver dashboard.

## Issue number reference 
[Issue No. 32](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/32)

[Issue No. 19](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/19)

## Other notes
- Feeling more confident about the decision to pivot to React to code the components manually; it's so much better than trying to build using Figma.
   - very excited to try figure out react router v5 with amplify ui elements. 

# Personal Log (Oct 23-29)
## Weekly tasks worked on from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/23/student/)
![week8 work done](https://i.imgur.com/lIWQ2f6.png)
## Non feature work
- Group meetings: discussed upcoming mini presentation
   - delegated roles, looked over the rubric, will do trial run on Monday (Oct 30) to ensure we all take a minute each.
- Feature work: 
   - built out a couple of UI components using Figma
   - switched to building two UI components directly with React using the Amplify UI kit and by reading the documentation.
   - worked with Beck to connect some front end components to back end.
## All of my features for **this milestone**

### Feature: build a library of React components 
overview: have a library of key ui elements as components that can be reused and would act as key building blocks of the website.
Status:
- [Issue No. 32](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/32)
- Found out that building components using Amplify studio and syncing with Figma is more challenging than writing out the components in code manually (still by using the same react UI library kit by amplify)

### Feature: Sent/Received Table 
Overview:  Integrating the front end with the back end for the sent/received submissions page.
- Issue number: [Issue No. 31](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/31)
- Beck and I managed to build a proof of concept that allows us to use React to fetch data from the backend that can be dynamically displayed and manipulated on the front end. So filtering and searching through the database should now be feasible on the browser (i.e just by using React functions,states and hooks)
## Status of work for the last week
My goal this week was to build interactive UI, where things like textfields and buttons could be clicked and typed into. This was far easier to do by coding as opposed to letting Amplify try translate Figma. Switching to building components via React may take longer but I believe it will make our lives easier in the future and so the setback is worth it. I'm confident this can be done by Nov 6th.



# 2 Week Personal Log (Oct 9-22)

## Weekly tasks worked on from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/23/student/)
![work done in past 2 weeks](https://i.imgur.com/WYQuyeh.png)
## Non feature work
- Group meetings: discussed about setting up repo with AWS and amplify.
   - had the rest of the team review our wireframes and received good feedback on what to change
   - concerns with how we were previously setting up our front and backend; currently not best suited to work with Amplify
   - spent time researching about tech stacks, discussed whether we wanted to stick to Amplify, reviewed and revised current chosen tech stack: decided on using React as framework and GraphQL


## All of my features for **this milestone**

### Feature: build a library of React components 
- overview: have a library of key ui elements as components that can be reused and would act as key building blocks of the website.
- Spent time configuring amplify with the command line and learning how to use it to pull components 
- designed a few key components on Figma following best practices guidelines - I used [amplify UI kit library available on Figma](https://www.figma.com/community/file/1047600760128127424/aws-amplify-ui-kit)  to build our own unique components to save time but also ensure that it will work with Amplify.

Status: good progress made with components, still need to make sure that Amplify can read our components correctly. Next stage would be learning React props and hooks as well as following video demos to make sure the components are responsive and functioning (ui wise; e.g text-field can be clicked on and take keyboard input)

## Status of work for the **last week**
We had to revise our chosen tech stack, look into system arch and configuration of our repo. A lot of the work I did using Figma to make initial components had to be revised so that it used the UI kit by AWS instead. 

## Other comments
I hope to be able test our front end with Selenium before the mini presentation but I have little experience; need to do research on how to design tests with Selenium. But also test-driven development seems hard for UI/UX. How to write tests before code for front end?

## Issue number reference
- [Issue No. 32](https://github.com/COSC-499-W2023/year-long-project-team-5/issues/32)


# Weekly Personal Log (Oct 2-8)

## Self Reflection: Work done this week from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/student/)
![work done in week 5](https://i.imgur.com/WuzTgwc.png)

## Non feature work
- Group meetings where we discussed the agenda and allocated task


## All of my features for **this milestone**
 - Creation of a wireframe for our UI/UX interfaces. Admin page and user page were prioritized.
 - Abby and I researched on the best way to design wireframes. We wanted to have designs that could be implemented easily. 
    - We set up layout grids to align any visual elements in a way that could be recreated using CSS and bootstrap.
 - Abby and I worked on creating low and high fidelity wireframes

## Status of work for the **last week**
- Good progress on the wireframes, need to get feedback from teammates.
- Would like to create components on Figma to allow for simple and consistent wireframes.

## Issue number reference
 [Issue No. 8](https://github.com/COSC-499-W2023/word-chain-exercise-team-5/issues/8)
## Other notes
- We might be able to use Figma to translate the UI designs and components into CSS snippets which may or may not improve our workflow.

# Weekly Personal Log (Sept 28-Oct 01)

## Self Reflection: Work done this week from [peer eval](https://prod.teamableanalytics.ok.ubc.ca/courses/128571/peer_evaluations/student/)
![work done in week 4](https://i.imgur.com/RrdEyZM.png)

## Non feature work
- Group meetings where we discussed the project

## All of my features for **this milestone**
 - Worked with team on project outline:
    - discussed and assigned myself features/types of work within the project I'd like to work on
    - defined the MVP with the team and helped clarify the project
    - helped the group on the milestones and some of the feature deadlines
    - helped settle on a "framework" for the project in consideration with the system arch. of our project option

## Status of work for the **last week**
- Project outline done

## Issue number reference
N/A since no coding this week.

## Other notes
I expect us to revise this plan as we go since I think we are planning to take an iterative approach to our project. It's too early to tell how well/fast we work as a team. 

Was still good to clarify what is expected of us in terms of the number of features we need to implement and by when.
