import React, { useRef, useState, useEffect } from 'react';
import { IoInformationCircleSharp } from "react-icons/io5";

const Popover = ({ content, title }) => {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);

  const handleMouseOver = () => {
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    setShowPopover(false);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className="p-0 m-0 ml-1"
        // className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg px-4 py-2"
      >
        <IoInformationCircleSharp  className="hover:text-sky-600"/>
      </button>
      {showPopover && (
        <div
          ref={popoverRef}
          className={`absolute z-10 ${
            showPopover ? 'visible opacity-100' : 'invisible opacity-0'
          }  text-sm text-gray-500 transition-opacity duration-300 bg-slate-200 border-2 border-gray-400 rounded-lg shadow-sm w-72 dark:bg-gray-400 dark:border-gray-600 dark:text-gray-400 `}
        >
          <div className="p-4 space-y-2">
            <p className="font-semibold text-gray-900">{title}</p>
            <p className="text-gray-700">{content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;
