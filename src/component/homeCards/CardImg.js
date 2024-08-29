import React, { useEffect, useRef } from 'react';
import './CardImg.css';

const CardImg = React.memo(
    ({
        className,
        src,
        alt,
        direction,
        type,
        onClick,
        children,
        onRotateChange,
    }) => {
        const imgRef = useRef(null);

        useEffect(() => {
            const imgElement = imgRef.current;
            const parentDiv = imgElement.parentElement;
            if (className) {
                parentDiv.classList.add(className);
            }
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

                if (direction && parentDiv && imgElement.width) {
                    if (rotated && !parentDiv.style.width) {
                        parentDiv.style.height = imgElement.width + 'px';
                        parentDiv.style.width = imgElement.height + 'px';
                    } else if (!rotated && !parentDiv.style.height) {
                        parentDiv.style.height = imgElement.height + 'px';
                        parentDiv.style.width = imgElement.width + 'px';
                    }
                }
            };

            imgElement.onload = handleImageLoad;

            // 만약 이미지가 이미 로드된 상태라면, handleImageLoad를 즉시 호출
            if (imgElement.complete) {
                handleImageLoad();
            }

            return () => {
                imgElement.onload = null; // 메모리 누수 방지
            };
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
