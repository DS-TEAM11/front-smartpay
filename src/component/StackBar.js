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
    10000: { name: '일반 가맹점', color: '#ffd53d' },
    10001: { name: '공과금', color: '#46cc6b' },
    10002: { name: '주유', color: '#379df1' },
    10003: { name: '편의점', color: '#f4866a' },
    10004: { name: '카페', color: '#ef664b' },
    10005: { name: '마트', color: '#5f98d1' },
    10006: { name: '쇼핑', color: '#46cc6b' },
    10007: { name: '항공', color: '#7584f2' },
    10008: { name: '음식점', color: '#2cbfae' },
    10009: { name: '대중교통', color: '#00c8c8' },
  };

  useEffect(() => {
    const mystaticsApi = () => {
      axios
        .get(`http://localhost:8091/api/payment/statics?memberNo=${memberNo}`)
        .then((res) => {
          const responseData = res.data;

          const firstObjectKey = Object.keys(responseData)[0];
          const thisMonthTotalValue = responseData[firstObjectKey].thisMonthTotal;
          const lastMonthTotalValue = responseData[firstObjectKey].lastMonthTotal;

          setThisMonthTotal(thisMonthTotalValue);
          setLastMonthTotal(lastMonthTotalValue);
          setThisMonthTotal2(thisMonthTotalValue.toLocaleString());
          setLastMonthTotal2(lastMonthTotalValue.toLocaleString());

          const calculatedRatios = Object.entries(responseData).map(([key, item]) => {
            const ratio = Math.round((item.thisMonth / thisMonthTotalValue) * 100);
            return {
              franchiseCode: item.franchiseCode,
              thisMonth: item.thisMonth,
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

  const transformDataForStackedBar = () => {
    return {
      lastMonthTotal: thisMonthTotal > lastMonthTotal ? null : 100,
      ...ratios.reduce((acc, entry) => {
        const franchise = franchiseData[entry.franchiseCode];
        const franchiseRatio = Math.round((entry.thisMonth / lastMonthTotal) * 100); // lastMonthTotal 기준으로 비율 변환
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
      <div className="text-end my-3 px-1">
        지난달 이 맘때 보다 &emsp;
        <span className="fs-2 text-danger fw-medium">
          {thisMonthTotal > lastMonthTotal ? '더' : '덜'}
        </span>
        <span>&ensp; 쓰는 중</span>
      </div>

      {thisMonthTotal > lastMonthTotal ? (
        <div className="progress-stacked" style={{ height: '3rem' }}>
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
              </div>
            )
          ))}
        </div>
      )}
    </>
  );
};

export default StackBar;
