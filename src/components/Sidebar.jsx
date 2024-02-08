import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div>
            <h2>Sidebar</h2>
            <Link to='/'>Home</Link>
            <Link to='/lessons'>Lessons</Link>
            <Link to='/progress'>Progress</Link>
            <Link to ='/create'>New Lesson</Link>
            <Link to ='/createActivity'>New Lesson Activity</Link>
            <Link to ='/createQuiz'>New Quiz</Link>
        </div>
    )
}

export default Sidebar