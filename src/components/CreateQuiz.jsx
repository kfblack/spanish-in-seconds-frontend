import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api.js'
import NavBar from './NavBar'


const CreateQuiz = ({quizzes}) => {

    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        questions: [{content: '', correctAnswer: '', possibleAnswers: ['']}]
    })

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleQuestionChange = (e) => {
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newQuiz = {...formValues, questions: []}
        await Client.post('/quizzes', newQuiz)
        navigate('/createQuiz')
    }

    const handleDelete = async (quizId) => {
        try {
            await Client.delete(`/quizzes/${quizId}`)
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (quizId) => {
        navigate(`/update-quiz/${quizId}`)
    }

    return (
        <div>
        <div>
            <NavBar />
            <h1>Create a Quiz:</h1>
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
                <label htmlFor='questions'>Questions:</label>
                    <input
                    onChange={handleChange}
                    name="questions"
                    type="text"
                    placeholder="Quiz questions"
                    value={formValues.questions}
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
                    <h3>Questions: {quiz.questions}</h3>
                    <button onClick={() => handleUpdate(quiz._id)}>Update</button>
                    <button onClick={() => handleDelete(quiz._id)}>Delete</button>
                </div>
            ))}
        </div>
        </div>
    )
}

export default CreateQuiz