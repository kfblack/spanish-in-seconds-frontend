import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'
import {useNavigate} from 'react-router-dom'
import {TextField, Container, Box, Typography, Button} from '@mui/material'


const UpdateLesson = ({user, setUser}) => {

    const { lessonId } = useParams();

    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        title: '',
        content: '',
        description: '',
        level: '',
    })

    useEffect(() => {
        const getLesson = async () => {
            try {
                const res = await Client.get(`/lessons/${lessonId}`)
                const lesson = res.data;
                setFormValues({
                    title: lesson.title,
                    content: lesson.content,
                    description: lesson.description,
                    level: lesson.level
                })
            } catch (err) {
                console.log(err);
            }
        }
        getLesson();
    }, [])

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Client.put(`/lessons/${lessonId}`, formValues)
            navigate('/lessons')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <NavBar user={user} setUser={setUser}/>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>Update Lesson:</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        placeholder="Activity description"
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
                        placeholder="Activity content"
                        value={formValues.content}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        placeholder="Lesson title"
                        value={formValues.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="level"
                        label="Level"
                        name="level"
                        placeholder="Lesson level"
                        value={formValues.level}
                        onChange={handleChange}
                    />
                    </Box>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Update Lesson</Button>
            </Container>
        </div>
    )
}

export default UpdateLesson
