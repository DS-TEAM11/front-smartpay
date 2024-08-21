import React from "react";
import "./RankItem.css";

const RankItem = () => {
    const cardImg = [
        'https://d1c5n4ri2guedi.cloudfront.net/card/146/card_img/20372/146card.png',
        'https://d1c5n4ri2guedi.cloudfront.net/card/580/card_img/21321/580card.png',
        'https://d1c5n4ri2guedi.cloudfront.net/card/121/card_img/20353/121card.png'
    ];
    const cardPage = [
        'https://card.kbcard.com/CRD/DVIEW/HCAMCXPRICAC0076?cooperationcode=09250&mainCC=a&solicitorcode=7030084000',
        'https://card.kbcard.com/CRD/DVIEW/HCAMCXPRICAC0076?cooperationcode=09251&mainCC=a',
        'https://card.kbcard.com/CRD/DVIEW/HCAMCXPRICAC0076?cooperationcode=09169&mainCC=a&solicitorcode=7030084000'
    ];
    const cardName = ['The Easy카드','Easy pick 티타늄 카드',  '다담카드'];
    const saveInfo = ['배달앱 + 간편 결제', '마트+교육비', '점심+교통'];

    // Create an array of card objects
    const cardList = cardImg.map((img, index) => ({
        img: img,
        page: cardPage[index],
        name: cardName[index],
        info: saveInfo[index]
    }));

    return (
        <>
            {cardList.map((card, index) => (
                <div
                    key={index}
                    className={`container  my-2  rounded-5 ${index === 0 ? 'borderTest' : 'border'} `}
                >
                    <div className="row py-2 align-items-center mt-1">
                        <div className="col-1 fs-2 fw-bolder">{index + 1}</div>
                        <div className="col-3 d-flex justify-content-center pb-2">
                            <img src={card.img} className="rankImg" alt="rankCard" />
                        </div>
                        <div className="col-8 pt-2">
                            <p className="fs-5 my-0 fw-medium">{card.name}</p>
                            <p className="fs-7 my-0 fw-lighter">{card.info}</p>
                            <div className="text-end">
                                <a href={card.page} target="_blank" rel="noopener noreferrer" className={`fs-7 ${index === 0 ? 'text-light   ' : ''} `}>
                                    신청하기 &nbsp;<i className="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default RankItem;
