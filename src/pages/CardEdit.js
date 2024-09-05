import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Categoryselect from '../component/CardCategory';
import RankItem from '../component/RankItem';
import Header from '../component/Header';
import { useMemberNo } from '../provider/PayProvider';
import CardPicker from '../component/homeCards/CardPicker';
import Loading from '../component/Loading';
import CustomToggle from '../component/CustomToggle';
import MyCardList from '../component/cardManage/MyCardList';
import Button from '../component/Button';

const CardEdit = () => {
    const [fetchedCards, setFetchedCards] = useState([]); // API에서 가져온 카드 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [cardPicker, setCardPicker] = useState(false); // 카드 선택 모달 상태 추가
    const memberNo = useMemberNo();
    const [isLeftActive, setIsLeftActive] = useState(true);

    const handleSwitchPriorityMode = () => {
        setIsLeftActive(isLeftActive ? false : true);
    };

    // memberNo가 있을 때 카드 데이터를 가져오는 useEffect
    useEffect(() => {
        if (memberNo) {
            setLoading(true); // 데이터를 로드하기 시작할 때 로딩 상태를 true로 설정
            axios
                .get(
                    'http://localhost:8091/api/cards/details/byMember2', // 새로운 엔드포인트 사용
                    {
                        params: { memberNo },
                    },
                )
                .then((response) => {
                    // console.log('byMember2 test', response.data);
                    // 데이터를 분리
                    const cards = response.data[0]; // 첫 번째 배열
                    const cardInfos = response.data[1]; // 두 번째 배열

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
                                cardNo: card.cardNo,
                                cardNick: card.cardNick,
                                cardImage: cardInfo.cardImg, // card.cardImg가 아니라 card.cardImage로 수정
                                regDate: card.regDate,
                                benefitPriority: card.benefitPriority,
                                usagePriority: card.usagePriority,
                                memberNo: card.memberNo,
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

                    setFetchedCards(sortedCardArray); // 정렬된 카드 데이터를 상태에 저장
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
    }, [memberNo, isLeftActive]); // memberNo가 설정된 후에만 실행

    const handleCardNickUpdate = (updateCards) => {
        setFetchedCards(updateCards);
    };

    return (
        <>
            <Header />
            <div className="container pt-4 pt-sm-5">
                <div className="mb-3">
                    <h1 className="text-center">내 카드 관리</h1>
                    <p className="text-center">
                        먼저 사용하고 싶은 카드를 상단으로 올려주세요.
                    </p>
                </div>

                <div className="py-3">
                    <div className="mb-4">
                        <CustomToggle
                            isLeftActive={isLeftActive}
                            onClick={handleSwitchPriorityMode}
                        ></CustomToggle>
                    </div>

                    <MyCardList
                        isLeftActive={isLeftActive}
                        cardList={fetchedCards}
                        onCardNickUpdate={handleCardNickUpdate}
                    />
                </div>
            </div>
        </>
    );
};
export default CardEdit;
