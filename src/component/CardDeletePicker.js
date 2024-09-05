import React, { useState } from 'react';
import axios from 'axios';
import BlackContainer from '../component/BlackContainer';
import CardOwnedList from '../component/homeCards/CardOwnedList';
import Button from '../component/Button';
import '../component/homeCards/CardPicker.css';
import './CardDeletePicker.css';

const CardDeletePicker = ({ title, onRemove, cards, onDeleteCard }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleSelectCard = (card) => {
        setSelectedCard(card); // 카드 선택 시 상태 업데이트
    };

    const handleConfirmDelete = async () => {
        if (selectedCard) {
            // 카드가 선택된 경우
            const confirmDelete = window.confirm(
                `정말로 ${selectedCard.cardName} 카드를 삭제하시겠습니까?`,
            );

            if (confirmDelete) {
                try {
                    const response = await axios.delete(
                        `http://localhost:8091/api/cards/${selectedCard.cardNo}`,
                    );
                    alert(response.data); // 성공 메시지 표시
                    onDeleteCard(selectedCard); // 삭제 후 카드 목록 업데이트
                    onRemove(); // 모달 닫기
                    window.location.href = '/home';
                } catch (error) {
                    console.error('카드 삭제 실패', error);
                    alert('카드를 삭제하지 못했습니다.');
                }
            }
        } else {
            alert('삭제할 카드를 선택해주세요.');
        }
    };

    return (
        <>
            <div className="card-picker">
                <BlackContainer onClick={onRemove} />
                <div className="white-box" onClick={(e) => e.stopPropagation()}>
                    <h2>{title}</h2>
                    <CardOwnedList cards={cards} onSelect={handleSelectCard} />
                    <div className="button-group">
                        <Button
                            className={'button1'}
                            onClick={handleConfirmDelete}
                            text="확인"
                        />
                        <Button onClick={onRemove} text="취소" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardDeletePicker;
