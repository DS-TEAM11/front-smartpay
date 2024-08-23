import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from '../component/Header';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import Button from '../component/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// import { InputValue, InputValueWithBtn } from '../component/common/InputValue';
import InputValue from '../component/common/InputValue';
const Seller = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const memberNo = queryParams.get('memberNo');

    const [franchiseCode, setFranchiseCode] = useState('');
    const [franchiseType, setFranchiseType] = useState('');
    const [franchiseName, setFranchiseName] = useState('');
    const [purchaseItems, setPurchaseItems] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');

    //웹소켓 관련 코드
    const stompClientRef = useRef(null);
    const isConnectedRef = useRef(false); // stompClient 연결 상태 추적
    useEffect(() => {
        const socket = new SockJS('http://localhost:8091/ws');
        const stompClient = Stomp.over(socket);

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
    const send_information = () => {
        const purchase_data = {
            franchiseCode: franchiseCode,
            franchiseType: franchiseType,
            franchiseName: franchiseName,
            purchaseItems: purchaseItems,
            purchasePrice: purchasePrice,
            memberNo: memberNo,
        };
        stompClientRef.current.send(
            '/topic/sellinfo',
            {},
            JSON.stringify({
                message: 'purchase information',
                data: purchase_data,
            }),
        );
    };
    //웹소켓 관련 코드 끝------------------------------------------------------------

    const handleInput = useCallback(
        (event) => {
            const inputValue = event.target.value;
            console.log(inputValue);
            console.log(event.target);
            setFranchiseType(inputValue);
        },
        [franchiseType],
    );
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
                        placeholder={'disabled 테스트'}
                        onChange={handleInput}
                        title={' disabled 테스트'}
                        disabled
                    />
                    <InputValue
                        placeholder={'테스트'}
                        // title={'테스트'}
                        value={franchiseType}
                        onChange={handleInput}
                    />
                    {/* 상호명, 가격, 상품명, 총합계 */}

                    {/* <InputValueWithBtn
                        placeholder={'상호명'}
                        title={'상호명'}
                        value={'밸류'}
                    ></InputValueWithBtn> */}
                    <Button
                        text={'결제 요청 전송'}
                        onClick={send_information}
                    ></Button>
                </form>
            </div>
        </div>
    );
};

export default Seller;
