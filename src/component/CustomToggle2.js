import React from 'react';
import './CustomToggle2.css';

const CustomToggle2 = ({ onClick, isLeftActive }) => {
    return (
        <div className="custom-toggle2">
            <div className="switch-button2">
                <span
                    className="active2"
                    style={{ left: isLeftActive ? '50%' : '0%' }} // isLeftActive를 반대로 설정
                ></span>
                <button
                    className={`switch-button-case2 left2 ${
                        !isLeftActive ? 'active-case2' : ''
                    }`}
                    onClick={onClick}
                >
                    저번달 {/* 왼쪽 버튼에 저번달 */}
                </button>
                <button
                    className={`switch-button-case2 right2 ${
                        isLeftActive ? 'active-case2' : ''
                    }`}
                    onClick={onClick}
                >
                    이번달 {/* 오른쪽 버튼에 이번달 */}
                </button>
            </div>
        </div>
    );
};

export default CustomToggle2;
