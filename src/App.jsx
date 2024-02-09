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
import Client from './services/api.js'
import UpdateLesson from './components/UpdateLesson'
import UpdateActivity from './components/UpdateActivity'
import UpdateQuiz from './components/UpdateQuiz'


function App() {

  const [lessons, setLessons] = useState([])
  const [activities, setActivities] = useState([])
  const [quizzes, setQuizzes] = useState([])
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

  useEffect(() => {
    const getLessons = async () => {
      let res = await Client.get('/lessons')
      setLessons(res.data)
    }
    getLessons();
  }, [])

  useEffect(() => {
    const getActivities = async () => {
      let res = await Client.get('/activities')
      setActivities(res.data)
    }
    getActivities();
  }, [])

  useEffect(() => {
    const getQuizzes = async () => {
      let res = await Client.get('/quizzes')
      setQuizzes(res.data)
    }
    getQuizzes();
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
          <Route path='/lessons' element={<Lesson lessons={lessons}/>} />
          <Route path='/progress' element={<Progress />} />
          <Route path='/create' element={<CreateLesson />}/>
          <Route path='/createActivity' element={<CreateActivity activities={activities}/>}/>
          <Route path='/createQuiz' element={<CreateQuiz quizzes={quizzes}/>}/>
          <Route path='/update-lesson/:lessonId' element={<UpdateLesson />} />
          <Route path='/update-activity/:activityId' element={<UpdateActivity />} />
          <Route path='/update-quiz/:quizId' element={<UpdateQuiz />} />
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
