import React, { useState, useEffect } from 'react';
import './CardListItem.css';

const CardListItem = ({ card, selectedCard, onSelect }) => {
    const [isRotated, setIsRotated] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = card.cardImg;
        img.onload = () => {
            if (img.height > img.width) {
                setIsRotated(true);
            }
        };
    }, [card.cardImg]);

    return (
        <li
            className={`card-item ${
                selectedCard === card.cardName ? 'selected' : ''
            }`}
            onClick={() => onSelect(card)}
        >
            <img
                src={card.cardImg}
                alt={card.cardName}
                className={isRotated ? 'vertical-image' : 'horizontal-image'}
            />
            <div className="card-info">
                <div className="card-name">{card.cardName}</div>
                <div className="card-type">
                    {card.isCredit === 1 ? '신용카드' : '체크카드'}
                </div>
                <input
                    type="radio"
                    name="cardSelect"
                    value={card.cardCode}
                    checked={selectedCard === card.cardName}
                    readOnly
                    className="card-select"
                />
            </div>
        </li>
    );
};

export default CardListItem;
