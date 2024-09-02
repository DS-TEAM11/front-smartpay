import React, { useState, useEffect } from 'react';
import './MyCardList.css';
import CardImg from '../homeCards/CardImg';
import UpBtn from '../../img/priorityUpBtn.svg';

const MyCardList = ({ isLeftActive, cardList }) => {
    //회전에 따라 저장
    const [isRotated, setIsRotated] = useState(false);
    const handleRotateChange = (rotated, parentDiv, imgElement) => {
        setIsRotated(rotated);
    };
    const [notCard, setNotCard] = useState(false);
    const [editCardList, setEditCardList] = useState(cardList);
    const btnClick = (e) => {
        console.log(e);
        const sortedCards = cardList.reduce((acc, card) => {
            // 바라보고 있는 토글에 따라(left - 혜택 우선) 카드 재정렬

            console.log('acc', acc);
            console.log('card', card);

            return acc;
        }, {});
    };

    useEffect(() => {
        if (cardList.length === 0) {
            setNotCard(true);
        } else {
            setNotCard(false);
        }
    }, [cardList]);
    // console.log('MyCardList에서 받은 정보', cardList);

    return (
        <>
            {notCard ? (
                <div className="text-center fs-3">카드가 없습니다.</div>
            ) : (
                <div className="my-card-list-container">
                    {cardList.map((item, index) => (
                        <div
                            key={index}
                            className={`container my-2 rounded-5 ${
                                index === 0 ? 'first' : ''
                            }`}
                        >
                            <div className="row py-2 align-items-center mt-1">
                                <div className="col-1 fs-2 fw-bolder">
                                    {index + 1}
                                </div>
                                <div className="col-3 d-flex justify-content-center pb-2">
                                    <CardImg
                                        src={item.cardImg}
                                        alt={item.cardName}
                                        direction="horizontal"
                                        onRotateChange={handleRotateChange}
                                        className="sm"
                                    />
                                </div>
                                <div className="col-5 pt-2">
                                    <p className="fs-5 my-0 fw-medium cardName">
                                        {item.cardNick}({item.cardName})
                                    </p>
                                    <p className="fs-7 my-0 fw-medium">
                                        {item.cardCompany}
                                    </p>
                                </div>
                                <div className="col-2 pt-2">
                                    <div className="text-end">
                                        {index === 0 ? (
                                            ''
                                        ) : (
                                            <svg
                                                className="priorityUpBtn"
                                                onClick={btnClick}
                                                width="27"
                                                height="26"
                                                viewBox="0 0 27 26"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15.7073 2.21581L25.8697 21.3262C26.7551 22.9914 25.5483 25 23.6623 25H3.33766C1.4517 25 0.244863 22.9914 1.13035 21.3262L11.2927 2.21581C12.233 0.447523 14.767 0.447524 15.7073 2.21581Z"
                                                    fill="#4F46E5"
                                                    stroke="#DCE0E5"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default MyCardList;
