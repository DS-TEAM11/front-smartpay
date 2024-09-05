import React, { useState } from 'react';
import CardImg from './homeCards/CardImg';
import Goal from './Goal';
import './BenefitCardItem.css';

const BenefitCardItem = ({ card, payInfos, cardData }) => {
    const [showPayInfos, setShowPayInfos] = useState(false);

    const togglePayInfos = () => {
        setShowPayInfos(!showPayInfos);
    };

    // 금액을 3자리마다 쉼표로 구분하는 함수
    const formatNumber = (number) => {
        return number ? number.toLocaleString() : '0';
    };

    // 구간 중 존재하는 가장 큰 구간을 목표로 선택
    const getCurrentGoal = () => {
        const { cardGoal1, cardGoal2, cardGoal3 } = cardData;

        // 각 목표값을 숫자로 변환해 안전하게 처리
        const goal1 = cardGoal1 ? parseInt(cardGoal1, 10) : 0;
        const goal2 = cardGoal2 ? parseInt(cardGoal2, 10) : 0;
        const goal3 = cardGoal3 ? parseInt(cardGoal3, 10) : 0;

        // 가장 큰 목표 구간을 설정 (순서대로 구간3, 구간2, 구간1 확인)
        if (goal3) {
            return { goal: goal3, label: '3구간 목표', index: 3 };
        } else if (goal2) {
            return { goal: goal2, label: '2구간 목표', index: 2 };
        } else if (goal1) {
            return { goal: goal1, label: '1구간 목표', index: 1 };
        } else {
            return { goal: 0, label: '목표 없음', index: 0 }; // 구간이 없는 경우
        }
    };

    const currentGoal = getCurrentGoal(); // 현재 구간 및 목표값을 가져옴

    // 혜택내역 출력 함수
    const renderPayInfo = () => {
        if (!showPayInfos) return null; // 펼쳐지지 않은 상태에서는 아무것도 표시하지 않음

        if (!payInfos || payInfos.length === 0) {
            return <div className="no-benefit">혜택이 없습니다.</div>;
        }

        return (
            <div className="payinfo-container open">
                <ul>
                    {payInfos.map((payInfo, index) => (
                        <li key={index}>
                            {payInfo.product} -{' '}
                            {payInfo.saveType === 0 ? '적립금액' : '할인금액'}{' '}
                            {formatNumber(payInfo.savePrice)}원
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="benefit-card-item rounded-5 p-3 shadow-sm">
                <div className="d-flex align-items-center">
                    <CardImg
                        src={card.cardImage}
                        alt={card.cardNick || card.cardName} // cardNick이 없으면 cardName 대체
                        direction="horizontal"
                        className="benefit-card-item__image"
                    />
                    <div className="ms-3">
                        <p className="fs-5 my-0 fw-medium">
                            {card.cardNick || card.cardName}
                        </p>
                        <p className="fs-7 my-0 fw-medium">
                            {cardData.cardCompany}
                        </p>
                    </div>
                </div>

                {/* 목표 실적 프로그래스바 */}
                {cardData && (
                    <Goal
                        totalPrice={card.totalCardPrice}
                        currentGoal={currentGoal.goal} // 구간별 목표에 맞춰 동적으로 계산
                        currentGoalIndex={currentGoal.index} // 구간 인덱스 제공
                        cardGoal1={cardData.cardGoal1}
                        cardGoal2={cardData.cardGoal2}
                        cardGoal3={cardData.cardGoal3}
                    />
                )}

                {/* 이번달 사용금액 및 실적목표 (구간별로 동적 출력) */}
                <p className="mt-3 usage-goal">
                    사용금액/{currentGoal.label}:{' '}
                    {formatNumber(card.totalCardPrice)}원 /{' '}
                    {formatNumber(currentGoal.goal)}원
                </p>

                {/* 혜택 내역 확인 토글 버튼 */}
                <button className="toggle-btn" onClick={togglePayInfos}>
                    혜택내역 확인하기 {showPayInfos ? '▲' : '▼'}
                </button>

                {/* 결제 내역 */}
                {renderPayInfo()}
            </div>
        </div>
    );
};

export default BenefitCardItem;

// import React, { useState } from 'react';
// import CardImg from './homeCards/CardImg';
// import Goal from './Goal';
// import './BenefitCardItem.css';

// const BenefitCardItem = ({ card, payInfos, cardData }) => {
//     const [showPayInfos, setShowPayInfos] = useState(false);

//     const togglePayInfos = () => {
//         setShowPayInfos(!showPayInfos);
//     };

//     // 금액을 3자리마다 쉼표로 구분하는 함수
//     const formatNumber = (number) => {
//         return number ? number.toLocaleString() : '0';
//     };

//     // 구간 중 존재하는 가장 큰 구간을 목표로 선택
//     const getCurrentGoal = () => {
//         const { cardGoal1, cardGoal2, cardGoal3 } = cardData;

//         // 가장 큰 목표 구간을 설정 (순서대로 구간3, 구간2, 구간1 확인)
//         if (cardGoal3) {
//             return { goal: cardGoal3, label: '3구간 목표' };
//         } else if (cardGoal2) {
//             return { goal: cardGoal2, label: '2구간 목표' };
//         } else if (cardGoal1) {
//             return { goal: cardGoal1, label: '1구간 목표' };
//         } else {
//             return { goal: 0, label: '목표 없음' }; // 구간이 없는 경우
//         }
//     };

//     const currentGoal = getCurrentGoal(); // 현재 구간 및 목표값을 가져옴

//     // 혜택내역 출력 함수
//     const renderPayInfo = () => {
//         if (!showPayInfos) return null; // 펼쳐지지 않은 상태에서는 아무것도 표시하지 않음

//         if (!payInfos || payInfos.length === 0) {
//             return <div className="no-benefit">혜택이 없습니다.</div>;
//         }

//         return (
//             <div className="payinfo-container open">
//                 <ul>
//                     {payInfos.map((payInfo, index) => (
//                         <li key={index}>
//                             {payInfo.product} -{' '}
//                             {payInfo.saveType === 0 ? '적립금액' : '할인금액'}{' '}
//                             {formatNumber(payInfo.savePrice)}원
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     };

//     return (
//         <div className="col-12 col-md-6 col-lg-4 mb-4">
//             <div className="benefit-card-item rounded-5 p-3 shadow-sm">
//                 <div className="d-flex align-items-center">
//                     <CardImg
//                         src={card.cardImage}
//                         alt={card.cardNick || card.cardName} // cardNick이 없으면 cardName 대체
//                         direction="horizontal"
//                         className="benefit-card-item__image"
//                     />
//                     <div className="ms-3">
//                         <p className="fs-5 my-0 fw-medium">
//                             {card.cardNick || card.cardName}
//                         </p>
//                         <p className="fs-7 my-0 fw-medium">
//                             {cardData.cardCompany}
//                         </p>
//                     </div>
//                 </div>

//                 {/* 목표 실적 프로그래스바 */}
//                 {cardData && (
//                     <Goal
//                         totalPrice={card.totalCardPrice}
//                         currentGoal={currentGoal.goal} // 구간별 목표에 맞춰 동적으로 계산
//                     />
//                 )}

//                 {/* 이번달 사용금액 및 실적목표 (구간별로 동적 출력) */}
//                 <p className="mt-3">
//                     사용금액/{currentGoal.label}:{' '}
//                     {formatNumber(card.totalCardPrice)}원 /{' '}
//                     {formatNumber(currentGoal.goal)}원
//                 </p>

//                 {/* 혜택 내역 확인 토글 버튼 */}
//                 <button className="toggle-btn" onClick={togglePayInfos}>
//                     혜택내역 확인하기 {showPayInfos ? '▲' : '▼'}
//                 </button>

//                 {/* 결제 내역 */}
//                 {renderPayInfo()}
//             </div>
//         </div>
//     );
// };

// export default BenefitCardItem;
