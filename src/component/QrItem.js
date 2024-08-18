import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QrItem.css'; // 외부 CSS 파일

function QrItem() {
    const [qrCodeUrl, setQrCodeUrl] = useState(''); // QR 코드 URL 상태
    const [isQrVisible, setIsQrVisible] = useState(false); // QR 코드 팝업 표시 상태
    const [timeLeft, setTimeLeft] = useState(180); // 타이머 (3분 = 180초)

    const createQr = (endpoint) => {
        axios.get(endpoint, { responseType: 'blob' })
            .then(response => {
                setQrCodeUrl(URL.createObjectURL(response.data));
                setIsQrVisible(true);
                setTimeLeft(60); // 타이머를 1분으로 리셋
            })
            .catch(error => {
                alert("QR 코드 생성시 문제가 발생했습니다.");
                console.error(error);
            });
    };

    useEffect(() => {
        let timer;
        if (isQrVisible && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft <= 0) {
            setIsQrVisible(false); // 타이머가 0이 되면 팝업을 닫음
        }
        return () => clearInterval(timer); // 컴포넌트가 언마운트되거나 타이머가 종료될 때 클리어
    }, [isQrVisible, timeLeft]);

    const handleButtonClick = () => {
        if (!isQrVisible) {
            createQr("http://192.168.45.137:8091/qr/seller");
        } else {
            setIsQrVisible(false);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}분 ${remainingSeconds}초`;
    };

    const timerWidth = (timeLeft / 60) * 100; // 타이머 남은 시간 비율 계산

    return (
        <div>
            <button className="btn" onClick={handleButtonClick}>
                <i class="bi bi-person-circle"></i>
                {isQrVisible ? ' QR 숨기기' : ' 결제 QR 생성'}
            </button>

            {isQrVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{`남은 유효 시간 : ${formatTime(timeLeft)}`}</h3>
                        <div className="timer-bar-container">
                            <div className="timer-bar" style={{ width: `${timerWidth}%` }}></div>
                        </div>
                        <img src={qrCodeUrl} alt="QR Code" />
                        <button onClick={() => setIsQrVisible(false)} className="close-button">취소하기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QrItem;
