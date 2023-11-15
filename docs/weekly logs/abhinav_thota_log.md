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
