import { Button,  Tooltip} from 'flowbite-react';


import { useState } from 'react';

import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { PiDownloadSimpleBold } from "react-icons/pi";

import {userData} from "../sampledata.js"
import {quizData} from "../quizdata.js"

export function AdminUserList() {
  const [openRows, setOpenRows] = useState({});

  const toggleRow = (userId) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId]
    }));
  };

  const calculateScoreTotals = (scores) => {
    let totalScores = scores.length;
    let nullScores = 0;
    let belowPassingGradeScores = 0;
    let abovePassingGradeScores = 0;

    scores.forEach(score => {
      if (score.score === null) {
        nullScores++;
      } else if (score.score < quizData.passingGrade) {
        belowPassingGradeScores++;
      } else {
        abovePassingGradeScores++;
      }
    });

    const nullScorePercentage = (nullScores / totalScores) * 100;
    const belowPassingGradePercentage = (belowPassingGradeScores / totalScores) * 100;
    const abovePassingGradePercentage = (abovePassingGradeScores / totalScores) * 100;

    return { nullScorePercentage, belowPassingGradePercentage, abovePassingGradePercentage };
  };

  const sortedUserData = [...userData].sort((a, b) => a.name.localeCompare(b.name));

  //
  // downloadCSV (of test results for all users)
  //
  const downloadCSV = () => {
    // Define the CSV content
    let csvContent = "User Name,Quiz Name,Score,pass/fail/not taken,Date Tested\n";

    sortedUserData.forEach(user => {
      user.scores.forEach(score => {
        const row = `${user.name},${score.quizId},${parseInt(score.score)},${score.passFailNotTaken},${score.dateTested}\n`;
        csvContent += row;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'userData.csv');

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  

  return (
    <>
    
    <section className="flex flex-col items-center w-full">
  
 
    <div className="border-1 border border-separate rounded-xl border-gray-200 shadow-md overflow-hidden w-full bg-gray-50 dark:bg-gray-800">
    <table className="min-w-full divide-y divide-gray-200 w-full table-auto">
      <thead className="bg-gray-50 border-0">
        <tr className="p-0">
          <th scope="col" className="text-right px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            User ID
          </th>
          <th scope="col" className="text-left px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="text-left px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th scope="col" className="text-left px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="text-left px-6 py-3 text-end text-s font-medium text-gray-500 uppercase tracking-wider  flex flex-row justify-center align-bottom">
            Actions <Tooltip content="download CSV of all users' results"><Button size="xs" onClick={downloadCSV} className="ml-4"><PiDownloadSimpleBold className="w-4 h-4"/></Button></Tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
      {sortedUserData.map((user) => (
          <>
            <tr key={user.userId} className="text-gray-500 border-0 p-8">
              <td className="p-4 text-right">{user.userId}</td>
              <td className="text-left">{user.name}</td>
              <td className="text-left">{user.email}</td>
              <td className="">
              <div className="flex mr-4 border-0 border-gray-200 rounded-lg overflow-hidden">              
                {calculateScoreTotals(user.scores).nullScorePercentage > 0 && (
                  <div className="bg-red-500 pl-2" style={{ width: `${calculateScoreTotals(user.scores).nullScorePercentage}%` }}>
                    <Tooltip content="quizzes not taken">{calculateScoreTotals(user.scores).nullScorePercentage}%</Tooltip>
                  </div>
                )}
                
                {calculateScoreTotals(user.scores).belowPassingGradePercentage > 0 && (
                  <div className="bg-yellow-500 pl-2" style={{ width: `${calculateScoreTotals(user.scores).belowPassingGradePercentage}%` }}>
                    <Tooltip content="quizzes failed">{calculateScoreTotals(user.scores).belowPassingGradePercentage}%</Tooltip>
                  </div>
                )}
                
                {calculateScoreTotals(user.scores).abovePassingGradePercentage > 0 && (
                  <div className="bg-green-500 pl-2" style={{ width: `${calculateScoreTotals(user.scores).abovePassingGradePercentage}%` }}>
                    <Tooltip content="quizzes passed">{calculateScoreTotals(user.scores).abovePassingGradePercentage}%</Tooltip>
                  </div>
                )}
              </div>
              </td>
              <td className="text-left">
                <div className="flex flex-row justify-center">
                  <Tooltip content="edit user details"><FaEdit className="mr-4 h-6 w-6"/></Tooltip>
                  <Tooltip content="delete this user from company"><BsFillTrashFill className="mr-4 h-6 w-6"/></Tooltip>
                  <button onClick={() => toggleRow(user.userId)}> {openRows[user.userId] ? "Hide Details" : "Show Details"}</button>
                   
                </div>
              </td>
            </tr>
            {openRows[user.userId] && (
              <tr key={`${user.userId}-scores`} className="text-gray-500 p-8">
                <td colSpan="5" className="w-full justify-end border-0 text-right">
                  <div className="border-0 border border-separate rounded-xl border-gray-300 shadow-md overflow-hidden w-full justify-end flex flex-col">
                  <table className="w-full shadow-md m-0 p-0 table-auto">
                    <thead className="p-0 m-0 bg-gray-300 border-0 border-gray-200 rounded-xl border">
                      {/* <tr className="bg-gray-300 border-2 border-gray-200 rounded-xl border"> */}
                        <th className="text-s font-medium text-right uppercase tracking-wider">Quiz ID</th>
                        <th className="text-s font-medium text-center uppercase tracking-wider">Score</th>
                        <th className="text-s font-medium uppercase tracking-wider">Date Tested</th>
                        <th className="text-s font-medium text-left uppercase tracking-wider">Actions +addQuiz</th>
                      {/* </tr> */}
                    </thead>
                    <tbody>
                    {user.scores.length === 0 ? (
                      <tr className="bg-gray-200 dark:bg-gray-700">
                        <td colSpan="4" className="text-center">No exams assigned</td>
                      </tr>
                    ) : (
                      user.scores.map((score, index) => (
                        <tr key={index} className="bg-gray-200 dark:bg-gray-700">
                          <td className="pr-4">{score.quizId}</td>
                          <td className="text-center">
                            <div className={`text-center rounded-full p-0 m-2 ${isNaN(score.score) || !score.score ? 'bg-red-500' : score.score < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}>
                              {score.score !== null ? score.score : '--'}
                            </div>
                          </td>
                          <td>{score.dateTested}</td>
                          <td>
                            <div className="flex flex-row p-2">
                              <Tooltip content="reset quiz to not started">
                                <RxReset className="w-6 h-6 ml-2 mr-2"/>
                              </Tooltip>
                              <Tooltip content="delete quiz from user">
                                <BsFillTrashFill  className="w-6 h-6"/>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>

                  </table>
                  </div>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
    </div>
  </section>
  </>
  );
}



