import CardImg from './homeCards/CardImg';
import './Order.css';
import './homeCards/CardImg.css';
import { useState, useEffect, useRef } from 'react';

const Order = ({ getCardInfo, getBenefit, getPurchase, getIsAi, aiMode }) => {
    const containerRef = useRef(null);
    console.log("Order컴포넌트에서의 모드 : " + aiMode);
    //회전에 따라 저장
    const [isRotated, setIsRotated] = useState(false);
    const handleRotateChange = (rotated, parentDiv, imgElement) => {
        console.log(imgElement);
        console.log(parentDiv);
        setIsRotated(rotated);
    };
    const [cardData, setCardData] = useState({
        card_name: '',
        card_nick: '',
        card_code: '',
        card_company: '',
        lastNums: '',
        card_img: '',
    });

    useEffect(() => {
        // getIsAi가 true이면 aiCard 정보 사용, false이면 selectedCard 정보 사용
        const cardInfo = getIsAi
            ? getCardInfo.aiCard
            : getCardInfo.selectedCard;

        if (cardInfo) {
            setCardData(cardInfo);
        }
    }, [getCardInfo, getIsAi]);

    let FirstMessage;
    let SecondMessage;
    let ThirdMessage;

    let aiModeMessage;
    
    const money = parseInt(getPurchase.price);
    const saveMoney = parseInt(getBenefit.maximumBenefits);

    console.log(aiMode);
    if (aiMode === 0) {
        aiModeMessage ='혜택 우선';
    } else if (aiMode === 1) {
        aiModeMessage = '실적 우선';
    } 

    console.log(aiModeMessage);
    if (getIsAi) {
        if (aiMode === 1) {
            // aiMode가 1일 때 문구
            FirstMessage = <>AI 추천카드로</>;
            SecondMessage = (
                <>
                    <span className="blue-text fw-bold"> {getPurchase.franchiseName}</span>
                    에서
                    <span className="blue-text fw-bold"> {money.toLocaleString()}원</span>
                </>
            );
            ThirdMessage = (
                <>
                    결제하고 <span className="blue-text fw-bold"> 실적</span>을 쌓을게요.
                </>
            );
        } else if (aiMode === 0) {
            // aiMode가 0일 때 문구 (기존 문구)
            FirstMessage = <>AI 추천 카드로</>;
            SecondMessage = (
                <>
                    <span className="blue-text fw-bold"> {getPurchase.franchiseName}</span>
                    에서
                    <span className="blue-text fw-bold"> {money.toLocaleString()}원</span>
                </>
            );
            ThirdMessage = (
                <>
                    결제하고
                    <span className="blue-text fw-bold">
                        {' '}
                        {saveMoney.toLocaleString()}원
                    </span>
                    <span className="blue-text fw-bold"> {getBenefit.benefitType} </span>
                    받을게요.
                </>
            );
        }
    } else {
        FirstMessage = <>선택한 카드로</>;
        SecondMessage = (
            <>
                <span className="blue-text fw-bold"> {getPurchase.franchiseName}</span>
                에서
                <span className="blue-text fw-bold"> {money.toLocaleString()}원</span>
            </>
        );
        ThirdMessage = <>결제할게요.</>;
    }

    return (
        <div className="container pt-4 pt-sm-5">
            <div className="Order">
                <h4>{FirstMessage}</h4>
                <h4>{SecondMessage}</h4>
                <h4>{ThirdMessage}</h4>
                <div className="d-flex flex-column align-items-center mt-4">
                    <div ref={containerRef} className="card-info-container1">
                        <CardImg
                            src={cardData.card_img}
                            alt={cardData.card_nick}
                            direction="vertical"
                            onRotateChange={handleRotateChange}
                        ></CardImg>
                    </div>
                    <div className="card-info-container2">
                        <span className="col-6 text-truncate">
                            {cardData.card_nick
                                ? cardData.card_nick
                                : cardData.card_name}
                        </span>
                        <span className="col-6 text-end">
                            {cardData.card_company} (
                            {cardData.lastNums
                                ? cardData.lastNums.slice(-4)
                                : 'error'}
                            )
                        </span>
                    </div>
                </div>
                <h4 className="text-center mt-3">{cardData.card_name}</h4>
            </div>
        </div>
    );
};

export default Order;
