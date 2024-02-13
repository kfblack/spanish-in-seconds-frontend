import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'
import {TextField, Container, Box, Typography, Button} from '@mui/material'


const UpdateActivity = ({user, setUser}) => {

    let { activityId } = useParams();

    const [formValues, setFormValues] = useState({
        activityType: '',
        content: '',
        description: '',
        answer: '',
    })

    useEffect(() => {
        const getActivity = async () => {
            try {
                const res = await Client.get(`/activities/${activityId}`)
                const activity = res.data;
                setFormValues({
                    questionType: activity.description,
                    content: activity.content,
                    answer: activity.answer,
                    activityType: activity.activityType
                })
            } catch (err) {
                console.log(err);
            }
        }
        getActivity();
    }, [])

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Client.put(`/activities/${activityId}`, formValues)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
        <div>
            <NavBar user={user} setUser={setUser}/>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>Update Activity:</Typography>
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
                        id="activityType"
                        label="Activity Type"
                        name="activityType"
                        placeholder="Quiz title"
                        value={formValues.activityType}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="answer"
                        label="Answer"
                        name="answer"
                        placeholder="Activity answer"
                        value={formValues.answer}
                        onChange={handleChange}
                    />
                    </Box>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Update Activity</Button>
            </Container>
        </div>
        </div>
    )
}

export default UpdateActivity