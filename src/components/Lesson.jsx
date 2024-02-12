import Client from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { useState } from 'react'
import ActivitySelector from './ActivitySelector.jsx'
import QuizSelector from './QuizSelector.jsx'
import { Container, Typography, Button, Divider, Paper, CssBaseline, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, CardActions, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneAllIcon from '@mui/icons-material/DoneAll';


const Lesson = ({lessons, activities, quizzes, user}) => {

    let navigate = useNavigate();

    const [showActivitySelector, setShowActivitySelector] = useState(false);
    const [showQuizSelector, setShowQuizSelector] = useState(false);
    const [currentLessonId, setCurrentLessonId] = useState(null);
    const [showActivityAnswer, setShowActivityAnswer] = useState({});
    const [activityResponse, setActivityResponse] = useState({})
    const [userInputs, setUserInputs] = useState({})
    const [userAnswer, setUserAnswer] = useState({})
    const [progress, setProgress] = useState([])

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

    const toggleActivityAnswer = (activityId) => {
        setShowActivityAnswer(answer => ({
            ...answer, [activityId]: !answer[activityId]
        }))
    }

    const handleResponse = (activityId, userResponse) => {
        const isCorrect = activities.find(activity => activity._id === activityId).correctAnswer.toLowerCase() === userResponse.toLowerCase()
        const feedback = isCorrect ? "Correct!": "Incorrect, try again!"
        setActivityResponse(response => ({...response, [activityId]: {...response[activityId], userResponse, isCorrect, feedback}}))
    }

    const handleAnswer = (quizId, questionId, answer) => {
        setUserAnswer(prevAnswer => ({...prevAnswer, [quizId]: {...prevAnswer[quizId], [questionId]: answer}}))
    }

    const handleSubmitQuiz = (quizId) => {
        const quiz = quizzes.find(quiz => quiz._id === quizId)
        let score = 0;
        quiz.questions.forEach(question => {
            if (userAnswer && userAnswer[quizId][question._id] === question.correctAnswer) {
                score += 1
            }
        })
        alert(`You scored ${score} out of ${quiz.questions.length} on the quiz!`)
    }

    const handleProgressComplete = async (lessonId) => {
        try {
            let progressId = user.progress
            await Client.put(`/progress/${progressId}/lessons/${lessonId}`)
            setProgress(prevProgress => ({...prevProgress, lessons: [...prevProgress.lessons, lessonId]}))
            alert("Lesson marked as complete!")
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <NavBar user={user}/>
            <Container>
                <Typography variant="h5" component="h1" gutterBottom>
                    <h1>Lessons</h1>
                </Typography>
                {lessons.map(lesson => (
                    <Paper key={lesson._id} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant='h5' component='h2' >Level: {lesson.level}</Typography>
                        <Typography variant='h6' component='h3'>Lesson: {lesson.title}</Typography>
                        <Typography variant='body1'>Description: {lesson.description}</Typography>
                        <Typography variant='body2' paragraph>Content: {lesson.content}</Typography>
                        <Button variant="outlined" startIcon={<UpgradeIcon />} onClick={() => handleUpdate(lesson._id)}>
                            Update
                        </Button>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(lesson._id)}>
                            Delete
                        </Button>
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => handleAddActivityClick(lesson._id)}>
                            Add Activity
                        </Button>
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => handleAddQuizClick(lesson._id)}>
                            Add Quiz
                        </Button>
                        <Button variant='outlined' startIcon={<DoneAllIcon />} onClick={() => handleProgressComplete(lesson._id)}>
                            Mark Complete
                        </Button>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant='h6'>Activities</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {lesson.activities?.map(activity => (
                                    <Card key={activity._id} variant="outlined" sx={{ marginBottom: '10px' }}>
                                        <CardContent>
                                            <Typography variant="body1">Description: {activity.description}</Typography>
                                            <Typography variant='body2'>Activity: {activity.content}</Typography>
                                            {activityResponse[activity._id] && (
                                                <Typography color={activityResponse[activity._id].isCorrect? 'green': 'red'}>{activityResponse[activity._id].feedback}</Typography>
                                            )}
                                            {activity.activityType === 'true-false' && (
                                                <div>
                                                    <Button variant='contained' onClick={() => handleResponse(activity._id, 'true')}>True</Button>
                                                    <Button variant='contained' onClick = {() => handleResponse(activity._id, 'false')}>False</Button>
                                                </div>
                                            )}
                                            {activity.activityType === 'fill-in-the-blank' &&(
                                                <div>
                                                <TextField
                                                    label="Your answer"
                                                    variant='outlined'
                                                    value={userInputs[activity._id] || ''}
                                                    onChange={(e)=> setUserInputs({...userInputs, [activity._id]: e.target.value})}
                                                />
                                                <Button variant='contained' onClick={() => handleResponse(activity._id, userInputs[activity._id])}>Submit Answer</Button>
                                                </div>
                                            )}
                                            {activity.activityType === 'short-answer' && (
                                                <div>
                                                <TextField
                                                    label="Your answer here"
                                                    variant='outlined'
                                                    value={userInputs[activity._id] || ''}
                                                    onChange={(e) => setUserInputs({...userInputs, [activity._id]: e.target.value})}
                                                />
                                                <Button variant='contained' onClick={() => handleResponse(activity._id, userInputs[activity._id])}>Submit Answer</Button>
                                                </div>
                                            )}
                                            <Button onClick={() => toggleActivityAnswer(activity._id)}>Show Answer</Button>
                                            {showActivityAnswer[activity._id] && (
                                                <Typography variant="h6">{activity.correctAnswer}</Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant='h6'>Quizzes</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {lesson.quiz?.map(quiz => (
                                    <Card key={quiz._id} variant="outlined" sx={{ marginBottom: '10px' }}>
                                        <CardContent>
                                            <Typography variant="h6">Title: {quiz.title}</Typography>
                                            <Typography variant="body1">Description: {quiz.description}</Typography>
                                            {quiz.questions?.map((question) => (
                                                <div>
                                                    <Typography variant="body1">Questions: {question.content}</Typography>
                                                    <Typography variant="body2">Answer Choices:</Typography>
                                                        {question.possibleAnswers?.map((answer) => (
                                                            <li>
                                                                <Button variant='text' onClick={() => handleAnswer(quiz._id, question._id, answer)}>{answer}</Button>
                                                            </li>
                                                        ))}
                                                </div>
                                            ))}
                                            <Button onClick={() => handleSubmitQuiz(quiz._id)}>Submit Quiz</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
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
            </Container>
        </div>
    )
}

export default Lesson