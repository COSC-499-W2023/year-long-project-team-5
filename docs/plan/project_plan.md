# Project Proposal for Option 3

Team Number: 05

Team Members: Joshua Medina-Quiaro SN35231729, Abby Kiehlbauch SN75290593, Beck Corkle SN51664670, Abhinav Thota SN38811428, Kael Pearson SN74280314

# 1 Overview


### Our MVP

Our minimal viable product is a dynamic and responsive web app that will allow for easy and general video submission by a user and review by an admin . The admin interface will consist of a login/sign up page for the admin account and the admin dashboard. The login/sign up page will follow suit with most traditional websites and allow users to create accounts and reset passwords using an email. 

The admin dashboard allows the admin to send out video requests while also keeping track of existing video submissions and requests sent. The user submissions/ video requests will be represented as tables where the rows will display uniquely generated IDs, the user email, video file name/link and submission date as the fields.  The admin will be able to download these videos under a separate page/tab.

There will be another tab/page to send video requests which would allow the admin to generate a unique link accompanied by notes/directions that will be shared via email. The admin dashboard will also have a settings page that will primarily allow the admin to change their password.

On the user side, the web app lets users record and upload videos directly from the web app by accessing the device’s camera and audio inputs. The user does not need a login/account to access the page; they just need to follow through with the admin’s video request email and open the unique link that was generated for them. 

This link will take the user to a portal where they record the video with the option to face blur. The user will then preview their video before deciding to submit it to the admin. The max video recording length will be set for five minutes and any video submitted will be deleted after ‘X’ number of days.

### Purpose: 

The purpose of our software is to allow admins (such as doctors, managers, professors, etc.) to receive videos from users. From this we can enable asynchronized communication which allows for more efficient communication, enhancing the experience for both the user and admin. The intention of our software is to provide an easy to use, secure solution to asynchronous video sharing.


### What problem does it solve: 
Our project will be able to solve a few notable problems such as saving time from attending visits, anonymity on video calls and creating an asynchronous method of communicating. With our project you wont need to attend an interview or see a doctor for every issue you can instead send a video that they can view. Also with face blurring it can help keep anonymity online. Finally, the call does not need to happen at the same time allowing for an asynchronized communication method. \

### Why our solution is better than others: 
Our project will be developed with open source in mind as we know this is important to the client. We will make a general solution by prioritizing refactorable code which, after it is made public, can be taken and edited to cater to more specific needs. This way, the target user can be a doctor, teacher, interviewer or any other professional with no major overhauls. Furthermore, the product will focus on ease of use. As the target user is the average adult and our solution is general, we aim to create a seamless user experience to accommodate users of all technological competencies.

## 1.1 Envisioned Usage

The two user groups of our software are named the “admin”, which is the user who will be using the software to send requests for the other user group, the “user” to apply a video to the request and send it back. Mentions of “user” will refer to this second user group. 

The admins will have a dashboard that they will be able to login to using a secure username/password combination. This dashboard will contain an area to manage account details such as email, name, username, password, etcetera. The admin dashboard will also contain three tabs, one for sent request forms, received request forms for the videos, the other will be the tab for sending out the video request forms.

In the sent/received tab there will be a table containing each request…

**Value Proposition:** Open-source and useability are at the heart of our project. If you're a student, you can learn from the product, if you're on a team you can adapt the product (if the license allows it), and if you're not good with technology you can still use the product. Our values will benefit everyone!

**What can the user do with your software:** A user will be able to create a link and have it be associated with a person from their end. They then will be able to send typically through the medium of Email to the client of the user. This client will then be able to record a video and submit it to be viewed by the original user. The video submitted will have an overlay / filter that blurs their face and allows them to keep privacy. This will be able to be saved / viewed for up to two weeks.

**If there are multiple user groups, explain it from each of their perspectives:**

Base User (Doctor / Interviewer): Has an account which can generate links associated with names. They can then send these links to “clients” and after the client records they can view / download the video. \
Client (Patient / Interviewee): Receives link which has ability to record and then can submit after applying filters. 

# 2 Major Milestones

<table>
  <tr>
   <td>Deadline
   </td>
   <td>Deliverable
   </td>
  </tr>
  <tr>
   <td>Term 1 week 9: 
<p>
Mini Presentation
   </td>
   <td>Initial UI / UX design / wireframe has been completed.  
<p>
Basic admin login page implemented. Presentation video recorded
<p>
Deadline 1:
<p>
UI/UX design/wireframe
<p>
Admin login / credential page
<p>
User portal
<p>
Record presentation/video
   </td>
  </tr>
  <tr>
   <td>Term 1 week 13: 
