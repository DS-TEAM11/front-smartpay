import React, { useEffect } from 'react';
import './SpreadCards.css';
import CardImg from './CardImg'; // CardImg component import

const SpreadCards = React.memo(({ cards, onClick }) => {
    useEffect(() => {
        const maxSize = 40 / cards.length;
        cards.forEach((_, index) => {
            const translateValue = maxSize * index;
            const zIndexValue = 100 - index;
            document.querySelector(
                `.spread_cards .cardImg:nth-child(${index + 1})`,
            ).style.transform = ` translateX(${translateValue}%)`;
            document.querySelector(
                `.spread_cards .cardImg:nth-child(${index + 1})`,
            ).style.zIndex = zIndexValue;
        });
    }, []);

    return (
        <div className="spread_cards" onClick={onClick}>
            {cards.map((card, index) => (
                <CardImg
                    key={index}
                    src={card.cardImage}
                    alt={card.cardNick}
                    direction="horizontal"
                />
            ))}
        </div>
    );
});

export default SpreadCards;
