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
import ActivitySelector from './components/ActivitySelector'
import QuizSelector from './components/QuizSelector'
import Theme from './components/Theme'
import {ThemeProvider} from '@mui/material/styles'


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
    <ThemeProvider theme={Theme}>
    <div>
      <header>

      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home user={user} setUser={setUser}/>}/>
          <Route path='/register' element={<Register setUser={setUser}/>}/>
          <Route path='/signin' element={<Signin setUser={setUser}/>} />
          <Route path='/lessons' element={<Lesson lessons={lessons} activities={activities} quizzes={quizzes} user={user} setUser={setUser}/>} />
          <Route path='/progress/:userId' element={<Progress user={user} setUser={setUser}/>} />
          <Route path='/create' element={<CreateLesson setLessons={setLessons} user={user} setUser={setUser}/>}/>
          <Route path='/createActivity' element={<CreateActivity activities={activities} user={user} setUser={setUser}/>}/>
          <Route path='/createQuiz' element={<CreateQuiz quizzes={quizzes} user={user} setUser={setUser} setQuizzes={setQuizzes}/>}/>
          <Route path='/update-lesson/:lessonId' element={<UpdateLesson user={user} setUser={setUser}/>} />
          <Route path='/update-activity/:activityId' element={<UpdateActivity user={user} setUser={setUser}/>} />
          <Route path='/update-quiz/:quizId' element={<UpdateQuiz user={user} setUser={setUser}/>} />
          <Route path='/select-activity' element={<ActivitySelector activities={activities} setUser={setUser}/>} />
          <Route path='/select-quiz' element={<QuizSelector quizzes={quizzes} setUser={setUser}/>} />
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
    </ThemeProvider>
  )
}

export default App
