import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'

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

    return (
        <div>
        <div>
            <h1>Create an Activity:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='level'>Question Type:</label>
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
                </div>
            ))}
        </div>
        </div>
    )
}

export default CreateActivity