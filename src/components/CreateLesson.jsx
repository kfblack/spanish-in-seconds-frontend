import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateLesson = () => {

    let navigate = useNavigate();

    const CreateLesson = () => {

    }

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
        await CreateLesson({
            title: formValues.title,
            content: formValues.content,
            description: formValues.description,
            level: formValues.level,
        })
        setFormValues({
            title: '',
            content: '',
            description: '',
            level: '',
        })
        navigate('/lessons')
    }

    return (
        <div>
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
                <button>Create Lesson</button>
            </form>
        </div>
    )
}

export default CreateLesson