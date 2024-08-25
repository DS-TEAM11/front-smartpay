import React, { useEffect, useRef } from 'react';

const CardImg = ({ src, alt, direction }) => {
    const imgRef = useRef(null);
    let rotate = false;
    useEffect(() => {
        const imgElement = imgRef.current;

        const handleImageLoad = () => {
            const naturalWidth = imgElement.naturalWidth;
            const naturalHeight = imgElement.naturalHeight;
            imgElement.classList.remove('rotate');
            if (direction === 'vertical') {
                // direction이 vertical로 설정된 경우
                if (naturalWidth > naturalHeight) {
                    // 가로가 더 길면 90도 회전
                    imgElement.style.transform = 'rotate(90deg)';
                    imgElement.classList.add('rotate');
                } else {
                    // 세로가 더 길거나 같으면 그대로 표시
                    imgElement.style.transform = 'none';
                }
            } else if (direction === 'horizontal') {
                // direction이 horizontal로 설정된 경우
                if (naturalWidth < naturalHeight) {
                    // 세로가 더 길면 90도 회전
                    imgElement.style.transform = 'rotate(90deg)';
                    imgElement.classList.add('rotate');
                } else {
                    // 가로가 더 길거나 같으면 그대로 표시
                    imgElement.style.transform = 'none';
                }
            }
        };

        // 이미지가 이미 로드된 상태인지 확인
        if (imgElement.complete) {
            handleImageLoad();
        } else {
            imgElement.onload = handleImageLoad;
        }
    }); // direction이 변경될 때마다 useEffect 실행

    return <img ref={imgRef} src={src} alt={alt} />;
};

export default CardImg;
