
'use client';
import { useState, useEffect } from 'react';

import { DarkThemeToggle } from 'flowbite-react';

import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitterX, BsDiscord,} from 'react-icons/bs';
import { globalconfig } from '../config.js';

export default function MyFooter() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDrawer = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const toggleDarkTheme = (event) => {
    event.stopPropagation();

    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Check the current theme when the component mounts
    setIsDarkTheme(document.documentElement.classList.contains('dark'));
  }, []);

  return (
<>


      <div
        id="drawer-swipe"
        onClick={toggleDrawer}
        className={`fixed z-40 w-full overflow-y-auto bg-white border-t-2 pb-2 border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-800 transition-transform bottom-0 left-0 right-0 ${
          isOpen ? 'translate-y-[21rem]' : 'translate-y-0'
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-swipe-label"
      >
        <div
          className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          data-drawer-toggle="drawer-swipe"
          onClick={toggleDrawer}
        >
          <span className="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600"></span>
          <h5 id="drawer-swipe-label" className="inline-flex items-center text-base text-gray-500 dark:text-gray-400 font-medium">
            user name here (Logout)
          </h5>
    
        </div>
        
        <div className="grid grid-cols-3 gap-4 p-4 lg:grid-cols-3">
      <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700" onClick={(event)=>toggleDarkTheme(event)}>
        <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
        <DarkThemeToggle className=''/>
        </div>
        <div className="font-medium text-center text-gray-500 dark:text-gray-400">{isDarkTheme ? 'Light Theme' : 'Dark Theme'}</div>
      </div>
      <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
        <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
          <svg className="inline w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM9 6v2H2V6h7Zm2 0h7v2h-7V6Zm-9 4h7v2H2v-2Zm9 2v-2h7v2h-7Z"/>
          </svg>
        </div>
        <div className="font-medium text-center text-gray-500 dark:text-gray-400"><a href="http://localhost:5173/#/usermain/23">Quiz List</a></div>
      </div>
 
      <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
        <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
            <svg className="inline w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
               <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
            </svg>
        </div>
        <div className="font-medium text-center text-gray-500 dark:text-gray-400">List</div>
      </div>
      <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
        <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
            <svg className="inline w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
            </svg>
        </div>
        <div className="font-medium text-center text-gray-500 dark:text-gray-400">Price</div>
      </div>
      <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
        <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
            <svg className="inline w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
            </svg>
        </div>
        <div className="font-medium text-center text-gray-500 dark:text-gray-400">Users</div>
      </div>

      <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
        <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
            <svg className="inline w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
            </svg>
        </div>
        <div className="font-medium text-center text-gray-500 dark:text-gray-400">Custom</div>
      </div>
      
  </div>
  <div className="bg-gray-800 text-white p-0 flex flex-row items-center justify-between px-4 bg-opacity-85 text-5xl font-thin  w-full  border-0 border-t border-gray-200 dark:border-gray-500 shadow">
    <div className="flex items-start items-center border-0 font-thin text-xl text-gray-400">
      
      exam by <span className="ml-2 font-medium text-xl">{globalconfig.companyName} via CompanyQuiz &copy; All Rights Reseved </span> 
      
    </div>
    
    <div className="flex items-end items-center p-0 ml-4 border-0">
    <div className="flex mt-4 p-2 sm:justify-center sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <BsFacebook className="w-10 h-10" />
                  <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <BsDiscord className="w-10 h-10" />
                  <span className="sr-only">Discord community</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <BsTwitterX className="w-10 h-10" />
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <BsInstagram className="w-10 h-10" />
                  <span className="sr-only">Instagram account</span>
              </a>
          </div>
    </div>
    {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" /> */}
  </div>
      </div>
    </>

 
  );
}




