import React from 'react';
import './ManagementItem.css';

const ManagementItem = ({ imageSrc, description, onClick }) => (
    <div
        className="management-item"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
    >
        <img src={imageSrc} alt={description} />
        <div className="description-text">{description}</div>
    </div>
);

export default ManagementItem;
