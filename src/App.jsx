import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'

function App() {

  return (
    <div>
      <header>

      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
