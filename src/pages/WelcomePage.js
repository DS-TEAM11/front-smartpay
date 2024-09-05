import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainImg from '../img/payment2.gif';
import './WelcomePage.css';

function WelcomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="welcome-page">
            <div className="main_img">
                <img src={MainImg} alt="Main" />
            </div>
            <div className="description">
                <p>
                    AI 추천 결제를 통해 <br />
                    카드 혜택을 쉽게 받아보세요.
                </p>
            </div>
        </div>
    );
}

export default WelcomePage;
