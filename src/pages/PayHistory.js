import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PayHistory.css';
import Header from '../component/Header';
import { useMemberNo } from '../provider/MemberProvider';

function PayHistory() {
    const [paymentData, setPaymentData] = useState(null);
    const [cardListData, setCardListData] = useState([]);
    const memberNo = useMemberNo();
    const [cardNo, setCardNo] = useState('');
    const [payDate, setPayDate] = useState('');

    const paymentApi = (payDate, cardNo) => {
        console.log(memberNo);
        axios
            .get(
                'http://localhost:8091/api/payment/history' +
                    '?memberNo=' +
                    memberNo +
                    '&cardNo=' +
                    cardNo +
                    '&payDate=' +
                    payDate,
            )
            .then((res) => {
                console.log(res.data);
                setPaymentData(res.data); // 결제 데이터 저장
            })
            .catch((e) => {
                console.error('결제 데이터 요청 에러', e);
            });
    };

    const cardListApi = () => {
        axios
            .get(
                'http://localhost:8091/api/cards/byMember?memberNo=' + memberNo,
            )
            .then((res) => {
                console.log(res.data);
                setCardListData(res.data); // 보유카드 리스트
            })
            .catch((e) => {
                console.error('보유카드 요청 에러', e);
            });
    };

    const onChangePayDate = (e) => {
        setPayDate(e.target.value);
    };

    const onChangeCardNo = (e) => {
        setCardNo(e.target.value);
    };

    useEffect(() => {
        cardListApi(); // 컴포넌트 마운트 시 카드 목록을 불러옵니다.
    }, [memberNo]); // 빈 배열로 useEffect를 한 번만 실행

    useEffect(() => {
        paymentApi(payDate, cardNo); // payDate 또는 cardNo가 변경될 때 결제 데이터를 불러옵니다.
    }, [payDate, cardNo]); // payDate, cardNo가 변경될 때마다 실행

    return (
        <div className="payhistory">
            <div className="header">
                <Header />
            </div>
            <div className="title">
                <p>결제내역</p>
            </div>
            <div className="condition-box">
                <div className="condition-date">
                    <input
                        type="date"
                        name="payDate"
                        value={payDate}
                        onChange={onChangePayDate}
                    />
                </div>
                <div className="condition-cardList">
                    <select
                        name="cardNo"
                        value={cardNo}
                        onChange={onChangeCardNo}
                    >
                        <option value="">카드를 선택</option>
                        {cardListData.map((card) => (
                            <option key={card.cardNo} value={card.cardNo}>
                                {card.cardName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="data">
                {paymentData && paymentData.length > 0 ? (
                    <div table-container>
                        {paymentData.map((payment) => (
                            <div className="table-row" key={payment.orderNo}>
                                <div>
                                    <img
                                        className="card-image"
                                        src={payment.cardImage}
                                        alt="카드이미지"
                                    />
                                </div>
                                <div>{payment.franchiseName}</div>
                                <div>{payment.savePrice}</div>
                                <div>{payment.price} 원</div>
                                {/* <td>{payment.payDate}</td>
                                <td>{payment.product}</td>
                                <td>{payment.cardNo}</td>
                                <td>{payment.savePrice}</td>
                                <td>{payment.price}원</td> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>결제 내역이 없습니다.</div>
                )}

                {/* <pre>{JSON.stringify(paymentData, null, 2)}</pre> */}
            </div>
        </div>
    );
}

export default PayHistory;
