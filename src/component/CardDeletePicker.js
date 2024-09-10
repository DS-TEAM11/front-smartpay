import React, { useState } from 'react';
import axios from 'axios';
import BlackContainer from '../component/BlackContainer';
import { useNavigate } from 'react-router-dom';
import { useSelectedCard } from '../provider/PayProvider';
import CardOwnedList from '../component/homeCards/CardOwnedList';
import Button from '../component/Button';
import './CardDeletePicker.css';
import '../component/homeCards/CardPicker.css';

const CardDeletePicker = ({ title, onRemove, cards, state }) => {
    const { selectedCard, setSelectedCard } = useSelectedCard(); // 선택된 카드 상태 추가
    const navigate = useNavigate();

    const handleSelectCard = (card) => {
        // 카드 선택 시 상태 업데이트
        setSelectedCard(card);
        console.log('Selected card:', card);
    };

    const ConfigEnum = Object.freeze({
        PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
        COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
    });

    const handleConfirmDelete = async () => {
        if (selectedCard) {
            // 카드가 선택된 경우
            const confirmDelete = window.confirm(
                `정말로 ${selectedCard.cardName} 카드를 삭제하시겠습니까?`,
            );

            if (confirmDelete) {
                try {
                    const response = await axios.delete(
                        `${ConfigEnum.PAY_SERVER_URL}/api/cards/${selectedCard.cardNo}`,
                    );
                    alert(response.data); // 성공 메시지 표시
                    setSelectedCard(null);
                    onRemove();
                    state(true);
                } catch (error) {
                    console.log(cards, '에러확인');
                    console.error('카드 삭제 실패', error);
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
