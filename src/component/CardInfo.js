import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardInfo.css';

const CardInfo = ({ cards }) => {
    const navigate = useNavigate();

    // 초기 상태 설정
    const [isMainRotated, setIsMainRotated] = useState(false);

    useEffect(() => {
        if (!cards || cards.length === 0) return;

        const mainCard = cards[0];

        // 메인 카드 회전 여부 결정
        const img = new Image();
        img.src = mainCard.cardImage;
        img.onload = () => {
            if (img.height > img.width) {
                setIsMainRotated(true);
            }
        };
    }, [cards]);

    const handleCardRegister = () => {
        navigate('/register');
    };

    if (!cards || cards.length === 0) {
        return (
            <div className="card-info-container">
                <p className="card-info-text">아직 등록된 카드가 없습니다.</p>
                <button
                    onClick={handleCardRegister}
                    className="card-register-button"
                >
                    카드 등록하기
                </button>
            </div>
        );
    }

    const mainCard = cards[0]; // 첫 번째 카드를 메인 카드로 설정

    return (
        <div className="card-info-container">
            <div className="card-main-container">
                <img
                    src={mainCard.cardImage || ''}
                    alt={mainCard.cardName}
                    className={`card-image ${
                        isMainRotated ? 'vertical-image2' : 'horizontal-image2'
                    } card-main`}
                />
            </div>
            <div className="owned-card-list">
                <img
                    src={mainCard.cardImage || ''}
                    alt={mainCard.cardName}
                    className={`owned-card-image ${
                        isMainRotated ? 'vertical-image2' : 'horizontal-image2'
                    }`}
                />
            </div>
        </div>
    );
};

export default CardInfo;
