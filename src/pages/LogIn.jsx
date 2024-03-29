import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



// TODO this will need to render logo, background image, other branding, etc depending on route being supplied for the company 'owner'


// TODO - login and pass to user (if a user)
// TODO - login and pass to admin (if admin)

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const logoImage = "./android-chrome-192x192.png";
  const [isLoading, setIsLoading] = useState(false); // State variable for loading
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [userData, setUserData] = useState(null); // State variable for user data
  
  const fetchCompanyDataFromAPI = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?uid=${userId}`);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('companyData', JSON.stringify(data));
        // console.log('Company data from API:', data);
      } else {
        throw new Error('Failed to fetch company data from API');
      }
    } catch (error) {
      console.error('Error fetching company data from API:', error);
    }
  };
  const fetchUserDataFromAPI = async (email) => {
    try {
      const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem('userData', JSON.stringify(data));
        const isAdmin = data.admin;
        // console.log('isAdmin', isAdmin);
        // console.log('User data from API:', data);
        fetchCompanyDataFromAPI(data.cid);

        // process admin or user settings here:
        if (isAdmin === 1) {
          // Find the companyId for the matching administratorEmail
          //const companyId = companyData.find(company => company.administratorEmail === email).companyId;
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('userId', null);
          localStorage.setItem('isAdmin', true);
          // console.log('company id',data.uid)
          localStorage.setItem('companyId',data.uid);
          
          setTimeout(() => {
            setIsLoading(false);
            navigate(`/admin/${data.uid}`);
          }, 2000);
          return;
        } 
        if (isAdmin === 0) {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('companyId', null);
          localStorage.setItem('isAdmin', false);
          // const userId = userData.find(user => user.email === email).userId;
          // const companyId = userData.find(user => user.email === email).companyId;
          localStorage.setItem('userId',data.uid);

          // Redirect to user dashboard
          setTimeout(() => {
            setIsLoading(false);
            navigate(`/usermain/${data.uid}`);
          }, 2000);
          return;
        }
      } else {
        throw new Error('Failed to fetch user data from API');
      }
    } catch (error) {
      console.error('Error fetching user data from API:', error);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true); // Set loading state to true
    await fetchUserDataFromAPI(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  
  return (
    <>
    {isLoading ? (
        <>
        <div className="flex flex-col  h-full w-full items-center justify-center">
          
          <div className=" p-4 w-full max-w-md h-full md:h-auto">
          <div className=" p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="text-center pt-4"><Spinner size="xl" /></div>
            <p className="mb-4 pt-4 text-2xl font-semibold text-gray-900 dark:text-white">Loading Data...</p>  
          </div>
          </div>
          
        </div>
        </>
      ) : (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div  className="flex items-center mb-2 mt-6 text-5xl text-gray-900 dark:text-white font-sans font-extrabold leading-tight tracking-tight">
                <img className="w-10 h-10 mr-2" src={logoImage} alt="logo" />
                CompanyQuiz!    
            </div>
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
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-slate-500">Forgot password?</a>
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
      )}
    </>
  );
}

export default Login;
