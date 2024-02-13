import { useState } from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';



const ActivitySelector = ({ activities, onSave }) => {
    
    const [selectedActivities, setSelectedActivities] = useState([]);

    const toggleActivity = (activityId) => {
        setSelectedActivities(prev =>
            prev.includes(activityId)
                ? prev.filter(id => id !== activityId)
                : [...prev, activityId]
        );
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Select Activities
            </Typography>
            {activities.map((activity) => (
                <Card key={activity._id} sx={{ mb: 1 }}>
                    <CardContent>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedActivities.includes(activity._id)}
                                    onChange={() => toggleActivity(activity._id)}
                                    name={activity.content}
                                />
                            }
                            label={`${activity.description} - ${activity.content}`}
                        />
                    </CardContent>
                </Card>
            ))}
            <Button variant="contained" color="primary" onClick={() => onSave(selectedActivities)} sx={{ mt: 2 }}>
                Save Activities
            </Button>
        </Box>
    );
};

export default ActivitySelector;