import React from "react";
import "./Loading.css";
// import Button from "./Button";


function Loading({text}) {
    return (
        <>
            <div className="Loading d-flex flex-column justify-content-center align-items-center">
                <div className="spinner-border text-light spinner-size" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="text-light fs-6 fw-bolder text-center px-6 mt-7">{text}</div>
                <div className="text-light fs-6 fw-bolder text-center mt-3">잠시만 기다려주세요.</div>
            </div>
        </>
    );
}

export default Loading;