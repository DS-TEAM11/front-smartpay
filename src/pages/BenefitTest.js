import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import BenefitCardItem from '../component/BenefitCardItem';
import CustomToggle2 from '../component/CustomToggle2';
import { useMemberNo } from '../provider/PayProvider';
import './BenefitTest.css';

const BenefitTest = () => {
    const memberNo = useMemberNo();
    const [cards, setCards] = useState([]);
    const [cardPayInfos, setCardPayInfos] = useState({});
    const [cardData, setCardData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState('current');
    const [totalSavePrice, setTotalSavePrice] = useState(0);
    const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
    const [totalBenefitPrice, setTotalBenefitPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (memberNo) {
                try {
                    // API 호출하여 카드 및 결제 정보 가져오기
                    const response = await axios.get(
                        'http://localhost:8091/member/getBenefit',
                        {
                            params: {
                                memberNo: memberNo,
                                month: selectedMonth,
                            },
                        },
                    );

                    // 카드 데이터 설정
                    setCards(response.data.cards);

                    // 각 카드별 결제 내역 설정
                    const payInfos = {};
                    response.data.cards.forEach((card) => {
                        payInfos[card.cardNo] = response.data[card.cardNo];
                    });
                    setCardPayInfos(payInfos);

                    const cardDataInfos = {};
                    response.data.cards.forEach((card) => {
                        cardDataInfos[card.cardNo] =
                            response.data['cardData_' + card.cardNo];
                    });
                    setCardData(cardDataInfos);

                    // 총 적립금액, 총 할인금액, 총 혜택금액 설정
                    setTotalSavePrice(response.data.totalSavePrice);
                    setTotalDiscountPrice(response.data.totalDiscountPrice);
                    setTotalBenefitPrice(response.data.totalBenefitPrice);
                } catch (error) {
                    console.error('Failed to fetch benefit data', error);
                }
            }
        };

        fetchData();
    }, [selectedMonth, memberNo]);

    const handleToggle = () => {
        setSelectedMonth((prevMonth) =>
            prevMonth === 'current' ? 'prev' : 'current',
        );
    };

    return (
        <>
            <Header />
            <div className="container pt-4 pt-sm-5">
                <div className="mb-3 text-center">
                    <h1>테스트맨의 실적 관리</h1>
                </div>

                {/* 토글 버튼 */}
                <div className="d-flex justify-content-center mb-4">
                    <CustomToggle2
                        isLeftActive={selectedMonth === 'current'}
                        onClick={handleToggle}
                    />
                </div>

                {/* 카드 리스트 */}
                <div className="row">
                    {cards.length > 0 ? (
                        cards.map((card) => (
                            <BenefitCardItem
                                key={card.cardNo}
                                card={card}
                                payInfos={cardPayInfos[card.cardNo]} // 카드별 결제 내역 전달
                                cardData={cardData[card.cardNo]} // 카드별 목표 정보 전달
                            />
                        ))
                    ) : (
                        <div className="text-center fs-3">
                            카드 정보가 없습니다.
                        </div>
                    )}
                </div>

                {/* 총액 정보 */}
                {/* <div className="totals text-center mt-4">
                    <h3>
                        {selectedMonth === 'current' ? '이번달' : '저번달'}{' '}
                        적립금액: {totalSavePrice}원
                    </h3>
                    <h3>
                        {selectedMonth === 'current' ? '이번달' : '저번달'}{' '}
                        할인금액: {totalDiscountPrice}원
                    </h3>
                    <h3>
                        {selectedMonth === 'current' ? '이번달' : '저번달'}{' '}
                        혜택금액: {totalBenefitPrice}원
                    </h3>
                </div> */}
            </div>
        </>
    );
};

export default BenefitTest;
