import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'

const CreateActivity = ({activities}) => {

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
        <div>
            <NavBar />
            <h1>Create an Activity:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='description'>Description:</label>
                    <input
                    onChange={handleChange}
                    name="description"
                    type="text"
                    placeholder="Description of activity"
                    value={formValues.description}
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
                <label htmlFor='correctAnswer'>Answer:</label>
                    <input
                    onChange={handleChange}
                    name="correctAnswer"
                    type="text"
                    placeholder={getPlaceholderText(formValues.activityType)}
                    value={formValues.correctAnswer}
                    required
                    />  
                <label htmlFor='activityType'>Activity Type:</label>
                    <select
                    onChange={handleChange}
                    name="activityType"
                    value={formValues.activityType}
                    required
                    >
                        <option value=''>Select Type</option>
                        <option value='true-false'>True or False</option>
                        <option value='short-answer'>Short Answer</option>
                        <option value='fill-in-the-blank'>Fill in the Blank</option>
                        <option value='multiple-choice'>Multiple Choice</option>
                    </select>
                <button type='submit'>Create Activity</button>
            </form>
        </div>
        <div>
            <h1>Activities</h1>
            {activities.map(activity => (
                <div key={activities.id}>
                    <h2>Description: {activity.description}</h2>
                    <h3>Activity Type: {activity.activityType}</h3>
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