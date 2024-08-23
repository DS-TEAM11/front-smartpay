import React, { useState, useEffect } from "react";
import "./RecoCard.css";
import axios from "axios";

const RecoCard = ({ recommendData }) => {
    const [cardInfo, setCardInfo] = useState({});

    const getCardInfo = async () => {
        try {
            const url = 'http://localhost:8091/api/payment/card';
            const data = {
                cardCode: recommendData.recommendCard,
                memberNo: 'test',
            };
            const response = await axios.post(url, data, {
                responseType: 'json',
            });
            console.log('API 응답:', response.data);
            setCardInfo(response.data); 
        } catch (error) {
            console.error('에러', error);
        }
    };

    // 컴포넌트가 마운트될 때 API 호출
    useEffect(() => {
        getCardInfo();
    }, [recommendData]);

    return (
        <div className="RecoCard">
            <div className="row justify-content-center mt-3">
                <div className="col-6">
                    <p className="fs-5 blue-text fw-bold m-0">AI 추천카드</p>
                </div>
                <div className="col-5">
                    <p className="text-decoration-underline text-end m-0">이 카드로 결제하기</p>
                </div>
            </div>

            <div className="row AiCardImg mx-1 mb-2">
                <div className="col-4 justify-content-center align-items-center">
                    {cardInfo.card_img && (
                        <img
                            src={cardInfo.card_img}
                            className="aiimg text-center"
                            alt="AI 추천 카드"
                        />
                    )}
                </div>
                <div className="col-8 d-flex flex-column justify-content-center px-0">
                    <p className="fs-5 my-0 fw-bold">{cardInfo.card_name}</p>
                    <p className="fs-7">
                        이 카드를 사용하면 <span className="blue-text fw-bolder save">{recommendData.maximumBenefits}원 {recommendData.benefitType}</span>을 받을 수 있어요.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecoCard;
