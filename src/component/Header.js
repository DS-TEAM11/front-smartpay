import React from "react";
import QrItem from './QrItem';

function Header() {

    return (
        <>
            Header입니다.
            <nav class="navbar navbar-expand-xl">
                <div class="container">
                    <a class="navbar-brand me-0">
                        <img class="" src="../img/logo.png" />
                    </a>

                    <ul class="">
                        <li><QrItem /> </li>
                        <li class="nav-item">
                            <button class="navbar-toggler ms-sm-3 p-2" 
                                type="button" data-bs-toggle="collapse" 
                                data-bs-target="#navbarCollapse" 
                                aria-controls="navbarCollapse" 
                                aria-expanded="false" aria-label="Toggle navigation"
                            >
                                <span class="navbar-toggler-animation">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                        </li>
                    </ul>                  
                </div>
            </nav>
        </>
    )
}

export default Header;