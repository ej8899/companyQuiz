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
    <div className="flex flex-col items-center justify-center h-full w-screen bg-white p-8">
      <div className="border-8 border-gray-700 rounded-lg p-8 w-full h-full m-8">
      <div className="bg-white rounded-lg p-8 w-full h-full flex flex-col justify-center">
        <div className="text-center mb-4">
        <p className="text-gray-500 text-4xl mt-12">[company logo]</p>
          <h1 className="text-6xl font-bold">Certificate of Achievement</h1>
          <p className="text-gray-500 text-4xl mt-12">This is to certify that</p>
        </div>
        <div className="mb-4">
          <p className="text-xl font-bold text-center">[User Name]</p>
          <p className="text-gray-500 text-center">has successfully completed</p>
          <p className="text-xl font-bold text-center">[quiz Name]</p>
          <p className="text-xl font-bold text-center">from [company name]</p>
          <p className="text-gray-500 text-center">with a score of</p>
          <p className="text-xl font-bold text-center">{data.state.quizScore}%</p>
          <p className="text-gray-500 text-center">on {data.state.quizDateTested}</p>
        
          <p className="text-2xl text-center mt-12">Issued by:</p>
          <p className="text-2xl font-bold text-center">[Company Name],</p>
          <p className="text-2xl font-bold text-center">{todayLong()}</p>
          <p className="text-lg font-bold text-center">verify here: [verify link]</p>
        </div>  
      </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;
