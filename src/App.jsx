import './App.css'

import { Flowbite, DarkThemeToggle } from 'flowbite-react';

import Navbar from './components/Navbar'
import MyFooter from './components/Footer'
import QuizApp from './pages/QuizApp'

function App() {

  return (
    <Flowbite >
      <div className='h-screen'>
      {/* <Navbar/> */}
      <QuizApp/>
      <MyFooter />
      </div>
    </Flowbite>
  )
}

export default App
