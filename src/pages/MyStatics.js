import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useMemberNo } from '../provider/PayProvider';
import Header from '../component/Header';
import { BarChart } from '@mui/x-charts/BarChart';
import './MyStatics.css'

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
            .get(`http://localhost:8091/api/payment/statics?memberNo=${memberNo}`)
            .then((res) => {
                console.log(res.data);

                // 객체를 배열로 변환
                const responseData = Object.values(res.data);
                setData(responseData);

                // 차트 데이터 업데이트
                const seriesThisMonth = responseData.map((item) => item.thisMonth); // 이번 달 금액
                const seriesLastMonthTotal = responseData.map((item) => item.lastMonthTotal);

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

    // "덜 쓰는 중" 또는 "더 쓰는 중"을 반환하는 함수
    const compareTotal = (thisMonthTotal, lastMonthTotal) => {
        if (thisMonthTotal < lastMonthTotal) {
            return '덜 쓰는 중';
        } else if (thisMonthTotal > lastMonthTotal) {
            return '더 쓰는 중';
        } else {
            return '같은 금액 사용 중';
        }
    };

    return (
        <div>
            <div>
                <Header />
                <div className="statics">
                    <div>
                        {/* 데이터가 로드되었는지 확인 */}
                        {data.length > 0 ? (
                            <div>
                                <div>
                                    {data[0]['thisMonthTotal'].toLocaleString()}원
                                </div>
                                <div>
                                    <div>지난달 이 맘때 보다</div>
                                    <div>
                                        {compareTotal(
                                            data[0]['thisMonthTotal'],
                                            data[0]['lastMonthTotal'],
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>데이터를 불러오는 중...</div>
                        )}
                    </div>
                    <div>
                        <BarChart
                            width={600}
                            height={300}
                            series={chartData.seriesThisMonth.map((item, index) => ({
                                data: [item],
                                label: franchiseMap[data[index].franchiseCode],
                            }))}
                        />
                    </div>
                    <div>
                        {data.map((item) => (
                            <div className='table-container' key={item.franchiseCode}>
                                <div className='row-img'>
                                    {/* 이미지 경로를 franchiseCode에 맞춰 동적으로 설정 */}
                                    <img 
                                        src={franchiseImageMap[item.franchiseCode]} 
                                        alt={franchiseMap[item.franchiseCode]} 
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                </div>
                                <div className='row-name'>
                                    {franchiseMap[item.franchiseCode]}
                                </div>
                                <div className='row-percent'>
                                    {/* 백분율 계산 (소수점 한 자리까지 표시) */}
                                    {((item.thisMonth / item.thisMonthTotal) * 100).toFixed(1)}%
                                </div>
                                <div className='row-price'>
                                    {item.thisMonth.toLocaleString()}원
                                </div>
                            </div>
                        ))}
                    </div>                                        
                </div>
            </div>
        </div>
    );
}

export default MyStatics;
