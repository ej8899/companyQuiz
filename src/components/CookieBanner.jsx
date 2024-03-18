import { Button, Banner, Modal,  } from 'flowbite-react';
import { PiCookieFill } from "react-icons/pi";
import { BsCookie } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [openModal, setOpenModal] = useState(false);
  const managementModal = false;

   // accept all cookies
   const handleAcceptAll = () => {  
    localStorage.setItem('cookieBannerTimestamp', Date.now());
    console.log("accept all cookies");
  };

  useEffect(() => {
    // Check if data exists in localStorage
    const storedTimestamp = localStorage.getItem('cookieBannerTimestamp');
    if (storedTimestamp) {
      // Calculate the difference in hours between stored time and current time
      const diffInHours = (Date.now() - parseInt(storedTimestamp)) / (1000 * 60 * 60);
      // If less than 24 hours, hide the banner
      if (diffInHours < 24) {
        setOpenModal(false);
      } else {
        // If greater than or equal to 24 hours, show the banner & reset date stamp
        setOpenModal(true);
        localStorage.setItem('cookieBannerTimestamp', Date.now());
      }
    } else {
      // If no data exists in localStorage, show the banner
      setOpenModal(true);
      // TODO make this work as it should - we're defaulting to accepting cookies no matter what
      localStorage.setItem('cookieBannerTimestamp', Date.now());
    }
  }, []);

  return (
    <>
    {openModal && (
    <Banner>
    <div className="z-50 flex fixed bottom-0 left-0 w-full flex-row justify-between border-t-2 border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
      <div className="mx-auto flex items-center">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400 ml-8">
          {/* <MdAnnouncement className="mr-4 h-4 w-4" /> */}

          <PiCookieFill className="h-12 w-12 mr-4"/>
          <span className="[&_p]:inline">
          This site uses cookies for performance, analytics, and personalization which helps us improve our site. This will be set only after consent. For more details relative to cookies and other sensitive data, please read the full privacy policy.
          </span>
        </p>
      </div>
      <div className="flex flex-shrink-0 space-x-4 justify-center items-center ml-8 mr-8">
        {/* <Button onClick={() => setOpenModal(true)}>Manage Settings</Button> */}
        {/* <Banner.CollapseButton onClick={handleAcceptAll}>Accept All</Banner.CollapseButton> */}
        <Banner.CollapseButton>Accept All</Banner.CollapseButton>
        {/* <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
          <BsXLg className="h-4 w-4"/>
        </Banner.CollapseButton> */}
      </div>
    </div>
    </Banner>
    )}
    <Modal show={managementModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Cookies Management</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Currently, we&apos;re only utilizing cookies that are required for the functionality of this website. No cookies are being used for tracking and advertising purposes. If such cookies are utilized in the future, you will be notified and allow to turn them off here.
          </p>
          {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
            soon as possible of high-risk data breaches that could personally affect them.
          </p> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpenModal(false)}>Continue</Button>
        {/* <Button color="gray" onClick={() => setOpenModal(false)}>
          Decline
        </Button> */}
      </Modal.Footer>
      </Modal>
</>
  );
}