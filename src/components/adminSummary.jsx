import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Banner, } from 'flowbite-react';

import { useState, useEffect } from 'react';
import { SummaryTeamProgress } from "./adminSummaryTeamProgress";



export function AdminSummary({companyIdent, companyData,}) {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popoverVisible, setPopoverVisible] = useState(false);

  //const company = JSON.parse(localStorage.getItem('companyData'));
  const [summaryData, setSummaryData] = useState(
    {
      totalUsers: 0,
      userCountNoQuiz: 0,
      userCountWithQuiz: 0,
      totalQuizzesDeployed: 0,
      totalQuizzesPassed: 0,
      totalQuizzesNotPassed: 0,
      quizzesNotTaken: 0,
      quizSummary: {},
    }
  );

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?cid=${companyIdent}`);
      if (response.ok || (response.status >= 200 && response.status < 300)) {
        const data = await response.json();
        // console.log('User data in summary:', data);
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



  useEffect(() => {
    if (userData && userData.length > 0) {
      const quizSummary = {};
      let totalQuizzesDeployed = 0;
      let totalQuizzesPassed = 0;
      let quizzesNotTaken = 0;

      userData.forEach(user => {
        if (user.scores.length > 0) {
          totalQuizzesDeployed += user.scores.length;
          user.scores.forEach(score => {
            const { qid, score: userScore, passingGrade } = score;
            if (!quizSummary[qid]) {
              quizSummary[qid] = { passed: 0, failed: 0 };
            }
            if (userScore >= passingGrade) {
              totalQuizzesPassed++;
              quizSummary[qid].passed++;
            } else if (userScore > 0 && userScore < passingGrade) {
              quizSummary[qid].failed++;
            } else {
              quizzesNotTaken ++;
            }            
          });
        }
      });

      let totalQuizzesNotPassed = totalQuizzesDeployed - totalQuizzesPassed - quizzesNotTaken;
      // totalQuizzesNotPassed =- quizzesNotTaken;

      // Calculate total # of users
      setSummaryData(prevState => ({
        ...prevState,
        totalUsers: userData.length
      }));

      // Calculate total # of users without a quiz assigned
      const emptyScoresCount = userData.filter(user => user.scores.length === 0).length;
      setSummaryData(prevState => ({
        ...prevState,
        userCountNoQuiz: emptyScoresCount
      }));

      // user count with quizzes
      setSummaryData(prevState => ({
        ...prevState,
        userCountWithQuiz: summaryData.totalUsers - emptyScoresCount
      }));

      setSummaryData(prevState => ({
        ...prevState,
        totalUsers: userData.length,
        totalQuizzesDeployed,
        totalQuizzesPassed,
        totalQuizzesNotPassed,
        quizzesNotTaken,
        quizSummary,
      }));

    }
  }, [userData]);

  // console.log('summaryData',summaryData)
  const totalUsersWithQuizzes = summaryData.userCountWithQuiz;
  const totalUsersInCompliance = userData.filter(user => {
    // Check if the user has been assigned quizzes
    if (user.scores.length === 0) {
      return false; // Skip users without assigned quizzes
    }
  
    // Check if all quizzes assigned to the user have been passed
    const allQuizzesPassed = user.scores.every(score => score.score >= score.passingGrade);
    return allQuizzesPassed;
  }).length;
  // console.log('totalUsersInCompliance',totalUsersInCompliance)
  // console.log('totalUsersWithQuizzes',totalUsersWithQuizzes)
  // Calculate overall compliance rate
  const overallComplianceRate = (totalUsersInCompliance / totalUsersWithQuizzes) * 100 || 0;


return (
<section className="flex flex-col items-center w-full pt-4 pb-4">
  
  <div className="border-1 border border-separate rounded-xl border-gray-200 shadow-md overflow-hidden w-full bg-gray-400 bg-gray-50 dark:bg-gray-800">    
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div className="flex-row items-center justify-center p-2 space-y-3 sm:flex sm:space-y-0 sm:space-x-4 bg-gray-300 dark:bg-gray-300">
        <div>
          <h5 className="mr-3 text-2xl font-semibold text-black">Your Company Summary</h5>
          {/* <p className="text-gray-500 dark:text-gray-500">Various pre-built &apos;public&apos; quizzes. Copy to your account to get started!</p> */}
        </div>
      </div>
      <div className="overflow-x-auto flex flex-row m-4  items-start">
        <div>
          <SummaryTeamProgress summaryData={summaryData}/>
        </div>
        <div className="w-3/4 p-4 relative">

  <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1 text-left">Users in Compliance
        <button
          type="button"
          className="inline-flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500 transition-opacity duration-300 hover:opacity-100 relative"
          onMouseEnter={() => setPopoverVisible(true)}
          onMouseLeave={() => setPopoverVisible(false)}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button></h2>
        <div
          className={`absolute z-10 ${
            popoverVisible ? 'visible opacity-100' : 'invisible opacity-0'
          }  text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-400 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 ml-12`}
        >
          <div className="p-3 space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-left">Users in Compliance...</h3>
            <p className="text-left">We calculate users in compliance as a percentage of the number of users who have been assigned quizzes and that have passed all assigned quizzes.  User with multiple quizzes assigned, but have not passed all quizzes are not part of being compliant.</p>
          </div>
        </div>       
          
          <div className="bg-gray-300 dark:bg-gray-700 p-3 mt-3 rounded-lg">
          <StackedBarGraph pass={overallComplianceRate} fail={100 - overallComplianceRate} />
          </div>
          <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1 text-left pt-3">Quiz Summary:</h2>
          <div className="bg-gray-300 dark:bg-gray-700 p-3 mt-3 rounded-lg">
          <ul>
            {Object.entries(summaryData.quizSummary).map(([qid, summary]) => (
              
              <li key={qid} className="text-left">
                {/* Quiz ID {companyData.quiz}: */}
                {companyData.quizList.map((quiz, index) => {
                  if (quiz.qid === qid) {
                    return (
                      <div key={index} className="text-gray-500 pt-2">
                        {quiz.quizName}:
                      </div>
                    );
                  }
                  return null;
                })}
                <StackedBarGraph pass={summary.passed} fail={summary.failed}></StackedBarGraph>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

)}



const StackedBarGraph = ({ pass, fail }) => {
  const total = pass + fail;
  const passPercentage = (pass / total) * 100;
  const failPercentage = (fail / total) * 100;
  const dpassPercentage = parseInt(passPercentage);
  const dfailPercentage = parseInt(failPercentage);

  return (
    <div  className="flex w-full">
      <div
        className={`${dpassPercentage === 100 ? 'rounded-md' : 'rounded-l-md'} bg-green-500 text-gray-900 opacity-90`}
        style={{
          width: `${passPercentage}%`,
          height: '23px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >{dpassPercentage > 0 ? `${dpassPercentage}%` : null}</div>
      <div
        className={`${dfailPercentage === 100 ? 'rounded-md' : 'rounded-r-md'} bg-red-500 text-gray-300 opacity-90`}
        style={{
          width: `${failPercentage}%`,
          height: '23px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >{dfailPercentage > 0 ? `${dfailPercentage}%` : null}</div>
    </div>
  );
};