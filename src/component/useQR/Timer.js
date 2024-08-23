import React from 'react';
import { useState, useMemo } from 'react';
const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(180);
    const timerWidth = (timeLeft / 180) * 100;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}분 ${remainingSeconds}초`;
    };

    return (
        <div className="timer">
            <div
                className="timer-bar"
                style={{ width: `${timerWidth}%` }}
            ></div>{' '}
            <p className="timer-text">
                남은 유효 시간 : {formatTime(timeLeft)}
            </p>
        </div>
    );
};

export default Timer;
