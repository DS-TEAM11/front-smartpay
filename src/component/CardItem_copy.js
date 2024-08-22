import React, { useState, useRef } from 'react';
import QrItem from './QrItem';
import './CardItem.css';

function CardItem() {
    const qrItemRef = useRef(null);

    const handleClick = () => {
        if (qrItemRef.current) {
            qrItemRef.current.showActionSheet();
        }
    };

    return (
        <div className="cardItem">
            <div className="card-container">
                <div className="card-box" onClick={handleClick}>
                    Click Me
                </div>
            </div>
            <QrItem ref={qrItemRef} />
        </div>
    );
}

export default CardItem;
