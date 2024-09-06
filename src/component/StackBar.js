import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMemberNo } from '../provider/PayProvider';

const StackBar = () => {
  const memberNo = useMemberNo();
  const [ratios, setRatios] = useState([]);
  const [lastMonthTotal, setLastMonthTotal] = useState(0);
  const [thisMonthTotal, setThisMonthTotal] = useState(0);
  const [lastMonthTotal2, setLastMonthTotal2] = useState(0);
  const [thisMonthTotal2, setThisMonthTotal2] = useState(0);

  const franchiseData = {
    10000: { name: '일반 가맹점', color: '#EF4250' },
    10001: { name: '공과금', color: '#00FF00' },
    10002: { name: '주유', color: '#0000FF' },
    10003: { name: '편의점', color: '#FFFF00' },
    10004: { name: '카페', color: '#89D7D7' },
    10005: { name: '마트', color: '#00FFFF' },
    10006: { name: '쇼핑', color: '#FF8000' },
    10007: { name: '항공', color: '#8000FF' },
    10008: { name: '음식점', color: '#00FF80' },
    10009: { name: '대중교통', color: '#FF0080' },
  };

  useEffect(() => {
    const mystaticsApi = () => {
      axios
        .get(`http://localhost:8091/api/payment/statics?memberNo=${memberNo}`)
        .then((res) => {
          const data = res.data;

          const firstObjectKey = Object.keys(data[0])[0];

          const thisMonthTotalValue = data[0][firstObjectKey].thisMonthTotal;
          const lastMonthTotalValue = data[0][firstObjectKey].lastMonthTotal;
          setThisMonthTotal(thisMonthTotalValue);
          setLastMonthTotal(lastMonthTotalValue);
          setThisMonthTotal2(thisMonthTotalValue.toLocaleString());
          setLastMonthTotal2(lastMonthTotalValue.toLocaleString());
          const calculatedRatios = data.map((item) => {
            const key = Object.keys(item)[0];
            const thisMonth = item[key].thisMonth;
            const ratio = Math.round((thisMonth / thisMonthTotalValue) * 100);

            return {
              franchiseCode: item[key].franchiseCode,
              thisMonth,
              ratio,
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

  // thisMonthTotal이 lastMonthTotal에 대한 비율
  const thisMonthTotalRatio = Math.round((thisMonthTotal / lastMonthTotal) * 100);

  // 각 프랜차이즈의 비율을 바 데이터에 맞게 변환
  const transformDataForStackedBar = () => {
    return {
      lastMonthTotal: thisMonthTotal > lastMonthTotal ? null : 100, // lastMonthTotal을 100%로 표시
      ...ratios.reduce((acc, entry) => {
        const franchise = franchiseData[entry.franchiseCode];
        const franchiseRatio = Math.round((entry.thisMonth / thisMonthTotal) * thisMonthTotalRatio); // thisMonthTotal에 대한 비율을 lastMonthTotal을 기준으로 변환
        return {
          ...acc,
          [franchise.name]: franchiseRatio,
        };
      }, {}),
    };
  };

  const transformedData = transformDataForStackedBar();

  return (
    <>
      <div className="fs-4 fw-medium">이번달 소비</div>
      <div className="fs-1 fw-bold">{thisMonthTotal2}원</div>
      <div className="text-end my-2 px-3">
        지난달 이 맘때 보다 &emsp;
        <span className="fs-2 text-danger fw-medium">
          {thisMonthTotal > lastMonthTotal ? '더' : '덜'}
        </span>
        <span>&ensp; 쓰는 중</span>
      </div>

      {thisMonthTotal > lastMonthTotal ? (
        // thisMonthTotal이 lastMonthTotal보다 클 때
        <div className="progress" style={{ height: '40px' }}>
        {ratios.map((entry, index) => {
          const franchise = franchiseData[entry.franchiseCode];
          return (
            <div
              key={entry.franchiseCode}
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${entry.ratio}%`,
                backgroundColor: franchise.color,
              }}
              aria-valuenow={entry.ratio}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {franchise.name} ({entry.ratio}%)
            </div>
          );
        })}
      </div>
      ) : (
        // thisMonthTotal이 lastMonthTotal보다 작을 때
        <div className="progress-stacked" style={{ height: '3rem' }}>
          {/* thisMonth 비율을 표시하는 스택된 바 */}
          {Object.entries(transformedData).map(([key, value], index) => (
            key !== 'lastMonthTotal' && (
              <div
                key={index}
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${value}%`,
                  backgroundColor: franchiseData[Object.keys(franchiseData).find(code => franchiseData[code].name === key)].color,
                }}
                aria-valuenow={value}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {key} ({value}%)
              </div>
            )
          ))}
        </div>
      )}
    </>
  );
};

export default StackBar;
