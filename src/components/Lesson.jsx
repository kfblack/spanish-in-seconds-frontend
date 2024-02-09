import Client from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { useState } from 'react'
import ActivitySelector from './ActivitySelector.jsx'

const Lesson = ({lessons, activities}) => {

    let navigate = useNavigate();

    const [showSelector, setShowSelector] = useState(false);
    const [currentLessonId, setCurrentLessonId] = useState(null);

    const handleAddActivityClick = (lessonId) => {
        setCurrentLessonId(lessonId);
        setShowSelector(true);
    };

    const saveActivitiesToLesson = async (selectedActivitiesIds) => {
        try {
            for (let activityId of selectedActivitiesIds) {
                await Client.put(`/lessons/${currentLessonId}/activity/${activityId}`)
            }
            setShowSelector(false);
        } catch (err) {
            console.log(err)
        }
    };

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
            <NavBar />
            <h1>Lessons</h1>
            {lessons.map(lesson => (
                <div key={lesson._id}> 
                    <h2>Level: {lesson.level}</h2>
                    <h2>Lesson: {lesson.title}</h2>
                    <h3>Description: {lesson.description}</h3>
                    <p>Content: {lesson.content}</p>
                    <button onClick={() => handleUpdate(lesson._id)}>Update</button>
                    <button onClick={() => handleDelete(lesson._id)}>Delete</button>
                    <button onClick={() => handleAddActivityClick(lesson._id)}>Add Activity</button>
                    {lesson.activities.map(activity => ( 
                        <div key={activity._id}>
                            <h2>{activity.questionType}</h2>
                            <h3>{activity.content}</h3>
                        </div>
                    ))}
                </div>
            ))}
            {showSelector && (
                <ActivitySelector
                    activities={activities || []}
                    onSave={saveActivitiesToLesson}
                />
            )}
        </div>
    )
}

export default Lesson