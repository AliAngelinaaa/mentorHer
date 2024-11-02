import React from 'react';
import './styles.css';

const MentorCard = ({ mentor }) => {
    return (
        <div className="card">
            <h2>{mentor.name}</h2>
            <p>{mentor.skills.join(', ')}</p>
            <p>{mentor.experience} years of experience</p>
        </div>
    );
};

export default MentorCard;
