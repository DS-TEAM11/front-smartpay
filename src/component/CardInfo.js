import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardInfo.css';
import Button from '../component/Button';

const CardInfo = ({ cards }) => {
    const navigate = useNavigate();
    const [isMainRotated, setIsMainRotated] = useState(false);

    useEffect(() => {
        if (!cards || cards.length === 0) return;

        // regDate를 기준으로 cards 배열을 정렬
        const sortedCards = [...cards].sort(
            (a, b) => new Date(a.regDate) - new Date(b.regDate),
        );
        const mainCard = sortedCards[0];

        const img = new Image();
        img.src = mainCard.cardImage;
        img.onload = () => {
            console.log('Image Loaded: ', img.width, img.height); // 추가된 디버깅 출력
            if (img.height > img.width) {
                setIsMainRotated(true);
            } else {
                setIsMainRotated(false);
            }
        };
    }, [cards]);

    const handleCardRegister = () => {
        navigate('/register');
    };

    if (!cards || cards.length === 0) {
        return (
            <div className="card-info-container">
                <div className="cardText">
                    <p className="card-info-text">
                        아직 등록된 카드가 없습니다.
                    </p>
                    <Button onClick={handleCardRegister} text="카드 등록하기" />
                </div>
            </div>
        );
    }

    // regDate를 기준으로 cards 배열을 정렬
    const sortedCards = [...cards].sort(
        (a, b) => new Date(a.regDate) - new Date(b.regDate),
    );
    const mainCard = sortedCards[0];

    return (
        <div className="card-info-container">
            <div className="header-right">
                <span className="add-card-link" onClick={handleCardRegister}>
                    카드 추가하기 &gt;&gt;
                </span>
            </div>
            <div
                className={`card-main-container ${
                    isMainRotated ? 'vertical-image2' : 'horizontal-image2'
                }`}
                style={{ backgroundImage: `url(${mainCard.cardImage})` }}
            >
                {/* 메인 카드 이미지 박스 */}
            </div>
            <div className="owned-cards-list">
                {sortedCards.map((card, index) => (
                    <div
                        key={index}
                        className={`owned-card-list ${
                            card.width > card.height
                                ? 'vertical-image2'
                                : 'horizontal-image2'
                        }`}
                        style={{
                            backgroundImage: `url(${card.cardImage})`,
                            zIndex: sortedCards.length - index - 1, // z-index를 반대로 설정
                        }}
                    >
                        {/* 각 카드 이미지 박스 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardInfo;
