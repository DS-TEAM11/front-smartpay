import React, { useState } from 'react';
import Button from './Button';
const Header = () => {
    return (
        <>
            <header className="header-sticky header-absolute border-bottom">
                {/* <!-- Logo Nav START --> */}
                <nav className="navbar navbar-expand-xl">
                    <div className="container">
                        {/* <!-- Logo START --> */}
                        <a className="navbar-brand col-5 py-0" href="/">
                            <img
                                className="light-mode-item navbar-brand-item"
                                src="/assets/images/splogo2.png"
                                alt="logo"
                                style={{ width: '40px', height: 'auto' }}
                            />
                        </a>
                        {/* <!-- Logo END --> */}

                        {/* <!-- Main navbar START --> */}
                        <div
                            className="navbar-collapse collapse "
                            id="navbarCollapse"
                        >
                            <ul className="navbar-nav navbar-nav-scroll dropdown-hover mx-auto">
                                {/* <!-- Nav item --> */}
                                <li className="nav-item">
                                    {' '}
                                    <a className="nav-link" href="/">
                                        메인 홈{' '}
                                    </a>{' '}
                                </li>
                                <li className="nav-item">
                                    {' '}
                                    <a className="nav-link" href="/history">
                                        결제 내역
                                    </a>{' '}
                                </li>
                                <li className="nav-item">
                                    {' '}
                                    <a className="nav-link" href="/rank">
                                        이달의 카드 순위
                                    </a>{' '}
                                </li>
                                <li className="nav-item">
                                    {' '}
                                    <a className="nav-link" href="/mypage">
                                        마이페이지
                                    </a>{' '}
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Main navbar END --> */}

                        {/* <!-- Buttons --> */}
                        <ul className="nav align-items-center dropdown-hover ms-sm-2">
                            <div className="me-3">
                                <Button
                                    text={'결제 QR 생성'}
                                    onClick={() => {}}
                                />
                            </div>
                            {/* <!-- Responsive navbar toggler --> */}
                            <li className="nav-item">
                                <button
                                    className="navbar-toggler ms-sm-3 p-2"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarCollapse"
                                    aria-controls="navbarCollapse"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-animation">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* <!-- Logo Nav END --> */}
            </header>
        </>
    );
};

export default Header;
