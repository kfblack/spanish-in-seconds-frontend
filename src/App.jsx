import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Signin from './components/Signin'
import { CheckSession } from './services/Auth'
import Lesson from './components/Lesson'
import Progress from './components/Progress'

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
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
