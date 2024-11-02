import React from 'react';
import './styles.css';

const MenteeCard = ({ mentee }) => {
    return (
        <div className="card">
            <h2>{mentee.name}</h2>
            <p>{mentee.interests.join(', ')}</p>
        </div>
    );
};

export default MenteeCard;
