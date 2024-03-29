
import React from 'react';
import { Button, } from 'flowbite-react';
function NotFound() {
  const logoImage = "./public/android-chrome-192x192.png";
  return (
    <section className="bg-white dark:bg-gray-900 h-full items-center justify-center flex flex-col">
      <img src={logoImage} alt="logo" className="w-132 h-132 mx-auto mb-0" />
        <div className=" px-4 mx-auto max-w-screen-xl lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-500 dark:text-primary-400 font-sans">Oops!</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">That page doesn&apos;t exist.</p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">You&apos;ll find lots to explore on the home page. </p>
                <Button href="#" className="">Back to Homepage</Button>
            </div>   
        </div>
    </section>
  );
}

export default NotFound;
