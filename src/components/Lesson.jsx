import Client from '../services/api.js'
import { useNavigate } from 'react-router-dom'

const Lesson = ({lessons}) => {

    let navigate = useNavigate();

    const handleDelete = async (lessonId) => {
        try {
            await Client.delete(`/lessons/${lessonId}`)
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (lessonId) => {
        navigate(`/update-lesson/${lessonId}`)
    }


    return (
        <div>
            <h1>Lessons</h1>
            {lessons.map(lesson => (
                <div key={lesson._id}> 
                    <h2>Level: {lesson.level}</h2>
                    <h2>Lesson: {lesson.title}</h2>
                    <h3>Description: {lesson.description}</h3>
                    <p>Content: {lesson.content}</p>
                    <button onClick={() => handleUpdate(lesson._id)}>Update</button>
                    <button onClick={() => handleDelete(lesson._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Lesson