import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './PayHistory.css';
import Header from '../component/Header';
import MyCalendar from '../component/MyCalendar';

function PayHistory() {
    // 상태 변수 선언
    const [paymentData, setPaymentData] = useState([]); // 결제 내역 데이터
    const [memberNo, setMemberNo] = useState(null); // 회원 번호
    const [cardList, setCardList] = useState([]); // 카드 목록
    const [params, setParams] = useState({
        // API 요청 파라미터
        payDate: null,
        memberNo: null,
        cardNo: null,
    });
    const payDateRef = useRef(null); // 날짜 선택 Ref
    const cardNoRef = useRef(null); // 카드 선택 Ref

    // 카드 목록을 가져오는 함수
    const fetchCardList = () => {
        if (params.memberNo) {
            axios
                .get(
                    `http://localhost:8091/api/cards/byMember?memberNo=${params.memberNo}`,
                )
                .then((res) => {
                    setCardList(res.data); // 카드 목록 저장
                })
                .catch((error) => {
                    console.error('카드 목록 요청 에러:', error);
                });
        }
    };

    // 결제 내역을 가져오는 함수
    const getApi = () => {
        axios
            .get('http://localhost:8091/api/payment/history', { params })
            .then((res) => {
                console.log(res.data.result);
                setPaymentData(res.data.result.content); // 결제 데이터 저장
            })
            .catch((error) => {
                console.error('결제 데이터 요청 에러:', error);
            });
    };

    // 회원 번호를 가져오는 useEffect
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            axios
                .get('http://localhost:8091/member/findMember', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Bearer 토큰 설정
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    setMemberNo(response.data); // 회원 번호 저장
                    setParams((prevParams) => ({
                        ...prevParams,
                        memberNo: response.data, // 파라미터에 회원 번호 추가
                    }));
                })
                .catch((error) => {
                    console.error('회원 번호 요청 에러:', error);
                });
        }
    }, []); // 컴포넌트 마운트 시 한 번 호출

    // 카드 목록을 가져오는 useEffect
    useEffect(() => {
        fetchCardList();
    }, [params.memberNo]); // memberNo가 변경될 때마다 호출

    // 결제 내역을 가져오는 useEffect
    useEffect(() => {
        if (params.memberNo) {
            getApi();
        }
    }, [params]); // params가 변경될 때마다 호출

    // 날짜 선택 핸들러
    const handleDateChange = (e) => {
        const newPayDate = e.target.value;
        setParams((prevParams) => ({
            ...prevParams,
            payDate: newPayDate, // 날짜 변경 시 파라미터 업데이트
        }));
    };

    // 카드 선택 핸들러
    const handleCardChange = (e) => {
        const cardNo = e.target.value;
        setParams((prevParams) => ({
            ...prevParams,
            cardNo: cardNo, // 카드 번호 변경 시 파라미터 업데이트
        }));
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
                            ref={payDateRef}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="card-select">
                        <select onChange={handleCardChange} ref={cardNoRef}>
                            <option value="">카드 선택</option>
                            {cardList.map((card) => (
                                <option key={card.id} value={card.id}>
                                    {card.cardName} {/* 카드 이름 표시 */}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="data">
                    {paymentData.length > 0 ? (
                        paymentData.map((data) => (
                            <div key={data.id}>
                                {/* 데이터 표시 부분: 데이터 구조에 따라 수정 필요 */}
                                {data.someProperty}{' '}
                                {/* 예: data.someProperty */}
                            </div>
                        ))
                    ) : (
                        <div>결제 내역이 없습니다.</div>
                    )}
                </div>

                <pre>{JSON.stringify(paymentData, null, 2)}</pre>
            </div>
        </>
    );
}

export default PayHistory;
