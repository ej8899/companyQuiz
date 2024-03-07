

import { Button, Banner } from 'flowbite-react';
// import { HiX } from 'react-icons/hi';
// import { MdAnnouncement } from 'react-icons/md';
import { BsCookie } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

import { CheckMark } from '../assets/CheckMark';
import SignUp from '../pages/SignUp';

// TODO this will need to render logo, background image, other branding, etc depending on route being supplied for the company 'owner'

function LandingPage() {

  return (
    <>
      <section className="bg-white dark:bg-gray-900 pt-28">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-sans font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Easy Quiz Management for your business.</h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Simplify testing of your company policies and proceedures with a simple exam/quiz system - branded and built to your company needs!</p>
                <Button href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Get started
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Button>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
            </div>                
        </div>
      </section>


  <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-sans font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at CompanyQuiz! we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:scale-105 duration-500">
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
              <Button href="#" className="text-white  hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</Button>
          </div>
          
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:scale-105 duration-500">
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
              <Button href="#" className="text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</Button>
          </div>

          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white  hover:scale-105 duration-500">
              <h3 className="mb-4 text-3xl font-bold font-sans">Enterprise</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
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
                      <span>Free updates: <span className="font-semibold">forever</span></span>
                  </li>
              </ul>
              <Button href="#" className="text-white  hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</Button>
          </div>
      </div>

      <SignUp />
  </div>
  <Banner>
      <div className="flex w-full flex-row justify-between border-t-2 border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex items-center">
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400 ml-8">
            {/* <MdAnnouncement className="mr-4 h-4 w-4" /> */}
            <BsCookie className="h-8 w-8 mr-4"/>
            <span className="[&_p]:inline">
            We use our own cookies as well as third-party cookies on our websites to enhance your experience, analyze our traffic, and for security and marketing. Select "Accept All" to allow them to be used. Read our Cookie Policy.
            </span>
          </p>
        </div>
        <div className="flex flex-shrink-0 space-x-4 justify-center items-center ml-8 mr-8">
          <a href="">Manage Settings</a>
          <Banner.CollapseButton>Accept All</Banner.CollapseButton>
          <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <BsXLg className="h-4 w-4"/>
          </Banner.CollapseButton>
        </div>
      </div>
    </Banner>
    </section>
    </>
  );
}

export default LandingPage;
