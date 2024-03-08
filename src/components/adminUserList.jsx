import { Button,  } from 'flowbite-react';
import React from 'react';
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import {userData} from "../sampledata.js"

export function AdminUserList() {
  
  return (
    <section className="flex flex-col items-center bg-gray-50 dark:bg-gray-900">
      Users
    <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 md:rounded-lg">
        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
          <Button type="button"
                  className="">
            <svg className="h-3.5 w-3.5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                 aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
            Add user
          </Button>
  
          <div className="inline-flex flex-col w-full rounded-md shadow-sm md:w-auto md:flex-row" role="group">
            <button type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-t-lg md:rounded-tr-none md:rounded-l-lg hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white">
              Tests Completed
            </button>
            <button type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 border-x md:border-x-0 md:border-t md:border-b hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white">
              Tests Incomplete
            </button>

            <button type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-b-lg md:rounded-bl-none md:rounded-r-lg hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white">
              All Users
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quiz ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Avg Score
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Last Date Tested
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {userData.map((user) => (
          <tr key={user.userId}>
            <td className="px-6 py-4 whitespace-nowrap">{user.userId}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            {user.scores.map((score, index) => (
              <React.Fragment key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{score.quizId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{score.score}</td>
                <td className="px-6 py-4 whitespace-nowrap">{score.dateTested}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-row">
                      <FaEdit className="mr-4 h-5 w-5"/>
                      <BsFillTrashFill className="mr-4 h-5 w-5"/>
                    </div>
              </td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

  </section>
  );
}

