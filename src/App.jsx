import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Signin from './components/Signin'
import { CheckSession } from './services/Auth'
import Lesson from './components/Lesson'
import Progress from './components/Progress'
import LessonOne from './components/LessonOne'
import LessonTwo from './components/LessonTwo'
import LessonThree from './components/LessonThree'

function App() {

  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken();
    }
  }, [])

  return (
    <div>
      <header>

      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/signin' element={<Signin setUser={setUser}/>} />
          <Route path='/lessons' element={<Lesson />} />
          <Route path='/progress' element={<Progress />} />
          <Route path='/lessons/1' element={<LessonOne />}/>
          <Route path='/lessons/2' element={<LessonTwo />}/>
          <Route path='/lessons/3' element={<LessonThree />}/>
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
