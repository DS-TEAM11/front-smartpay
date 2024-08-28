import React, { useEffect, useRef } from 'react';
import './CardImg.css';

const CardImg = React.memo(
    ({ src, alt, direction, type, onClick, children, onRotateChange }) => {
        const imgRef = useRef(null);

        useEffect(() => {
            const imgElement = imgRef.current;
            const parentDiv = imgElement.closest('.slide-container');

            const handleImageLoad = () => {
                const naturalWidth = imgElement.naturalWidth;
                const naturalHeight = imgElement.naturalHeight;
                imgElement.classList.remove('rotate');
                let rotated = false;

                if (direction === 'vertical') {
                    if (naturalWidth > naturalHeight) {
                        imgElement.classList.add('rotate');
                        rotated = true;
                    }
                } else if (direction === 'horizontal') {
                    if (naturalWidth < naturalHeight) {
                        imgElement.classList.add('rotate');
                        rotated = true;
                    }
                }

                if (onRotateChange) {
                    onRotateChange(rotated, parentDiv, imgElement);
                }
            };

            if (imgElement.complete) {
                handleImageLoad();
            } else {
                imgElement.onload = handleImageLoad;
            }
        }, [direction, onRotateChange]);

        if (type === 'li') {
            return (
                <li className="cardImg" onClick={onClick}>
                    {children}
                    <img ref={imgRef} src={src} alt={alt} />
                </li>
            );
        }
        return (
            <div className="cardImg" onClick={onClick}>
                {children}
                <img ref={imgRef} src={src} alt={alt} />
            </div>
        );
    },
);

export default CardImg;
