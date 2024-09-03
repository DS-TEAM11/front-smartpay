import React, { useState, useEffect, useRef } from 'react';
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
    const [page, setPage] = useState(1); // 페이지 번호 상태 추가
    const [size] = useState(10); // 페이지 크기 설정
    const [hasMore, setHasMore] = useState(true); // 추가 데이터가 있는지 여부

    const observer = useRef(); // IntersectionObserver를 위한 ref

    const lastElementRef = useRef(); // 마지막 요소를 추적하기 위한 ref

    const handleRotateChange = (rotated, parentDiv, imgElement) => {
        setIsRotated(rotated);
        if (parentDiv) {
            parentDiv.style.height = imgElement.width + 'px';
            parentDiv.style.width = imgElement.height + 'px';
        }
    };

    // 현재 달의 시작일과 종료일 계산
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
    );

    const [dateRange, setDateRange] = useState([
        firstDayOfMonth,
        lastDayOfMonth,
    ]);

    useEffect(() => {
        if (memberNo) {
            paymentApi(dateRange, cardNo, page, size); // 초기 렌더링 시 결제 내역 호출
        }
    }, [memberNo, page]);

    const paymentApi = (dateRange, cardNo, page, size) => {
        const [startDate, endDate] = dateRange.map((date) => formatDate(date));

        axios
            .get(
                `http://localhost:8091/api/payment/history?memberNo=${memberNo}&cardNo=${cardNo}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`,
            )
            .then((res) => {
                console.log(res.data);
                setPaymentData((prevData) => [...prevData, ...res.data]); // 결제 데이터 저장
                setHasMore(res.data.length > 0); // 추가 데이터가 더 있는지 확인
            })
            .catch((e) => {
                console.error('결제 데이터 요청 에러', e);
            });
    };

    const cardListApi = () => {
        axios
            .get(
                `http://localhost:8091/api/cards/byMember?memberNo=${memberNo}`,
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
        setPage(1); // 날짜 범위 변경 시 페이지 번호 초기화
        setPaymentData([]); // 기존 데이터 초기화
    };

    const onChangeCardNo = (e) => {
        setCardNo(e.target.value);
        setPage(1); // 카드 번호 변경 시 페이지 번호 초기화
        setPaymentData([]); // 기존 데이터 초기화
    };

    useEffect(() => {
        cardListApi(); // 컴포넌트 마운트 시 카드 목록을 불러옵니다.
    }, [memberNo]);

    useEffect(() => {
        if (dateRange.length > 0 || cardNo) {
            paymentApi(dateRange, cardNo, page, size); // 날짜 범위 또는 카드 번호가 변경될 때 결제 데이터를 불러옵니다.
        }
    }, [dateRange, cardNo, page]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
            }
        });
        if (lastElementRef.current)
            observer.current.observe(lastElementRef.current);
    }, [lastElementRef.current, hasMore]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    };

    const formatDayName = (dateString) => {
        const date = new Date(
            dateString.slice(0, 4),
            dateString.slice(4, 6) - 1,
            dateString.slice(6, 8),
        );

        return date.toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });
    };

    const formatCurrency = (amount) => {
        const validAmount = amount ?? 0;
        return `${validAmount.toLocaleString()}원`;
    };

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
                <div className="title">
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
                                <div className="dayTable" key={dayName}>
                                    <div className="dayName">{dayName}</div>
                                    {groupedData[dayName].map(
                                        (payment, index) => (
                                            <div
                                                key={payment.orderNo}
                                                className="table-row cssportal-grid border-bottom"
                                                ref={
                                                    index ===
                                                    groupedData[dayName]
                                                        .length -
                                                        1
                                                        ? lastElementRef
                                                        : null
                                                }
                                            >
                                                <div className="item1">
                                                    <span className="franchiseName">
                                                        {payment.franchiseName}
                                                    </span>
                                                </div>
                                                <div className="item2">
                                                    <CardImg
                                                        className="small"
                                                        src={payment.cardImage}
                                                        alt="카드이미지"
                                                        direction="horizontal"
                                                        onRotateChange={
                                                            handleRotateChange
                                                        }
                                                    />
                                                    <div>
                                                        {payment.cardName}
                                                    </div>
                                                </div>
                                                <div className="item3">
                                                    {payment.getIsAi ===
                                                    true ? (
                                                        <>
                                                            {payment.saveType ===
                                                            0
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
                                                    {formatCurrency(
                                                        payment.price,
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
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
