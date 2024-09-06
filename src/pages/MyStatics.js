import axios from 'axios';
import React, { useState, useEffect, PureComponent } from 'react';
import { useMemberNo } from '../provider/PayProvider';
import Header from '../component/Header';
import StackBar from '../component/StackBar';
import './MyStatics.css';

function MyStatics() {
    
    const memberNo = useMemberNo();
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({
        seriesThisMonth: [],
        seriesLastMonthTotal: [],
    });

    // 가맹점 코드와 이름을 매핑하는 객체
    const franchiseMap = {
        10000: '일반 가맹점',
        10001: '공과금',
        10002: '주유',
        10003: '편의점',
        10004: '카페',
        10005: '마트',
        10006: '쇼핑',
        10007: '항공',
        10008: '음식점',
        10009: '대중교통',
    };

    // 가맹점 코드와 이미지 경로를 매핑하는 객체
    const franchiseImageMap = {
        10000: 'assets/images/general_store.png',
        10001: 'assets/images/bill_payment.png',
        10002: 'assets/images/gas_station.png',
        10003: 'assets/images/convenience_store.png',
        10004: 'assets/images/cafe.png',
        10005: 'assets/images/mart.png',
        10006: 'assets/images/shopping.png',
        10007: 'assets/images/airline.png',
        10008: 'assets/images/restaurant.png',
        10009: 'assets/images/public_transport.png',
    };

    const mystaticsApi = () => {
        axios
            .get(
                `http://localhost:8091/api/payment/statics?memberNo=${memberNo}`,
            )
            .then((res) => {
                console.log(res.data);

                // 객체를 배열로 변환
                const responseData = Object.values(res.data);
                setData(responseData);

                // 차트 데이터 업데이트
                const seriesThisMonth = responseData.map(
                    (item) => item.thisMonth,
                ); // 이번 달 금액
                const seriesLastMonthTotal = responseData.map(
                    (item) => item.lastMonthTotal,
                );

                setChartData({
                    seriesThisMonth,
                    seriesLastMonthTotal,
                });
            })
            .catch((e) => {
                console.error('통계 데이터 요청 에러', e);
            });
    };

    useEffect(() => {
        mystaticsApi();
    }, [memberNo]);

    return (
        <>
           
                <Header />
                <div className="statics p-4">
                    <div className='my-3'>
                        {/* 데이터가 로드되었는지 확인 */}
                        {data.length > 0 ? (
                            <div>
                                <div>
                                    <StackBar />
                                </div>
                            </div>
                        ) : (
                            <div>데이터를 불러오는 중...</div>
                        )}
                    </div>
                    <div className='mt-6'>
                        {data.map((item) => (
                            <div
                                className="table-container d-flex align-items-center mb-3 p-2"
                                key={item.franchiseCode}
                            >
                                <div className="row-img me-3">
                                    {/* 이미지 경로를 franchiseCode에 맞춰 동적으로 설정 */}
                                    <img
                                        src={
                                            franchiseImageMap[
                                                item.franchiseCode
                                            ]
                                        }
                                        alt={franchiseMap[item.franchiseCode]}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                        }}
                                    />
                                </div>
                                <div className="row-content flex-grow-1 ">
                                    <div className="row-name fs-6 fw-bold">
                                        {franchiseMap[item.franchiseCode]}
                                    </div>
                                    <div className="row-percent fs-6 text-muted">
                                        {/* 백분율 계산 (소수점 한 자리까지 표시) */}
                                        {(
                                            (item.thisMonth /
                                                item.thisMonthTotal) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </div>
                                </div>
                                <div className="row-price fs-5 fw-bold">
                                    {item.thisMonth.toLocaleString()}원
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            
        </>
    );
}

export default MyStatics;
