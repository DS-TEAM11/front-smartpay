import React, { useState } from 'react';
import CardImg from './CardImg';
import BenefitItem from './BenefitItem';
const MainCard = React.memo(({ card, showBenefit, children }) => {
    const { cardImage, cardNick } = card;

    return (
        <>
            <CardImg src={cardImage} alt={cardNick} direction="horizontal">
                {showBenefit && <BenefitItem card={card} />}
            </CardImg>
            {children}
        </>
    );
});

export default MainCard;
