import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import MyCalendar from '../component/MyCalendar';

function PayHistory() {
    const [paymentData, setPaymentData] = useState(null);
    const [memberNo, setMemberNo] = useState(null);
    const [payDate, setPayDate] = useState(null);
    const [cardNo, setCardNo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    // setError(error);
                });
        }
    }, []);

    // memberNo를 가지고 추가 데이터 요청하는 useEffect
    useEffect(() => {
        if (memberNo) {
            setLoading(true); // 데이터 로딩 시작

            axios
                .get(
                    `http://192.168.0.30:8091/api/payment/history?payDate=${payDate}&memberNo=${memberNo}&cardNo=${cardNo}`,
                )
                .then((response) => {
                    console.log(response.data);
                    setPaymentData(response.data); // 응답받은 데이터 저장
                })
                .catch((error) => {
                    console.error('결제 데이터 요청 에러', error);
                    setError(error);
                })
                .finally(() => {
                    setLoading(false); // 데이터 로딩 완료
                });
        }
    }, [memberNo]); // memberNo가 변경될 때마다 실행

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>에러 발생: {error.message}</div>;
    }

    return (
        <>
            <div className="header">
                <Header />
            </div>
            <div className="main-container">
                <h1>결제 내역</h1>
                <MyCalendar />

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
                                            src="{payment.cardImage}"
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
