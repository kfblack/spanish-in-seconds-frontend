import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'
import { Container, Typography, TextField, Button, Box } from '@mui/material';



const CreateLesson = () => {

    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        title: '',
        content: '',
        description: '',
        level: '',
    })

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newLesson = {...formValues, activities: [], quiz: []}
        await Client.post('/lessons', newLesson)
        navigate('/lessons')
    }

    return (
    <div>
        <NavBar />
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Create a Lesson:
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="level"
                    label="Level"
                    name="level"
                    type="number"
                    placeholder="Difficulty level"
                    value={formValues.level}
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    placeholder="Lesson Title"
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
                    placeholder="Lesson Description"
                    value={formValues.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="content"
                    label="Content"
                    name="content"
                    placeholder="Lesson Content"
                    value={formValues.content}
                    multiline
                    rows={4}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create Lesson
                </Button>
            </Box>
        </Container>
    </div>
    )
}

export default CreateLesson