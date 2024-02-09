import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'

const UpdateActivity = () => {

    let { activityId } = useParams();

    const [formValues, setFormValues] = useState({
        questionType: '',
        content: '',
    })

    useEffect(() => {
        const getActivity = async () => {
            try {
                const res = await Client.get(`/activities/${activityId}`)
                const activity = res.data;
                setFormValues({
                    title: activity.title,
                    content: activity.content,
                    description: activity.description,
                    level: activity.level
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
            <NavBar />
            <h1>Update Activity:</h1>
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
                <button type='submit'>Update Activity</button>
            </form>
        </div>
        </div>
    )
}

export default UpdateActivity