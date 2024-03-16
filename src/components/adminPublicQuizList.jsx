import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Banner } from 'flowbite-react';
import React from 'react';


import {quizList} from "../quizdata.js"

export function AdminPublicQuizList({companyIdent}) {

  const renderQuizList = () => {
    const publicQuizzes = quizList.filter(quiz => quiz.quizType === 'public');
    if (publicQuizzes.length === 0) return null; // Return null if no public quizzes found
  
    return publicQuizzes.map((quiz, index) => (
      <tr key={index}>
        <td>{quiz.quizName}</td>
        <td>view | <Link to={`/quizbuilder/${quiz.quizId}`}>copy to company</Link></td>
      </tr>
    ));
  };
  

  return (
<section className="flex flex-col items-center w-full pt-4">
  
  <div className="border-1 border border-separate rounded-xl border-gray-200 shadow-md overflow-hidden w-full bg-gray-400 bg-gray-50 dark:bg-gray-800">
{/* <section className="flex items-center  bg-gray-50 dark:bg-gray-900 pt-8">
  <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12"> */}
    
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div className="flex-row items-center justify-center p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4 ">
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">Public Quiz List</h5>
          <p className="text-gray-500 dark:text-gray-400">Various pre-built quizzes you can assign to your users, or copy to your account and edit specifics!</p>
        </div>
      </div>
      <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Quiz Name</th>
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