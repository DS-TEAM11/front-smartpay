import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import BlackContainer from '../BlackContainer';
import Timer from './Timer';
import './QrItem.css';
import qrUpBtn from '../../img/qrUpBtn.png';
import $ from 'jquery';

function Qrtest({ onRemove }) {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isQrVisible, setIsQrVisible] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [boxHeight, setBoxHeight] = useState('60vh');
    const [boxTop, setBoxTop] = useState('40vh');

    const createQr = () => {
        if (qrCodeUrl != '') {
            setIsQrVisible(true);
            return;
        }
        axios
            .get('http://localhost:8091/qr/seller', {
                responseType: 'blob',
            })
            .then((response) => {
                setQrCodeUrl(URL.createObjectURL(response.data));
                // wsConnect();
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
            {isLoading && <Loading text={'판매자가 정보 입력 중 입니다.'} />}
            {/* //QR 코드가 보이는 상태일 때 */}
            {isQrVisible && (
                <div className="qrItem">
                    <BlackContainer
                        onClick={() => {
                            onRemove();
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
                        <Timer />
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

export default Qrtest;
