import React from 'react';
import './Loading.css';
import BlackContainer from './BlackContainer';
// import Button from "./Button";

function Loading({ text, info }) {
    return (
        <>
            <BlackContainer />
            <div className="loading d-flex flex-column justify-content-center align-items-center w-75 my-auto">
                <div
                    className="spinner-border text-light spinner-size"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="custom-text text-light fs-6 fw-bolder text-center mt-7">
                    {text}
                </div>
                <div className="text-light fs-6 fw-bolder text-center mt-3">
                    잠시만 기다려주세요.
                </div>

                {info === 'pay' ? (
                    <div className="buttons d-flex w-100 justify-content-between mt-8">
                        {/* 각 텍스트에 기능 달아주기 */}
                        <div className="text-light fs-6 fw-bolder text-center">
                            정보 입력 완료
                        </div>
                        <div className="text-light fs-6 fw-bolder text-center">
                            취소하기
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default Loading;
