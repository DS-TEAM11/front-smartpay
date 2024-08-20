import React from "react";
import "./RecoCard.css";

const RecoCard = ({}) => {
    let cardName = "The Easy카드";
    let savePrice = 300;
    let saveType = "적립";
    return(
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
                    <img
                        src="https://d1c5n4ri2guedi.cloudfront.net/card/146/card_img/20372/146card.png" 
                        className="img-fluid aiimg text-center"
                        alt="AI 추천 카드"
                    />
                </div>
                <div className="col-8 d-flex flex-column justify-content-center px-0">
                    <p className="fs-5 my-0 fw-bold">{cardName}</p>
                    <p className="fs-7">이 카드를 사용하면 <span className="blue-text fw-bolder save">{savePrice}원 {saveType}</span>을 받을 수 있어요.</p>
                </div>
            </div>
        </div>
    );
}
export default RecoCard;

