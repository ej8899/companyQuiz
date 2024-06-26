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
- tweak admin display (bug fixes)
- api->users: get specific user
- api->users: get all by company id
- api->users: add new users

3/17/23 - companyquiz
- read users from db into front end
- set timer in cookies info banner (24hours)
- assign quiz id's to users (sample data only)
- misc UI work in admin section

3/18/23 - companyquiz
- minor landing page adjustments
- retrieve companies data API
- add companies sample data to live server
- API to find user by email
- user login now also retrieves 'owner/company' info for user admin page branding

3/19/23 - companyquiz
- drop companies table - merged w users table
- additional API work
- all user and company admins operate from live db - hardcoded sample data removed
- implement user and company branding (admin, user and certificate pages)
- retrieve quiz names throughout admin & user sections

3/20/23 - companyquiz
- setup quizDB with JSON column for quiz qna's
- build out API code to assemble quiz data
- front end pulls quiz data (for users & admins)
- quiz builder now loads from db

3/21/23 - companyquiz
- minor UI/UX tweaks
- fix 'timing/flow' bug on quiz display section
- fix csv output based on live DB data

3/22/23 - companyquiz
- add admin summary component w data
- add csv uploader modal
- update quiz scores into live db

3/23/23 - companyquiz
- style loading quiz screen
- fix navbar home flow in admin and user sections
- fix misc state flow issues
- misc UI/UX fixes and cleanups
- fixed quiz assignment list bug -might hold actually assigning quizzes from being 'live' for demo purposes

3/24/24 - companyquiz
- minor UI/UX tweaks
- temporary fix to login issues (delayed login to ensure data loads)
- work on AI quiz generator (in test environment only)

3/25/24 - companyquiz
- middleware and tie into front end for ai quiz builder

3/26/24 - companyquiz
- build popover component and add 'popover' notes as required
- misc UI tweaks
- build quiz preview mode for admins

3/27/24 - companyquiz
- assemble post-hackathon timeline to app deployment
- work on quizbuilder - increase functionality
- quizbuilder images now auto search unsplash based on quiz name, industry, etc.
- lockout a few areas for demo
- chase down some state issues from initial hard coded data

3/28/24 - companyquiz
- tweak misc styles
- update landing page w images, style
- bug hunts

3/29/24
- misc bug fixes, state tracking

3/30/24
- 