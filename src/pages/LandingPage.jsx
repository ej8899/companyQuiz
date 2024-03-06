

import { Button } from 'flowbite-react';
import { CheckMark } from '../assets/CheckMark';

// TODO this will need to render logo, background image, other branding, etc depending on route being supplied for the company 'owner'

function LandingPage() {

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-sans font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Quiz management tool for your company</h1>
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
          
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-3xl font-bold font-sans">Starter</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
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
                      <span>Premium support: <span className="font-semibold">6 months</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Free updates: <span className="font-semibold">6 months</span></span>
                  </li>
              </ul>
              <Button href="#" className="text-white  hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</Button>
          </div>
          
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-3xl font-bold font-sans">Company</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
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
                      <span>Team size: <span className="font-semibold">&lt; 1000 members</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Premium support: <span className="font-semibold">24 months</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Free updates: <span className="font-semibold">24 months</span></span>
                  </li>
              </ul>
              <Button href="#" className="text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</Button>
          </div>

          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-3xl font-bold font-sans">Enterprise</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold font-sans">$499</span>
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
                      <span>Team size: <span className="font-semibold">&gt; 1000 members</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      <CheckMark />
                      <span>Premium support: <span className="font-semibold">36 months</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <CheckMark />
                      <span>Free updates: <span className="font-semibold">36 months</span></span>
                  </li>
              </ul>
              <Button href="#" className="text-white  hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</Button>
          </div>
      </div>
  </div>
</section>
    </>
  );
}

export default LandingPage;
