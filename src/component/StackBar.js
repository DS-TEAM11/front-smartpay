import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useMemberNo } from '../provider/PayProvider';

const StackBar = () => {
  const memberNo = useMemberNo();
  const [ratios, setRatios] = useState([]);
  const [lastMonthTotal, setLastMonthTotal] = useState(0);
  const [thisMonthTotal, setThisMonthTotal] = useState(0);
  const [lastMonthTotal2, setLastMonthTotal2] = useState(0);
  const [thisMonthTotal2, setThisMonthTotal2] = useState(0);

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

  // 색상 배열
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF8000', '#8000FF', '#00FF80', '#FF0080'];

  useEffect(() => {
    const mystaticsApi = () => {
      axios
        .get(`http://localhost:8091/api/payment/statics?memberNo=${memberNo}`)
        .then((res) => {
          const data = res.data;

          const firstObjectKey = Object.keys(data[0])[0];
        
          // thisMonthTotal과 lastMonthTotal 추출
          const thisMonthTotalValue = data[0][firstObjectKey].thisMonthTotal;
          const lastMonthTotalValue = data[0][firstObjectKey].lastMonthTotal;
          setThisMonthTotal(thisMonthTotalValue);
          setLastMonthTotal(lastMonthTotalValue);
          setThisMonthTotal2(thisMonthTotalValue.toLocaleString());
          setLastMonthTotal2(lastMonthTotalValue.toLocaleString());
          
          // 각 가맹점에 대한 thisMonth / thisMonthTotal 비율 계산
          const calculatedRatios = data.map(item => {
            const key = Object.keys(item)[0];
            const thisMonth = item[key].thisMonth;
            const ratio = Math.round((thisMonth / thisMonthTotalValue) * 100);  // thisMonthTotal에 대한 비율

            return {
              franchiseCode: item[key].franchiseCode,
              thisMonth,  // thisMonth 값을 저장
              ratio       // thisMonthTotal에 대한 비율
            };
          });

          setRatios(calculatedRatios);
        })
        .catch((e) => {
          console.error('통계 데이터 요청 에러', e);
        });
    };

    mystaticsApi();
  }, [memberNo]);

  // thisMonthTotal / lastMonthTotal 비율을 구함
  const thisMonthTotalRatio = (thisMonthTotal / lastMonthTotal) * 100;

  // 각 프랜차이즈의 비율을 바 데이터에 맞게 변환
  const transformDataForStackedBar = () => {
    return [{
      name: 'Total',
      lastMonthTotal: thisMonthTotal > lastMonthTotal ? null : 100,  // thisMonthTotal이 더 크면 lastMonthTotal을 표시하지 않음
      ...ratios.reduce((acc, entry, index) => {
        // 각 프랜차이즈의 thisMonth 비율을 lastMonthTotal 기준으로 변환
        const franchiseRatio = (entry.thisMonth / thisMonthTotal) * thisMonthTotalRatio;
        return {
          ...acc,
          [franchiseMap[entry.franchiseCode]]: franchiseRatio
        };
      }, {})
    }];
  };

  const transformedData = transformDataForStackedBar();
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
    <div className='px-2 fs-2 fw-medium'>
        {thisMonthTotal2}원
    </div>
    <div>지난달 이 맘때 보다</div>
        <div>
            {compareTotal(
                thisMonthTotal,
                lastMonthTotal,
            )}
        </div>
    <ResponsiveContainer width="100%" height={120}>
      <BarChart
        layout="vertical"
        data={transformedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" hide/>
        <Tooltip />
        <Legend />
        {/* thisMonth 비율을 표시하는 스택된 바 */}
        {ratios.map((entry, index) => (
          <Bar
            key={`bar-${entry.franchiseCode}`}
            dataKey={franchiseMap[entry.franchiseCode]}
            stackId="a"
            fill={colors[index % colors.length]}
            name={franchiseMap[entry.franchiseCode]}
          />
        ))}
        {/* lastMonthTotal이 thisMonthTotal보다 클 때만 표시 */}
        {thisMonthTotal <= lastMonthTotal && (
          <Bar
            dataKey="lastMonthTotal"
            stackId="a"
            fill='gray'
            name='지난 소비 (100%)'
          />
        )}
      </BarChart>
    </ResponsiveContainer>
    </>
  );
};

export default StackBar;
