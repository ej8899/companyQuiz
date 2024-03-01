import { useState, useEffect } from 'react';
import { globalconfig } from '../config.js';

const TitleBar = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  // const formattedTime = currentDateTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });


  return (
    <div className="bg-gray-800 text-white p-2 flex flex-row items-center justify-between px-6 bg-opacity-85">
      <div className="flex items-center">
        <img src="http://rpi.local/public/logo.jpg" alt="Company Logo" className="w-64 h-32 mr-2 rounded-lg" />
        <div className="text-5xl font-thin pl-4">
          Welcome to <br />
          <span className="text-7xl font-extrabold">{globalconfig.companyName}</span>
        </div>
      </div>

      <div className='flex flex-col text-right'>
        <div className="text-6xl font-extrabold uppercase">{formattedTime}</div>
        <div className="text-5xl font-thin">{formattedDate}</div>
      </div>

    </div>
  );
};

export default TitleBar;
