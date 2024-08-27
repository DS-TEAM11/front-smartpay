import React from 'react';
import './RankItem.css';
import CardImg from './homeCards/CardImg';

const RankItem = ({ rankItems }) => {
    return (
        <>
            {rankItems.map(
                (item, index) => (
                    console.log('item:', item),
                    (
                        <div
                            key={index}
                            className={`container my-2 rounded-5 ${
                                index === 0 ? 'borderTest' : 'border'
                            }`}
                        >
                            <div className="row py-2 align-items-center mt-1">
                                <div className="col-1 fs-2 fw-bolder">
                                    {index + 1}
                                </div>
                                <div className="col-3 d-flex justify-content-center pb-2 ">
                                    <CardImg
                                        src={item[4]}
                                        alt={item[2]}
                                        direction="horizontal"
                                    />
                                </div>
                                <div className="col-8 pt-2">
                                    <p className="fs-5 my-0 fw-medium">
                                        {item[2]}
                                    </p>
                                    <p className="fs-7 my-0 fw-lighter">
                                        {item[3]}
                                    </p>
                                    <div className="text-end">
                                        <a
                                            href={item[5]}
                                            className={`icon-link icon-link-hover fs-7 ${
                                                index === 0 ? 'text-light' : ''
                                            }`}
                                        >
                                            신청하기
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ),
            )}
        </>
    );
};

export default RankItem;
