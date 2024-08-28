import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import QrItem from './useQR/QrItem';
import './Header.css';
const Header = () => {
    const [showQr, setShowQr] = useState(false); // 상태를 추가하여 QR 코드를 표시할지 여부를 관리합니다.

    const handleClick = () => {
        setShowQr(true);
    };
    const removeQrItem = () => {
        setShowQr(false);
    };
    return (
        <>
            <div className="qrshow">
                {showQr && <QrItem onRemove={removeQrItem} cardCode={null} />}
            </div>
            <header className="header border-bottom">
                {/* <!-- Logo Nav START --> */}
                <nav className="navbar navbar-expand-xl">
                    <div className="container">
                        {/* <!-- Logo START --> */}
                        <Link className="navbar-brand py-0" to="/home">
                            <img
                                className="light-mode-item navbar-brand-item"
                                src="/assets/images/splogo2.png"
                                alt="logo"
                                style={{ width: '40px', height: 'auto' }}
                            />
                        </Link>
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
                                    <Link className="nav-link" to="/home">
                                        메인 홈{' '}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    {' '}
                                    <Link className="nav-link" to="/history">
                                        결제 내역
                                    </Link>{' '}
                                </li>
                                <li className="nav-item">
                                    {' '}
                                    <Link className="nav-link" to="/rank">
                                        이달의 카드 순위
                                    </Link>{' '}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/mypage">
                                        마이페이지
                                    </Link>{' '}
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Main navbar END --> */}
                        {/* <!-- Buttons --> */}
                        <ul className="nav align-items-center dropdown-hover ms-sm-2">
                            <div className="me-3">
                                <Button
                                    className="qr-create-btn"
                                    text={'AI QR 코드 생성'}
                                    onClick={handleClick}
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
