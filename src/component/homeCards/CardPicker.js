import React from 'react';
import BlackContainer from '../BlackContainer';
import CardImg from './CardImg';
import Button from '../Button';
import { useSelectedCard } from '../../provider/PayProvider';
import CardListItem2 from '../CardListItem2';

const CardPicker = ({ onRemove, cards }) => {
    const { selectedCard, setSelectedCard } = useSelectedCard(); // 선택된 카드 상태 추가
    const handleSelectCard = (card) => {
        setSelectedCard(card);
        onRemove();
    };
    return (
        <>
            <div className="qrItem">
                <BlackContainer
                    onClick={() => {
                        onRemove();
                    }}
                />
                <div className="white-box">
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul className="ul-check">
                            {cards.map((card) => (
                                <CardListItem2
                                    key={card.cardCode}
                                    card={card}
                                    selectedCard={selectedCard}
                                    onSelect={handleSelectCard} // 카드 선택 처리
                                />
                            ))}
                        </ul>
                        <Button
                            onClick={onRemove}
                            text="결제할 카드 선택하기"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardPicker;
