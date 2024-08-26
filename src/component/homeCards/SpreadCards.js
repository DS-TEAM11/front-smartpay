import React, { useEffect } from 'react';
import './SpreadCards.css';
import CardImg from './CardImg'; // CardImg component import
import { useSelectedCard } from '../../provider/PayProvider';

const SpreadCards = React.memo(({ cards, onClick }) => {
    const { selectedCard, setSelectedCard } = useSelectedCard();
    const handleSelectCard = (card) => {
        console.log(card);
        setSelectedCard(card);
    };
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
        <div
            className="spread_cards"
            onClick={cards.length > 5 ? onClick : undefined}
        >
            {cards.map((card, index) => (
                <CardImg
                    key={index}
                    src={card.cardImg}
                    alt={card.cardNick}
                    onClick={() => handleSelectCard(card)}
                    direction="horizontal"
                />
            ))}
        </div>
    );
});

export default SpreadCards;
