import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'
import { Container, Typography, TextField, Button, Box, Card, CardContent, CardActions } from '@mui/material';



const CreateQuiz = ({quizzes}) => {

    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        questions: [{content: '', correctAnswer: '', possibleAnswers: ['']}]
    })

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleQuestionChange = (e) => {
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newQuiz = {...formValues, questions: []}
        await Client.post('/quizzes', newQuiz)
        navigate('/createQuiz')
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

    return (
        <div>
            <NavBar />
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
                    value={formValues.title}
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
                    value={formValues.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="questions"
                    label="Questions (comma-separated)"
                    name="questions"
                    placeholder="Quiz questions"
                    value={formValues.questions}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Create Quiz</Button>
            </Box>
            <Typography variant="h5" component="h2" sx={{ mt: 4 }}>Quizzes</Typography>
            {quizzes.map((quiz, index) => (
                <Card key={index} sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Title: {quiz.title}</Typography>
                        <Typography variant="body1">Description: {quiz.description}</Typography>
                        <Typography variant="body2">Questions: {quiz.questions}</Typography>
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