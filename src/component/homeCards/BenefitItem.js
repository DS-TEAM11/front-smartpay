import React from 'react';
import './BenefitItem.css';

const BenefitItem = (card) => {
    const { cardBenefit1, cardBenefit2, cardBenefit3 } = card;
    return (
        <>
            <div className="benefit-container">
                <h1>benefitList</h1>
                <li>{cardBenefit1}</li>
                <li>{cardBenefit2}</li>
                <li>{cardBenefit3}</li>
            </div>
        </>
    );
};

export default BenefitItem;
