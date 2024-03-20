import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Banner, Tooltip } from 'flowbite-react';
import React from 'react';

// import {companyData} from "../sampledata.js"
import {quizData} from "../quizdata.js"
import { HiSparkles } from "react-icons/hi2";
import { VscNewFile } from "react-icons/vsc";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

export function AdminQuizList({companyIdent}) {
  
  //const company = companyData.find(company => company.companyId === parseInt(companyIdent));
  const company = JSON.parse(localStorage.getItem('companyData'));
  console.log('company:', company);
  const renderQuizList = () => {
    if (!company) return null; // Return null if company not found
    return company.quizList.map((quiz, index) => (
      <tr key={index}>
        {/* Render columns for each quiz */}
        <td>{quiz.quizName}</td>
        <td className="flex flex-row justify-center">
        <Link to={`/quizbuilder/${quiz.qid}`}><Tooltip content="edit quiz"><FaEdit className="mr-4 h-6 w-6"/></Tooltip></Link>
        <Tooltip content="delete this quiz"><BsFillTrashFill className="mr-4 h-6 w-6"/></Tooltip>
        </td>
      </tr>
    ));
  };

  return (
    <section className="flex flex-col items-center  w-full pt-4  ">
  
    <div className="border-1 border border-separate rounded-xl border-gray-200 shadow-md overflow-hidden w-full bg-gray-50 dark:bg-gray-800">
{/* <section className="flex items-center  bg-gray-50 dark:bg-gray-900 pt-8">
  <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12"> */}
    
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg pb-4">
      <div className="flex-row items-center justify-center p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">Company Managed Quiz List</h5>
          <p className="text-gray-500 dark:text-gray-400">Manage all your existing quiz and exams here</p>
        </div>
        <Link to={`/quizbuilder/new`}>
        <Button type="button"
                className="">
          <VscNewFile className="mr-2" /> Build new quiz
        </Button></Link>
        <Button><HiSparkles className="h-6 w-6 mr-2"/>AI generated quiz</Button>
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