import React, { // 훅 모음
    useState, // 상태 관리
    useEffect, // 생명주기 관리
    forwardRef, // 컴포넌트 참조 관리
    useImperativeHandle,
} from 'react';
import axios from 'axios';
import './QrItem.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const QrItem = forwardRef((props, ref) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isQrVisible, setIsQrVisible] = useState(false);
    const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);

    const createQr = () => {
        axios
            .get('http://192.168.0.30:8091/qr/seller', {
                responseType: 'blob',
            })
            .then((response) => {
                setQrCodeUrl(URL.createObjectURL(response.data));
                //웹소켓 연결
                const socket = new SockJS('http://localhost:8091/ws');
                const stompClient = Stomp.over(socket);
                function send() {
                    stompClient.send(
                        '/topic/sellinfo',
                        {},
                        JSON.stringify({
                            message: '거래요청',
                        }),
                    );
                }
                stompClient.connect({}, function (frame) {
                    console.log('Connected: ' + frame);
                    stompClient.subscribe(
                        '/topic/sellinfo',
                        function (message) {
                            const body = JSON.parse(message.body);
                            console.log('message:', body);
                            if (body.message === '거래요청') {
                                alert('거래요청 들어옴');
                                //어두운 화면 + 로딩중 띄워주고
                            }
                            if (body.message === '정보입력완료') {
                                alert('결제 ㄱ');
                                //axios로 결제 정보를 담아서 ai 추천 요청
                                //추천 결과 나오면 페이지 이동해서 받은 정보 보여주기
                                //axios로 선택한 카드로 결제요청 보내기
                                //결제 요청 결과에 따라 성공 시)
                                //결제history DB내용으로 영수증 보여주기(이때 한번 더 웹소켓 접속해서 결제 완료 알림
                                //-> 판매자도 결제 완료 페이지로 이동: 웹소켓 종료(결제 완료))
                            }
                        },
                    );
                    //TODO: sellinfo로 값 전달하고 서버에서 받는거 테스트 필요
                    //받은 값 기반으로 서버 로직 돌리고 리턴값 받는거 테스트 필요
                });

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
        createQr();
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
