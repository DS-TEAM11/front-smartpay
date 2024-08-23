import React from 'react';
import CardListItem from './CardListItem';
import Button from './Button';
import './CardList.css';

const CardList = ({
    cards,
    selectedCard,
    setSelectedCard,
    setCardCode,
    closeModal,
}) => {
    const handleSelectCard = (card) => {
        setSelectedCard(card.cardName);
        setCardCode(card.cardCode);
        closeModal(); // 카드를 선택하면 모달을 닫음
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="card-title">카드를 선택하세요</h2>
                <ul className="ul-check">
                    {cards.map((card) => (
                        <CardListItem
                            key={card.cardCode}
                            card={card}
                            selectedCard={selectedCard}
                            onSelect={handleSelectCard}
                        />
                    ))}
                </ul>
                <Button onClick={closeModal} text={'카드 선택 완료'}></Button>
            </div>
        </div>
    );
};

export default CardList;
