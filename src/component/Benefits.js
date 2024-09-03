import React from 'react';
import './Benefits.css';

const Benefits = ({ onClick, imageSrc, description, className }) => {
    if (className) {
        return (
            <div className={`benefit-item ${className}`} onClick={onClick}>
                <img src={imageSrc} alt={description} />
                <p>{description}</p>
            </div>
        );
    }
    return (
        <div className={`benefit-item`} onClick={onClick}>
            <img src={imageSrc} alt={description} />
            <p>{description}</p>
        </div>
    );
};

export default Benefits;
