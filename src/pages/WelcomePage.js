import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 임포트
import MainImg from '../img/HOME.png';
import './WelcomePage.css'; // 스타일이 정의된 CSS 파일 임포트

function WelcomePage() {
    const navigate = useNavigate(); // navigate 함수 초기화

    const handleStartClick = () => {
        navigate('/home'); // 버튼 클릭 시 Home 화면으로 이동
    };

    return (
        <div className="welcome-page">
            <div className="main_img">
                <img src={MainImg} alt="Main" />
            </div>
            <div className="description">
                <p>AI 추천 결제를 통해 카드 혜택을 쉽게 받아보세요.</p>
            </div>
            <div className="button-container">
                <button className="start-button" onClick={handleStartClick}>
                    똑똑하게 결제 시작하기
                </button>
            </div>
        </div>
    );
}

export default WelcomePage;
