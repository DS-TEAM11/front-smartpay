import React, { useState } from 'react';
import CardImg from './CardImg';
import BenefitItem from './BenefitItem';
const MainCard = React.memo(({ card, showBenefit, children }) => {
    // console.log('메인카드', card);
    const { cardImg, cardName } = card;

    return (
        <>
            <CardImg src={cardImg} alt={cardName} direction="horizontal">
                {showBenefit && <BenefitItem card={card} />}
            </CardImg>
            {children}
        </>
    );
});

export default MainCard;
