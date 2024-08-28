import React, { useState, useEffect } from 'react';
import './BenefitTest.css'; // CSS 파일을 import
import { useMemberNo } from '../provider/PayProvider';
import axios from 'axios';

const BenefitTest = () => {
    const memberNo = useMemberNo();
    const [cards, setCards] = useState([]);
    const [cardPayInfos, setCardPayInfos] = useState({});
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
                            params: { memberNo: memberNo },
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
    }, [memberNo]); // memberNo가 변경될 때마다 effect 재실행

    if (!memberNo) {
        return <div>Loading...</div>; // memberNo가 없으면 로딩 표시
    }

    return (
        <div className="benefittest-container">
            <h1>테스트맨의 이번달 혜택내역</h1>
            <div className="card-list">
                {cards.map((card) => (
                    <div key={card.cardNo} className="card-item">
                        <img src={card.cardImage} alt={card.cardNick} />
                        <h2>{card.cardNick}</h2>
                        <p>이번달 사용금액: {card.totalCardPrice}원</p>
                        {cardPayInfos[card.cardNo] &&
                        cardPayInfos[card.cardNo].length > 0 ? (
                            <ul>
                                {cardPayInfos[card.cardNo].map(
                                    (payInfo, index) => (
                                        <li key={index}>
                                            {payInfo.product}:{' '}
                                            {payInfo.saveType === 0
                                                ? '적립금액'
                                                : '할인금액'}{' '}
                                            {payInfo.savePrice}원
                                        </li>
                                    ),
                                )}
                            </ul>
                        ) : (
                            <div className="no-benefit">
                                이번달 받은 혜택 없음
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="totals">
                <h3>이번달 적립금액: {totalSavePrice}원</h3>
                <h3>이번달 할인금액: {totalDiscountPrice}원</h3>
                <h3>이번달 혜택금액: {totalBenefitPrice}원</h3>
            </div>
        </div>
    );
};

export default BenefitTest;
