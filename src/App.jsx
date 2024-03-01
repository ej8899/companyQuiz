import './App.css'

import Navbar from './components/Navbar'
import MyFooter from './components/Footer'
import QuizApp from './pages/QuizApp'

function App() {

  return (
    <div className='w-full border-2 border-gray-800'>
    <Navbar/>
    <QuizApp/>
    <MyFooter />
    </div>
  )
}

export default App
