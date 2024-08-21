import React from 'react';
import './ManagementItem.css';

const ManagementItem = ({ imageSrc, description }) => (
    <div className="management-item">
        <img src={imageSrc} alt={description} />
        <p>{description}</p>
    </div>
);

export default ManagementItem;
