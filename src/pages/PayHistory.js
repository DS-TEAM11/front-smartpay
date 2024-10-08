import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PayHistory.css';
import Header from '../component/Header';
import MyCalendar from '../component/MyCalendar';
import { useMemberNo } from '../provider/PayProvider';
import CardImg from '../component/homeCards/CardImg';

function PayHistory() {
    const [paymentData, setPaymentData] = useState([]);
    const [cardListData, setCardListData] = useState([]);
    const memberNo = useMemberNo();
    const [cardNo, setCardNo] = useState('');
    const [isRotated, setIsRotated] = useState(false);

    const handleRotateChange = (rotated, parentDiv, imgElement) => {
        setIsRotated(rotated);
        if (parentDiv) {
            parentDiv.style.height = imgElement.width + 'px';
            parentDiv.style.width = imgElement.height + 'px';
        }
    };

    const ConfigEnum = Object.freeze({
        PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
        COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
    });
    // 현재 달의 시작일과 종료일 계산
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
    );

    // 기본 시작일과 종료일을 상태로 설정
    const [dateRange, setDateRange] = useState([
        firstDayOfMonth,
        lastDayOfMonth,
    ]);

    useEffect(() => {
        if (memberNo) {
            paymentApi(dateRange, cardNo); // 초기 렌더링 시 결제 내역 호출
        }
    }, [memberNo]);

    const paymentApi = (dateRange, cardNo) => {
        // dateRange를 YYYYMMDD 형식으로 변환
        const [startDate, endDate] = dateRange.map((date) => formatDate(date));

        axios
            .get(
                `${ConfigEnum.PAY_SERVER_URL}/api/payment/history?memberNo=${memberNo}&cardNo=${cardNo}&startDate=${startDate}&endDate=${endDate}`,
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
                `${ConfigEnum.PAY_SERVER_URL}/api/cards/byMember?memberNo=${memberNo}`,
            )
            .then((res) => {
                console.log(res.data);
                setCardListData(res.data); // 보유카드 리스트 저장
            })
            .catch((e) => {
                console.error('보유카드 요청 에러', e);
            });
    };

    const onChangeDateRange = (dateRange) => {
        setDateRange(dateRange);
    };

    const onChangeCardNo = (e) => {
        setCardNo(e.target.value);
    };

    useEffect(() => {
        cardListApi(); // 컴포넌트 마운트 시 카드 목록을 불러옵니다.
    }, [memberNo]);

    useEffect(() => {
        if (dateRange.length > 0 || cardNo) {
            paymentApi(dateRange, cardNo); // 날짜 범위 또는 카드 번호가 변경될 때 결제 데이터를 불러옵니다.
        }
    }, [dateRange, cardNo]);

    // Date 객체를 'YYYYMMDD' 문자열로 변환하는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`; // YYYYMMDD 형식
    };

    // 'YYYYMMDD' 형식의 날짜를 "월 일 요일" 형식으로 변환
    const formatDayName = (dateString) => {
        const date = new Date(
            dateString.slice(0, 4), // 연도
            dateString.slice(4, 6) - 1, // 월 (0부터 시작)
            dateString.slice(6, 8), // 일
        );

        return date.toLocaleDateString('ko-KR', {
            month: 'long', // "8월"
            day: 'numeric', // "26일"
            weekday: 'long', // "월요일"
        });
    };

    // 숫자를 통화 형식으로 변환하는 함수 (예: 1000 -> '1,000원')
    const formatCurrency = (amount) => {
        // amount가 null 또는 undefined일 경우 0으로 처리
        const validAmount = amount ?? 0;
        return `${validAmount.toLocaleString()}원`;
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

    const groupedData = groupByDayName(paymentData);

    return (
        <>
            <Header />
            <div className="payhistory">
                <div className="header"></div>
                <div className="title my-2">
                    <p>결제내역</p>
                </div>
                <div className="condition-box">
                    <div className="condition-calendar">
                        <MyCalendar
                            value={dateRange}
                            onChange={onChangeDateRange}
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
                                    {card.cardNick || card.cardName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="data">
                    {Object.keys(groupedData).length > 0 ? (
                        <div className="table-container">
                            {Object.keys(groupedData).map((dayName) => (
                                <div
                                    className="dayTable mb-3 shadow"
                                    key={dayName}
                                >
                                    <div className="dayName px-2 py-1">
                                        {dayName}
                                    </div>
                                    {groupedData[dayName].map((payment) => (
                                        <div
                                            key={payment.orderNo}
                                            className="table-row cssportal-grid border-bottom p-2"
                                        >
                                            <div className="item1 fs-4 fw-medium">
                                                <span className="franchiseName">
                                                    {payment.franchiseName}
                                                </span>
                                            </div>
                                            <div className="item2 fs-6">
                                                <CardImg
                                                    className="sm"
                                                    src={payment.cardImage}
                                                    alt="카드이미지"
                                                    direction="horizontal"
                                                    onRotateChange={
                                                        handleRotateChange
                                                    }
                                                />
                                                <div>{payment.cardName}</div>
                                            </div>
                                            <div className="item3">
                                                {payment.getIsAi === true ? (
                                                    <>
                                                        {payment.saveType === 0
                                                            ? `${formatCurrency(
                                                                  payment.savePrice,
                                                              )} 적립`
                                                            : `${formatCurrency(
                                                                  payment.savePrice,
                                                              )} 할인`}
                                                    </>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                            <div className="item4">
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
