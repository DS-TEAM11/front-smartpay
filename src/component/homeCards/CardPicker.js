import React from 'react';
import BlackContainer from '../BlackContainer';
import CardImg from './CardImg';
import Button from '../Button';
import { useSelectedCard } from '../../provider/PayProvider';
import CardOwnedList from './CardOwnedList';
import './CardPicker.css';
const CardPicker = ({ title, onRemove, cards, onCardSelect }) => {
    const { selectedCard, setSelectedCard } = useSelectedCard(); // 선택된 카드 상태 추가
    const handleSelectCard = (card) => {
        // console.log(card);        
        setSelectedCard(card);
        onCardSelect(card);
        onRemove();
    };
    return (
        <>
            <div className="card-picker">
                <BlackContainer
                    onClick={() => {
                        onRemove();
                    }}
                />
                <div className="white-box" onClick={(e) => e.stopPropagation()}>
                    <h2>{title}</h2>
                    <CardOwnedList
                        cards={cards}
                        onSelect={handleSelectCard} // 카드 선택 처리
                    />
                    <Button onClick={onRemove} text="결제할 카드 선택하기" />
                </div>
            </div>
        </>
    );
};

export default CardPicker;
