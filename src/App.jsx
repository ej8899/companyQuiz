import './App.css'

import { BrowserRouter as Router, HashRouter, Route, Link, Routes, useNavigate , useLocation} from 'react-router-dom';

import { Flowbite, DarkThemeToggle } from 'flowbite-react';


import QuizApp from './pages/QuizApp'
import Login from './pages/LogIn';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/404';
import { CookieBanner } from './components/CookieBanner';
import AdminPage from './pages/AdminPage';
import QuizAdmin from './pages/QuizAdmin';

function App() {

  return (
    <Flowbite >
      <div className='h-screen'>
      <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/quizadmin" element={<QuizAdmin />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/locations" element={<LocationList />} />
        <Route path="/users/:title" element={<UserList />} />
        <Route path="/location/:location" element={<UserListByLocation />} /> */}
      </Routes>
      </HashRouter>
      <CookieBanner/>
      </div>
    </Flowbite>
  )
}

export default App
