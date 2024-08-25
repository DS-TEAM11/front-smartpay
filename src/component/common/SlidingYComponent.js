import React, { useState } from 'react';
import './SlidingYComponent.css';
import upArrow from '../../img/upArrow.png';
const SlidingYComponent = ({ setShowQr, onClick, children }) => {
    const [startY, setStartY] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (event) => {
        setStartY(event.clientY);
        setIsDragging(true);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;

        // 드래그 중에 수행할 작업이 있다면 여기에 추가
    };

    const handleMouseUp = (event) => {
        if (!isDragging) return;

        const endY = event.clientY;
        const deltaY = endY - startY;

        if (deltaY < -50) {
            // 위로 드래그했을 때 실행할 함수 호출
            // console.log('드래그 방향: 위');
            setShowQr();
        } else {
            //TODO:카드 혜택 정보 보여주기
            onClick();
        }

        resetDragging();
    };

    const handleTouchStart = (event) => {
        setStartY(event.touches[0].clientY);
        setIsDragging(true);
    };

    const handleTouchMove = (event) => {
        if (!isDragging) return;

        // 드래그 중에 수행할 작업이 있다면 여기에 추가
    };

    const handleTouchEnd = (event) => {
        if (!isDragging) return;

        const endY = event.changedTouches[0].clientY;
        const deltaY = endY - startY;
        if (deltaY < -50) {
            // 위로 드래그했을 때 실행할 함수 호출
            // console.log('드래그 방향: 위');
            setShowQr();
        } else {
            onClick();
            //TODO:카드 혜택 정보 보여주기
        }

        resetDragging();
    };

    const resetDragging = () => {
        setIsDragging(false);
        setStartY(null);
    };

    return (
        <div
            className="slide-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={resetDragging} // 마우스가 컴포넌트 영역을 벗어날 때 드래그 상태 리셋
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={resetDragging} // 터치가 취소될 때 드래그 상태 리셋
        >
            <img className="up-arrow" src={upArrow} />
            {children}
        </div>
    );
};

export default SlidingYComponent;
