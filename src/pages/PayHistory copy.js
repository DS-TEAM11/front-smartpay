import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PayHistory.css';
import Header from '../component/Header';
import MyCalendar from '../component/MyCalendar';
import { useMemberNo } from '../provider/PayProvider';

function PayHistory() {
    const [paymentData, setPaymentData] = useState([]);
    const [cardListData, setCardListData] = useState([]);
    const memberNo = useMemberNo();
    const [cardNo, setCardNo] = useState('');
    const [payDate, setPayDate] = useState(''); // 초기값을 빈 문자열로 설정
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Date 객체를 'YYYYMMDD' 문자열로 변환하는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`; // YYYYMMDD 형식
    };

    // yyyymmdd 형식의 날짜 문자열을 Date 객체로 변환
    const parseDateString = (dateString) => {
        const year = parseInt(dateString.slice(0, 4), 10);
        const month = parseInt(dateString.slice(4, 6), 10) - 1; // 월은 0부터 시작
        const day = parseInt(dateString.slice(6, 8), 10);
        return new Date(year, month, day);
    };

    // yyyymmdd 형식의 날짜 문자열을 요일을 포함한 형식으로 변환
    const formatDayName = (dateString) => {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const date = parseDateString(dateString);

        if (isNaN(date.getTime())) {
            return '잘못된 날짜';
        }

        const dayName = daysOfWeek[date.getDay()]; // 요일
        const month = String(date.getMonth() + 1);
        const day = String(date.getDate());

        return `${month}월 ${day}일 (${dayName})`;
    };

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()}원`;
    };

    // 결제 데이터를 날짜별로 그룹화하는 함수
    const groupByDayName = (data) => {
        return data.reduce((acc, payment) => {
            const dayName = formatDayName(payment.payDate);
            if (!acc[dayName]) {
                acc[dayName] = [];
            }
            acc[dayName].push(payment);
            return acc;
        }, {});
    };

    // 컴포넌트 로드 시 결제 내역을 초기화하는 새로운 useEffect
    useEffect(() => {
        if (memberNo) {
            paymentApi(payDate, cardNo); // 초기 렌더링 시 결제 내역 호출
        }
    }, [memberNo]); // memberNo가 변경될 때마다 실행

    const paymentApi = (payDate, cardNo) => {
        console.log(memberNo);
        const formattedDate = payDate ? formatDate(new Date(payDate)) : ''; // 날짜가 있는 경우에만 포맷팅
        axios
            .get(
                'http://localhost:8091/api/payment/history' +
                    '?memberNo=' +
                    memberNo +
                    '&cardNo=' +
                    cardNo +
                    '&payDate=' +
                    formattedDate, // 포맷팅된 날짜 입력
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
                setCardListData(res.data); // 보유카드 리스트 저장
            })
            .catch((e) => {
                console.error('보유카드 요청 에러', e);
            });
    };

    const onChangePayDate = (date) => {
        setPayDate(date); // MyCalendar로부터 날짜를 받아서 상태 업데이트
    };

    const onChangeCardNo = (e) => {
        setCardNo(e.target.value);
    };

    useEffect(() => {
        cardListApi(); // 컴포넌트 마운트 시 카드 목록을 불러옵니다.
    }, [memberNo]); // 빈 배열로 useEffect를 한 번만 실행

    useEffect(() => {
        if (payDate || cardNo) {
            paymentApi(payDate, cardNo); // payDate 또는 cardNo가 변경될 때 결제 데이터를 불러옵니다.
        }
    }, [payDate, cardNo]); // payDate, cardNo가 변경될 때마다 실행

    const groupedData = groupByDayName(paymentData);

    return (
        <>
            <Header />
            <div className="payhistory">
                <div className="header"></div>
                <div className="title">
                    <p>결제내역</p>
                </div>
                <div className="condition-box">
                    <div className="condition-calendar">
                        <MyCalendar
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
                            <option value="">카드 선택</option>
                            {cardListData.map((card) => (
                                <option key={card.cardNo} value={card.cardNo}>
                                    {card.cardNick}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="data">
                    {Object.keys(groupedData).length > 0 ? (
                        <div className="table-container">
                            {Object.keys(groupedData).map((dayName) => (
                                <div className="dayTable" key={dayName}>
                                    <div className="dayName">{dayName}</div>
                                    {groupedData[dayName].map((payment) => (
                                        <div
                                            key={payment.orderNo}
                                            className="table-row cssportal-grid"
                                        >
                                            <div className="div1">
                                                <img
                                                    className="card-image"
                                                    src={payment.cardImage}
                                                    alt="카드이미지"
                                                />
                                            </div>
                                            <div className="div2">
                                                {payment.franchiseName}
                                            </div>
                                            <div className="div3">
                                                {payment.saveType === 0
                                                    ? `${formatCurrency(
                                                          payment.savePrice,
                                                      )} 적립`
                                                    : `${formatCurrency(
                                                          payment.savePrice,
                                                      )} 할인`}
                                            </div>
                                            <div className="div4">
                                                {formatCurrency(payment.price)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>결제 내역이 없습니다.</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default PayHistory;
