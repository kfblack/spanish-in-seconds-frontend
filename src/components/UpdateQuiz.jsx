import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'

const UpdateQuiz = ({user, setUser}) => {

    let { quizId } = useParams();

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const res = await Client.get(`/quizzes/${quizId}`)
                const quiz = res.data;
                setFormValues({
                    title: quiz.title,
                    description: quiz.description,
                })
            } catch (err) {
                console.log(err);
            }
        }
        getQuiz();
    }, [])

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Client.put(`/quizzes/${quizId}`, formValues)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
        <div>
            <NavBar user={user} setUser={setUser}/>
            <h1>Update Quiz:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title:</label>
                    <input
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="Quiz title"
                    value={formValues.title}
                    required
                    />
                <label htmlFor='description'>Description:</label>
                    <input
                    onChange={handleChange}
                    name="description"
                    type="text"
                    placeholder="Quiz description"
                    value={formValues.description}
                    required
                    />
                <button type='submit'>Update Quiz</button>
            </form>
        </div>
        </div>
    )
}

export default UpdateQuiz