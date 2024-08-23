import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PaymentSuccess from '../component/Receipt';
import Button from '../component/Button';
import Order from '../component/Order';
import Header from '../component/Header';
import RecoCard from '../component/RecoCard';
import { useLocation } from 'react-router-dom';
const Pay = () => {
    const location = useLocation();
    const [recommendData, setRecommendData] = useState(location.state.aiData);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const navigate = useNavigate();
    console.log(recommendData); //TODO: 240823 이제 이 데이터 잘라서 페이지에 그려주면 됨


    
    const handlePayment = async () => {
        const paymentData = {
            orderNo: '리액트테스트입니다3',
            price: 7777,
            product: '리액트테스트2',
            cardNo: '2222-2222-2222-2222',
            cardCode: "10003",
            getIsAi: true,
            payDate: '20240101',
            saveType: 1,
            savePrice: 200,
            franchiseName: "GS25-동교점",
            franchiseCode: "10003",
            memberNo: 'ce6e2639-3dda-46d2-8d14-1da870ff61e8',
        };

        try {
            const response = await axios.post(
                'http://localhost:8091/api/payment/request',
                paymentData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const paymentStatus = response.data; // API가 반환하는 return 값(결제 상태)

            console.log(paymentStatus);

            const orderNo = paymentData.orderNo;
            if (paymentStatus === 0) {
                // 결제 성공
                alert('결제가 완료되었습니다.');
                setPaymentSuccess(true);
                setPaymentData(response.data);
                navigate(`/pay/receipt?orderNo=${orderNo}`);
                 //결제 요청 값? 데이터 그대로 보내줘? 아님 쿼리파라미터로 달아서 페이지 이동? -> receipt에서는 파라미터 값 가져와서 API 호출?

            } else if (paymentStatus === 1) {
                // 카드 불일치
                alert('결제 실패: 카드 정보 불일치');
            } else if (paymentStatus === 2) {
                // 유효기간 만료
                alert('결제 실패:  유효기간 만료');
            } else if (paymentStatus === 3) {
                // 한도 초과
                alert('결제 실패: 카드 한도 초과');
            } else {
                // 예외 에러
                alert('결제 실패: 서버 에러 발생');
            }
        } catch (error) {
            console.log('에러');
        }
    };
    //컴포넌트 확인용 데이터?
    let getIsAi = true;
    return (
        <div>
            <Header />
            <Order />

            <div className="d-flex justify-content-center">
                <div className="col-10 row">
                    {getIsAi && (
                        <div className="p-2 px-4 aiInfo">
                            <p>
                                ※ 이 카드는 편의점 이용금액 1,000원당 2마일리지
                                특별적립 혜택을 받을 수 있어요.
                            </p>
                        </div>
                    )}
                    <Button
                        onClick={handlePayment}
                        text={'이 카드로 결제하기'}
                    />

                    <p
                        className="text-decoration-underline text-end mt-2 p-0"
                        href=""
                    >
                        다른 카드 선택하기
                    </p>
                </div>
            </div>

            {!getIsAi && <RecoCard />}
        </div>
    );
};

export default Pay;
