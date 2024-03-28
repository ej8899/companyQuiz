
import { useEffect, useState } from 'react';
import { Button, } from 'flowbite-react';
import { Alert } from 'flowbite-react';

import { HiInformationCircle } from 'react-icons/hi';
import { PiExport } from "react-icons/pi";

import { LuImport } from "react-icons/lu";
import { BiExport } from "react-icons/bi";

import { FaFileExport } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import { Link, useParams } from 'react-router-dom';

import Navbar from '../components/Navbar'
// import {companyData} from "../sampledata.js"
// import {quizData} from "../quizdata.js"

import { AdminUserList } from '../components/adminUserList';
import { AdminPublicQuizList } from '../components/adminPublicQuizList.jsx';
import { AdminQuizList } from '../components/adminQuizList';
import { setPageTitle } from '../utilities/helpers.js';
import { AdminSummary } from '../components/adminSummary.jsx';

function AdminPage() {
  const { adminId } = useParams();
  const [company, setCompanyData] = useState('');
  const [userData, setUserData] = useState([]);

  //
  // fetch all users for this company
  //
  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?cid=${companyIdent}`);
      if (response.ok || (response.status >= 200 && response.status < 300)) {
        const data = await response.json();
        console.log('User data:', data);
        setUserData(data); // Update user data state with fetched data
        //setIsLoading(false); // Set loading state to false
      } else {
        throw new Error('Failed to fetch user data: status:' + response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      //setIsLoading(false); // Set loading state to false even if there's an error
    }
  };

  useEffect(() => {
    fetchUserData(); // Call the fetchUserData function when the component mounts
  }, []);


  useEffect(() => {
    // Retrieve company name from localStorage
    const companyData = JSON.parse(localStorage.getItem('companyData'));
    setCompanyData(companyData);
    console.log('adminpage company:',company);
  }, []);
  // Find the company record that matches the adminId
  //const company = companyData.find(company => company.companyId === Number(adminId));
  

  setPageTitle(company.name + ': Quiz Admin');

  return (
    <>
    <Navbar />
    <Navbar home={`/admin/${adminId}`}/>
    
    <section className=" items-center justify-start flex flex-col w-full h-screen border-0 pt-24">
        <Alert className="warning-message mb-6 lg:hidden" color="failure" icon={HiInformationCircle}>
          This website is best viewed on larger screens. Please use a larger device for a better experience.
        </Alert>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6 w-full border-0 ">
        <div className="mx-auto   text-center text-slate-400 w-full border-0">
          {company ? (
            <div className=" p-4">
              <div className="w-full flex flex-row justify-center"><div className="font-sans text-2xl text-gray-800 dark:text-gray-400  dark:bg-white flex flex-row justify-center rounded-xl"><img src={company.logo} className=" h-auto w-auto"></img></div></div>
              <div className="font-sans text-2xl text-gray-800 dark:text-gray-400">Admin page for {company.name}</div>
              <div className="font-sans text-lg text-gray-800 dark:text-gray-400">Administrator email: {company.email}</div>
              <div className="font-sans text-lg text-gray-800 dark:text-gray-400">Industry: {company.industry}</div>
              <div className="p-2 flex flex-row justify-center">
              </div>
              <AdminSummary companyIdent={adminId} companyData={company}  />
              <AdminUserList companyIdent={adminId} company={company}/>
              <AdminQuizList companyIdent={adminId} company={company}/>
              <AdminPublicQuizList companyIdent={adminId} company={company}/>
            </div>
          ) : (
            <div>No company found for admin ID: {adminId}</div>
          )}
        </div>
      </div>
    </section>
    </>
  );
}

export default AdminPage;
