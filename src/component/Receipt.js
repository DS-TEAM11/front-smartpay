import React, { useState } from 'react';
import './Receipt.css';
import axios from 'axios';
import Button from './Button';
import Header from './Header';
// 로그인 정보 -> context 등에서 받아오기
// 로그인 정보 + 쿼리스트링의 결제 순번
// Spring Security에서 로그인 정보로 인가
// 쿼리스트링의 값에 따라서 axios 요청 -> 받아온 데이터를 리액트에서 표시
// 받아온 데이터를 출력하기
const Receipt = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        date: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle form submission
    };

    return (
        <>
            <Header />
            <div className="receipt">
                {/* //component1 -> topInfo */}
                <div className="topInfo">
                    <div className="title">결제 완료</div>
                    <div className="titleSubInfo">2024.00.00. 00:00:00</div>
                    <div className="titleSubInfo">주문 번호: (uuid)</div>
                </div>
                <div className="detailInfo bg-light d-flex flex-column w-95">
                    <div className="purchaseShopName">GS25 - 동교점</div>
                    <hr />
                    <div className="purchaseItemName">
                        참깨라면(대컵) 외 24종
                    </div>
                    <div className="purchaseItemInfo">
                        {/* axios로 받아온 값을 각각 infoTitle, infoValue로 나눠서 작성 */}
                        <div className="purchaseItemPriceName">
                            <div className="infoTitle">결제 금액</div>
                            <div className="infoValue">150,000원</div>
                        </div>
                        <div className="purchaseBenefit">
                            <div className="infoTitle">받은 혜택</div>
                            <div className="infoValue royalblue">300원</div>
                        </div>
                        <div className="purchaseUsedCard">
                            <div className="infoTitle">결제 카드</div>
                            <div className="infoValue">삼성(3342)</div>
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
                    <Button text={'돌아가기'}> </Button>
                </div>
            </div>
        </>
    );
};

export default Receipt;
