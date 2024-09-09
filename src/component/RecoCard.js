import React, { useState, useEffect, useRef } from 'react';
import './RecoCard.css';
import axios from 'axios';

const RecoCard = ({ recommendData, setCardCode }) => {
    const [cardInfo, setCardInfo] = useState({});
    const imgRef = useRef(null);

    const ConfigEnum = Object.freeze({
        PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
        COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
    });

    const getCardInfo = async () => {
        try {
            const url = `${ConfigEnum.PAY_SERVER_URL}/api/payment/card`;
            const data = {
                cardCode: recommendData.recommendCard,
                memberNo: 'test',
            };
            const response = await axios.post(url, data, {
                responseType: 'json',
            });
            setCardInfo(response.data);
        } catch (error) {
            console.error('에러', error);
        }
    };

    useEffect(() => {
        getCardInfo();
    }, [recommendData]);

    const handleCardPaymentClick = () => {
        setCardCode(''); // cardCode를 빈 문자열로 설정
        console.log('카드코드 없음 -----------------------------');
    };

    return (
        <div className="RecoCard">
            <div className="row justify-content-center mt-2">
                <div className="col-6">
                    <p className="fs-5 blue-text fw-bold m-0">AI 추천카드</p>
                </div>
                <div className="col-5">
                    <p
                        className="text-decoration-underline text-end m-0"
                        onClick={handleCardPaymentClick}
                    >
                        이 카드로 결제하기
                    </p>
                </div>
            </div>

            <div className="row AiCardImg mx-1 mb-3">
                <div className="col-4 justify-content-center align-items-center fixed-container pt-1">
                    {cardInfo.card_img && (
                        <img
                            ref={imgRef}
                            src={cardInfo.card_img}
                            className="aiimg text-center"
                            alt="AI 추천 카드"
                        />
                    )}
                </div>
                <div className="col-8 d-flex flex-column justify-content-center px-0">
                    <p className="fs-5 my-0 fw-bold">{cardInfo.card_name}</p>
                    <p className="fs-7">
                        이 카드를 사용하면{' '}
                        <span className="blue-text fw-bolder save">
                            {recommendData.maximumBenefits}원{' '}
                            {recommendData.benefitType}
                        </span>
                        을 받을 수 있어요.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecoCard;
