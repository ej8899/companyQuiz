import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Banner, Tooltip } from 'flowbite-react';

import { useState, useEffect } from 'react';

import PreviewQuiz from "./previewQuiz";

import { TiDocumentAdd } from "react-icons/ti";
import { TiDocumentText } from "react-icons/ti";
import { FaRegFileAlt } from "react-icons/fa";

// import {quizList} from "../quizdata.js"

export function AdminPublicQuizList({companyIdent,company}) {
  const [showPreviewQuiz, setShowPreviewQuiz] = useState({});

  const renderQuizList = () => {
    // console.log('company in adminpublicquizlist',company)
    const publicQuizzes = company.quizList.filter(quiz => quiz.quizType === 'public');
    if (publicQuizzes.length === 0) return null; // Return null if no public quizzes found
  
    return publicQuizzes.map((quiz, index) => (
      <tr key={index}  className="hover:bg-gray-300">
        <td className="text-gray-500 p-4 text-left pl-2">{quiz.quizName}</td>
        <td className="text-gray-500">
          <div className="flex flex-row justify-center items-center ">
          <Tooltip content="Copy Quiz to your company (enterprise only)"><TiDocumentAdd className="h-8 w-8 mr-2 hover:text-sky-700"/></Tooltip>

          <button onClick={() => setShowPreviewQuiz(prevState => ({ ...prevState, [quiz.qid]: true }))} className="uppercase">
        <Tooltip content="preview this quiz"><FaRegFileAlt className="h-6 w-6  text-gray-500 hover:text-sky-700"/></Tooltip>
          </button>
          <PreviewQuiz show={showPreviewQuiz[quiz.qid]} onClose={() => setShowPreviewQuiz(prevState => ({ ...prevState, [quiz.qid]: false }))} qid={quiz.qid} qname={quiz.quizName} />
          </div>
        </td>
      </tr>
    ));
  };
  

  return (
<section className="flex flex-col items-center w-full pt-4">
  
  <div className="border-1 border border-separate rounded-xl border-gray-200 shadow-md overflow-hidden w-full bg-gray-400 bg-gray-50 dark:bg-gray-800">    
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div className="flex-row items-center justify-center p-2 space-y-3 sm:flex sm:space-y-0 sm:space-x-4 bg-gray-300 dark:bg-gray-300">
        <div>
          <h5 className="mr-3 text-2xl font-semibold text-black">Public Quiz List</h5>
          <p className="text-gray-500 dark:text-gray-500">Various pre-built &apos;public&apos; quizzes. Copy to your account to get started!</p>
        </div>
      </div>
      <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-gray-500 bg-gray-400 text-black text-left pl-2 uppercase">Quiz Name</th>
                  <th className="text-gray-500 bg-gray-400 text-black uppercase">Actions</th>
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