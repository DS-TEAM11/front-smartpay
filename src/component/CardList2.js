import React from 'react';
import CardListItem2 from './CardListItem2'; // CardListItem2 컴포넌트 import
import Button from './Button';
import './CardList.css';

const CardList2 = ({
    cards,
    selectedCard,
    setSelectedCard,
    setCardCode,
    closeModal,
}) => {
    const handleSelectCard = (card) => {
        setSelectedCard(card); // 전체 카드 객체를 설정하도록 수정
        setCardCode(card.cardCode);
        closeModal(); // 카드를 선택하면 모달을 닫음
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="card-title">카드를 선택하세요</h2>
                <ul className="ul-check">
                    {cards.map((card) => (
                        <CardListItem2
                            key={card.cardCode}
                            card={card}
                            selectedCard={selectedCard}
                            onSelect={handleSelectCard}
                        />
                    ))}
                </ul>
                <Button onClick={closeModal} text={'카드 선택 완료'} />
            </div>
        </div>
    );
};

export default CardList2;
