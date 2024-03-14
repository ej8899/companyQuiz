
import React from 'react';
import { Button, } from 'flowbite-react';
import { Alert } from 'flowbite-react';

import { HiInformationCircle } from 'react-icons/hi';
import { HiSparkles } from "react-icons/hi2";
import { PiExport } from "react-icons/pi";
import { IoMdPersonAdd } from "react-icons/io";
import { LuImport } from "react-icons/lu";
import { BiExport } from "react-icons/bi";
import { FaFileImport } from "react-icons/fa6";
import { FaFileExport } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import { Link, useParams } from 'react-router-dom';

import Navbar from '../components/Navbar'
import {companyData} from "../sampledata.js"
import {quizData} from "../quizdata.js"

import { AdminUserList } from '../components/adminUserList';
import { AdminPublicQuizList } from '../components/adminPublicQuizList.jsx';
import { AdminQuizList } from '../components/adminQuizList';
import { setPageTitle } from '../utilities/helpers.js';

function AdminPage() {
  const { adminId } = useParams();
  
  // Find the company record that matches the adminId
  const company = companyData.find(company => company.companyId === Number(adminId));
  setPageTitle(company.name + ': Quiz Admin');

  return (
    <>
    <Navbar />
    
    <section className="bg-white dark:bg-gray-900 items-center justify-center flex flex-col w-full border-0 pt-24">
        <Alert className="warning-message mb-6 lg:hidden" color="failure" icon={HiInformationCircle}>
          This website is best viewed on larger screens. Please use a larger device for a better experience.
        </Alert>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 w-full border-0">
        <div className="mx-auto  text-center text-slate-400 w-full border-0">
          {company ? (
            <>
              <div className="font-sans text-2xl">Admin page for {company.name}</div>
              <div>Administrator email: {company.administratorEmail}</div>
              <div>Industry: {company.industry}</div>
              <div className="p-2 flex flex-row justify-center">
                <Button><FaFileExport className="h-6 w-6 mr-2"/>export user summary (csv)</Button>&nbsp;
                <Button><FaFileImport  className="h-6 w-6 mr-2"/>import users (csv)</Button>&nbsp;
                <Button><HiSparkles className="h-6 w-6 mr-2"/>generate Ai quiz</Button>&nbsp;
                <Button><FaEdit className="h-6 w-6 mr-2"/>edit company info</Button>&nbsp;
                <Button><IoMdPersonAdd className="h-6 w-6 mr-2" />add employee</Button>&nbsp;
              </div>
              <AdminUserList companyIdent={adminId}/>
              <AdminQuizList companyIdent={adminId}/>
              <AdminPublicQuizList companyIdent={adminId}/>
            </>
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
