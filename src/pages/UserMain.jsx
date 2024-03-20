import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useEffect, useState } from 'react';

import { Button, Tooltip } from 'flowbite-react';

import Navbar from '../components/Navbar'

// import {userData} from "../sampledata.js"
import {quizData} from "../quizdata.js"

import { RxReset } from "react-icons/rx";
import { HiOutlineMailOpen } from "react-icons/hi";
import { TbFileCertificate } from "react-icons/tb";
import { FaPlay } from "react-icons/fa6";

import { setPageTitle } from "../utilities/helpers.js"

// TODO needs a logout
// TODO needs 'user' based navbar w logout, help, etc

const sortScores = (scores) => {
  return scores.sort((a, b) => {
    // Null values should come first
    if (a.score === null && b.score !== null) return -1;
    if (a.score !== null && b.score === null) return 1;
    // Sort by score in ascending order
    return a.score - b.score;
  });
};

export default function UserMain() {
  const { userId } = useParams();
  const [company, setCompanyData] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [userData, setUserData] = useState('');

  useEffect(() => {
    // Retrieve company name from localStorage
    const companyName = JSON.parse(localStorage.getItem('companyData')).name;
    setCompanyName(companyName);
    const companyEmail = JSON.parse(localStorage.getItem('companyData')).email;
    setCompanyEmail(companyEmail);
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUserData(userData);
    console.log('userData:',userData)
    const companyData = JSON.parse(localStorage.getItem('companyData'));
    setCompanyData(companyData);
  }, []);


  setPageTitle(userData.name + ' - Admin');
  return (
    <>
    <Navbar/>
    
    <section className="bg-white dark:bg-gray-900 h-full items-center flex flex-col pt-24">
      <div className="px-6 py-3 text-left text-2xl font-bold font-sans text-gray-500 uppercase tracking-wider">{userData.name}</div>
      <div className="font-sans text-2xl text-gray-800 dark:text-gray-400  flex flex-row justify-center"><img src={company.logo} className=" h-auto w-auto"></img></div>
      <div className="text-black dark:text-white text-xl font-sans">{companyName}</div>
      <div className="text-black dark:text-white">{companyEmail}</div>

      
      {userData.scores && <ScoreTable scores={userData.scores} userId={userId} company={company}/>}

      {!userData.scores &&
        <div className='rounded-xl border-0 text-xl overflow-hidden pt-8 flex flex-row justify-center text-center'>
          Sorry, no quizzes have been assigned to you yet.<br/>
          You might want to reach out to your quiz administrator.
        </div>
      }

    </section>
    </>
  );
}



// TODO color code table rows depending on pass, fail, low score etc - green, orange, red
// TODO add tooltips on the action icons
// TODO add action icons instead of text

const ScoreTable = ({ scores,userId,company }) => {
  const sortedScores = sortScores(scores);
  const navigate = useNavigate();

  return (
    <div className='rounded-xl border-2 overflow-hidden'>
    <table className="divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            Quiz Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            Score
          </th>
          <th scope="col" className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            Date Tested
          </th>
          <th scope="col" className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sortedScores.map((score, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
            <QuizNameCell scoreQid={score.qid} quizList={company.quizList}/>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className={`text-center rounded-full border-1 border-white p-0 m-2 pl-4 pr-4 ${isNaN(score.score) || !score.score ? 'bg-red-500' : score.score < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}>
                            {score.score !== null ? score.score : '--'}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{score.date}</td>
            <td className="px-6 py-4 whitespace-nowrap flex flex-row">
            {score.date ? (
                <div onClick={() => navigate(`/quiz/${score.qid}`)}><Tooltip content="retake quiz"><RxReset  className="w-6 h-6 mr-4"/></Tooltip></div>
              ) : (
                <div onClick={() => navigate(`/quiz/${score.qid}`)}><Tooltip content="start quiz"><FaPlay  className="w-6 h-6 mr-4"/></Tooltip></div>
              )}
              {' '}
              {score.score > 70 ? (
                <>
                  <div onClick={() => {
                    navigate(`/certificate/`,{state:{
                      quizData: quizData,
                      quizId: score.qid,
                      userId: userId,
                      
                      // quizName: quizData[score.quizId].name,
                      // quizDescription: quizData[score.quizId].description,
                      quizScore: score.score,
                      quizDateTested: score.date,
                      company: company,
                    }});
                    }}><Tooltip content="view certificate of completion"><TbFileCertificate className="w-6 h-6 mr-4"/></Tooltip></div>
                  <Tooltip content="email certificate of completion"><HiOutlineMailOpen  className="w-6 h-6"/></Tooltip>
                </>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

const QuizNameCell = ({ scoreQid, quizList }) => {
  // Find the corresponding quiz name based on score.qid
  console.log('quizlist',quizList)
  const quizName = quizList.find(quiz => quiz.qid === scoreQid)?.quizName;

  // Render the quiz name
  return <>{quizName}</>;
};