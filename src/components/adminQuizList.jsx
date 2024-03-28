import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Banner, Tooltip } from 'flowbite-react';


// import {companyData} from "../sampledata.js"
// import {quizData} from "../quizdata.js"
import { HiSparkles } from "react-icons/hi2";
import { VscNewFile } from "react-icons/vsc";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";

import { useState, useEffect } from 'react';
import QuizBuilder from "../pages/QuizBuilder";
import AiQuiz from "./AiQuiz";
import PreviewQuiz from "./previewQuiz";

export function AdminQuizList({companyIdent, company}) {
  const navigate = useNavigate();
  const [showAiQuiz, setShowAiQuiz] = useState(false);
  const [showPreviewQuiz, setShowPreviewQuiz] = useState({});

  //const company = companyData.find(company => company.companyId === parseInt(companyIdent));
  //const company = JSON.parse(localStorage.getItem('companyData'));
  console.log('company in adminquizlist (state):', company);
  console.log('companyIdent in adminquizlist (sate):',companyIdent)

  const handleEditQuizClick = (quizId) => {
    const myState = {
      quizId: quizId,
      userId: companyIdent,
      company: company,
    };
  
    navigate(`/quizbuilder/${quizId}`, { state: myState });
  };

  const renderQuizList = () => {
    if (!company) return null; // Return null if company not found
    return company.quizList.map((quiz, index) => (
      <tr key={index} className="hover:bg-gray-300">
        {/* Render columns for each quiz */}
        <td className="p-2  text-left p-2 pl-2 text-gray-500 pt-2">{quiz.quizName}</td>
        <td className="flex flex-row justify-center pt-2">
        {/* <Link to={`/quizbuilder/${quiz.qid}`}></Link> */}
        <div onClick={() => handleEditQuizClick(quiz.qid)}>
        {/* <div onClick={() => navigate(`/quizbuilder/${quiz.qid}`,{
                state:{
                  quizId: quiz.qid,
                  userId: companyIdent,
                  industry: 'fishing',
                  company: company,
                }
                })}> */}
                <Tooltip content="edit quiz"><FaEdit className="mr-4 h-6 w-6 text-gray-500 hover:text-sky-700 hover:cursor-pointer"/></Tooltip></div>
        <Tooltip content="delete this quiz"><BsFillTrashFill className="mr-4 h-6 w-6 text-gray-500 hover:text-sky-700"/></Tooltip>
        
        <button onClick={() => setShowPreviewQuiz(prevState => ({ ...prevState, [quiz.qid]: true }))} className="uppercase">
        <Tooltip content="preview this quiz"><FaRegFileAlt className="h-6 w-6  text-gray-500 hover:text-sky-700"/></Tooltip>
          </button>
          <PreviewQuiz show={showPreviewQuiz[quiz.qid]} onClose={() => setShowPreviewQuiz(prevState => ({ ...prevState, [quiz.qid]: false }))} qid={quiz.qid} qname={quiz.quizName} />
       
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
      <div className="flex-row items-center justify-center p-2 space-y-3 sm:flex sm:space-y-0 sm:space-x-4 bg-gray-300 dark:bg-gray-300">
        <div className="">
          <h5 className="mr-3 text-2xl font-semibold dark:text-black text-black">Company Managed Quiz List</h5>
          <p className="text-gray-500 dark:text-gray-500">Manage all your existing quiz and exams here</p>
        </div>
      </div>
      <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-gray-500 bg-slate-400 text-slate-900 uppercase tracking-wider text-left pl-2 pt-2 pb-2">Quiz Name</th>
                  <th className="text-gray-500 bg-gray-400 text-black uppercase tracking-wider pt-2 pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderQuizList()}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td className="flex justify-end  pr-4 pt-4">
                    {/* <Link to={`/quizbuilder/new`}> */}
                    <Button type="button"
                            className="mr-2 uppercase"
                            onClick={() => navigate(`/quizbuilder/new`,{state:{
                              userId: companyIdent,
                              company: company,
                            }})}
                            >
                      <VscNewFile className="mr-2 h-6 w-6 mr-2 " /> New Quiz
                    </Button>
                    <Button onClick={() => setShowAiQuiz(true)} className="uppercase">
                      <HiSparkles className="h-6 w-6 mr-2" />AI Quiz
                    </Button>
                    <AiQuiz show={showAiQuiz} onClose={() => setShowAiQuiz(false)} />
              
                  </td>
                </tr>
              </tfoot>
            </table>
            {showAiQuiz && <AiQuiz />}
          </div>
    </div>
  </div>
</section>

)}