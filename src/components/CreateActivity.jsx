import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateActivity = () => {

    let navigate = useNavigate();

    const CreateActivity = () => {

    }

    const [formValues, setFormValues] = useState({
        questionType: '',
        content: '',
    })

    const handleChange = (e) => [
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        await CreateActivity({
            questionType: formValues.questionType,
            content: formValues.content,
            activityAnswer: [],
        })
        setFormValues({
            questionType: '',
            content: '',
            lesson: [],
            activityAnswer: [],
        })
        navigate('/lessons/:id')
    }

    return (
        <div>
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
                <label htmlFor='activityAnswer'>Answers:</label>
                    <input
                    onChange={handleChange}
                    name="activityAnswer"
                    type="text"
                    placeholder="Answers"
                    value={formValues.activityAnswer}
                    required
                    />
                <button>Create Activity</button>
            </form>
        </div>
    )
}

export default CreateActivity