<p>
Design submission
   </td>
   <td>Have designed System Architecture, Database Design, UI/UX with demo/presentation recorded. Start setting up the webpage and database. Containerize using Docker.
<p>
Deadline 2:
<p>
Record video outlining progress done
<p>
Web page setup
<p>
AWS Nodejs Server setup
<p>
Database setup  (AWS)
<p>
System Architecture - One diagram with components + rationale
<p>
Database Design- ER diagram w explanation
<p>
UI/UX - 2 designs (chosen one, alternative one that’s bad)
<p>
Database architecture setup 
   </td>
  </tr>
  <tr>
   <td>Term 2 week 4: Peer Testing
   </td>
   <td>Pages will be implemented and the database will be accessible by the webpage. Have a functional search bar and filters on the admin dashboard.  Secure user registration and authentication done via AWS. The client will have video recording integrated in the link webpage and it will be submitted into our AWS database.
<p>
Deadline 3:
<p>
User authentication done using Amazon Cognito
<p>
User credentials sent from client to server
<p>
Client Portal - video recording integrated into front end.
<p>
Video submits to the back end using AWS.
<p>
Query example on webpage
<p>
Functional search bar
   </td>
  </tr>
  <tr>
   <td>Term 2 week 8: 
<p>
Peer Testing
   </td>
   <td>Faces in the video will be blurred after being sent to the back-end and the video will be sent to the front-end for the admin to view. Automated emailing will be implemented, the admin can send links to a user's email, and the user will receive the submission link in their email.
<p>
Deadline 4:
<p>
Video blurring using AWS.
<p>
Blurred video stored in database after processing
<p>
Admin can send submission links to user via email
<p>
User receives email with submission link.
<p>
Privacy features such as URL  deletion after X days/video submission.
   </td>
  </tr>
  <tr>
   <td>Term 2 week 13:
<p>
Final project submission
   </td>
   <td>The remaining features should be implemented. The admin should be able to request a video, and the user should be able to create a video, get it blurred and get it viewed by the admin. The user experience should be smooth with no bugs in the UI.
<p>
Deadline 5:
<p>
Fully completed link sending through email and retrieval from dashboard. Completely tested and mostly bug free. Usable in current format for a user-client scenario. Videos will auto delete after a set amount of time.
   </td>
  </tr>
</table>



# 3 Technology Stack

**Technologies Planned:**

**Front-End:**

Due to the simplicity of our front-end, we chose to use vanilla HTML, CSS and Javascript. This is referred to as the holy trinity and is considered to be a golden standard for front-end development. 

**Framework:**

Our primary framework application language will be Javascript. Our choice to use Javascript comes from many different sources of external information, personal use from each group member and its relevance to the project at hand. This language will tie in our front-end interface with our back-end resources. This also works well for the client's needs as AWS has plentiful resources on connections with Javascript. For the trends, we found that Javascript was one of the most popular languages to code web-based applications due to its dynamics within web-based programming. To make this connect to our front and back end we will use the Node.JS runtime environment. This environment is very popular for javascript applications. For all these reasons we found Javascript & Node.JS to be the best framework language to use for our project.

**Back-end:**

For our backend, we chose another golden standard of development, MySQL as a database query language. This language is popular in many web-based applications and in our personal experience a common language to use. This language is very popular within database development and a common trend in most databases. The SQL database would be stored in AWS as with most of our application languages.


# 4 Teamwork Distribution and Anticipated Hurdles


<table>
  <tr>
   <td>Category 
   </td>
   <td>Joshua Medina
   </td>
   <td>Abby Kiehlbauch
   </td>
   <td>Abhinav
<p>
Thota
   </td>
   <td>Kael Pearson
   </td>
   <td>Beck Corkle
   </td>
  </tr>
  <tr>
   <td>Experience
   </td>
   <td>Backend Dev-QA antivirus software (Cisco), Front-end Dev data visualization for ERP (SAP), SQL Webstore (COSC304),  Unity game (BCHacks)
   </td>
   <td>Shopping site (COSC 304) - PHP, SQL, iClicker clone (COSC 310), Grocery store price comparison website (COSC 360) - HTML, CSS, JS
   </td>
   <td>Built shopping site for clowns in COSC 304
<p>
Most familiar with python. 
<p>
Built a file manager.
   </td>
   <td>Worked in front-end development. Experience with back-end personal projects. Created shop site (COSC 304). Lots of challenging math coding problems (Project Euler).
   </td>
   <td>Built a forum with PHP, and SQL (COSC 360)
<p>
Built a messaging web app in Python (COSC 310) 
<p>
Lots of personal …projects built with different front-end tech
   </td>
  </tr>
  <tr>
   <td>Good At
   </td>
   <td>Project management, front-end, back-end, testing. 
