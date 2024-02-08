import Sidebar from './Sidebar'

const Lesson = ({lessons}) => {
    return (
        <div>
            <h1>Lessons</h1>
            {lessons.map(lesson => (
                <div key={lesson.id}> 
                    <h2>Level: {lesson.level}</h2>
                    <h2>Lesson: {lesson.title}</h2>
                    <h3>Description: {lesson.description}</h3>
                    <p>Content: {lesson.content}</p>
                </div>
            ))}
            <Sidebar />
        </div>
    )
}

export default Lesson