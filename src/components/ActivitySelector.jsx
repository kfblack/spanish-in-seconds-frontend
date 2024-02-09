import { useState } from 'react';


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
        <div>
            <h2>Select Activities</h2>
            {activities.map((activity) => (
                <div key={activity._id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedActivities.includes(activity._id)}
                            onChange={() => toggleActivity(activity._id)}
                        />
                        {activity.content}
                    </label>
                </div>
            ))}
            <button onClick={() => onSave(selectedActivities)}>Save Activities</button>
        </div>
    );
};

export default ActivitySelector;