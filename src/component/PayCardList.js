// PayCardList.js
import React from 'react';
import CardListItem2 from './CardListItem2';
import './CardList.css'; // 카드 리스트 스타일

const PayCardList = ({ cards, selectedCardCode, onSelectCard, onClose }) => {
    return (
        <div className="card-list-overlay">
            <div className="card-list-container">
                <button onClick={onClose} className="close-button">X</button>
                {cards.length === 0 && <p>No cards available</p>}
                {cards.length > 0 && (
                    <ul className="card-list">
                        {cards.map((card) => (
                            <CardListItem2
                                key={card.cardCode}
                                card={card}
                                selectedCard={cards.find(c => c.cardCode === selectedCardCode)}
                                onSelect={() => onSelectCard(card)}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PayCardList;
