import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Banner } from 'flowbite-react';
import React from 'react';

import {companyData} from "../sampledata.js"
import {quizData} from "../quizdata.js"

export function AdminQuizList({companyIdent}) {
  
  const company = companyData.find(company => company.companyId === parseInt(companyIdent));

  const renderQuizList = () => {
    if (!company) return null; // Return null if company not found
    return company.quizList.map((quizId, index) => (
      <tr key={index}>
        {/* Render columns for each quiz */}
        <td>{quizId}</td>
        <td>delete | <Link to={`/quizbuilder/${quizId}`}>edit</Link></td>
        {/* Add more columns here if needed */}
      </tr>
    ));
  };

  return (

<section className="flex items-center  bg-gray-50 dark:bg-gray-900 pt-8">
  <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
    
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div className="flex-row items-center justify-center p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">Your Quiz List</h5>
          <p className="text-gray-500 dark:text-gray-400">Manage all your existing quiz and exams here</p>
        </div>
        {/* <Button type="button"
                className="">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
          </svg>
          Build new quiz
        </Button> */}
      </div>
      <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Quiz ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderQuizList()}
              </tbody>
            </table>
          </div>
    </div>
  </div>
</section>

)}