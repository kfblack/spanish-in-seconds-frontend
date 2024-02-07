import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <button type='button'><Link to='/register'>Sign Up</Link></button>
            <button type='button'><Link to='/signin'>Log In</Link></button>
            <h1>HOME</h1>
            <Sidebar /> 
        </div>
    )
}

export default Home