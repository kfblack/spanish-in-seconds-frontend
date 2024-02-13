import { useState } from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';



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
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Select Quizzes
            </Typography>
            {quizzes.map((quiz) => (
                <Card key={quiz._id} sx={{ mb: 1 }}>
                    <CardContent>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedQuizzes.includes(quiz._id)}
                                    onChange={() => toggleQuiz(quiz._id)}
                                    name={quiz.description}
                                />
                            }
                            label={`${quiz.title} - ${quiz.description}`}
                        />
                    </CardContent>
                </Card>
            ))}
            <Button variant="contained" color="primary" onClick={() => onSave(selectedQuizzes)} sx={{ mt: 2 }}>
                Save Quizzes
            </Button>
        </Box>
    );
};

export default QuizSelector;