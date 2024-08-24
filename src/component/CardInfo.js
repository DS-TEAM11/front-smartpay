import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardInfo.css';
import Button from '../component/Button';
import axios from 'axios';
import CardListItem2 from '../component/CardListItem2'; // CardListItem2 컴포넌트 import
import QrItem from '../component/useQR/QrItem'; // QrItem 컴포넌트 import

const CardInfo = () => {
    const navigate = useNavigate();
    const qrItemRef = useRef(null); // QrItem 컴포넌트 참조 생성
    const [isMainRotated, setIsMainRotated] = useState(false);
    const [rotatedCards, setRotatedCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
    const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 상태 추가
    const [memberNo, setMemberNo] = useState(null); // memberNo 상태 정의
    const [fetchedCards, setFetchedCards] = useState([]); // API에서 가져온 카드 목록 상태

    // memberNo를 가져오는 useEffect
    useEffect(() => {
        const fetchMemberNo = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const memberResponse = await axios.get(
                        'http://localhost:8091/member/findMember',
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Bearer 포함
                            },
                        },
                    );
                    setMemberNo(memberResponse.data); // 응답받은 memberNo를 설정
                }
            } catch (error) {
                console.error(
                    'memberNo를 가져오는 중 오류가 발생했습니다.',
                    error,
                );
            }
        };

        fetchMemberNo(); // memberNo를 가져오는 함수 호출
    }, []);

    // memberNo가 있을 때 카드 데이터를 가져오는 useEffect
    useEffect(() => {
        if (memberNo) {
            const fetchCards = async () => {
                try {
                    const token = localStorage.getItem('accessToken');
                    const cardsResponse = await axios.get(
                        'http://localhost:8091/api/cards/details/byMember', // 새로운 엔드포인트 사용
                        {
                            params: { memberNo },
                            headers: {
                                Authorization: `Bearer ${token}`, // Bearer 포함
                            },
                        },
                    );

                    const sortedCards = cardsResponse.data.sort(
                        (a, b) => new Date(a.regDate) - new Date(b.regDate),
                    );

                    setFetchedCards(sortedCards); // 정렬된 카드 데이터를 상태에 저장
                } catch (error) {
                    console.error(
                        '카드 데이터를 가져오는 데 실패했습니다.',
                        error.response ? error.response.data : error.message,
                    );
                }
            };

            fetchCards(); // 카드 데이터를 가져오는 함수 호출
        }
    }, [memberNo]); // memberNo가 설정된 후에만 실행

    useEffect(() => {
        // 카드 데이터가 변경될 때마다 회전 정보 업데이트
        const checkCardRotations = fetchedCards.map((card) => {
            const cardImg = new Image();
            cardImg.src = card.cardImage;
            return new Promise((resolve) => {
                cardImg.onload = () => {
                    resolve({
                        ...card,
                        isRotated: cardImg.height > cardImg.width,
                    });
                };
            });
        });

        Promise.all(checkCardRotations).then((updatedCards) => {
            setRotatedCards(updatedCards);
            if (updatedCards.length > 0) {
                setSelectedCard(updatedCards[0]); // 첫 번째 카드를 기본 선택된 카드로 설정
                setIsMainRotated(updatedCards[0].isRotated);
            }
        });
    }, [fetchedCards]);

    const handleCardRegister = () => {
        navigate('/register');
    };

    const handleCardClick = (card) => {
        setSelectedCard(card); // 선택된 카드 설정
        setIsModalOpen(true); // 모달 열기
    };

    const handleSelectCard = (card) => {
        setSelectedCard(card); // 선택된 카드 전체 객체로 설정
        setIsMainRotated(card.isRotated); // 선택된 카드의 회전 정보로 메인 카드 설정
        setIsModalOpen(false); // 모달 닫기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
        setSelectedCard(null); // 선택된 카드 초기화
    };

    if (!fetchedCards || fetchedCards.length === 0) {
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

    if (rotatedCards.length === 0) {
        return <div>Loading...</div>;
    }

    const mainCard = selectedCard || rotatedCards[0]; // 선택된 카드 또는 첫 번째 카드 사용

    return (
        <div className="card-info-container">
            <div className="header-right">
                <span className="add-card-link" onClick={handleCardRegister}>
                    카드 추가하기 &gt;&gt;
                </span>
            </div>
            <div className="card-main-container">
                <div
                    className={`card-img ${
                        isMainRotated ? 'vertical-image2' : 'horizontal-image2'
                    }`}
                    style={{ backgroundImage: `url(${mainCard.cardImage})` }}
                />
            </div>
            <div className="owned-cards-list">
                {rotatedCards.map((card, index) => (
                    <div
                        key={index}
                        className={`owned-card-list ${
                            card.isRotated
                                ? 'vertical-image3'
                                : 'horizontal-image3'
                        }`}
                        style={{
                            backgroundImage: `url(${card.cardImage})`,
                            zIndex: rotatedCards.length - index - 1,
                        }}
                        onClick={() => handleCardClick(card)} // 카드 클릭 시 모달 열기
                    ></div>
                ))}
            </div>
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul className="ul-check">
                            {rotatedCards.map((card) => (
                                <CardListItem2
                                    key={card.cardCode}
                                    card={card}
                                    selectedCard={selectedCard}
                                    onSelect={handleSelectCard} // 카드 선택 처리
                                />
                            ))}
                        </ul>
                        <Button
                            onClick={closeModal}
                            text="결제할 카드 선택하기"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardInfo;
