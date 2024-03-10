import React from 'react';
import { useLocation } from 'react-router-dom';
import {todayLong} from '../utilities/helpers.js'
import { setPageTitle } from '../utilities/helpers.js';

const GenerateCertificate = () => {
  const location = useLocation();
  const data = location;
  //const { quizId, userId, quizScore, quizDateTested } = location.state;
  //const stateData = location.state ? location.state : null;
  console.log('data', data);
  const today = new Date();

  setPageTitle(data.state.userId + ' Certificate of Achievement in ' + data.state.quizId);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Certificate of Achievement</h1>
          <p className="text-gray-500">This is to certify that</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-bold">[User Name]</p>
          <p className="text-gray-500">has successfully completed</p>
          <p className="text-lg font-bold">[quiz Name]</p>
          <p className="text-gray-500">with a score of</p>
          <p className="text-lg font-bold">{data.state.quizScore}%</p>
          <p className="text-gray-500">on {data.state.quizDateTested}</p>
        </div>
        <div className="mt-8">
          <p className="text-lg">Issued by:</p>
          <p className="text-lg font-bold">[Company Name], {todayLong()}</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;
