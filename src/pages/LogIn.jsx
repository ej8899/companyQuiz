import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {quizData} from "../quizdata.js";
import {companyData, userData } from "../sampledata.js";

// TODO this will need to render logo, background image, other branding, etc depending on route being supplied for the company 'owner'


// TODO - login and pass to user (if a user)
// TODO - login and pass to admin (if admin)

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const logoImage = "./public/android-chrome-192x192.png";

  const handleLogin = () => {
    console.log('email', email);
    // Check if the email exists in companyData
    const isAdmin = companyData.some(company => company.administratorEmail === email);
    if (isAdmin) {
      // Find the companyId for the matching administratorEmail
      const companyId = companyData.find(company => company.administratorEmail === email).companyId;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userId', null);
      localStorage.setItem('isAdmin', true);
      console.log('company id',companyId)
      localStorage.setItem('companyId',companyId);
      navigate(`/admin/${companyId}`);
      return;
    }

    // Check if the email exists in userData
    const isUser = userData.some(user => user.email === email);
    if (isUser) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('companyId', null);
      localStorage.setItem('isAdmin', false);
      const userId = userData.find(user => user.email === email).userId;
      localStorage.setItem('userId',userId);
      // Redirect to user dashboard
      
      navigate(`/usermain/${userId}`);
      return;
    }

    // Handle invalid email
    console.log('Invalid email address. Please try again.');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white font-sans font-extrabold">
                <img className="w-10 h-10 mr-2" src={logoImage} alt="logo" />
                CompanyQuiz!    
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your company email address:</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={email} onChange={handleEmailChange} required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <Button className="w-full" onClick={handleLogin} >Sign in</Button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don&apos;t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>   
    </>
  );
}

export default Login;
