import React, { useState, useEffect } from 'react';
import { useSelectedCard } from '../../provider/PayProvider';
import './CardListBox.css';
import CardImg from './CardImg';
const CardListBox = ({ card, onSelect }) => {
    const { selectedCard } = useSelectedCard();
    //회전에 따라 저장
    const [isRotated, setIsRotated] = useState(false);
    const handleRotateChange = (rotated, parentDiv, imgElement) => {
        setIsRotated(rotated);
    };

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
                src={card.cardImg || card.cardImage}
                alt={card.cardName}
                direction="horizontal"
                className="small"
                onRotateChange={handleRotateChange}
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
