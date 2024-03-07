import './App.css'

import { Flowbite, DarkThemeToggle } from 'flowbite-react';

import Navbar from './components/Navbar'
import MyFooter from './components/Footer'
import QuizApp from './pages/QuizApp'
import Login from './pages/LogIn';

import LandingPage from './pages/LandingPage';

function App() {

  return (
    <Flowbite >
      <div className='h-screen'>
      <Navbar/>
      {/* <QuizApp/> */}
      
      <LandingPage />
      

      <Login/>
      

      <MyFooter />
      </div>
    </Flowbite>
  )
}

export default App
