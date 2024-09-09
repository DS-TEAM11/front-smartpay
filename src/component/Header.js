import React, { useState, useRef, createContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import QrItem from './useQR/QrItem';
import axios from 'axios';
import './Header.css';

// 환경 변수를 올바르게 불러옵니다.
const ConfigEnum = Object.freeze({
    PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
    COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
});
const ConfigContext = createContext(ConfigEnum); // ConfigContext 생성

const Header = ({ subscription, subMessage, isLeftActive }) => {
    const [showQr, setShowQr] = useState(false); // 상태를 추가하여 QR 코드를 표시할지 여부를 관리합니다.
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick = () => {
        setShowQr(true);
    };
    const removeQrItem = () => {
        setShowQr(false);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            console.log(`${ConfigEnum.PAY_SERVER_URL}/member/logout`);

            // 백엔드 서버로 로그아웃 요청을 보냄
            await axios.post(
                `${ConfigEnum.PAY_SERVER_URL}/member/logout`,
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                    withCredentials: true, // 쿠키를 함께 전송
                },
            );

            // 로컬 스토리지와 쿠키에서 토큰 삭제
            document.cookie = 'refreshToken=; Max-Age=0; path=/;';
            localStorage.removeItem('accessToken');

            // 로그인 페이지로 이동
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('로그아웃 실패:', error);
            // 로그아웃 실패 시 사용자에게 피드백 제공 (옵션)
        }
    };

    return (
        <>
            <div className="qrshow">
                {showQr && (
                    <QrItem
                        onRemove={removeQrItem}
                        cardCode={null}
                        subscription={subscription}
                        subMessage={subMessage}
                        isLeftActive={isLeftActive}
                    />
                )}
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
                                <li className="nav-item">
                                    {/* <!-- 로그아웃 버튼 추가 --> */}
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={handleLogout}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        로그아웃
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Main navbar END --> */}
                        {/* <!-- Buttons --> */}
                        <ul className="nav align-items-center dropdown-hover ms-sm-2">
                            <div className="me-3">
                                {location.pathname.toLowerCase() ===
                                    '/home' && (
                                    <Button
                                        className="qr-create-btn"
                                        text={'AI QR 코드 생성'}
                                        onClick={handleClick}
                                    />
                                )}
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
