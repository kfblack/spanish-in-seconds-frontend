import Client from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { useState } from 'react'
import ActivitySelector from './ActivitySelector.jsx'
import QuizSelector from './QuizSelector.jsx'

const Lesson = ({lessons, activities, quizzes}) => {

    let navigate = useNavigate();

    const [showActivitySelector, setShowActivitySelector] = useState(false);
    const [showQuizSelector, setShowQuizSelector] = useState(false);
    const [currentLessonId, setCurrentLessonId] = useState(null);

    const handleAddActivityClick = (lessonId) => {
        setCurrentLessonId(lessonId);
        setShowActivitySelector(true);
    };

    const handleAddQuizClick = (lessonId) => [
        setCurrentLessonId(lessonId),
        setShowQuizSelector(true)
    ]

    const saveActivitiesToLesson = async (selectedActivitiesIds) => {
        try {
            for (let activityId of selectedActivitiesIds) {
                await Client.put(`/lessons/${currentLessonId}/activity/${activityId}`)
            }
            setShowActivitySelector(false);
        } catch (err) {
            console.log(err)
        }
    };

    const saveQuizzesToLesson = async (selectedQuizzesIds) => {
        try {
            for (let quizId of selectedQuizzesIds) {
                await Client.put(`/lessons/${currentLessonId}/quiz/${quizId}`)
            }
            setShowQuizSelector(false);
        } catch (err) {
            console.log(err)
        }
    }

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
                    <button onClick={() => handleAddQuizClick(lesson._id)}>Add Quiz</button>
                    {lesson.activities.map(activity => ( 
                        <div key={activity._id}>
                            <h2>{activity.questionType}</h2>
                            <h3>{activity.content}</h3>
                        </div>
                    ))}
                    {lesson.quiz.map(quiz => ( 
                        <div key={quiz._id}>
                            <h2>{quiz.title}</h2>
                            <h3>{quiz.description}</h3>
                            <h3>{quiz.questions}</h3>
                        </div>
                    ))}
                </div>
            ))}
            {showActivitySelector && (
                <ActivitySelector
                    activities={activities || []}
                    onSave={saveActivitiesToLesson}
                />
            )}
            {showQuizSelector && (
                <QuizSelector
                    quizzes={quizzes || []}
                    onSave={saveQuizzesToLesson}
                />
            )}
        </div>
    )
}

export default Lesson