import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './PayHistory.css';
import Header from '../component/Header';
import { useMemberNo } from '../provider/MemberProvider';

function PayHistory() {
    const [paymentData, setPaymentData] = useState(null);
    const [cardListData, setCardListData] = useState(null);
    const memberNo = useMemberNo();
    const [cardNo, setCardNo] = useState(null);
    const [payDate, setPayDate] = useState('');

    const paymentApi = () => {
        axios
            .get('https://localhost:3000/api/payment/history', {
                memberNo: memberNo,
                payDate: payDate,
                cardNo: cardNo,
            })
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
            .get('https://localhost:3000/api/cards/byMember', {
                mameberNo: memberNo,
            })
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
        paymentApi();
    });

    return (
        <div className="main-container">
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
                    <select name="cardNo">
                        <option></option>
                    </select>
                </div>
            </div>
            <div className="data"></div>
            <div>
                <pre>{JSON.stringify(paymentData, null)}</pre>
            </div>
        </div>
    );
}

export default PayHistory;
