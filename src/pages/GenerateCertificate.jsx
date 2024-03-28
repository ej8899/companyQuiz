import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import {todayLong} from '../utilities/helpers.js'
import { setPageTitle } from '../utilities/helpers.js';
import { FaPrint } from "react-icons/fa6";

const GenerateCertificate = () => {
  const location = useLocation();
  const data = location;

  const [company, setCompanyData] = useState('');
  const [userData, setUserData] = useState('');

  useEffect(() => {
    // Retrieve company name from localStorage
    const companyData = JSON.parse(localStorage.getItem('companyData'));
    setCompanyData(companyData);
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUserData(userData);
  console.log('companyData',companyData)
  }, []);


  
  //const { quizId, userId, quizScore, quizDateTested } = location.state;
  //const stateData = location.state ? location.state : null;
  console.log('data', data);
  // const today = new Date();

  setPageTitle(data.state.userId + ' Certificate of Achievement in ' + data.state.quizId);

  return (
    <div className="flex flex-col items-center justify-center h-full w-screen bg-white p-8">
      <div className="border-8 border-gray-700 rounded-lg p-8 w-full h-full m-8">
      <div className="bg-white rounded-lg p-8 w-full h-full flex flex-col justify-center">
        <div className="text-center mb-4">
        <div className="font-sans text-2xl text-gray-800 dark:text-gray-400  flex flex-row justify-center"><img src={company.logo} className=" h-auto w-auto pb-8"></img></div>
          <h1 className="text-6xl font-bold">Certificate of Achievement</h1>
          <p className="text-gray-500 text-4xl mt-12">This is to certify that</p>
        
          <p className="text-4xl font-bold text-center pb-4 pt-2">{userData.name}</p>
          <p className="text-xl text-gray-500 text-center">has successfully completed</p>
          <p className="text-3xl font-bold text-center">
            <QuizNameCell scoreQid={data.state.quizId} quizList={data.state.company.quizList}/>
            {/* <QuizNameCell scoreQid={score.qid} quizList={company.quizList} /> */}
          </p>
          
          <p className="text-gray-500 text-center text-xl">with a score of</p>
          <p className="font-bold text-center text-3xl">{data.state.quizScore}%</p>
          
        
          <p className="text-2xl text-center mt-12 text-gray-500">Issued by:</p>
          <p className="text-2xl font-bold text-center">{company.name},</p>
          <p className="text-2xl font-bold text-center">{data.state.quizDateTested}</p>
          {/* TODO put on bottom edge*/}
          {/* <p className="text-lg font-bold text-center ">verify here: [verify link]</p> */}
        </div>  
      </div>
      </div>
      <button onClick={() => window.print()} className="print:hidden fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow font-sans uppercase flex justify-center items-center "><FaPrint className="mr-2 h-6 w-6"/>Print Certificate</button>

    </div>
  );
};

export default GenerateCertificate;



const QuizNameCell = ({ scoreQid, quizList }) => {
  // Find the corresponding quiz name based on score.qid
  console.log('quizList in cert:',quizList)
  const quizName = quizList.find(quiz => quiz.qid === scoreQid)?.quizName;

  // Render the quiz name
  return <>{quizName}</>;
};