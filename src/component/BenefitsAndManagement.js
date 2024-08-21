import React from 'react';
import Benefits from '../component/Benefits';
import ManagementItem from '../component/ManagementItem';
import './BenefitsAndManagement.css';

const BenefitsAndManagement = ({ benefits, managementItems }) => (
    <div className="benefits-management-container">
        <div className="benefits-section">
            <h3>지금까지 받은 혜택 모아보기</h3>
            <div className="benefits-items">
                {benefits.map((benefit, index) => (
                    <Benefits
                        key={index}
                        imageSrc={benefit.imageSrc}
                        description={benefit.description}
                    />
                ))}
            </div>
        </div>
        <div className="management-section">
            <h3>카드 관리하기</h3>
            <div className="management-items">
                {managementItems.map((item, index) => (
                    <ManagementItem
                        key={index}
                        imageSrc={item.imageSrc}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    </div>
);

export default BenefitsAndManagement;
