import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from '../component/Header';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import Button from '../component/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// import { InputValue, InputValueWithBtn } from '../component/common/InputValue';
import { InputValue } from '../component/common/InputValue';
const Seller = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const memberNo = queryParams.get('memberNo');
    //웹소켓 관련 코드
    const stompClientRef = useRef(null);
    const isConnectedRef = useRef(false); // stompClient 연결 상태 추적
    //됐음
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');

    //주문번호 생성
    const handleOrderNo = async () => {
        try {
            const url = 'http://localhost:8091/api/payment/pay';
            const data = {
                product: formData.purchaseItems,
                price: formData.purchasePrice,
                isAi: true,
                payDate: formattedDate,
                franchiseName: formData.franchiseName,
                franchiseCode: formData.franchiseCode,
                memberNo: memberNo,
            };
            console.log('Sending data:', data);
            const response = await axios.post(url, data, {
                responseType: 'json',
            });
            const orderNo = response.data;
            console.log('Order No:', orderNo);

            setFormData((prevData) => ({
                ...prevData,
                orderNo: orderNo,
            }));
            return orderNo;
        } catch (error) {
            console.error(error);
        }
    };

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
                        '/topic/sellinfo/' + memberNo,
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
        stompClientRef.current.subscribe(
            '/topic/sellinfo/' + memberNo,
            function (message) {
                const body = JSON.parse(message.body);
                console.log('message:', body);
                if (body.message === 'purchase end') {
                    var confirm_ = window.confirm('결제가 완료되었습니다.');
                    if (confirm_) {
                        window.location.href =
                            'http://localhost:3000/pay/receipt';
                    }
                }

                //구매자가 로딩화면 중에서 취소하기를 누르면
                if (body.message === 'buyer exit') {
                    alert('구매자가 주문을 취소하였습니다.');

                    //판매자 웹소켓 끊기(근데 새로고침 하면 다시 연결됨)
                    if (stompClientRef.current && isConnectedRef.current) {
                        stompClientRef.current.disconnect(() => {
                            console.log('Disconnected');
                        });
                    }
                }
            },
        );
    };
    const send_information = async () => {
        const {
            franchiseCode,
            franchiseType,
            franchiseName,
            purchaseItems,
            purchasePrice,
        } = formData;

        //모든 값을 입력해야 함
        if (
            !franchiseCode ||
            !franchiseType ||
            !franchiseName ||
            !purchaseItems ||
            !purchasePrice
        ) {
            alert('모든 값을 입력해주세요');
            return;
        }

        const orderNo = await handleOrderNo();
        const purchase_data = {
            ...formData,
            memberNo: memberNo,
            payDate: formattedDate,
            orderNo: orderNo,
        };
        stompClientRef.current.send(
            '/topic/sellinfo/' + memberNo,
            {},
            JSON.stringify({
                message: 'purchase information',
                data: purchase_data,
            }),
        );
    };
    //웹소켓 관련 코드 끝------------------------------------------------------------
    //입력 폼 데이터 핸들링
    const [formData, setFormData] = useState({
        franchiseCode: '',
        franchiseType: '',
        franchiseName: '',
        purchaseItems: '',
        purchasePrice: '',
    });
    const handleInputChange = useCallback((event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }, []);
    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            console.log('제출된 데이터:', formData);
            // 여기서 서버로 데이터 전송 등의 작업을 수행할 수 있습니다.
        },
        [formData],
    );
    //입력 폼 데이터 핸들링 끝 ------------------
    return (
        <div className="App">
            <div className="my-content-box px-4 align-items-center">
                <div className="logo text-center">
                    <img src="assets/images/logo.png" alt="SP Logo" />
                </div>
                {/* <img src={logo} alt="logo" className="logo" /> */}
                <div className="page-title text-center fs-2 mb-4 fw-bold">
                    판매자 페이지
                </div>
                <form onSubmit={handleSubmit}>
                    <InputValue
                        placeholder="ex) 10000, 10001, 10002 ..."
                        title="가맹점 코드"
                        id="franchiseCode"
                        value={formData.franchiseCode}
                        onChange={handleInputChange}
                    />
                    <InputValue
                        placeholder="ex) 카페, 식당, 편의점"
                        title="가맹점 타입"
                        id="franchiseType"
                        value={formData.franchiseType}
                        onChange={handleInputChange}
                    />
                    <InputValue
                        placeholder="ex) GS25, CU, 스타벅스"
                        title="가맹점 이름"
                        id="franchiseName"
                        value={formData.franchiseName}
                        onChange={handleInputChange}
                    />
                    <InputValue
                        placeholder="대표 상품과 개수를 입력해주세요."
                        title="구매 항목"
                        id="purchaseItems"
                        value={formData.purchaseItems}
                        onChange={handleInputChange}
                    />
                    <InputValue
                        placeholder="고객에게 요청할 금액을 입력해주세요."
                        title="구매 가격"
                        id="purchasePrice"
                        value={formData.purchasePrice}
                        onChange={handleInputChange}
                        type="number"
                    />
                    <div className="my-4 text-center">
                        <Button
                            text={'결제 요청 전송'}
                            onClick={send_information}
                        ></Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Seller;
