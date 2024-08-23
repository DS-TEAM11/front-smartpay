import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PayHistory.css';
import Header from '../component/Header';
import MyCalendar from '../component/MyCalendar';

function PayHistory() {
    const [paymentData, setPaymentData] = useState(null);
    const [memberNo, setMemberNo] = useState(null);
    const [payDate, setPayDate] = useState(null);
    const [cardNo, setCardNo] = useState(null);

    // 회원 번호를 가져오는 useEffect
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            axios
                .get('http://localhost:8091/member/findMember', {
                    headers: {
                        Authorization: token, // Bearer 포함
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    setMemberNo(response.data); // 응답받은 memberNo 저장
                })
                .catch((error) => {
                    console.error('memberNo 요청 에러', error);
                });
        }
    }, []);

    // payDate가 변경될 때마다 paymentData를 업데이트하는 useEffect
    useEffect(() => {
        if (memberNo && payDate && cardNo) {
            axios
                .get(
                    `http://localhost:8091/api/payment/history?payDate=${payDate}&memberNo=${memberNo}&cardNo=${cardNo}`,
                )
                .then((response) => {
                    console.log(response.data);
                    setPaymentData(response.data); // 응답받은 데이터 저장
                })
                .catch((error) => {
                    console.error('결제 데이터 요청 에러', error);
                });
        }
    }, [payDate, memberNo, cardNo]); // payDate, memberNo, cardNo가 변경될 때마다 실행

    const handleOnChange = (e) => {
        setPayDate(e.target.value);
    };

    return (
        <>
            <div className="header">
                <Header />
            </div>
            <div className="main-container">
                <h1>결제 내역</h1>

                <MyCalendar />

                <div className="condition-box">
                    <div className="calendar">
                        <input
                            name="payDate"
                            type="date"
                            value={payDate || ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div>카드선택</div>
                </div>
                <pre>{JSON.stringify(paymentData, null)}</pre>
                {paymentData && paymentData.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>카드이미지</th>
                                <th>날짜</th>
                                <th>상품</th>
                                <th>카드 번호</th>
                                <th>적립 포인트</th>
                                <th>가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.map((payment) => (
                                <tr key={payment.orderNo}>
                                    <td>
                                        <img
                                            src={payment.cardImage}
                                            alt="카드이미지"
                                        />
                                    </td>
                                    <td>{payment.payDate}</td>
                                    <td>{payment.product}</td>
                                    <td>{payment.cardNo}</td>
                                    <td>{payment.savePrice}</td>
                                    <td>{payment.price}원</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>결제 내역이 없습니다.</div>
                )}
            </div>
        </>
    );
}

export default PayHistory;
