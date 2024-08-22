import React from 'react';
import { useState, useEffect } from 'react';
import './Timer.css';
const Timer = ({ onRemove }) => {
    const [timeLeft, setTimeLeft] = useState(180);
    const timerWidth = (timeLeft / 180) * 100;
    let timer;
    useEffect(() => {
        // console.log(timeLeft);
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft <= 0) {
            onRemove(); // 시간이 다 되면 액션 시트 숨김
        }
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}분 ${remainingSeconds}초`;
    };

    return (
        <div className="timer">
            <div className="timer-bar-bg">
                <div className="timer-bar" style={{ width: `${timerWidth}%` }}>
                    &nbsp;
                </div>
            </div>
            <p className="timer-text">
                남은 유효 시간 : {formatTime(timeLeft)}
            </p>
        </div>
    );
};

export default Timer;
