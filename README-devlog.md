Don the Developer March 2024 Hackathon

03/01/24 - Day 01 - Start of Hackathon
- create logo (WIP)
- create readme initial framework
- setup react via vite, tailwind, flowbite
- add global config file
- add structure for MVP stage 1 including sample data, render test questions, scoring, and results
- add unsplash image 'decoration'

03/02/24 - Day 02
- activate light/dark theme toggle w persistence to localstorage
- tweak styling
- restructure quizData to an object (for future growth)
- add quiz key handler A, B, C etc
- add quiz progress bar
- misc other mvp stage 1 cosmetics

03/03/24 - 
- build out notion task board, populate w ideas, tasks, mvp, user stories & ref. notes
- minor ui tweaks
- add react-icons
(not posted to discord)

03/04/24 -
- convert footer to slide up drawer panel
- import google font Rubik

03/05/24 - 
- assemble wireframes for mvp stages 2 & 3
- remove top nav bar - footer drawer will handle things (unless I change my mind again)

03/06/24 -
- create login page (WIP) (will function for users and admins)
- create sign up page (WIP)
- create landing page (WIP) - hero, price cards, 
- navbar is back but will be for specific pages (landing page, sign in/up, admin, etc)
- add cookies consent (WIP to save settings)
- setup react-router & setup basic routes for testing

03/07/24 - 
- add 404 page route
- cookie consent to individual component (DRY)
- add admin page (WIP)
- add newsletter subscribe component
- add quiz admin page
- add sample company & user data
- add landingpage footer (WIP)
- start working with sample data on admin side

03/08/24 -
- add user main page (WIP)
- add quiz builder page (WIP)
- add test routes for above
- start connecting all sample data

03/09/24 - 
- add admin routing based on company identifier
- add user status overview and details (for company admin)
- add company and user login with subsequent routing (no password auth yet)
- add certificate of completion generator

3/10/24 -
- create & add favicons
- add index.html meta tags
- work on additional routing/project flows
- add misc UI cleanups (conditional formatting)
- add login/out persistence across pages (admin & user)
- add dynamic page titles

3/11/24 - 
- add dynamic navbar (based on user or company admin)

3/13/23 -
- started creating database.  promptly lost direction in my MVP and started contemplating "future features". Decided to put db on hold while I hash out some additional DB concepts stricly in front end.
- tweaked some layouts, 
- work out 'quiz builder' section. 

3/14/23 - companyquiz
- add public quiz listings w copy & view operations (WIP)
- admin section: add placeholder buttons (import/export/ai quiz generator, edit company info)
- integrate unsplash API to allow admins to select background images for company login and individual quizzes

3/15/23 - companyquiz
- work more on quizbuilder page
- added csv export of users & test results
- create users, scoring, quiz assignment tables
- start api code (get users)

3/16/23 - companyquiz
- add quiz image search middleware for unsplash (access key protection)
- remove footer and return to header nav on quiz displays
- tweak certification display to 'full screen'