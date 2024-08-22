import React from 'react';
import './Benefits.css';

const Benefits = ({ imageSrc, description }) => (
    <div className="benefit-item">
        <img src={imageSrc} alt={description} />
        <p>{description}</p>
    </div>
);

export default Benefits;
