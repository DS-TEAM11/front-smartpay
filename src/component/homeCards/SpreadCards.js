import React, { useEffect } from 'react';
import './SpreadCards.css';
import CardImg from './CardImg'; // CardImg component import

const SpreadCards = React.memo(({ cards, onClick }) => {
    useEffect(() => {
        cards.forEach((_, index) => {
            const translateValue = index * 2;
            const zIndexValue = 100 - index;
            document.querySelector(
                `.spread_cards img:nth-child(${index + 1})`,
            ).style.transform += ` translateY(-${translateValue}rem)`;
            document.querySelector(
                `.spread_cards img:nth-child(${index + 1})`,
            ).style.zIndex = zIndexValue;
        });
    }, [cards]);

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
