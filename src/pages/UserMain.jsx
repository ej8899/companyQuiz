
import React from 'react';
import { Button, } from 'flowbite-react';

import Navbar from '../components/Navbar'

import {userData} from "../sampledata.js"
import {quizData} from "../quizdata.js"

// TODO needs a logout
// TODO needs 'user' based navbar w logout, help, etc

export default function UserMain() {

  return (
    <>
    <Navbar/>
    
    <section className="bg-white dark:bg-gray-900 h-full items-center flex flex-col pt-24">
      <div className="px-6 py-3 text-left text-xl font-bold font-sans text-gray-500 uppercase tracking-wider">{userData[1].name}</div>

      <ScoreTable scores={userData[1].scores}/>

    </section>
    </>
  );
}



// TODO color code table rows depending on pass, fail, low score etc - green, orange, red
// TODO add tooltips on the action icons
// TODO add action icons instead of text

const ScoreTable = ({ scores }) => {
  return (

    <table className="divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quiz ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Score
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date Tested
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {scores.map((score, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{score.quizId}</td>
            <td className="px-6 py-4 whitespace-nowrap">{score.score}</td>
            <td className="px-6 py-4 whitespace-nowrap">{score.dateTested}</td>
            <td className="px-6 py-4 whitespace-nowrap">retake | view certificate | email certifcate</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};