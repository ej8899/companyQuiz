
'use client';

import { DarkThemeToggle } from 'flowbite-react';

import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { globalconfig } from '../config.js';

export default function MyFooter() {
  return (
    <div className="bg-gray-800 text-white p-0 flex flex-row items-center justify-between px-4 bg-opacity-85 text-5xl font-thin fixed bottom-0 w-full -mt-6 border-0">
    <div className="flex items-start items-center border-0">
      
      <span className="ml-2">{globalconfig.companyName}</span>
    </div>
    <div className="flex items-end items-center p-0 ml-4 border-0">
    soc links here
    </div>
  </div>
  );
}




