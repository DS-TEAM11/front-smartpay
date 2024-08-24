import './Order.css';
import { useState, useEffect, useRef } from 'react';

const Order = ({getCardInfo, getBenefit, getPurchase }) => {

    const [cardInfoData, setCardInfoData] = useState({
        card_name: "",
        card_nick: "",
        card_code: "",
        card_company: "",
        lastNums: "",
        card_img: 0,
    });

    const imgRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchCardInfo = async () => {
            const data = await getCardInfo();
            setCardInfoData(data);
        };
        fetchCardInfo();
    }, [getCardInfo]);

    //이미지 가져올 때 크기 판별해서 회전시키는데  아니면 결제 카드는 그냥 카드 이미지에 따라 가로 세로 상관 없이?
    useEffect(() => {
        if (imgRef.current && containerRef.current) {
            const imgElement = imgRef.current;
            const containerElement = containerRef.current;
            const { Width, Height } = imgElement;

            if ( Width > Height) { //가로로된 카드이면
                imgElement.classList.add('rotate-image');
                imgElement.classList.remove('img-size');
                containerElement.style.width = `${Height +15}px`;
                containerElement.style.height = `${Width + 15}px`;
            } 
        }
    }, [cardInfoData.card_img]);

    const isAIRecommended = true; // AI 추천 여부를 나타내는 변수인데 어디서 받아할까,,,

    let FirstMessage;
    let SecondMessage;
    let ThirdMessage;

    if (isAIRecommended) {
        FirstMessage = <>AI 추천 카드로</>;
        SecondMessage = (
            <>
                <span className="blue-text"> {getPurchase.franchiseName}</span>
                에서
                <span className="blue-text"> {getPurchase.price}원</span>
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
                <span className="blue-text"> {getPurchase.franchiseName}</span>
                에서
                <span className="blue-text"> {getPurchase.price}원</span>
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
                        <span className="blue-text"> {getPurchase.franchiseName}</span>에서
                        <span className="blue-text"> {getPurchase.price}원</span>
                    </h4>
                    <h4>
                        결제하고
                        {isAIRecommended && <span className="blue-text"> {getBenefit.maximumBenefits}원</span>}
                        <span className="blue-text"> {getBenefit.benefitType} </span>
                        받을게요.
                    </h4>
                    <div className="d-flex flex-column align-items-center mt-4">
                        <div ref={containerRef} className='card-info-container1'>
                            <img
                                ref={imgRef}
                                src={cardInfoData.card_img}
                                alt="CardImg"
                                className="img-size"
                            />
                        </div>
                        <div className="card-info-container2">
                            <span className='col-6 text-truncate'>{cardInfoData.card_nick}</span>
                            <span className='col-6 text-end'>
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
