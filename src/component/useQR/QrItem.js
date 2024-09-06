import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import BlackContainer from '../BlackContainer';
import Timer from './Timer';
import './QrItem.css';
import qrUpBtn from '../../img/qrUpBtn.png';
import $ from 'jquery';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemberNo, useWebSocket } from '../../provider/PayProvider';

function QrItem({ onRemove, cardCode, subscription, subMessage }) {
    // console.log(cardCode, 'QrItem으로 받아온 카드코드');
    const location = useLocation();
    const navigate = useNavigate();
    const memberNo = useMemberNo();
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isQrVisible, setIsQrVisible] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAIiLoading, setIsAIiLoading] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [boxHeight, setBoxHeight] = useState('60vh');
    const [boxTop, setBoxTop] = useState('40vh');
    const { wsConnect, wsDisconnect, wsSubscribe, wsSendMessage } =
        useWebSocket();
    // Ref를 사용하여 subscription을 관리
    const subscriptionRef = useRef(subscription);
    const cardRecommend = (data) => {
        const url = 'http://localhost:8091/api/payment/ai';
        const params = {
            memberNo: memberNo,
        };
        axios
            .post(url, data, {
                params: params,
                responseType: 'json',
                timeout: 5000,
            })
            .then((response) => {
                // console.log('추천 결과:', response.data);
                // cardCode도 같이 보내게 수정
                // console.log(cardCode);
                wsSendMessage(`/topic/sellinfo`, {
                    action: 'aiDone',
                    from: memberNo,
                    to: 'seller',
                });
                navigate('/pay', {
                    state: {
                        purchaseData: data,
                        aiData: response.data,
                        cardCode: cardCode,
                    },
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const createQr = () => {
        if (qrCodeUrl != '') {
            setIsQrVisible(true);
            return;
        }

        axios
            .get('http://localhost:8091/qr/seller?memberNo=' + memberNo, {
                responseType: 'blob',
            })
            .then((response) => {
                setQrCodeUrl(URL.createObjectURL(response.data));
                wsConnect();
            })
            .catch((error) => {
                alert('QR 코드 생성에 문제가 발생했습니다.');
                console.error(error);
            });
    };
    useEffect(() => {
        setBoxHeight(isFullScreen ? '100%' : '60%');
        setBoxTop(isFullScreen ? '0' : '40%');
    }, [isFullScreen]);
    //QR 생성 버튼 처음 눌렀을 때만 생김

    useEffect(() => {
        createQr();
        console.log('받아온 ref', subscriptionRef.current);
        console.log('받아온 subMessage', subMessage);
        //기존 구독이 있을 때만 체크
        if (subscriptionRef.current && subMessage) {
            // console.log('구독 후 ref', subscriptionRef.current);
            console.log('Home-QrItem에서 받음 Received message:', subMessage);
            const { action, from, to, data } = subMessage;
            if (from === 'seller') {
                if (action === 'enter') {
                    setIsQrVisible(false);
                    setIsLoading(true);
                    wsSendMessage(`/topic/sellinfo`, {
                        action: 'matched',
                        from: memberNo,
                        to: 'seller',
                    });
                }
                if (isLoading && action === 'fillout') {
                    setIsQrVisible(false);
                    setIsAIiLoading(true);
                    wsSendMessage(`/topic/sellinfo`, {
                        action: 'aiRecommend',
                        from: memberNo,
                        to: 'seller',
                    });
                    setIsEnd(true);
                    cardRecommend(data);
                }
            }
        }
        if (isFirst) {
            setIsFirst(false);
            // 접속 완료 메시지 전송
            wsSendMessage(`/topic/sellinfo`, {
                action: 'createQR',
                from: memberNo,
                to: 'seller',
            });
        }

        return () => {
            if (!isEnd) {
                return;
            }
            handleRemove();
        };
    }, [subMessage, subscriptionRef.current]);

    const handleRemove = () => {
        console.log('handleREMOVER 실행 ');
        setIsQrVisible(false);
        setIsFullScreen(false);
        setIsLoading(false);
        setIsAIiLoading(false);
        setIsEnd(false);
        // 취소 메시지 전송
        wsSendMessage(`/topic/sellinfo`, {
            action: 'cancel',
            from: memberNo,
            to: 'seller',
        });
        if (onRemove && typeof onRemove === 'function') {
            onRemove();
        }
    };
    return (
        <>
            {/* //웹소켓 접속해서 판매자가 정보 입력 중일 때 */}
            {isLoading && !isAIiLoading && (
                <Loading
                    text={'사장님이 결제 정보를 입력하고 있어요.'}
                    info={'pay'}
                    onCancel={handleRemove}
                />
            )}
            {isLoading && isAIiLoading && (
                <Loading
                    text={
                        'AI가 이번 결제에 가장 큰 혜택을 받을 카드를 선택하고 있어요.'
                    }
                />
            )}

            {/* //QR 코드가 보이는 상태일 때 */}
            {isQrVisible && (
                <div className="qrItem">
                    <BlackContainer onClick={handleRemove} />
                    <div
                        className="white-box"
                        style={{
                            height: boxHeight,
                            top: boxTop,
                            transition: 'height 0.3s ease',
                        }} // 상태를 기반으로 높이를 동적으로 설정
                    >
                        {isFullScreen && (
                            <div
                                className="backBtn"
                                style={{ left: 0 }}
                                onClick={() => {
                                    setIsFullScreen(false);
                                }}
                            >
                                &lt; 돌아가기
                            </div>
                        )}
                        {!isFullScreen && (
                            <div
                                className="upBtn"
                                onClick={() => {
                                    setIsFullScreen(true);
                                    setBoxHeight('100vh');
                                }}
                            >
                                <img src={qrUpBtn} alt="qrUpBtn" />
                            </div>
                        )}
                        <Timer onRemove={handleRemove} />
                        <div className="qrCode">
                            <img
                                src={qrCodeUrl}
                                alt="QR Code"
                                className="qr-code"
                            />
                        </div>
                        {isFullScreen && (
                            <div className="payInformation">
                                <div className="title">
                                    위 QR 코드를 가게 사장님께 보여주세요.
                                </div>
                                <div className="subtitle">
                                    가게 정보를 인식해 AI가 최대 혜택 결제를
                                    도와드립니다.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default QrItem;
