
import React from 'react';
import { Button, } from 'flowbite-react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';


import { AdminUserList } from '../components/adminUserList';
import { AdminQuizList } from '../components/adminQuizList';

function AdminPage() {

  return (
    <section className="bg-white dark:bg-gray-900 items-center justify-center flex flex-col">
      use admin navbar
        <Alert className="warning-message mb-6 lg:hidden" color="failure" icon={HiInformationCircle}>
          This website is best viewed on larger screens. Please use a larger device for a better experience.
        </Alert>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center text-slate-400">
                admin page for company XYZ
            </div>   
            <div>table of users</div>
            <AdminUserList/>
            <AdminQuizList/>
            <div>view of public quiz list (& allow adding to this company quiz list)</div>
        </div>
    </section>
  );
}

export default AdminPage;
