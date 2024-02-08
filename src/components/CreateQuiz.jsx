import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'
import Sidebar from './Sidebar'

const CreateQuiz = ({quizzes}) => {

    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
    })

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newQuiz = {...formValues, questions: []}
        await Client.post('/quizzes', newQuiz)
        navigate('/createQuiz')
    }

    return (
        <div>
        <div>
            <h1>Create a Quiz:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='level'>Title:</label>
                    <input
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="Quiz title"
                    value={formValues.title}
                    required
                    />
                <label htmlFor='content'>Description:</label>
                    <input
                    onChange={handleChange}
                    name="description"
                    type="text"
                    placeholder="Quiz description"
                    value={formValues.description}
                    required
                    />
                <button type='submit'>Create Quiz</button>
            </form>
        </div>
        <div>
            <h1>Quizzes</h1>
            {quizzes.map(quiz => (
                <div key={quizzes.id}>
                    <h2>Title: {quiz.title}</h2>
                    <h3>Description: {quiz.description}</h3>
                </div>
            ))}
        </div>
        <Sidebar />
        </div>
    )
}

export default CreateQuiz