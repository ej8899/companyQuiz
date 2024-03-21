
import { useEffect, useState } from 'react';
import { Button, } from 'flowbite-react';
import { Alert } from 'flowbite-react';

import { HiInformationCircle } from 'react-icons/hi';
import { PiExport } from "react-icons/pi";

import { LuImport } from "react-icons/lu";
import { BiExport } from "react-icons/bi";
import { FaFileImport } from "react-icons/fa6";
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

function AdminPage() {
  const { adminId } = useParams();
  const [company, setCompanyData] = useState('');
  

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
    
    <section className=" items-center justify-start flex flex-col w-full h-screen border-0 pt-24">
        <Alert className="warning-message mb-6 lg:hidden" color="failure" icon={HiInformationCircle}>
          This website is best viewed on larger screens. Please use a larger device for a better experience.
        </Alert>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6 w-full border-0 ">
        <div className="mx-auto   text-center text-slate-400 w-full border-0">
          {company ? (
            <div className=" p-4">
              <div className="font-sans text-2xl text-gray-800 dark:text-gray-400  flex flex-row justify-center"><img src={company.logo} className=" h-auto w-auto"></img></div>
              <div className="font-sans text-2xl text-gray-800 dark:text-gray-400">Admin page for {company.name}</div>
              <div className="font-sans text-lg text-gray-800 dark:text-gray-400">Administrator email: {company.email}</div>
              <div className="font-sans text-lg text-gray-800 dark:text-gray-400">Industry: {company.industry}</div>
              <div className="p-2 flex flex-row justify-center">
                <Button><FaFileImport  className="h-6 w-6 mr-2"/>import users (csv)</Button>&nbsp;
                <Button><FaEdit className="h-6 w-6 mr-2"/>edit company info</Button>&nbsp;
              </div>
              <AdminUserList companyIdent={adminId} company={company}/>
              <AdminQuizList companyIdent={adminId}/>
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
