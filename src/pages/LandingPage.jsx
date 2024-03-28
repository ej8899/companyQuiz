import  { useRef,  } from 'react';

import { Button, Accordion } from 'flowbite-react';
// import { HiX } from 'react-icons/hi';
// import { MdAnnouncement } from 'react-icons/md';

import { CheckMark } from '../assets/CheckMark';
import SignUp from '../pages/SignUp';
import Navbar from '../components/Navbar'
import { Newsletter } from '../components/Newsletter';
import { setPageTitle } from '../utilities/helpers';


// TODO this will need to render logo, background image, other branding, etc depending on route being supplied for the company 'owner'

function LandingPage() {
  
  const logoImage = "./android-chrome-192x192.png";
  setPageTitle();

  

  const getstarted = useRef(null)
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
      });
    };

  return (
    <>
    <Navbar/>
    <div className="">
      <section className="bg-[#222f40] pt-28  w-full z-0  relative ">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-12 lg:grid-cols-12 z-50">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-sans font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">Easy Quiz Management for your business.</h1>
                <p className="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl text-gray-400">Simplify testing of your company policies and proceedures with a simple exam/quiz system - branded and built to your company needs!</p>
                <Button onClick={() => scrollToSection(getstarted)}  className="text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900 transition-all duration-300 ease-in-out hover:bg-purple-700 hover:dark:bg-purple-700">
                    Get started
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Button>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="hero-dark.jpeg" alt="mockup image" />
            </div>                
        </div>
        <div className="custom-shape-divider-bottom-1711654168">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-white dark:fill-[#111827]"></path>
    </svg>
</div>
        <div className="skewed"></div>
      </section>
      

  <section className=" bg-white dark:bg-gray-900 ">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-sans font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at CompanyQuiz! we focus on taking your company compliances seriously with an fast and easy to use quiz management system.</p>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-slate-200 rounded-lg border-2 border-gray-300 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:bg-slate-200 hover:dark:bg-slate-700 hover:scale-105 duration-500 hover:shadow-lg transform transition-transform">
              <h3 className="mb-4 text-3xl font-bold font-sans">Starter</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for getting started and evaluating our features.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold font-sans">$0</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              
              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Limited configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Team size: <span className="font-semibold">&lt; 10 members</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span># of quiz/exams: <span className="font-semibold">up to 5</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Free updates: <span className="font-semibold">6 months</span></span>
                  </li>
              </ul>
              <Button onClick={() => scrollToSection(getstarted)}  className="text-white  hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900 transition-all duration-300 ease-in-out hover:bg-purple-700 hover:dark:bg-purple-700">Get started</Button>
          </div>
          
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-slate-200 rounded-lg border-2 border-gray-300 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:bg-slate-200 hover:dark:bg-slate-700 hover:scale-105 duration-500">
              <h3 className="mb-4 text-3xl font-bold font-sans">Company</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold font-sans">$29</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              
              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Team size: <span className="font-semibold">&lt; 100 members</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span># of quiz/exams: <span className="font-semibold">up to 25</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Free updates: <span className="font-semibold">forever</span></span>
                  </li>
              </ul>
              <Button  onClick={() => scrollToSection(getstarted)} className="text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900 transition-all duration-300 ease-in-out hover:bg-purple-700 hover:dark:bg-purple-700">Get started</Button>
          </div>

          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-slate-200 rounded-lg border-2 border-gray-300 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:bg-slate-200 hover:dark:bg-slate-700 hover:scale-105 duration-500">
              <h3 className="mb-4 text-3xl font-bold font-sans">Enterprise</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended use requirements.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold font-sans">$99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              
              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Team size: <span className="font-semibold">100+ members</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      <CheckMark />
                      <span># of quiz/exams: <span className="font-semibold">Unlimited</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      <CheckMark />
                      <span>AI quiz generator</span>
                  </li>
              </ul>
              <Button onClick={() => scrollToSection(getstarted)} className="text-white  hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900 transition-all duration-300 ease-in-out hover:bg-purple-700 hover:dark:bg-purple-700">Get started</Button>
          </div>
      </div>

      <section className="py-24 font-sans ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">
              <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
                  <div className="relative w-full text-center lg:text-left lg:w-2/4">
                      <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0 font-sans font-bold tracking-tighter dark:text-white">Fast quiz deployment for your company!</h2>
                  </div>
                  <div className="relative w-full text-center  lg:text-left lg:w-2/4">
                      <p className="text-lg font-normal text-gray-500 mb-5">Enjoy peace of mind with our automated company quiz/testing platform.  Just import your team members and go!  Have peace-of-mind knowing your team is in compliance with company standards and policies!</p> 
                      
                  </div>
              </div>
              <div className="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#0f7490]">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z" stroke="#4F46E5" strokeWidth="2"></path>
                              </svg>
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Fast Setup</h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          Deploy company quizzes in just a few clicks. Import team members, create exams and generate reports automatically. No technical skills required.
                      </p>
                  </div>
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#0f7490] ">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.375 15.8571C16.1009 15.8571 17.5 14.458 17.5 12.7321C17.5 11.0062 16.1009 9.6071 14.375 9.6071C12.6491 9.6071 11.25 11.0062 11.25 12.7321C11.25 14.458 12.6491 15.8571 14.375 15.8571ZM14.375 15.8571V20.8571M3.75 13.2264V15.2343C3.75 17.6868 3.75 18.9131 4.27747 19.9685C4.80493 21.0239 5.78567 21.76 7.74715 23.2322L8.57248 23.8516C11.4626 26.0208 12.9077 27.1054 14.5753 27.1054C16.243 27.1054 17.688 26.0208 20.5782 23.8516L21.4035 23.2322C23.365 21.76 24.3457 21.0239 24.8732 19.9685C25.4006 18.9131 25.4006 17.6868 25.4006 15.2343V13.2264C25.4006 9.95932 25.4006 8.32576 24.546 7.05852C23.6913 5.79128 22.1768 5.17918 19.1477 3.95499L18.3223 3.62144C16.4724 2.87381 15.5475 2.5 14.5753 2.5C13.6032 2.5 12.6782 2.87381 10.8283 3.62144L10.003 3.95499C6.97389 5.17919 5.45934 5.79128 4.60467 7.05852C3.75 8.32576 3.75 9.95932 3.75 13.2264Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Secure Data</h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          Your company data is safe and secure and is yours to retrieve at any time. One click download available!
                      </p>
                  </div>
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#0f7490]">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.0067 10V15.6652C15.0067 16.0358 15.1712 16.3873 15.4556 16.6248L18.75 19.375M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Fast Customer Service </h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          We provide fast customer service with enhanced response time for Enterprise customers.
                      </p>
                  </div>
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-[#0f7490]">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Admin Dashboard</h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          See team member and over-all company compliance status at a glance with our stats dashboard.
                      </p>
                  </div>
              </div>
        </div>
      </section>
                                            

      <Newsletter />

      <section >

      <h2 className="mb-4 mt-12 text-4xl tracking-tight font-sans font-extrabold text-gray-900 dark:text-white text-center">Frequently asked questions</h2>
    <Accordion className="bg-gray-200 dark:bg-[#2c3e50]">
      <Accordion.Panel>
        <Accordion.Title ><span className="font-sans font-semibold">What is CompanyQuiz?</span></Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          CompanyQuiz is a comprehensive web application designed to streamline the management of quizzes and testing within a company environment. It offers a range of features tailored to both users and company administrators, ensuring smooth operation and efficient monitoring of testing processes.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title><span className="font-sans font-semibold">Can I customize quiz assignments for different user groups?</span></Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          Yes, CompanyQuiz allows administrators to customize quiz assignments based on individual users, user roles or departments. This ensures that each user receives quizzes tailored to their specific job requirements or training needs.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title><span className="font-sans font-semibold">What options are available for creating new quizzes?</span></Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          CompanyQuiz offers an AI generator tool that enables administrators to create new quizzes quickly and efficiently. Administrators can input specific criteria or topics, and the AI generator will automatically generate quiz questions based on the input parameters.  
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          At any time, company adminstrators can also create a quiz entirely from scratch by adding questions, answer options, and specifying the correct answers manually. This allows for fully customized quizzes tailored to specific learning objectives or scenarios.
          </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title><span className="font-sans font-semibold">How are quiz results and certificates managed?</span></Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          Upon completing a quiz, users receive immediate feedback on their results. CompanyQuiz automatically generates certificates of completion, which users can download and print for their records. Administrators can also access detailed reporting and analytics on quiz results through the admin dashboard.
          </p>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title><span className="font-sans font-semibold">How can CompanyQuiz help ensure company compliance with testing requirements?</span></Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          CompanyQuiz provides administrators with comprehensive reporting and analytics tools to monitor company-wide compliance with testing requirements. By analyzing pass/fail rates and quiz completion rates, administrators can identify areas for improvement and take proactive measures to ensure compliance across the organization.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          Additionally, a quick and simple CSV export option is available to allow administrators to track compliance metrics over time. This helps ensure all necessary testing requirements are being met on an ongoing basis across the entire organization.
          </p>
        </Accordion.Content>
      </Accordion.Panel>

    </Accordion>


      </section>

      <section ref={getstarted} className=""></section>
      <SignUp />
  </div>
  
  
  <footer className="p-4 bg-slate-300 sm:p-6 dark:bg-gray-800 relative">
  <div className="custom-shape-divider-top-1711653972 -mt-0">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white dark:fill-[#111827]"></path>
    </svg>
</div>
    <div className="mx-auto max-w-screen-xl mt-28">
        <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
                <a href="https://erniejohnson.ca/apps/companyquiz" className="flex items-center">
                    <img src={logoImage} className="mr-3 h-10" alt="CompanyQuiz Logo" />
                    <span className="self-center text-2xl tracking-tight font-extrabold whitespace-nowrap font-sans font-bold dark:text-white">CompanyQuiz!</span>
                </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="" className="hover:underline">AI Quiz Generation</a>
                        </li>
                        <li>
                            <a href="" className="hover:underline">Data Policies</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="https://github.com/ej8899/companyQuiz" className="hover:underline ">Github</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/ernie-johnson/" className="hover:underline">LinkedIn</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 - Built by <a href="https://erniejohnson.ca" className="hover:underline mr-4">ErnieJohnson.ca</a>All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" /></svg>
                </a>
            </div>
        </div>
    </div>
</footer>

    </section>
    </div>
    </>
  );
}

export default LandingPage;
