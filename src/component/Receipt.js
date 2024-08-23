import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Receipt.css';
import axios from 'axios';
import Button from './Button';
import Header from './Header';
import { useLocation } from 'react-router-dom';
// 로그인 정보 -> context 등에서 받아오기
// 로그인 정보 + 쿼리스트링에 주문번호(UUID)
// 쿼리스트링의 값에 따라서 axios 요청 -> 받아온 데이터를 리액트에서 표시
// 받아온 데이터를 출력하기
const Receipt = (state) => {
    const location = useLocation();
    const [formData, setFormData] = useState(location.state.aiData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        handleChange(formData);
    }, [formData]);
    console.log('영수증 페이지에 정보 전달됨', formData);
    console.log('영수증 페이지에 정보 전달됨', JSON.stringify(formData));
    return (
        <>
            <Header />
            <div className="receipt">
                {/* Top Info */}
                <div className="topInfo">
                    <div className="title">결제 완료</div>
                    <div className="titleSubInfo">{orderData.regDate}</div>
                    <div className="titleSubInfo">주문 번호: {orderData.orderNo}</div>
                </div>
                <div className="detailInfo bg-light d-flex flex-column w-95">
                    <div className="purchaseShopName">{orderData.franchiseName}</div>
                    <hr />
                    <div className="purchaseItemName">
                        {orderData.product}
                    </div>
                    <div className="purchaseItemInfo">
                        <div className="purchaseItemPriceName">
                            <div className="infoTitle">결제 금액</div>
                            <div className="infoValue">{orderData.price.toLocaleString()}원</div>
                        </div>
                        <div className="purchaseBenefit">
                            <div className="infoTitle">받은 혜택</div>
                            <div className="infoValue royalblue">{orderData.savePrice}원</div>
                        </div>
                        <div className="purchaseUsedCard">
                            <div className="infoTitle">결제 카드</div>
                            <div className="infoValue">{orderData.cardNo}</div>
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
                    <Button text={'돌아가기'} className="back_btn" />
                </div>
            </div>
        </>
    );
};

export default Receipt;
