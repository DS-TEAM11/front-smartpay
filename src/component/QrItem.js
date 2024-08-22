import React, { // 훅 모음
    useState, // 상태 관리
    useEffect, // 생명주기 관리
    forwardRef, // 컴포넌트 참조 관리
    useImperativeHandle,
} from 'react';
import axios from 'axios';
import './QrItem.css';

const QrItem = forwardRef((props, ref) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isQrVisible, setIsQrVisible] = useState(false);
    const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);

    const createQr = (endpoint) => {
        axios
            .get(endpoint, { responseType: 'blob' })
            .then((response) => {
                setQrCodeUrl(URL.createObjectURL(response.data));
                //웹소켓 연결
                setIsQrVisible(true);
            })
            .catch((error) => {
                alert('QR 코드 생성에 문제가 발생했습니다.');
                console.error(error);
            });
    };

    useEffect(() => {
        let timer;
        if (isQrVisible && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft <= 0) {
            hideActionSheet(); // 시간이 다 되면 액션 시트 숨김
        }
        return () => clearInterval(timer);
    }, [isQrVisible, timeLeft]);

    useImperativeHandle(ref, () => ({
        showActionSheet,
    }));

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}분 ${remainingSeconds}초`;
    };

    const showActionSheet = () => {
        setIsActionSheetVisible(true);
        createQr('http://192.168.0.30:8091/qr/seller');
    };

    const hideActionSheet = () => {
        setIsActionSheetVisible(false);
        setQrCodeUrl('');
        setIsQrVisible(false);
        setTimeLeft(180);
        setIsFullScreen(false);
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const timerWidth = (timeLeft / 180) * 100;

    return (
        <div className="qrItem">
            <div className="card-container">
                <div
                    id="actionSheet"
                    className={`${isActionSheetVisible ? 'active' : ''} ${
                        isFullScreen ? 'fullscreen' : ''
                    }`}
                >
                    <div className="action-options">
                        {qrCodeUrl && (
                            <div className="qr-code-container">
                                <div className="timer-bar-container">
                                    <div
                                        className="timer-bar"
                                        style={{ width: `${timerWidth}%` }}
                                    ></div>
                                </div>
                                <p className="timer-text">
                                    남은 유효 시간 : {formatTime(timeLeft)}
                                </p>
                                <img
                                    src={qrCodeUrl}
                                    alt="QR Code"
                                    className="qr-code"
                                />
                                <p className="instruction-text">
                                    위 QR 코드를 가게 사장님께 보여주세요.
                                    <br />
                                    가게 정보를 인식해 AI가 최대 혜택을
                                    추천해드릴게요.
                                </p>
                            </div>
                        )}
                        <div
                            className="fullscreen-toggle"
                            onClick={toggleFullScreen}
                        >
                            <i className="bi bi-arrow-up-square"></i>
                        </div>
                        <div className="option close" onClick={hideActionSheet}>
                            ← 돌아가기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default QrItem;
