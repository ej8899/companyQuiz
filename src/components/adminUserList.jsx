
'use client' ;
import { Button,  Tooltip, Modal, Dropdown} from 'flowbite-react';


import { useState, useEffect } from 'react';

import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { FaFileImport } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";

import { FileInput, Label, } from 'flowbite-react';

import AddUser from './adminAddUser';

// import {userData} from "../sampledata.js"
// import {quizData} from "../quizdata.js"

export function AdminUserList({companyIdent, company,}) {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openRows, setOpenRows] = useState({});
  const [openUploadModal, setOpenUploadModal] = useState(false);
console.log('adminUserList company state:',company)
  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?cid=${companyIdent}`);
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
      if (score.score === null || score.score === 0) {
        nullScores++;
      } else if (score.score < score.passingGrade) {
        belowPassingGradeScores++;
      } else if (score.score >= score.passingGrade) {
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
    let csvContent = "User Name,Quiz Name,Score,Status,Date Tested\n";
    

    sortedUserData.forEach(user => {
      user.scores.forEach(score => {
        // prep date output
        const outputDate = score.date === '0000-00-00' ? 'NA' : score.date;
        
        // prep result output
        const result = score.score === null || score.score === undefined || score.score === 0 || score.passingGrade === null || score.passingGrade === undefined 
    ? 'NOT ATTEMPTED'
    : score.score < score.passingGrade ? 'FAIL' : 'PASS';

        // prep quizname output
        const matchingQuizName = company.quizList.find(
          (quiz) => quiz.qid === score.qid
        )?.quizName;
    

        const row = `${user.name},${matchingQuizName},${parseInt(score.score)},${result},${outputDate}\n`;
        csvContent += row;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    // TODO - put date of today in the file name
    const today = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `all-company-quiz-results-${today}.csv`);

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
      // TODO - update the database, 
      // TODO - update localstorage
      
      return user;
    });
  
    // Update the user data state with the modified data
    setUserData(updatedUserData);
  };
  

  return (
    <>
    
    <section className="flex flex-col items-center w-full">
  

    <div className="border-1 border border-separate rounded-xl border-gray-200 shadow-md overflow-hidden w-full bg-gray-50 dark:bg-gray-800">
    <div className=" bg-gray-300 dark:bg-gray-300 p-2">
          <h5 className="mr-3 text-2xl font-semibold dark:text-black text-black">User Management</h5>
          <p className="text-gray-500 dark:text-gray-500">Manage all company members (taking quizzes) here</p>
        </div>
    <table className="min-w-full divide-y divide-gray-200 w-full table-auto border border-separate border-spacing-0">
      <thead className="bg-gray-50 border-2">
        <tr className="p-0 ">
          {/* <th scope="col" className="text-right px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
            User ID
          </th> */}
          <th scope="col" className="p-0 border-0 text-left px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider bg-gray-400">
            Name
          </th>
          <th scope="col" className="p-0 border-0 text-left px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider bg-gray-400">
            Email
          </th>
          <th scope="col" className="p-0 border-0 text-left px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider bg-gray-400">
            Status
          </th>
          <th scope="col" className="p-0 border-0 text-left px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider bg-gray-400 text-end text-s font-medium text-gray-500 uppercase tracking-wider  flex flex-row justify-center align-bottom">
            Actions <Tooltip content="download CSV of all users' results"><Button size="xs" onClick={downloadCSV} className="ml-4"><PiDownloadSimpleBold className="w-4 h-4"/></Button></Tooltip>
            <Tooltip content="add a new employee"><Button onClick={openModal} size="xs"  className="ml-4"><IoMdPersonAdd className="w-4 h-4"/></Button></Tooltip>
            <AddUser isOpen={isModalOpen} onClose={closeModal} companyIdent={companyIdent} />
          </th>
        </tr>
      </thead>
      <tbody className="rounded-xl bg-gray-50 dark:bg-gray-800 ">
      {sortedUserData.map((user,userIndex) => (
          <>
            {/* <tr key={user.uid} className="text-gray-500 border-0 p-8 hover:bg-gray-300"> */}
            <tr key={user.uid} className={`text-gray-500 p-8 hover:bg-gray-300 ${openRows[user.uid] ? 'rounded-xl  bg-slate-300 overflow-hidden ' : ''}`}>
              {/* <td className="p-4 text-right">{user.uid}</td> */}
              <td className="p-0 rounded-tl-xl text-left p-2 pl-2">{user.name}</td>
              <td className="text-left">{user.email}</td>
              <td className="">
              <div className="flex mr-4 border-0 border-gray-200 rounded-lg overflow-hidden">    
              {user.scores ? (
                <>
                {calculateScoreTotals(user.scores).nullScorePercentage > 0 && (
                  <div key="pbar1" className="bg-red-500 pl-2 flex flex-row justify-center text-gray-300" style={{ width: `${calculateScoreTotals(user.scores).nullScorePercentage}%` }}>
                    <Tooltip content="quizzes not taken">{calculateScoreTotals(user.scores).nullScorePercentage}%</Tooltip>
                  </div>
                )}
                
                {calculateScoreTotals(user.scores).belowPassingGradePercentage > 0 && (
                  <div key="pbar2" className="bg-yellow-500 pl-2 flex flex-row justify-center text-black" style={{ width: `${calculateScoreTotals(user.scores).belowPassingGradePercentage}%` }}>
                    <Tooltip content="quizzes failed">{calculateScoreTotals(user.scores).belowPassingGradePercentage}%</Tooltip>
                  </div>
                )}
                
                {calculateScoreTotals(user.scores).abovePassingGradePercentage > 0 && (
                  <div key="pbar3" className="bg-green-500 pl-2 text-center flex flex-row justify-center text-black" style={{ width: `${calculateScoreTotals(user.scores).abovePassingGradePercentage}%` }}>
                    <Tooltip content="quizzes passed">{calculateScoreTotals(user.scores).abovePassingGradePercentage}%</Tooltip>
                  </div>
                )}
                </>
              ) : (
                <div className="text-center p-2">NO EXAMS</div>
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
                        <th className="text-s font-medium text-left pl-8 uppercase tracking-wider">Quiz name</th>
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
                          <td className="pr-4 pl-8"><QuizNameCell scoreQid={score.qid} quizList={company.quizList} /></td>
                          <td className="text-center">
                            <div className={`text-center rounded-full p-0 m-2 ${isNaN(score.score) || !score.score ? 'bg-red-500' : score.score < score.passingGrade ? 'bg-yellow-500' : 'bg-green-500'}`}>
                              {score.score !== null ? score.score : '--'}%
                            </div>
                          </td>
                          <td>
                            {score.date === '0000-00-00' ? 'NOT STARTED' : score.date}
                          </td>
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
                        {/* <Dropdown label="assign quiz" className="text-center bg-gray-300 border-2 border-gray-600 rounded-xl border overflow-hidden">
                        {company.quizList.map((quiz, index) => (
                          <Dropdown.Item key={index} onClick={() => handleAddQuiz(user.uid, quiz.qid)}>
                            {quiz.quizName}
                          </Dropdown.Item>
                        ))}
                        </Dropdown> */}


  <Dropdown label="assign quiz" className="text-center bg-gray-300 border-2 border-gray-600 rounded-xl border overflow-hidden">
    {company.quizList.map((quiz, index) => {
      // Check if the quiz is already taken by the user
      const isTaken = sortedUserData[userIndex].scores.some(score => score.qid === quiz.qid);
      // Render the dropdown item only if the quiz is not already assigned or taken
      if (!isTaken) {
        return (
          <Dropdown.Item key={index} onClick={() => handleAddQuiz(user.uid, quiz.qid)}>
            {quiz.quizName}
          </Dropdown.Item>
        );
      } else {
        return null; // Skip rendering if the quiz is already assigned or taken
      }
    })}
  </Dropdown>




                        </div>
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
      <tfoot >
        <tr>
          <td></td>
          <td></td>
          <td></td>
        <td className="text-right justify-end p-4 flex w-full flex-row"><Button onClick={() => setOpenUploadModal(true)}><FaFileImport  className="h-6 w-6 mr-2"/>import users (csv)</Button>
        </td>
        </tr>
      </tfoot>
    </table>
    </div>
  </section>

  <Modal show={openUploadModal} onClose={() => setOpenUploadModal(false)}>
        <Modal.Header>Import Users by CSV</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Mass import your company users with a simple CSV formatted file.  Your CSV file should be without headers and simply be full name, email. We&apos;ll handle the rest!
            </p>
          </div>
          <div id="fileUpload" className="max-w-md mt-4">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput id="file" helperText="(limited to enterprise users only)" />
          </div>
          
     

          
          </Modal.Body>
          
      </Modal>

  </>
  );
}



const QuizNameCell = ({ scoreQid, quizList }) => {
  // Find the corresponding quiz name based on score.qid
  const quizName = quizList.find(quiz => quiz.qid === scoreQid)?.quizName;

  // Render the quiz name
  return <td className="pr-4">{quizName}</td>;
};