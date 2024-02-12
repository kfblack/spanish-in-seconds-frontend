import NavBar from './NavBar'

const Progress = ({user}) => {

    
    return (
        <div>
            <NavBar user={user}/>
            <h1>My Progress</h1>
                {user?.progress}
            <h2>Lessons completed: </h2>
                {user?.progress.lessons}
                <p>Date completed: {user?.progress.dateComplete}</p>
        </div>
    )
}

export default Progress