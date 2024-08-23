import React, { useEffect, useState, useRef } from 'react';
import Header from '../component/Header';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import Button from '../component/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Seller.css';
import { InputValue, InputValueWithBtn } from '../component/common/InputValue';
const Seller = () => {
    const [merchantId, setMerchantId] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [storeName, setStoreName] = useState('');
    const [price, setPrice] = useState('');
    const [productName, setProductName] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const memberNo = queryParams.get('memberNo');
    const purchase_data = {
        franchiseCode: '10003', //편의점 계열
        franchiseType: '편의점',
        franchiseName: 'GS25 - 동교점',
        purchaseItems: '스타벅스 스탠리 텀블러',
        purchasePrice: 39000,
        memberNo: memberNo,
    };

    //웹소켓 관련 코드
    const socket = new SockJS('http://localhost:8091/ws');
    const stompClient = Stomp.over(socket);
    const stompClientRef = useRef(null);
    const isConnectedRef = useRef(false); // stompClient 연결 상태 추적
    useEffect(() => {
        if (!stompClientRef.current) {
            stompClientRef.current = stompClient;
        }

        const connectStompClient = () => {
            stompClientRef.current.connect(
                {},
                function (frame) {
                    console.log('Connected: ' + frame);
                    isConnectedRef.current = true; // 연결이 완료된 상태로 설정
                    subscribeToTopic();

                    // 연결이 완료된 후에만 메시지 전송
                    stompClientRef.current.send(
                        '/topic/sellinfo',
                        {},
                        JSON.stringify({ message: 'seller enter' }),
                    );
                },
                function (error) {
                    console.error('STOMP connection error:', error);
                    // 필요시 재시도 로직 추가 가능
                },
            );
        };

        if (isConnectedRef.current) {
            subscribeToTopic();
        } else {
            connectStompClient();
        }

        // 컴포넌트 언마운트 시 연결 해제
        return () => {
            if (stompClientRef.current && isConnectedRef.current) {
                stompClientRef.current.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        };
    }, []);

    const subscribeToTopic = () => {
        stompClientRef.current.subscribe('/topic/sellinfo', function (message) {
            const body = JSON.parse(message.body);
            console.log('message:', body);
            if (body.message === 'purchase end') {
                var confirm_ = window.confirm('결제가 완료되었습니다.');
                if (confirm_) {
                    window.location.href = 'http://localhost:3000/pay/receipt';
                }
            }
        });
    };
    // 가맹점 코드에 대한 임시 데이터 매핑
    const merchantData = {
        123456: { businessType: '편의점', storeName: 'GS25' },
        654321: { businessType: '카페', storeName: '스타벅스' },
        111111: { businessType: '서점', storeName: '교보문고' },
        222222: { businessType: '패스트푸드', storeName: '맥도날드' },
        333333: { businessType: '슈퍼마켓', storeName: '이마트' },
    };

    const handleInput = (event) => {
        const inputValue = event.target.value;
        setMerchantId(inputValue);

        if (inputValue.length === 6) {
            const data = merchantData[inputValue];
            if (data) {
                setBusinessType(data.businessType);
                setStoreName(data.storeName);
            } else {
                setBusinessType('');
                setStoreName('');
            }
        } else {
            setBusinessType('');
            setStoreName('');
        }
    };
    return (
        <div className="App">
            <div className="my-content-box">
                <div className="logo">
                    <img src="assets/images/logo.png" alt="SP Logo" />
                </div>
                {/* <img src={logo} alt="logo" className="logo" /> */}
                <div className="page-title">판매자 페이지</div>
                <form>
                    <InputValue
                        placeholder={'가맹점 코드'}
                        onChange={handleInput}
                        title={'가맹점 코드'}
                        disabled
                    />
                    <InputValue placeholder={'업종'} title={'업종'} />
                    {/* 상호명, 가격, 상품명, 총합계 */}

                    <InputValueWithBtn
                        placeholder={'상호명'}
                        title={'상호명'}
                    ></InputValueWithBtn>
                    <Button
                        text={'결제 요청 전송'}
                        onClick={() => {
                            // 결제 요청 웹소켓 send
                        }}
                    ></Button>
                </form>
            </div>
        </div>
    );
};

export default Seller;
