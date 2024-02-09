import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'

const CreateActivity = ({activities}) => {

    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        questionType: '',
        content: '',
    })

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newActivity = {...formValues, activityAnswer: []}
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

    return (
        <div>
        <div>
            <NavBar />
            <h1>Create an Activity:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='questionType'>Question Type:</label>
                    <input
                    onChange={handleChange}
                    name="questionType"
                    type="text"
                    placeholder="Type of question"
                    value={formValues.questionType}
                    required
                    />
                <label htmlFor='content'>Content:</label>
                    <input
                    onChange={handleChange}
                    name="content"
                    type="text"
                    placeholder="Activity Content"
                    value={formValues.content}
                    required
                    />
                <button type='submit'>Create Activity</button>
            </form>
        </div>
        <div>
            <h1>Activities</h1>
            {activities.map(activity => (
                <div key={activities.id}>
                    <h2>Question Type: {activity.questionType}</h2>
                    <h3>Activity: {activity.content}</h3>
                    <button onClick={() => handleUpdate(activity._id)}>Update</button>
                    <button onClick={() => handleDelete(activity._id)}>Delete</button>
                </div>
            ))}
        </div>
        </div>
    )
}

export default CreateActivity