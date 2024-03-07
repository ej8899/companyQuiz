import './App.css'

import { BrowserRouter as Router, HashRouter, Route, Link, Routes, useNavigate , useLocation} from 'react-router-dom';

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
      <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<QuizApp />} />
        {/* <Route path="/locations" element={<LocationList />} />
        <Route path="/users/:title" element={<UserList />} />
        <Route path="/location/:location" element={<UserListByLocation />} /> */}
      </Routes>

      <Navbar/>
  
      <MyFooter />
      </HashRouter>
      </div>
    </Flowbite>
  )
}

export default App
