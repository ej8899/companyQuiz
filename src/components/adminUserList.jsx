import { Button,  Tooltip, Modal, Dropdown} from 'flowbite-react';


import { useState, useEffect } from 'react';

import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { PiDownloadSimpleBold } from "react-icons/pi";

import { IoMdPersonAdd } from "react-icons/io";

import AddUser from './adminAddUser';

// import {userData} from "../sampledata.js"
import {quizData} from "../quizdata.js"

export function AdminUserList({companyIdent}) {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openRows, setOpenRows] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://erniejohnson.ca/apps/cquiz-api/users.php?cid=1');
      if (response.ok || (response.status >= 200 && response.status < 300)) {
        const data = await response.json();
        console.log('User data:', data);
        setUserData(data); // Update user data state with fetched data
        setIsLoading(false); // Set loading state to false
      } else {
        throw new Error('Failed to fetch user data: status:' + response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false); // Set loading state to false even if there's an error
    }
  };

  useEffect(() => {
    fetchUserData(); // Call the fetchUserData function when the component mounts
  }, []);

  const toggleRow = (uid) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [uid]: !prevState[uid]
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

    const nullScorePercentage = parseInt((nullScores / totalScores) * 100);
    const belowPassingGradePercentage = parseInt((belowPassingGradeScores / totalScores) * 100);
    const abovePassingGradePercentage = parseInt((abovePassingGradeScores / totalScores) * 100);

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

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchUserData();
  };

  const handleAddQuiz = (userId, quizId) => {
    const updatedUserData = userData.map(user => {
      console.log('user', user)
      if (user.uid === userId) {
        // Add the quiz to the user's scores array
        user.scores.push({
          qid: quizId,
          score: null, // Initial score for the new quiz
          dateTested: null // Initial date for the new quiz
        });
      }
      return user;
    });
  
    // Update the user data state with the modified data
    setUserData(updatedUserData);
  };
  

  return (
    <>
    
    <section className="flex flex-col items-center w-full">
  

    <div className="border-1 border border-separate rounded-xl border-gray-200 shadow-md overflow-hidden w-full bg-gray-50 dark:bg-gray-800">
    <table className="min-w-full divide-y divide-gray-200 w-full table-auto border border-separate border-spacing-0">
      <thead className="bg-gray-50 border-2">
        <tr className="p-0 ">
          {/* <th scope="col" className="text-right px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            User ID
          </th> */}
          <th scope="col" className="border-2 border-gray-300 p-0 rounded-tl-xl text-left px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider bg-gray-300">
            Name
          </th>
          <th scope="col" className="border-2 border-gray-300 bg-gray-300 p-0 m-0 text-left px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th scope="col" className="border-2 border-gray-300 bg-gray-300 text-left px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="border-2 border-gray-300  bg-gray-300 rounded-tr-xl text-left px-6 py-3 text-end text-s font-medium text-gray-500 uppercase tracking-wider  flex flex-row justify-center align-bottom">
            Actions <Tooltip content="download CSV of all users' results"><Button size="xs" onClick={downloadCSV} className="ml-4"><PiDownloadSimpleBold className="w-4 h-4"/></Button></Tooltip>
            <Tooltip content="add a new employee"><Button onClick={openModal} size="xs"  className="ml-4"><IoMdPersonAdd className="w-4 h-4"/></Button></Tooltip>
            <AddUser isOpen={isModalOpen} onClose={closeModal} companyIdent={companyIdent} />
          </th>
        </tr>
      </thead>
      <tbody className="rounded-xl bg-gray-50 dark:bg-gray-800 ">
      {sortedUserData.map((user) => (
          <>
            {/* <tr key={user.uid} className="text-gray-500 border-0 p-8 hover:bg-gray-300"> */}
            <tr key={user.uid} className={`text-gray-500 p-8 hover:bg-gray-300 ${openRows[user.uid] ? 'rounded-xl  bg-slate-300 overflow-hidden ' : ''}`}>
              {/* <td className="p-4 text-right">{user.uid}</td> */}
              <td className="p-0 rounded-tl-xl text-left p-2">{user.name}</td>
              <td className="text-left">{user.email}</td>
              <td className="">
              <div className="flex mr-4 border-0 border-gray-200 rounded-lg overflow-hidden">              
                {calculateScoreTotals(user.scores).nullScorePercentage > 0 && (
                  <div key="pbar1" className="bg-red-500 pl-2 flex flex-row justify-center" style={{ width: `${calculateScoreTotals(user.scores).nullScorePercentage}%` }}>
                    <Tooltip content="quizzes not taken">{calculateScoreTotals(user.scores).nullScorePercentage}%</Tooltip>
                  </div>
                )}
                
                {calculateScoreTotals(user.scores).belowPassingGradePercentage > 0 && (
                  <div key="pbar2" className="bg-yellow-500 pl-2 flex flex-row justify-center" style={{ width: `${calculateScoreTotals(user.scores).belowPassingGradePercentage}%` }}>
                    <Tooltip content="quizzes failed">{calculateScoreTotals(user.scores).belowPassingGradePercentage}%</Tooltip>
                  </div>
                )}
                
                {calculateScoreTotals(user.scores).abovePassingGradePercentage > 0 && (
                  <div key="pbar3" className="bg-green-500 pl-2 text-center flex flex-row justify-center" style={{ width: `${calculateScoreTotals(user.scores).abovePassingGradePercentage}%` }}>
                    <Tooltip content="quizzes passed">{calculateScoreTotals(user.scores).abovePassingGradePercentage}%</Tooltip>
                  </div>
                )}
              </div>
              </td>
              <td className={`text-left border-0 rounded-tr-xl  overflow-hidden p-2 ${openRows[user.uid] ? 'border-red-300 ' : ''}`}>
                <div className="flex flex-row justify-center">
                  <Tooltip content="edit user details"><FaEdit className="mr-4 h-6 w-6"/></Tooltip>
                  <Tooltip content="delete this user from company"><BsFillTrashFill className="mr-4 h-6 w-6"/></Tooltip>
                  <button onClick={() => toggleRow(user.uid)}> {openRows[user.uid] ? "Hide Details" : "Show Details"}</button>

                </div>
              </td>
            </tr>
            {openRows[user.uid] && (
              <tr key={`${user.uid}-scores`} className="text-gray-500 p-0 m-0">
                <td colSpan="5" className="w-full justify-end overflow-hidden text-right m-0 p-0">
                  <div className="w-full justify-end flex flex-col">
                  <table className="w-full shadow-md m-0 p-0 table-auto">
                    <thead className="p-0 m-0 bg-slate-300 border-0 border-gray-400 ">
                      {/* <tr className="bg-gray-300 border-2 border-gray-200 rounded-xl border"> */}
                        <th className="text-s font-medium text-right uppercase tracking-wider">Quiz ID</th>
                        <th className="text-s font-medium text-center uppercase tracking-wider">Score</th>
                        <th className="text-s font-medium uppercase tracking-wider">Date Tested</th>
                        <th className="text-s font-medium text-left uppercase tracking-wider">Actions</th>
                      {/* </tr> */}
                    </thead>
                    <tbody>
                    {user.scores.length === 0 ? (
                      <tr className="bg-gray-200 dark:bg-gray-700">
                        <td colSpan="4" className="text-center justify-center  items-center">No exams assigned
                        </td>
                      </tr>
                    ) : (
                      user.scores.map((score, index) => (
                        <tr key={index} className="bg-gray-200 dark:bg-gray-700">
                          <td className="pr-4">{score.qid}</td>
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
                    <tr>
                      <td colSpan="4" className="text-center justify-center  items-center bg-gray-200 dark:bg-gray-700">
                       <div className="w-full  flex flex-row justify-end pr-4 pb-2">
                        <Dropdown label="assign quiz" className="text-center bg-gray-300 border-2 border-gray-600 rounded-xl border overflow-hidden">
                          <Dropdown.Item onClick={() => handleAddQuiz(user.uid, 'quiz1')}>quiz 1</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleAddQuiz(user.uid, 'quiz2')}>quiz 2</Dropdown.Item>          
                        </Dropdown></div>
                      </td>
                    </tr>
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



