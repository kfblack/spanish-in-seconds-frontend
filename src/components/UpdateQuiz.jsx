import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'
import {TextField, Container, Box, Typography, Button} from '@mui/material'

const UpdateQuiz = ({user, setUser}) => {

    let { quizId } = useParams();

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const res = await Client.get(`/quizzes/${quizId}`)
                const quiz = res.data;
                setFormValues({
                    title: quiz.title,
                    description: quiz.description,
                })
            } catch (err) {
                console.log(err);
            }
        }
        getQuiz();
    }, [])

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Client.put(`/quizzes/${quizId}`, formValues)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
        <div>
            <NavBar user={user} setUser={setUser}/>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>Update Quiz:</Typography>
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
                    </Box>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Update Quiz</Button>
            </Container>
        </div>
        </div>
    )
}

export default UpdateQuiz

