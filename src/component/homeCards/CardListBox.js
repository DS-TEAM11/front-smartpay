import React, { useState, useEffect } from 'react';
import { useSelectedCard } from '../../provider/PayProvider';
import './CardListBox.css';
import CardImg from './CardImg';
const CardListBox = ({ card, onSelect }) => {
    const [isRotated, setIsRotated] = useState(false);
    const { selectedCard } = useSelectedCard();

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
                selectedCard && selectedCard.cardName === card.cardName
                    ? 'selected'
                    : ''
            }`}
            onClick={() => onSelect(card)}
        >
            <CardImg
                src={card.cardImg}
                alt={card.cardName}
                direction="horizontal"
                className={isRotated ? 'vertical-image' : 'horizontal-image'}
            />
            <div className="card-info">
                <div className="card-name">
                    {card.cardName || 'No Name Available'}
                </div>
                <div className="card-type">
                    {card.cardCompany || '카드사 없음'}
                </div>
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
        </li>
    );
};

export default CardListBox;
