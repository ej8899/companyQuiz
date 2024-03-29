
import { Link } from "react-router-dom";
import { Button } from 'flowbite-react';

// TODO this will need to render logo, background image, other branding, etc depending on route being supplied for the company 'owner'

function SignUp() {
  const logoImage = "./android-chrome-192x192.png";
  return (
    
    <section className="bg-white dark:bg-gray-900 ">
    
    
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
    
      <div className="flex flex-row justify-center items-center w-auto  rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 border-gray-300 border-2 mx-auto bg-gray-800 rounded-lg overflow-hidden">
        <img src="quiz.png" className="w-96 h-96" alt="Quiz Image" />
      <div className="flex flex-col bg-slate-500 dark:bg-gray-500 p-0 m-0 ">
      <div href="#" className="flex items-center justify-center mb-2 mt-6 text-4xl font-semibold text-gray-900 dark:text-white font-sans font-extrabold leading-tight tracking-tight">
                <img className="w-10 h-10 mr-2" src={logoImage} alt="logo" />
                CompanyQuiz!    
            </div>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your company account :
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-800 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <Button type="submit" className="w-full">Create an account</Button>
                  
              </form>
          </div>
          
          </div>
          
      </div>
      <p className="text-xl font-bold text-gray-800 dark:text-gray-400">
          Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 underline">Login here</Link>
      </p>
  </div>

</section>
    
  );
}

export default SignUp;
