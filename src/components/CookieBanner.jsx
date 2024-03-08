import { Button, Banner } from 'flowbite-react';
import { PiCookieFill } from "react-icons/pi";
import { BsCookie } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

export function CookieBanner() {
  return (
    <Banner>
    <div className="z-50 flex fixed bottom-0 left-0 w-full flex-row justify-between border-t-2 border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
      <div className="mx-auto flex items-center">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400 ml-8">
          {/* <MdAnnouncement className="mr-4 h-4 w-4" /> */}

          <PiCookieFill className="h-12 w-12 mr-4"/>
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
  );
}