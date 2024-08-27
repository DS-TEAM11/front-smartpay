import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShowQr } from '../provider/PayProvider';
import './Receipt.css';
import axios from 'axios';
import Button from './Button';
import Header from './Header';
// 로그인 정보 -> context 등에서 받아오기
// 로그인 정보 + 쿼리스트링에 주문번호(UUID)
// 쿼리스트링의 값에 따라서 axios 요청 -> 받아온 데이터를 리액트에서 표시
// 받아온 데이터를 출력하기
const Receipt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setShowQr } = useShowQr();
    // const [formData, setFormData] = useState(location.state.aiData);
    const queryParams = new URLSearchParams(location.search);
    const orderNo = queryParams.get('orderNo');

    const [formData, setFormData] = useState({
        regDate: '',
        orderNo: '',
        product: '',
        price: 0,
        cardNo: '',
        cardCode: '',
        isAi: false,
        payDate: '',
        savePrice: 0,
        saveType: 0,
        franchiseCode: '',
        franchiseName: '',
        memberNo: '',
    });

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    useEffect(() => {
        const getOrderData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8091/api/payment/completed',
                    {
                        params: { orderNo },
                    },
                );
                setFormData(response.data);
            } catch (error) {
                console.error('에러');
            }
        };
        getOrderData();
    }, [orderNo]);
    // console.log('영수증 페이지에 정보 전달됨', formData);
    // console.log('영수증 페이지에 정보 전달됨', JSON.stringify(formData));
    const handleBackClick = () => {
        setShowQr(false);
        navigate('/home'); // /home 경로로 이동
    };

    return (
        <>
            <Header />
            <div className="receipt p-2 px-4">
                {/* Top Info */}
                <div className="topInfo">
                    <div className="title">결제 완료</div>
                    <div className="titleSubInfo">{formData.regDate}</div>
                    <div className="titleSubInfo">
                        주문 번호: {formData.orderNo}
                    </div>
                </div>
                <div className="detailInfo bg-light d-flex flex-column w-95">
                    <div className="purchaseShopName">
                        {formData.franchiseName}
                    </div>
                    <hr />
                    <div className="purchaseItemName">{formData.product}</div>
                    <div className="purchaseItemInfo">
                        <div className="purchaseItemPriceName">
                            <div className="infoTitle">결제 금액</div>
                            <div className="infoValue">
                                {formData.price.toLocaleString()}원
                            </div>
                        </div>
                        {/* isAi가 true일 때만 혜택 정보를 표시 */}
                        {formData.isAi && (
                            <div className="purchaseBenefit">
                                <div className="infoTitle">받은 혜택</div>
                                <div className="infoValue royalblue">
                                    {formData.savePrice}원{' '}
                                    {formData.saveType == 0 ? '적립' : '할인'}
                                </div>
                            </div>
                        )}
                        <div className="purchaseUsedCard">
                            <div className="infoTitle">결제 카드</div>
                            <div className="infoValue">
                                ({formData.cardNo.slice(-4)})
                            </div>
                        </div>
                        <div className="purchaseStatus">
                            <div className="infoTitle">결제 상태</div>
                            <div className="infoValue">승인 완료</div>
                        </div>
                        <div className="purchaseCardOwner">
                            <div className="infoTitle">소지자</div>
                            <div className="infoValue">본인</div>
                        </div>
                    </div>
                    <Button
                        text={'돌아가기'}
                        className="back_btn"
                        onClick={handleBackClick}
                    />
                </div>
            </div>
        </>
    );
};

export default Receipt;
