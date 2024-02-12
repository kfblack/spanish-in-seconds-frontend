import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'
import {useNavigate} from 'react-router-dom'

const UpdateLesson = () => {

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
                <button type='submit'>Update Lesson</button>
            </form>
        </div>
    )
}

export default UpdateLesson