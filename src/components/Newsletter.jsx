
import { Navbar, Modal, Button, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';

export function Newsletter() {
  return (
    <div className="w-full pt-8">
    <div className="container flex flex-col xl:flex-row mx-auto px-5 py-8 xl:py-14 text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-white rounded-2xl">

      <div className="w-full mb-6 xl:mb-0 justify-center">
        <div className="mb-2 text-gray-900 text-4xl font-extrabold font-sans text-left dark:text-white">Sign up for our newsletter...</div>
        <div className="text-lg texts-left">and stay in the loop with everything you need to know about CompanyQuiz including announcements, discounts, and more.</div>
      </div>

      <div className="w-full  rounded-lg p-4 justify-center align-center">
        <div className="flex flex-col justify-center sm:flex-row gap-3 w-full ">
          <TextInput className="w-full" id="email4" type="email" icon={HiMail} placeholder="name@yourcompany.com" required />
          <Button type="submit" className="sm:w-1/4 h-12 text-white  rounded-lg shadow transition-all duration-300 ease-in-out hover:bg-purple-700">Subscribe</Button>
        </div>
        <div className="mt-3 text-sm sm:text-center">We care about your data. Read our <u className="cursor-pointer transition-all duration-300 ease-in-out hover:text-gray-700">privacy policy</u>.</div>
      </div>
    </div>
  </div>
  );
}


