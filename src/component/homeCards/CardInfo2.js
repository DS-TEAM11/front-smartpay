import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardInfo2.css';
import Button from '../Button';
import axios from 'axios';
import MainCard from './MainCard';
import CardPicker from './CardPicker';
import SpreadCards from './SpreadCards';
import Loading from '../Loading';
import QrItem from '../useQR/QrItem'; // QrItem 컴포넌트 import
import BenefitItem from './BenefitItem';
import SlidingYComponent from './SlidingYComponent';
import CustomToggle from '../CustomToggle';
import {
    useShowQr,
    useSelectedCard,
    useMemberNo,
} from '../../provider/PayProvider';

const CardInfo = ({ subscription, subMessage, isLeftActive, onToggleSwitch }) => {
    const navigate = useNavigate();
    const memberNo = useMemberNo();
    const [fetchedCards, setFetchedCards] = useState([]); // API에서 가져온 카드 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [cardPicker, setCardPicker] = useState(false); // 카드 선택 모달 상태 추가
    const { selectedCard, setSelectedCard } = useSelectedCard(); // 선택된 카드 상태를 추가하여 관리합니다.
    const { showQr, setShowQr } = useShowQr(); // 상태를 추가하여 QR 코드를 표시할지 여부를 관리합니다.
    const [isLeftActiveLocal, setIsLeftActiveLocal] = useState(isLeftActive);

    const handleSwitchPriorityMode = () => {
        const newIsLeftActive = !isLeftActiveLocal;
        setIsLeftActiveLocal(newIsLeftActive);
        onToggleSwitch(newIsLeftActive); // 부모 컴포넌트로 상태 변경 알림
    };

    const handleDrag = () => {
        setShowQr(true);
    };

    const removeQrItem = () => {
        setShowQr(false);
    };

    const removerCardPicker = () => {
        setCardPicker(false);
    };

    const handleCardRegister = () => {
        navigate('/register');
    };

    const ConfigEnum = Object.freeze({
        PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
        COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
    });

    // memberNo가 있을 때 카드 데이터를 가져오는 useEffect
    useEffect(() => {
        if (memberNo) {
            setLoading(true); // 데이터를 로드하기 시작할 때 로딩 상태를 true로 설정
            axios
                .get(
                    `${ConfigEnum.PAY_SERVER_URL}/api/cards/details/byMember2`, // 새로운 엔드포인트 사용
                    {
                        params: { memberNo },
                    },
                )
                .then((response) => {
                    // console.log('byMember2 test', response.data);
                    // 데이터를 분리
                    const cards = response.data[0]; // 첫 번째 배열
                    const cardInfos = response.data[1]; // 두 번째 배열
                    // console.log('cards', cards);
                    // cardCode를 기준으로 원하는 구조로 매핑
                    const sortedCards = cards.reduce((acc, card) => {
                        // cardInfos에서 card.cardCode에 맞는 정보를 찾음
                        const cardInfo = cardInfos.find(
                            (info) => info.cardCode === card.cardCode,
                        );

                        if (cardInfo) {
                            // cardCode를 키로, 필요한 정보를 객체로 저장
                            acc[card.cardCode] = {
                                ...cardInfo,
                                usagePriority: card.usagePriority,
                                benefitPriority: card.benefitPriority,
                                cardNick: card.cardNick,
                                cardImage: cardInfo.cardImg, // card.cardImg가 아니라 card.cardImage로 수정
                                regDate: card.regDate,
                            };
                        }
                        return acc;
                    }, {});

                    // console.log('sortedCards', sortedCards);

                    // priority에 따라 정렬
                    const sortedCardArray = Object.values(sortedCards);
                    if (isLeftActive) {
                        sortedCardArray.sort(
                            (a, b) => a.benefitPriority - b.benefitPriority,
                        );
                    } else {
                        sortedCardArray.sort(
                            (a, b) => a.usagePriority - b.usagePriority,
                        );
                    }
                    // console.log(sortedCardArray);
                    // 가장 최근에 등록된 카드 선택
                    const mostRecentCard = sortedCardArray[0];

                    setFetchedCards(sortedCardArray); // 정렬된 카드 데이터를 상태에 저장
                    setSelectedCard(mostRecentCard); // 가장 최근에 등록된 카드를 선택된 카드로 설정
                    // console.log('selected', mostRecentCard);
                    setLoading(false); // 데이터 로드 완료 시 로딩 상태를 false로 설정
                })
                .catch((error) => {
                    console.error(
                        '카드 데이터를 가져오는 데 실패했습니다.',
                        error,
                    );
                    setLoading(false); // 오류 발생 시에도 로딩 상태를 false로 설정
                });
        }
    }, [memberNo, isLeftActive]); // memberNo, isLeftActive가 설정된 후에만 실행

    if (loading) {
        return (
            <div className="card-info-container">
                <Loading></Loading>
            </div>
        ); // 로딩 중일 때 표시할 UI
    }

    if (!fetchedCards || fetchedCards.length === 0 || !selectedCard) {
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
    // console.log(subMessage, 'cardInfo submessage');
    return (
        <>
            {showQr && (
                <QrItem
                    onRemove={removeQrItem}
                    cardCode={selectedCard.cardCode}
                    subscription={subscription}
                    subMessage={subMessage}
                />
            )}
            {cardPicker && (
                <CardPicker
                    title="카드를 선택하세요."
                    onRemove={removerCardPicker}
                    cards={fetchedCards}
                    onCardSelect={(card) => {
                        setSelectedCard(card);
                        setCardPicker(false);
                    }}
                />
            )}

            <div className="card-info-container border-bottom">
                <CustomToggle
                    onClick={handleSwitchPriorityMode}
                    isLeftActive={isLeftActive}
                />
                <div className="card-main-container border-bottom">
                    <SlidingYComponent setShowQr={handleDrag}>
                        <MainCard card={selectedCard}></MainCard>
                    </SlidingYComponent>
                    <div className="up-content">
                        이 카드로 결제하려면 위로 드래그 해주세요.
                    </div>
                </div>
                <div className="owned-cards-list">
                    <SpreadCards
                        cards={fetchedCards}
                        onClick={setCardPicker}
                        isLeftActive={isLeftActive}
                    ></SpreadCards>
                </div>
            </div>
        </>
    );
};

export default CardInfo;
