import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomToggle3.css';

const CustomToggle3 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로 확인 (실적관리 버튼이 /mypage와 /cardGoal 경로에서 활성화)
    const isCardGoal =
        location.pathname === '/cardGoal' || location.pathname === '/mypage';
    const isMyStatics = location.pathname === '/mystatics';

    const handleCardGoalClick = () => {
        if (!isCardGoal) {
            navigate('/mypage');
        }
    };

    const handleMyStaticsClick = () => {
        if (!isMyStatics) {
            navigate('/mystatics');
        }
    };

    return (
        <div className="custom-toggle3-container">
            <div
                className={`custom-toggle3-item ${
                    isCardGoal ? 'custom-toggle3-active' : ''
                }`}
                onClick={handleCardGoalClick}
            >
                실적관리
            </div>
            <div
                className={`custom-toggle3-item ${
                    isMyStatics ? 'custom-toggle3-active' : ''
                }`}
                onClick={handleMyStaticsClick}
            >
                소비관리
            </div>
        </div>
    );
};

export default CustomToggle3;
