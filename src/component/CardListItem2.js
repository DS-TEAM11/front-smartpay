import React, { useState, useEffect } from 'react';
import './CardListItem2.css';

const CardListItem2 = ({ card, selectedCard, onSelect }) => {
    const [isRotated, setIsRotated] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = card.cardImg; // cardImage 사용
        img.onload = () => {
            if (img.height > img.width) {
                setIsRotated(true);
            }
        };
    }, [card.cardImg]);

    return (
        <li
            className={`card-item ${
                selectedCard && selectedCard.cardName === card.cardName
                    ? 'selected'
                    : ''
            }`}
            onClick={() => onSelect(card)}
        >
            <img
                src={card.cardImg} // cardImage 사용
                alt={card.cardName}
                className={isRotated ? 'vertical-image' : 'horizontal-image'}
            />
            <div className="card-info">
                <div className="card-name">
                    {card.cardName || 'No Name Available'}
                </div>{' '}
                {/* 카드 이름 */}
                <div className="card-type">
                    {card.isCredit === 1 ? '신용카드' : '체크카드'}
                </div>
                <input
                    type="radio"
                    name="cardSelect"
                    value={card.cardCode}
                    checked={
                        selectedCard && selectedCard.cardName === card.cardName
                    }
                    readOnly
                    className="card-select"
                />
            </div>
        </li>
    );
};

export default CardListItem2;
