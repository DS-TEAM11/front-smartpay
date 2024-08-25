import './Order.css';
import { useState, useEffect, useRef } from 'react';

const Order = ({ getCardInfo, getBenefit, getPurchase, getIsAi }) => {
    const imgRef = useRef(null);
    const containerRef = useRef(null);

    const [cardData, setCardData] = useState({
        card_name: "",
        card_nick: "",
        card_code: "",
        card_company: "",
        lastNums: "",
        card_img: "",
    });

    useEffect(() => {
        // getIsAi가 true이면 aiCard 정보 사용, false이면 selectedCard 정보 사용
        const cardInfo = getIsAi ? getCardInfo.aiCard : getCardInfo.selectedCard;

        if (cardInfo) {
            setCardData(cardInfo);
        }
    }, [getCardInfo, getIsAi]);

    useEffect(() => {
        if (imgRef.current && containerRef.current && cardData.card_img) {
            const imgElement = imgRef.current;
            const containerElement = containerRef.current;
            const { naturalWidth: width, naturalHeight: height } = imgElement;

            if (width > height) { // 가로로 된 카드이면
                imgElement.classList.add('rotate-image');
                imgElement.classList.remove('img-size');
                containerElement.style.width = `${height + 15}px`;
                containerElement.style.height = `${width + 15}px`;
            }
        }
    }, [cardData.card_img]);
    // const isAIRecommended = true; // AI 추천 여부를 나타내는 변수인데 어디서 받아할까,,,

    let FirstMessage;
    let SecondMessage;
    let ThirdMessage;

    if (getIsAi) {
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
                    <h4>{FirstMessage}</h4>
                    <h4>{SecondMessage}</h4>
                    <h4>{ThirdMessage}</h4>
                    <div className="d-flex flex-column align-items-center mt-4">
                        <div ref={containerRef} className='card-info-container1'>
                            <img
                                ref={imgRef}
                                src={cardData.card_img}
                                alt="CardImg"
                                className="img-size"
                            />
                        </div>
                        <div className="card-info-container2">
                            <span className='col-6 text-truncate'>{cardData.card_nick}</span>
                            <span className='col-6 text-end'>
                                {cardData.card_company} ({cardData.lastNums.slice(-4)})
                            </span>
                        </div>
                    </div>
                    <h4 className="text-center mt-3">{cardData.card_name}</h4>
                </div>
            </div>
        </section>
    );
};


export default Order;
