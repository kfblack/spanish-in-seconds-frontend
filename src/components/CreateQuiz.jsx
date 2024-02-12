import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'
import { Container, Typography, TextField, Radio, Button, FormControlLabel, Box, Card, CardContent, CardActions, RadioGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateQuiz = ({quizzes, user}) => {

    let navigate = useNavigate();

    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        questions: [{
            content: '',
            correctAnswer: '',
            possibleAnswers: ['']
        }]
    })

    const createQuizQuestion = async (questionData) => {
        try {
            const response = await Client.post('/quizQuestion', questionData)
            const question = response.data;
            return question._id; 
        } catch (error) {
            console.error("Error creating quiz question:", error);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target
        setQuiz(quiz => ({...quiz, [name]: value}))
    }

    const handleQuestionChange = (questionIndex, e) => {
        const { name, value} = e.target;
        const updatedQuestions = quiz.questions.map((question, index ) => {
            if (index === questionIndex) {
                return {...question, [name]: value}
            } else {
                return question
            }
        });
        setQuiz(quiz => ({...quiz, questions: updatedQuestions}))
    }  

    const handlePossibleAnswerChange = (questionIndex, answerIndex, e) => {
        const newValue = e.target.value;
        const updatedQuestions = quiz.questions.map((question, index) => {
            if (index === questionIndex) {
                const updateAnswers = question.possibleAnswers.map((answer, idx) => {
                    if (idx === answerIndex) {
                        return newValue
                    } 
                    return answer;
                })
                return {...question, possibleAnswers: updateAnswers}
            } 
            return question
        })
        setQuiz(quiz => ({...quiz, questions: updatedQuestions}))
    }

    const addQuestion = () => {
        const newQuestion = {content: '', correctAnswer: '', possibleAnswers: ['']}
        setQuiz(quiz => ({...quiz, questions: [...quiz.questions, newQuestion] }))
    }

    const removeQuestion = (questionIndex) => {
        const updatedQuestions = quiz.questions.filter((_, index) => index !== questionIndex );
        setQuiz(quiz => ({...quiz, questions: updatedQuestions}))
    }

    const addPossibleAnswer = (questionIndex) => {
        const updateQuestion = quiz.questions.map((question, index) => {
            if (index === questionIndex) {
                return {...question, possibleAnswers: [...question.possibleAnswers, '']}
            }
            return question
        })
        setQuiz(quiz => ({...quiz, questions: updateQuestion}))
    }   

    const removePossibleAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = quiz.questions.map((question, idx) => {
            if (idx === questionIndex) {
                return {...question,  possibleAnswers: question.possibleAnswers.filter((_, idx) => idx !== answerIndex)}
            }
            return question
        })
        setQuiz(quiz => ({...quiz, questions: updatedQuestions}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    const questionIds = await Promise.all(quiz.questions.map(async (question) => {
        return await createQuizQuestion({
            content: question.content,
            correctAnswer: question.correctAnswer,
            possibleAnswers: question.possibleAnswers,
        });
    }));

    const validQuestionIds = questionIds.filter(id => id !== undefined);

    const quizData = {
        title: quiz.title,
        description: quiz.description,
        questions: validQuestionIds,
    };

        try {
            const response = await Client.post('/quizzes', quizData)

            navigate('/createQuiz')
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (quizId) => {
        try {
            await Client.delete(`/quizzes/${quizId}`)
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (quizId) => {
        navigate(`/update-quiz/${quizId}`)
    }

    const handleCorrectAnswerChange = (questionIndex, e) => {
        const newValue = e.target.value;
        const updatedQuestions = quiz.questions.map((question, index) => {
            if (index === questionIndex) {
                return {...question, correctAnswer: newValue};
            } 
            return question
        })
        setQuiz(quiz => ({...quiz, questions: updatedQuestions}))
    }

    return (
        <div>
            <NavBar user={user}/>
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>Create a Quiz:</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    placeholder="Quiz title"
                    value={quiz.title}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    placeholder="Quiz description"
                    value={quiz.description}
                    onChange={handleChange}
                />
                {quiz.questions.map((question, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <TextField
                            label = "Question"
                            name = 'content'
                            margin = 'normal'
                            value = {question.content}
                            onChange={(e) => handleQuestionChange(index, e)}
                            fullWidth
                        />
                        {question.possibleAnswers.map((answer, idx) => (
                            <div>
                                <TextField 
                                    key = {idx}
                                    label = {`Answer choice ${idx + 1}`}
                                    margin = 'normal'
                                    value = {answer}
                                    onChange={(e) => handlePossibleAnswerChange(index, idx, e)}
                                    fullWidth
                                />
                                <RadioGroup
                                    aria-labelledby='correct-answer'
                                    name={`correctAnswer-${index}`}
                                    value={question.correctAnswer}
                                    onChange={(e) => handleCorrectAnswerChange(index, e)}
                                >
                                    <FormControlLabel
                                        value={answer}
                                        control={<Radio />}
                                        label={answer}
                                    />
                                </RadioGroup>
                                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addPossibleAnswer(index)}>
                                    Add Answer Choice
                                </Button> 
                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => removePossibleAnswer(index, idx)}>
                                    Remove Answer Choice
                                </Button> 
                            </div>
                        ))}
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addQuestion()}>
                            Add Question
                        </Button>                    
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => removeQuestion(index)}>
                            Remove Question
                        </Button>   
                    </Box>
                ))}
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Create Quiz</Button>
            </Box>
            <Typography variant="h5" component="h2" sx={{ mt: 4 }}>Quizzes</Typography>
            {quizzes.map((quiz, index) => (
                <Card key={index} sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Title: {quiz.title}</Typography>
                        <Typography variant="body1">Description: {quiz.description}</Typography>
                        {quiz.questions.map((question, qIndex) => (
                            <div>
                                <Typography variant="body1">Questions: {question.content}</Typography>
                                <Typography variant="body2">Answers</Typography>
                                    {question.possibleAnswers?.map((answer, aIndex) => (
                                        <li>
                                            <Button variant='text' onClick={() => handleAnswerClick(qIndex, aIndex)}>{answer}</Button>
                                        </li>
                                    ))}
                            </div>
                        ))}
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleUpdate(quiz._id)}>Update</Button>
                        <Button size="small" color="error" onClick={() => handleDelete(quiz._id)}>Delete</Button>
                    </CardActions>
                </Card>
            ))}
        </Container>
        </div>
    );
}

export default CreateQuiz