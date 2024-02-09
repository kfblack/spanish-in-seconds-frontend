import { useState } from 'react';


const QuizSelector = ({ quizzes, onSave }) => {
    
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);

    const toggleQuiz = (quizId) => {
        setSelectedQuizzes(prev =>
            prev.includes(quizId)
                ? prev.filter(id => id !== quizId)
                : [...prev, quizId]
        );
    };

    return (
        <div>
            <h2>Select Quizzes</h2>
            {quizzes.map((quiz) => (
                <div key={quiz._id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedQuizzes.includes(quiz._id)}
                            onChange={() => toggleQuiz(quiz._id)}
                        />
                        {quiz.description}
                    </label>
                </div>
            ))}
            <button onClick={() => onSave(selectedQuizzes)}>Save Quizzes</button>
        </div>
    );
};

export default QuizSelector;