<p>
Languages: JS, Java, Python, Webstack(HTML,CSS,PHP),
   </td>
   <td>Presentation (public speaking), planning and organization, UI/UX design (wireframing), front-end development (HTML,CSS,PHP), reporting (writing), finding solutions
   </td>
   <td>Communication. Being level headed. UI/UX design. 
<p>
Familiar with React and front end.
   </td>
   <td>Being resourceful. Researching solutions. Back-end development. Front-end development. Team development.
   </td>
   <td>Front end development (HTML, CSS, JS, React)/ Back end development (NodeJS, PHP, Python). Working with new technologies. Working in a team and independently
   </td>
  </tr>
  <tr>
   <td>Expect to Learn
   </td>
   <td>AWS, database design, node js
   </td>
   <td>Back-end development, AWS, testing
   </td>
   <td>LOTS OF AWS. pull/merge etiquette and testing.
   </td>
   <td>AWS. Testing larger scale projects. (React)
   </td>
   <td>AWS!!!!! Automated testing
   </td>
  </tr>
</table>


Table 2


<table>
  <tr>
   <td>Category of Work/Features
   </td>
   <td>Joshua Medina
   </td>
   <td>Abby Kiehlbauch
   </td>
   <td>Abhinav
<p>
Thota
   </td>
   <td>Kael Pearson
   </td>
   <td>Beck Corkle
   </td>
  </tr>
  <tr>
   <td>Project Management
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Technical Direction
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Technical Help
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Troubleshooting
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>System Architecture Design
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>User Interface Design
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>CSS Development
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Admin Dashboard
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>User Portal
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Video Blurring
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Video Request Form
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Admin Account Management
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Database design
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Testing
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Database Setup
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Presentation Preparation
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Design Video Creation
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Design Video Editing
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Design Report
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Final Video Creation
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Final Video Editing
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Final Team Report
   </td>
   <td>✔️
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Final Individual Report
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
</table>


**Josh**

I will be doing the majority of the project management of the team. This means I will tackle the setup of the team management structures such as the github templates for commits, PRs and branch management. Along with that I’ll head assigning tasks, logs and other administrative tasks but maintain a democratic process for decision management. I will still be taking part in coding with my industry experience in backend, frontend and testing. This experience will guide me as a project manager and general direction lead. I also have a lot of experience in testing that the team does not have and thus that is why I will be heading the teaching and learning when it comes to regression and automated unit testing.

**Abby**

I will be helping with the user interface design as I have industry experience working with a UI team during a summer internship, as well as a general interest in the UI/UX process. I will also be working on the CSS design, user portal, and video request form as I have work experience in front end design, particularly HTML, CSS, and JavaScript. I have taken on the task of video and presentation preparation as I am familiar with video editing software and presentation preparation due to being a Bachelor of Arts student with a minor in Gender and Women’s Studies. As a group we decided certain aspects of the project would be a complete team effort in order to maximize group knowledge and efficiency. These tasks include technical direction, technical help, troubleshooting, and system architecture. 

**Abhinav**

I’ve chosen to work on the UI/UX design as well as mostly implementing the front end as I feel I have existing knowledge and experience with web design and front end development. I really enjoyed taking COSC 341, made a few designs I’m quite proud of, and I’m excited to work alongside Abby so that we can come up with simple, but elegant and accessible designs for our web app. I’ve followed a lot of tutorials using React/bootstrap and I’m eager to build out and translate our designs into code/functioning web pages.  I will also help out with designing, setting up and managing the database alongside Beck and Kael as I hope to learn more about backend development and learn more about AWS while also brushing up on querying databases by the end of this year.

**Kael**

I will be mostly working on the backend of the site as I am most comfortable working on database designing and general back end technology. I have experience from both COSC304 in creating a database as well as working on a site using it. I also have personal experience working on small projects that have a database as well. I will also help in implementing the video blurring tech as I want to obtain a better understanding from it. I will be also working on the admin account creation and integrating the data within the database. I also have experience working with editing software such as Davinci Resolve so I am able to help edit the video and create drafts for it as well. 

**Beck**

I will be helping with the backend component of this project and I have experience connecting backend and frontend so I can also help with integration. Specifically I will help with the video blurring algorithm to process videos in the back end, and with admin account management, integrating the login system with our database and AWS. The admin dashboard page is one exception which I will be working on the front-end for. My experience comes from COSC310 where we made a project with a back-end and front-end, and from personal projects like BCHacks where I learned how REST APIs communicate to the server and client. This project will help me learn more about AWS and database systems while allowing me to utilize my existing skills with front-end and backend integration. Lastly, there are group tasks that I will be helping with that include video editing, technical help and system design.
