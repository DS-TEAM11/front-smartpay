import React, { useEffect, useState, useRef, useCallback } from 'react';
import Button from '../component/Button';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import { InputValue, InputValueWithBtn } from '../component/common/InputValue';
import { InputValue } from '../component/common/InputValue';
import { useWebSocket } from '../provider/PayProvider';
const Seller = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const memberNo = queryParams.get('memberNo');
    const [orderNo, setOrderNo] = useState(null);
    const [isMatched, setIsMatched] = useState(false);
    const { wsConnect, wsDisconnect, wsSubscribe, wsSendMessage } =
        useWebSocket();
    // Ref를 사용하여 subscription을 관리
    const subscriptionRef = useRef(null);
    const navigate = useNavigate();
    // WebSocket 연결 및 구독 처리
    useEffect(() => {
        if (!memberNo) return;

        // WebSocket 연결 후 구독 설정
        wsConnect(() => {
            // console.log('WebSocket 연결 successfully');
            // 구독 시도
            try {
                subscriptionRef.current = wsSubscribe(
                    `/topic/sellinfo`,
                    (data) => {
                        const { action, buyer, message } = data;
                        if (buyer === memberNo) {
                            if (action === 'createQR') {
                                console.log('구매자가 QR 코드를 생성했습니다.');
                                setIsMatched(true);
                            }
                            if (action === 'matched') {
                                console.log('구매자와 매칭되었습니다.');
                                setIsMatched(true);
                            }
                            if (isMatched && action === 'end') {
                                console.log('결제가 완료되었습니다.');
                                setIsMatched(false);
                                if (subscriptionRef.current) {
                                    subscriptionRef.current.unsubscribe(); // 구독 해제
                                }
                                wsDisconnect(); // WebSocket 연결 해제
                                navigate('/pay/receipt?orderNo=' + orderNo, {
                                    replace: true,
                                });
                            }
                            if (isMatched && action === 'cancel') {
                                console.log('구매자가 주문을 취소했습니다.');
                                setIsMatched(false);
                            }
                        }
                    },
                );
            } catch (error) {
                console.error('Failed to subscribe:', error);
            }

            // 판매자 접속 메시지 전송
            wsSendMessage(`/topic/sellinfo`, {
                action: 'enter',
                to: memberNo,
                from: 'seller',
            });
        });

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe(); // 구독 해제
            }
            wsDisconnect(); // WebSocket 연결 해제
        };
    }, [memberNo]);

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
            // console.log('Sending data:', data);
            const response = await axios.post(url, data, {
                responseType: 'json',
            });
            const orderNo_ = response.data;
            // console.log('Order No:', orderNo_);

            setFormData((prevData) => ({
                ...prevData,
                orderNo: orderNo_,
            }));
            return orderNo_;
        } catch (error) {
            console.error(error);
        }
    };
    // 메시지 전송 함수
    const sendInformation = async () => {
        if (!isMatched) {
            alert('구매자와 매칭되지 않았습니다.');
            return;
        }
        const {
            franchiseCode,
            franchiseType,
            franchiseName,
            purchaseItems,
            purchasePrice,
        } = formData;

        // 모든 값을 입력해야 함
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

        // 주문 번호 처리
        setOrderNo(await handleOrderNo());
        const purchase_data = {
            ...formData,
            memberNo: memberNo,
            payDate: formattedDate,
            orderNo: orderNo,
        };

        // WebSocket을 통해 메시지 전송
        wsSendMessage(`/topic/sellinfo`, {
            action: 'fillout',
            to: memberNo,
            from: 'seller',
            data: purchase_data,
        });
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
                    <div className="my-4 text-center d-flex justify-content-center flex-column">
                        <Button
                            text={'결제 요청 전송'}
                            onClick={sendInformation}
                        ></Button>
                        <Button
                            className={'white mt-2'}
                            text={'재접속 신호 전송'}
                            onClick={(e) => {
                                e.preventDefault();
                                wsSendMessage(`/topic/sellinfo`, {
                                    action: 'enter',
                                    to: memberNo,
                                    from: 'seller',
                                });
                            }}
                        ></Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Seller;
