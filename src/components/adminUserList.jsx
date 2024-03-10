import { Button,  } from 'flowbite-react';


import { useState } from 'react';

import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RxReset } from "react-icons/rx";


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


  return (
    <>
    
    <section className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 w-full">
  
    # TODO - need add a user button
    # TODO - add quiz to individual User (displays list of available copmany quizes)
  
    <table className="min-w-full divide-y divide-gray-200 w-full border-2 rounded-xl border-gray-200 shadow-md">
      <thead className="bg-gray-50 border-0">
        <tr className="border-0 p-4">
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
      {sortedUserData.map((user) => (
          <>
            <tr key={user.userId} className="text-gray-500 border-0 p-8">
              <td className="p-4">{user.userId}</td>
              <td className="w-full">{user.name}</td>
              <td>{user.email}</td>
              <td>
              <div className="flex h-4 mr-4">
                <div className="bg-red-500" style={{ width: `${calculateScoreTotals(user.scores).nullScorePercentage}%` }}></div>
                <div className="bg-yellow-500" style={{ width: `${calculateScoreTotals(user.scores).belowPassingGradePercentage}%` }}></div>
                <div className="bg-green-500" style={{ width: `${calculateScoreTotals(user.scores).abovePassingGradePercentage}%` }}></div>
              </div>
              </td>
              <td>
                <div className="flex flex-row">
                  <FaEdit className="mr-4 h-8 w-8"/>
                  <BsFillTrashFill className="mr-4 h-8 w-8"/>
                  <button onClick={() => toggleRow(user.userId)}>Show Scores</button>
                </div>
              </td>
            </tr>
            {openRows[user.userId] && (
              <tr key={`${user.userId}-scores`} className="text-gray-500 p-8">
                <td colSpan="4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Quiz ID</th>
                        <th>Score</th>
                        <th>Date Tested</th>
                        <th>Actions +addQuiz</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.scores.map((score, index) => (
                        <tr key={index}>
                          <td>{score.quizId}</td>
                          <td>{score.score}</td>
                          <td>{score.dateTested}</td>
                          <td><RxReset /> removeQuiz</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>

  </section>
  </>
  );
}

