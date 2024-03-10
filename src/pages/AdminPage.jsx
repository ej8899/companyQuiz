
import React from 'react';
import { Button, } from 'flowbite-react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';

import Navbar from '../components/Navbar'
import {companyData} from "../sampledata.js"
import {quizData} from "../quizdata.js"

import { AdminUserList } from '../components/adminUserList';
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
              <AdminUserList />
              <AdminQuizList />
              <div>View of public quiz list (& allow adding to this company quiz list)</div>
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
