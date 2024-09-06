import React from 'react';
import './Goal.css';
import flag_img from '../img/red-flag.png'; // 깃발 이미지

const Goal = ({
    totalPrice,
    currentGoal,
    currentGoalIndex,
    cardGoal1,
    cardGoal2,
    cardGoal3,
}) => {
    // 각 구간 값 로그 출력
    console.log('totalPrice:', totalPrice);
    console.log('currentGoal:', currentGoal);
    console.log('currentGoalIndex:', currentGoalIndex);
    console.log('cardGoal1:', cardGoal1);
    console.log('cardGoal2:', cardGoal2);
    console.log('cardGoal3:', cardGoal3);

    // 프로그래스바 비율 계산 (구간이 존재하는지 확인하고 계산)
    const progressPercentage = Math.min((totalPrice / currentGoal) * 100, 100);
    console.log('progressPercentage:', progressPercentage);

    // 각 구간별 위치 계산 (구간이 존재하는 경우에만 비율을 계산)
    const goal1Percentage = cardGoal1
        ? Math.min((cardGoal1 / currentGoal) * 100, 100)
        : 0;
    const goal2Percentage = cardGoal2
        ? Math.min((cardGoal2 / currentGoal) * 100, 100)
        : 0;
    const goal3Percentage =
        cardGoal3 && cardGoal2
            ? Math.min((cardGoal3 / currentGoal) * 100, 100)
            : 0;

    // 각 구간 퍼센트 로그 출력
    console.log('goal1Percentage:', goal1Percentage);
    console.log('goal2Percentage:', goal2Percentage);
    console.log('goal3Percentage:', goal3Percentage);

    return (
        <div className="goal-flag-container">
            <div className="goal-container">
                {/* 구간별로 깃발 이미지 표시 */}
                {cardGoal1 && (
                    <div
                        className="goal-flag"
                        style={{ left: `${goal1Percentage}%` }}
                    >
                        <img src={flag_img} alt="first_flag" />
                    </div>
                )}
                {cardGoal2 && (
                    <div
                        className="goal-flag"
                        style={{ left: `${goal2Percentage}%` }}
                    >
                        <img src={flag_img} alt="second_flag" />
                    </div>
                )}
                {cardGoal3 && (
                    <div
                        className="goal-flag"
                        style={{ left: `${goal3Percentage}%` }}
                    >
                        <img src={flag_img} alt="third_flag" />
                    </div>
                )}
            </div>
            {/* 프로그래스바 */}
            <div className="goal-progress-bar">
                <div
                    className="goal-progress"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <div className="goal-title-container">
                {/* 구간별로 깃발 이미지 표시, 100%가 아닌 경우에만 표시 */}
                {cardGoal1 && goal1Percentage < 100 && (
                    <div
                        className="goal-title"
                        style={{ left: `${goal1Percentage}%` }}
                    >
                        <p>1구간</p>
                    </div>
                )}
                {cardGoal2 && goal2Percentage < 100 && (
                    <div
                        className="goal-title"
                        style={{ left: `${goal2Percentage}%` }}
                    >
                        <p>2구간</p>
                    </div>
                )}
                {cardGoal3 && goal3Percentage < 100 && (
                    <div
                        className="goal-title"
                        style={{ left: `${goal3Percentage}%` }}
                    >
                        <p>3구간</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Goal;

// import React from 'react';
// import './Goal.css';

// const Goal = ({ totalPrice, currentGoal }) => {
//     const progressPercentage = Math.min((totalPrice / currentGoal) * 100, 100); // 목표 구간에 따라 계산
//     // const { 1, 2, 3} = 값 받기;

//     return (
//         <div className="goal-plag-container">
//             <div className="goal-flag"></div>
//             <div className="goal-container">
//                 {1 && <div className="goal-first"> 깃발 이미지 </div>}
//                 <div className="goal-progress-bar">
//                     <div
//                         className="goal-progress"
//                         style={{ width: `${progressPercentage}%` }}
//                     ></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Goal;

/*
<div style="
    position: relative;
">
    <div style="
        position: absolute;
        bottom: 0;
        z-index: 1;
        left: 30%;
        width: 2px;
        background: red;
        height: 24px;
    ">
    </div>
    <div class="goal-container">
        <div class="goal-progress-bar">
            <div class="goal-progress" style="width: 52%;"></div>
        </div>
    </div>
</div>
*/
