import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Card, CardContent, CardActions } from '@mui/material';


const CreateActivity = ({activities, user}) => {

    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        description: '',
        content: '',
        correctAnswer: '',
        activityType: '',
    })

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newActivity = {...formValues}
        await Client.post('/activities', newActivity)
        navigate('/createActivity')
    }

    const handleDelete = async (activityId) => {
        try {
            await Client.delete(`/activities/${activityId}`)
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (activityId) => {
        navigate(`/update-activity/${activityId}`)
    }

    function getPlaceholderText(activityType) {
        switch (activityType) {
            case 'true-false':
                return "Enter 'true' or 'false'";
            case 'multiple-choice':
                return "Enter the correct option";
            case 'short-answer':
                return "Enter the correct answer";
            case 'fill-in-the-blank':
                return "Enter the word(s) for the blank";
            default:
                return "Correct Answer";
        }
    }

    return (
        <div>
        <NavBar user={user}/>
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Create an Activity:
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    placeholder="Description of activity"
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
                    placeholder="Activity Content"
                    value={formValues.content}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="correctAnswer"
                    label="Answer"
                    name="correctAnswer"
                    placeholder={getPlaceholderText(formValues.activityType)}
                    value={formValues.correctAnswer}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="activityType-label">Activity Type</InputLabel>
                    <Select
                        labelId="activityType-label"
                        id="activityType"
                        value={formValues.activityType}
                        label="Activity Type"
                        name="activityType"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value=''>Select Type</MenuItem>
                        <MenuItem value='true-false'>True or False</MenuItem>
                        <MenuItem value='short-answer'>Short Answer</MenuItem>
                        <MenuItem value='fill-in-the-blank'>Fill in the Blank</MenuItem>
                        <MenuItem value='multiple-choice'>Multiple Choice</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Create Activity
                </Button>
            </Box>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                Activities
            </Typography>
            {activities.map(activity => (
                <Card sx={{ mt: 2, mb: 2 }}>
                <CardContent>
                    <Typography variant="h6">Description: {activity.description}</Typography>
                    <Typography variant="subtitle1">Activity Type: {activity.activityType}</Typography>
                    <Typography variant="body1">Activity: {activity.content}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => handleUpdate(activity._id)}>Update</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(activity._id)}>Delete</Button>
                </CardActions>
            </Card>
            ))}
        </Container>
    </div>
);
};

export default CreateActivity