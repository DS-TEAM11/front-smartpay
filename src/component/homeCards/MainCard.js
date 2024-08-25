import React, { useEffect } from 'react';
import CardImg from './CardImg';
const MainCard = React.memo(({ card, children }) => {
    const { cardImage, cardNick } = card;
    return (
        <div className="main-card">
            <CardImg src={cardImage} alt={cardNick} direction="horizontal" />
            {children}
        </div>
    );
});

export default MainCard;
