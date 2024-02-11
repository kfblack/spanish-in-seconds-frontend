import Client from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { useState } from 'react'
import ActivitySelector from './ActivitySelector.jsx'
import QuizSelector from './QuizSelector.jsx'
import { Container, Typography, Button, Divider, Paper, CssBaseline } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, CardActions, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant='h6'>Activities</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {lesson.activities.map(activity => (
                                    <Card key={activity._id} variant="outlined" sx={{ marginBottom: '10px' }}>
                                        <CardContent>
                                            <Typography variant="h6">{activity.questionType}</Typography>
                                            <Typography variant="body2">{activity.content}</Typography>
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
                                {lesson.quiz.map(quiz => (
                                    <Card key={quiz._id} variant="outlined" sx={{ marginBottom: '10px' }}>
                                        <CardContent>
                                            <Typography variant="h6">{quiz.title}</Typography>
                                            <Typography variant="body1">{quiz.description}</Typography>
                                            {quiz.questions?.map((question) => (
                                                <div>
                                                    <Typography variant="body1">Questions: {question.content}</Typography>
                                                    <Typography variant="body2">Answers</Typography>
                                                        {question.possibleAnswers?.map((answer) => (
                                                            <li>
                                                                <Button variant='text'>{answer}</Button>
                                                            </li>
                                                        ))}
                                                </div>
                                            ))}
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