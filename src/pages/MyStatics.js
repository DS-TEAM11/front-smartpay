import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useMemberNo } from '../provider/PayProvider';
import Header from '../component/Header';
import { BarChart } from '@mui/x-charts/BarChart';

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

    const mystaticsApi = () => {
        axios
            .get(
                `http://localhost:8091/api/payment/statics?memberNo=${memberNo}`,
            )
            .then((res) => {
                console.log(res.data);
                // 데이터 상태 업데이트
                setData(res.data);

                // 차트 데이터 업데이트
                const seriesThisMonth = res.data.map((item) => item.thisMonth); // 이번 달 금액
                const seriesLastMonthTotal = res.data.map(
                    (item) => item.lastMonthTotal,
                );
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

    const series0 = {
        data: [2],
        label: '일반 가맹점',
    };
    const series1 = {
        data: [3],
        label: '공과금',
    };
    const series2 = {
        data: [0],
        label: '주유',
    };
    const series3 = {
        data: [2],
        label: '편의점',
    };
    const series4 = {
        data: [3],
        label: '카페',
    };
    const series5 = {
        data: [0],
        label: '마트',
    };
    const series6 = {
        data: [2],
        label: '쇼핑',
    };
    const series7 = {
        data: [3],
        label: '항공',
    };
    const series8 = {
        data: [0],
        label: '음식점',
    };
    const series9 = {
        data: [2],
        label: '대중교통',
    };

    return (
        <div>
            <div>
                <Header />
                <div className="statics">
                    <div>
                        {/* 데이터가 로드되었는지 확인 */}
                        {data.length > 0 && data[0] ? (
                            <div>
                                <div>
                                    {data[0]['thisMonthTotal'].toLocaleString()}
                                    원
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
                            series={[
                                { ...series0, stack: 'total' },
                                { ...series1, stack: 'total' },
                                { ...series2, stack: 'total' },
                                { ...series3, stack: 'total' },
                                { ...series4, stack: 'total' },
                                { ...series5, stack: 'total' },
                                { ...series6, stack: 'total' },
                                { ...series7, stack: 'total' },
                                { ...series8, stack: 'total' },
                                { ...series9, stack: 'total' },
                            ]}
                        />
                    </div>
                    <ul>
                        {data.map((item) => (
                            <li key={item.franchiseCode}>
                                {/* 가맹점 이름과 이번 달 소비 금액 표시 */}
                                {franchiseMap[item.franchiseCode]}:{' '}
                                {item.thisMonth.toLocaleString()}원
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MyStatics;
