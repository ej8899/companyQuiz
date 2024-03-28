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
import UserMain from './pages/UserMain';
import QuizBuilder from './pages/QuizBuilder';
import GenerateCertificate from './pages/GenerateCertificate';
import SignUp from './pages/SignUp';

// TODO - need a route for custom login page based on company ID

function App() {

  return (
    <Flowbite>
      <div className='h-screen'>
      <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/certificate" element={<GenerateCertificate />} />
        <Route path="/quizadmin" element={<QuizAdmin />} />
        {/* <Route path="/usermain" element={<UserMain  />} /> */}
        
        <Route path="/quizbuilder/:quizId" element={<QuizBuilder  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quiz/:quizId" element={<QuizApp/>} />
        <Route path="/admin/:adminId" element={<AdminPage />} />
        <Route path="/usermain/:userId" element={<UserMain  />} />
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
