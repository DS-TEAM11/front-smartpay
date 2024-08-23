import axios from 'axios';
import './Order.css';
import { useState, useEffect } from 'react';

const Order = ({getCardInfo, getBenefit }) => {

    const [cardInfoData, setCardInfoData] = useState({
        card_name: "",
        card_nick: "",
        card_code: "",
        card_company: "",
        lastNums: "",
        card_img:0,
    });
    useEffect(() => {
        // 컴포넌트가 마운트될 때 getCardInfo 호출
        const fetchCardInfo = async () => {
            const data = await getCardInfo();
            setCardInfoData(data);
        };
        fetchCardInfo();
    }, [getCardInfo]);

    

    const franchise = 'GS25';
    const testprice = 150000;


    const isAIRecommended = false; // AI 추천 여부를 나타내는 변수인데 어디서 받아할까,,,

    let FirstMessage;
    let SecondMessage;
    let ThirdMessage;

    if (isAIRecommended) {
        FirstMessage = <>AI 추천 카드로</>;
        SecondMessage = (
            <>
                <span className="blue-text"> {franchise}</span>
                에서
                <span className="blue-text"> {testprice}원</span>
            </>
        );
        ThirdMessage = (
            <>
                결제하고
                <span className="blue-text"> {getBenefit.maximumBenefits}원</span>
                <span className="blue-text"> {getBenefit.benefitType} </span>
                받을게요.
            </>
        );
    } else {
        FirstMessage = <>선택한 카드로</>;
        SecondMessage = (
            <>
                <span className="blue-text"> {franchise}</span>
                에서
                <span className="blue-text"> {testprice}원</span>
            </>
        );
        ThirdMessage = <>결제할게요.</>;
    }

    return (
        <section className="position-relative overflow-hidden pb-0 pt-xl-9">
            <div className="container pt-4 pt-sm-5">
                <div className="Order">
                    <h4>{isAIRecommended ? 'AI 추천 카드로' : '선택한 카드로'}</h4>
                    <h4>
                        <span className="blue-text"> {franchise}</span>에서
                        <span className="blue-text"> {testprice}원</span>
                    </h4>
                    <h4>
                        결제하고
                        {isAIRecommended && <span className="blue-text"> {getBenefit.maximumBenefits}원</span>}
                        <span className="blue-text"> {getBenefit.benefitType} </span>
                        받을게요.
                    </h4>
                    <div className="d-flex flex-column align-items-center mt-4">
                        <img
                            src={cardInfoData.card_img}
                            alt="CardImg"
                            className="img-fluid "
                        />
                        <div className="card-info-container2">
                            <span>{cardInfoData.card_nick}</span>
                            <span>
                                {cardInfoData.card_company} ({cardInfoData.lastNums})
                            </span>
                        </div>
                    </div>
                    <h4 className="text-center mt-3">{cardInfoData.card_name}</h4>
                </div>
            </div>
        </section>
    );
};

export default Order;
