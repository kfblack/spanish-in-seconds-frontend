import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {

  return (
    <div>
      <header>

      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route />
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
