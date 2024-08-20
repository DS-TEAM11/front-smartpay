import React from "react";
import "./Loading.css";
// import Button from "./Button";


function Loading({text}) {
    return(
        <>
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        </>

    )
}

export default Loading;