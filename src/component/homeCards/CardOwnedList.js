import React from 'react';
import CardListBox from './CardListBox';

const CardOwnedList = ({ cards, onSelect }) => {
    return (
        <ul className="card-list ul-check">
            {cards.map((card) => (
                <CardListBox
                    key={card.cardCode}
                    card={card}
                    onSelect={onSelect}
                />
            ))}
        </ul>
    );
};

export default CardOwnedList;
