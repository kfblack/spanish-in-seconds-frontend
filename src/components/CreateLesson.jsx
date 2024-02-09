import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'


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
            <h1>Create a Lesson:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='level'>Level:</label>
                    <input
                    onChange={handleChange}
                    name="level"
                    type="number"
                    placeholder="Difficulty level"
                    value={formValues.level}
                    required
                    />
                <label htmlFor='title'>Title:</label>
                    <input
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="Lesson Title"
                    value={formValues.title}
                    required
                    />
                <label htmlFor='description'>Description:</label>
                    <input
                    onChange={handleChange}
                    name="description"
                    type="text"
                    placeholder="Lesson Description"
                    value={formValues.description}
                    required
                    />
                <label htmlFor='content'>Content:</label>
                    <input
                    onChange={handleChange}
                    name="content"
                    type="text"
                    placeholder="Lesson Content"
                    value={formValues.content}
                    required
                    />
                <button type='submit'>Create Lesson</button>
            </form>
        </div>
    )
}

export default CreateLesson