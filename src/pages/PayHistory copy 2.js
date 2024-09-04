import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './PayHistory.css';
import Header from '../component/Header';
import MyCalendar from '../component/MyCalendar';
import { useMemberNo } from '../provider/PayProvider';
import CardImg from '../component/homeCards/CardImg';
import InfiniteScroll from 'react-infinite-scroller';

function PayHistory() {
    const [paymentData, setPaymentData] = useState([]);
    const [cardListData, setCardListData] = useState([]);
    const [cardNo, setCardNo] = useState('');
    const [isRotated, setIsRotated] = useState(false);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const scrollParentRef = useRef();
    const memberNo = useMemberNo();

    const [dateRange, setDateRange] = useState([
        new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ]);

    // 카드 선택 핸들러
    const onChangeCardNo = (e) => {
        setCardNo(e.target.value);
        setPage(1);
        setPaymentData([]);
    };

    // 날짜 범위 변경 핸들러
    const onChangeDateRange = (dateRange) => {
        setDateRange(dateRange);
        setPage(1);
        setPaymentData([]);
    };

    // 결제 데이터 요청 함수
    const fetchPayments = (isNewSearch = false) => {
        if (isLoading) return;

        setIsLoading(true);
        const [startDate, endDate] = dateRange.map((date) => formatDate(date));
        const pageToLoad = isNewSearch ? 1 : page;

        axios
            .get('http://localhost:8091/api/payment/history', {
                params: {
                    memberNo,
                    cardNo,
                    startDate,
                    endDate,
                    page: pageToLoad,
                    size,
                },
            })
            .then((res) => {
                console.log('API Response:', res.data);
                const newData = res.data;
                setPaymentData((prevData) =>
                    isNewSearch ? newData : [...prevData, ...newData],
                );
                setHasMore(newData.length === size);
                setIsLoading(false);
                if (isNewSearch) setPage(2);
            })
            .catch((error) => {
                console.error('결제 데이터 요청 에러', error);
                setIsLoading(false);
            });
    };

    // 카드 목록 요청 함수
    const fetchCardList = () => {
        axios
            .get(
                `http://localhost:8091/api/cards/byMember?memberNo=${memberNo}`,
            )
            .then((res) => {
                setCardListData(res.data);
            })
            .catch((error) => {
                console.error('보유카드 요청 에러', error);
            });
    };

    // 날짜 포맷 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    };

    // 날짜 형식 변환 함수
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

    // 통화 형식 변환 함수
    const formatCurrency = (amount) => {
        return `${(amount ?? 0).toLocaleString()}원`;
    };

    // 데이터 그룹화 함수
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

    // 더 많은 데이터 로드 함수
    const loadMorePayments = () => {
        if (hasMore && !isLoading) {
            fetchPayments();
        }
    };

    useEffect(() => {
        if (memberNo) {
            fetchCardList();
        }
    }, [memberNo]);

    useEffect(() => {
        if (memberNo) {
            fetchPayments(true); // 페이지 초기화 및 새 데이터 로드
        }
    }, [dateRange, cardNo, memberNo]);

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
                        <div
                            style={{ height: '700px', overflow: 'auto' }}
                            ref={scrollParentRef}
                        >
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={loadMorePayments}
                                hasMore={hasMore && !isLoading}
                                loader={
                                    <div className="loader" key={0}>
                                        Loading ...
                                    </div>
                                }
                                useWindow={false}
                                getScrollParent={() => scrollParentRef.current}
                            >
                                <div className="table-container">
                                    {Object.keys(groupedData).map((dayName) => (
                                        <div className="dayTable" key={dayName}>
                                            <div className="dayName">
                                                {dayName}
                                            </div>
                                            {groupedData[dayName].map(
                                                (payment) => (
                                                    <div
                                                        key={payment.orderNo}
                                                        className="table-row cssportal-grid border-bottom py-2"
                                                    >
                                                        <div className="item1">
                                                            <span className="franchiseName">
                                                                {
                                                                    payment.franchiseName
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="item2">
                                                            <CardImg
                                                                className="small"
                                                                src={
                                                                    payment.cardImage
                                                                }
                                                                alt="카드이미지"
                                                                direction="vertical"
                                                                onRotateChange={
                                                                    handleRotateChange
                                                                }
                                                            />
                                                            <div>
                                                                {
                                                                    payment.cardName
                                                                }
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
                            </InfiniteScroll>
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
