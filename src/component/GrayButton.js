import React from 'react';
import './GrayButton.css';

const GrayButton = ({ text, onClick, disabled }) => {
    return (
        <button className="gray-button" onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default GrayButton;
