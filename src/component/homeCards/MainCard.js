import React, { useState } from 'react';
import CardImg from './CardImg';
import BenefitItem from './BenefitItem';

const MainCard = React.memo(({ card, showBenefit, children }) => {
    const { cardImg, cardName } = card;
    const [isRotated, setIsRotated] = useState(false);

    const handleRotateChange = (rotated, parentDiv, imgElement) => {
        setIsRotated(rotated);
        if (parentDiv && isRotated) {
            parentDiv.style.height = imgElement.width + 'px';
            parentDiv.style.width = imgElement.height + 'px';
        } else if (parentDiv && !isRotated) {
            parentDiv.style.height = imgElement.height + 'px';
            parentDiv.style.width = imgElement.width + 'px';
        }
    };

    return (
        <>
            <CardImg
                src={cardImg}
                alt={cardName}
                direction="horizontal"
                onRotateChange={handleRotateChange}
            >
                {showBenefit && <BenefitItem card={card} />}
            </CardImg>
            {children}
        </>
    );
});

export default MainCard;
