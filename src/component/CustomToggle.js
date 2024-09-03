import React, { useState } from 'react';
import './CustomToggle.css';

const CustomToggle = ({ onClick, isLeftActive }) => {
    // console.log(isLeftActive);
    return (
        <div className="custom-toggle">
            <div className="switch-button">
                <span
                    className="active"
                    style={{ left: isLeftActive ? '0%' : '50%' }}
                ></span>
                <button
                    className={`switch-button-case left ${
                        isLeftActive ? 'active-case' : ''
                    }`}
                    onClick={onClick}
                >
                    혜택 우선
                </button>
                <button
                    className={`switch-button-case right ${
                        !isLeftActive ? 'active-case' : ''
                    }`}
                    onClick={onClick}
                >
                    실적 우선
                </button>
            </div>
        </div>
    );
};

export default CustomToggle;
