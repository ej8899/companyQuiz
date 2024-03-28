
'use client' ;
import { Button,  Tooltip, Modal, Dropdown} from 'flowbite-react';


import { useState, useEffect } from 'react';

import { BiMailSend } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { FaFileImport } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretUp } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";


import { FileInput, Label, TextInput } from 'flowbite-react';

import AddUser from './adminAddUser';
import DeleteUserModal from './adminDeleteUser';

// import {userData} from "../sampledata.js"
// import {quizData} from "../quizdata.js"

export function AdminUserList({companyIdent, company,}) {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openRows, setOpenRows] = useState({});
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReminderModal, setOpenReminderModal] = useState(false);

  // console.log('adminUserList company state:',company)
  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?cid=${companyIdent}`);
      if (response.ok || (response.status >= 200 && response.status < 300)) {
        const data = await response.json();
        // console.log('User data:', data);
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

  const [deleteModalOpenMap, setDeleteModalOpenMap] = useState({});

  const deleteModalOpen = (userId) => {
    setDeleteModalOpenMap(prevState => ({
      ...prevState,
      [userId]: true
    }));
  };
  
  const deleteModalClose = (userId) => {
    setDeleteModalOpenMap(prevState => ({
      ...prevState,
      [userId]: false
    }));
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
          <th scope="col" className="p-0 border-0 text-left px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider bg-gray-400 text-center">
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
              <div className="flex border-0 border-gray-200 rounded-lg overflow-hidden">    
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
                <div className="flex flex-row justify-center items-center">
                  <Tooltip content="edit user details (disabled for demo)"><FaEdit className="mr-4 h-6 w-6 hover:text-sky-700"/></Tooltip>
                  
                  <Tooltip content="remove user from company">
                  <button onClick={() => deleteModalOpen(user.uid)}>
                    <BsFillTrashFill className="mr-4 h-6 w-6 hover:text-sky-700" />
                  </button>
                  </Tooltip>
                  <DeleteUserModal isOpen={deleteModalOpenMap[user.uid]} onClose={() => deleteModalClose(user.uid)} userName={user.name} />
                  
                  <button onClick={() => toggleRow(user.uid)}> {openRows[user.uid] ? <Tooltip content="hide user details"><FaCaretUp className="h-6 w-6 text-red-500  hover:text-sky-700"/></Tooltip> : <Tooltip content="show user details"><FaCaretDown  className="h-6 w-6  hover:text-sky-700"/></Tooltip>}</button>

                </div>
              </td>
            </tr>
            {openRows[user.uid] && (
              <tr key={`${user.uid}-scores`} className="text-gray-500 p-0 m-0">
                <td colSpan="5" className="w-full justify-end overflow-hidden text-right m-0 p-0">
                  <div className="w-full justify-end flex flex-col">
                  <table className="w-full shadow-md m-0 p-0 table-auto mb-0 pb-0 border-b-0">
                    <thead className="p-0 m-0 bg-slate-300 border-0 border-gray-400 pt-0 mt-0 ">
                      <tr className="bg-gray-300 border-2 border-gray-200 rounded-xl border">
                        <th className="text-s font-medium text-left pl-8 uppercase tracking-wider w-1/2">Quiz name</th>
                        <th className="text-s font-medium text-center uppercase tracking-wider">Score</th>
                        <th className="text-s text-center font-medium uppercase tracking-wider">Date Tested</th>
                        <th className="text-s font-medium text-left uppercase tracking-wider">Actions</th>
                      </tr>
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
                            <div className={`text-center rounded-lg p-0 m-0 w-full ${isNaN(score.score) || !score.score ? 'bg-red-500 text-gray-200' : score.score < score.passingGrade ? 'bg-yellow-500 text-gray-800' : 'bg-green-500 text-gray-800'}`}>
                              {score.score !== null ? score.score : '--'}%
                            </div>
                          </td>
                          <td className="text-center">
                            {score.date === '0000-00-00' ? 'NOT STARTED' : score.date}
                          </td>
                          <td>
                            <div className="flex flex-row p-2 text-center items-center">
                              <Tooltip content="reset quiz to not started">
                                <RxReset className="w-6 h-6 ml-2 mr-2  hover:text-sky-700"/>
                              </Tooltip>
                              <Tooltip content="delete quiz from user">
                                <button><BsFillTrashFill  className="w-6 h-6 mr-2  hover:text-sky-700"/></button>
                              </Tooltip>
                              {score.score < score.passingGrade && (
                                <Tooltip content="send reminder email">
                                  <BiMailSend className="w-7 h-7 hover:text-sky-700" />
                                </Tooltip>
                              )}
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


  <Dropdown label="ASSIGN QUIZ" className="uppercase text-center bg-gray-300 border-2 border-gray-600 rounded-xl border overflow-hidden">
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
    </table>
    <div className="flex flex-row w-full justify-end pr-4 pb-2">
      <Button className="mr-2 uppercase" onClick={() => setOpenReminderModal(true)}><BiMailSend  className="h-6 w-6 mr-2"/>remind users</Button>
      
      <Button className="uppercase" onClick={() => setOpenUploadModal(true)}><FaFileImport  className="h-6 w-6 mr-2"/>import users (csv)</Button>
    </div>
    </div>
  </section>

      <Modal show={openUploadModal} onClose={() => setOpenUploadModal(false)}>
        <Modal.Header><span className="flex flex-row items-center"><FaFileImport  className="h-6 w-6 mr-2"/> Import Users by CSV...</span></Modal.Header>
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

      <Modal show={openReminderModal} onClose={() => setOpenReminderModal(false)}>
        <Modal.Header ><span className="flex flex-row items-center font-bold text-2xl"><BiMailSend  className="h-8 w-8 mr-2"/> Remind Users...</span></Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              We&apos;ll help encourage your team members to get their assigned quizzes started, and ultimately passed.  Just add a friendly reminder message below and click send!
            </p>
            <div className="m-0 block">
              <Label htmlFor="large" value="Your reminder message:" />
            
              <TextInput id="large" type="text" sizing="lg" />
              <Tooltip content="enterprise users only"><Button className="mt-2">SEND EMAIL</Button></Tooltip>
            </div>
            
          </div>
        </Modal.Body>         
      </Modal>

      {/* <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} userName={userName}>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove {userName}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenDeleteModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}

  </>
  );
}



const QuizNameCell = ({ scoreQid, quizList }) => {
  // Find the corresponding quiz name based on score.qid
  const quizName = quizList.find(quiz => quiz.qid === scoreQid)?.quizName;

  // Render the quiz name
  return <td className="pr-4">{quizName}</td>;
};