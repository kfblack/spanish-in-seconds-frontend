import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Signin from './components/Signin'
import { CheckSession } from './services/Auth'
import Lesson from './components/Lesson'
import Progress from './components/Progress'
import CreateLesson from './components/CreateLesson'
import CreateActivity from './components/CreateActivity'
import CreateQuiz from './components/CreateQuiz'


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
          <Route path='/create' element={<CreateLesson />}/>
          <Route path='/createActivity' element={<CreateActivity />}/>
          <Route path='/createQuiz' element={<CreateQuiz />}/>
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
