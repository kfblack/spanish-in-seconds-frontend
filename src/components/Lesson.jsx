import Client from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { useState, useRef } from 'react'
import ActivitySelector from './ActivitySelector.jsx'
import QuizSelector from './QuizSelector.jsx'
import { Container, Typography, Button, Divider, Paper, CssBaseline, TextField, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, CardActions, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import React from 'react'



const Lesson = ({lessons, activities, quizzes, user, setUser}) => {

    let navigate = useNavigate();

    const [showActivitySelector, setShowActivitySelector] = useState(false);
    const [showQuizSelector, setShowQuizSelector] = useState(false);
    const [currentLessonId, setCurrentLessonId] = useState(null);
    const [showActivityAnswer, setShowActivityAnswer] = useState({});
    const [activityResponse, setActivityResponse] = useState({})
    const [userInputs, setUserInputs] = useState({})
    const [userAnswer, setUserAnswer] = useState({})
    const [progress, setProgress] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [openSubmitSnackbar, setOpenSubmitSnackbar] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')

    const activitySelectorRef = useRef(null)
    const quizSelectorRef = useRef(null)

    const completeSound = useRef(new Audio('../sounds/mixkit-animated-small-group-applause-523.wav'))
    const clickSound = useRef(new Audio('../sounds/mixkit-game-click-1114.wav'))
    const submitSound = useRef(new Audio('../sounds/mixkit-select-click-1109.wav'))

    const scrollToRef = (ref) => {
        setTimeout(() => {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0); 
    };
    
    const handleAddActivityClick = (lessonId) => {
        setCurrentLessonId(lessonId);
        setShowActivitySelector(true);
        scrollToRef(activitySelectorRef); 
    };
    
    const handleAddQuizClick = (lessonId) => {
        setCurrentLessonId(lessonId);
        setShowQuizSelector(true);
        scrollToRef(quizSelectorRef); 
    };

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
        clickSound.current.play()
        setActivityResponse(response => ({...response, [activityId]: {...response[activityId], userResponse, isCorrect, feedback}}))
    }
    const handleAnswer = (quizId, questionId, answer) => {
        setUserAnswer(prevAnswer => ({...prevAnswer, [quizId]: {...prevAnswer[quizId], [questionId]: answer}}))
        clickSound.current.play()
    }

    const handleSubmitQuiz = (quizId) => {
        const quiz = quizzes.find(quiz => quiz._id === quizId)
        let score = 0; 
        let incorrectQuestions = []
        quiz.questions.forEach(question => {
            if (userAnswer && userAnswer[quizId][question._id] === question.correctAnswer) {
                score += 1
            } else {
                incorrectQuestions.push(question.content)
            }
        })
        let feedbackMessage = `You scored ${score} out of ${quiz.questions.length}!`
        if (incorrectQuestions.length > 0) {
            feedbackMessage += '\n\Incorrect Questions:\n-' + incorrectQuestions.join('\n- ')
        }
        setSubmitMessage(feedbackMessage)
        setOpenSubmitSnackbar(true)
        submitSound.current.play()
    }

    const indexToLetter = (index) => String.fromCharCode(65 + index)

    const handleProgressComplete = async (lessonId) => {
        try {
            let userId = user.id
            await Client.post(`/progress/${userId}/lessons/${lessonId}`)
            setSnackbarMessage("Lesson marked as complete, great work!")
            setOpenSnackbar(true)
            completeSound.current.play()
        } catch (err) {
            console.log(err)
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnackbar(false)
    }

    const handleCloseSubmitSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSubmitSnackbar(false)
    }


    return (
        <div>
            <NavBar user={user} setUser={setUser}/>
            <Container>
                <Typography variant="h6" component="h1" gutterBottom sx={{marginTop: '10px'}}>
                    <h1>Lessons</h1>
                </Typography>
                {lessons.map(lesson => (
                    <Paper key={lesson._id} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant='h5' component='h2' >Level: {lesson.level}</Typography>
                        <Typography variant='h6' component='h3'>Lesson: {lesson.title}</Typography>
                        <Typography variant='body1'>Description: {lesson.description}</Typography>
                        <Typography variant='body2' paragraph>
                            {lesson.content.split('\n').map((line, index, array) => (
                                <React.Fragment key={index}>
                                    {line}{index < (array.length - 1) ? <br /> : null}
                                </React.Fragment>
                            ))}
                        </Typography>
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
                                            <Typography variant="h6">Description: {activity.description}</Typography>
                                            <Typography variant='h6'>Activity: {activity.content}</Typography>
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
                                                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
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
                                                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
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
                                                    <div>
                                                        {question.possibleAnswers?.map((answer, answerIndex) => (
                                                                <Button
                                                                variant={userAnswer[quiz._id]?.[question._id] === answer ? 'contained': 'outlined'} 
                                                                onClick={() => handleAnswer(quiz._id, question._id, answer)}
                                                                style={{ textAlign: 'left', display: 'block', margin: '5px', backgroundColor: userAnswer[quiz._id]?.[question._id] === answer ? '#4caf50': ''}}>
                                                                    {indexToLetter(answerIndex)}, {answer}
                                                                </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            <Button onClick={() => handleSubmitQuiz(quiz._id)} sx={{ backgroundColor: '#E53935', color: '#FFB300', mr: 2 }}>Submit Quiz</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
            ))}
            {showActivitySelector && (
                <div ref={activitySelectorRef}>
                    <ActivitySelector
                        activities={activities || []}
                        onSave={saveActivitiesToLesson}
                    />
                </div>
            )}
            {showQuizSelector && (
                <div ref={quizSelectorRef}>
                    <QuizSelector
                        quizzes={quizzes || []}
                        onSave={saveQuizzesToLesson}
                    />
                </div>
            )}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            <Snackbar
                open={openSubmitSnackbar}
                autoHideDuration={8000}
                onClose={handleCloseSubmitSnackbar}
                message={submitMessage}
            />
            </Container>
        </div>
    )
}

export default Lesson