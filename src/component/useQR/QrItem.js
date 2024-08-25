import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import BlackContainer from '../BlackContainer';
import Timer from './Timer';
import './QrItem.css';
import qrUpBtn from '../../img/qrUpBtn.png';
import $ from 'jquery';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from 'react-router-dom';
import { useMemberNo } from '../../provider/PayProvider';

function QrItem({ onRemove, cardCode }) {
    const navigate = useNavigate();
    const memberNo = useMemberNo();
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isQrVisible, setIsQrVisible] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAIiLoading, setIsAIiLoading] = useState(false);
    const [boxHeight, setBoxHeight] = useState('60vh');
    const [boxTop, setBoxTop] = useState('40vh');

    
    const [stompClient, setStompClient] = useState(
        Stomp.over(new SockJS('http://localhost:8091/ws')),
    );
    const wsConnect = () => {
        stompClient.connect({}, function (frame) {
            // console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/sellinfo', function (message) {
                const body = JSON.parse(message.body);
                // console.log('message:', body);
                if (body.message === 'seller enter') {
                    // console.log('판매자 접속');
                    setIsLoading(true);
                    setIsQrVisible(false);
                }
                if (body.message === 'purchase information') {
                    // console.log('구매 정보 입력 완료');
                    // console.log(body.data);
                    //cardCode 받았는지에 따라 ai 추천 로직
                    //카드코드 없어서 테스트 진행
                    cardCode = '';
                    if (!cardCode) {
                        setIsAIiLoading(true);
                        cardRecommend(body.data);
                    } else {
                        navigate('/pay', {
                            state: {
                                purchaseData: body.data,
                                cardCode: cardCode,
                            },
                        });
                    }
                }
            });
        });
    };
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
                navigate('/pay', {
                    state: { purchaseData: data, aiData: response.data },
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleRemove = () => {
        // stompClient.disconnect()를 먼저 실행
        if (stompClient && typeof stompClient.disconnect === 'function') {
            stompClient.disconnect();
            // console.log('pay logic disconnected');
        }

        // 이후에 onRemove 실행
        if (onRemove && typeof onRemove === 'function') {
            onRemove();
        }
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
        setBoxHeight(isFullScreen ? '100vh' : '60vh');
        setBoxTop(isFullScreen ? '0' : '40vh');
    }, [isFullScreen]);
    //QR 생성 버튼 처음 눌렀을 때만 생김

    useEffect(() => {
        createQr();
    }, []);
    return (
        <>
            {/* //웹소켓 접속해서 판매자가 정보 입력 중일 때 */}
            {isLoading && !isAIiLoading && (
                <Loading text={'사장님이 결제 정보를 입력하고 있어요.'} />
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
                    <BlackContainer
                        onClick={() => {
                            handleRemove();
                        }}
                    />
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
