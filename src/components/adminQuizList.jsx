import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Banner, Tooltip } from 'flowbite-react';


// import {companyData} from "../sampledata.js"
// import {quizData} from "../quizdata.js"
import { HiSparkles } from "react-icons/hi2";
import { VscNewFile } from "react-icons/vsc";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import { useState, useEffect } from 'react';

export function AdminQuizList({companyIdent}) {
  
  //const company = companyData.find(company => company.companyId === parseInt(companyIdent));
  const company = JSON.parse(localStorage.getItem('companyData'));
  console.log('company:', company);

  const renderQuizList = () => {
    if (!company) return null; // Return null if company not found
    return company.quizList.map((quiz, index) => (
      <tr key={index} className="hover:bg-gray-300">
        {/* Render columns for each quiz */}
        <td className="p-0  text-left p-2 pl-2 text-gray-500 pt-2">{quiz.quizName}</td>
        <td className="flex flex-row justify-center pt-2">
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
      <div className="flex-row items-center justify-center p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4 bg-gray-300 dark:bg-gray-300">
        <div className="">
          <h5 className="mr-3 text-2xl font-semibold dark:text-black text-black">Company Managed Quiz List</h5>
          <p className="text-gray-500 dark:text-gray-500">Manage all your existing quiz and exams here</p>
        </div>
      </div>
      <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-gray-500 bg-gray-400 text-black">Quiz Name</th>
                  <th className="text-gray-500 bg-gray-400 text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderQuizList()}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td className="flex justify-end  pr-4">
                    <Link to={`/quizbuilder/new`}>
                    <Button type="button"
                            className="mr-2">
                      <VscNewFile className="mr-2 h-6 w-6 mr-2" /> Build new quiz
                    </Button></Link>
                    <Button><HiSparkles className="h-6 w-6 mr-2"/>AI generated quiz</Button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
    </div>
  </div>
</section>

)}