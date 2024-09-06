import axios from 'axios';
import React, { useState, useEffect, PureComponent } from 'react';
import { useMemberNo } from '../provider/PayProvider';
import Header from '../component/Header';
import StackBar from '../component/StackBar';

function MyStatics() {
    
    const memberNo = useMemberNo();
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({
        seriesThisMonth: [],
        seriesLastMonthTotal: [],
    });

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


    
    return (
        <>
           
                <Header />
                <div className="statics p-3 py-">
                <StackBar />
                </div>
            
        </>
    );
}

export default MyStatics;
