import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import { InputValue } from '../component/common/InputValue';
import './Login.css';
import logoImage from '../img/logo3.png';
import kakaoLogoSmall from '../img/kakao_login_small.png'; // 카카오 로고 이미지 import

const Login = () => {
    const [email, setEmail] = useState(
        localStorage.getItem('savedEmail') || '',
    );
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(
        !!localStorage.getItem('savedEmail'),
    );
    const [autoLogin, setAutoLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('로그인 호출');

        const loginData = {
            email: email,
            password: password,
        };

        console.log('이메일,비번 입력받은 값:', loginData);

        try {
            const response = await axios.post(
                'http://localhost:8091/login',
                loginData,
            );

            const accessToken = response.headers.authorization;
            const refreshToken = response.headers['authorization-refresh'];

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);

                if (rememberMe) {
                    localStorage.setItem('savedEmail', email);
                } else {
                    localStorage.removeItem('savedEmail');
                }

                if (autoLogin) {
                    document.cookie = `refreshToken=${refreshToken}; path=/; httpOnly`;
                }

                alert('로그인 성공');
                navigate('/home');
            } else {
                alert('로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error(
                '로그인 실패:',
                error.response ? error.response.data : error.message,
            );
            alert('로그인에 실패했습니다.');
        }
    };

    const handleKakaoLogin = () => {
        window.location.href =
            'http://localhost:8091/oauth2/authorization/kakao';
    };

    return (
        <div className="login-container">
            <div className="login-logo-wrapper">
                <img src={logoImage} alt="SP Logo" className="login-logo" />
            </div>
            <form onSubmit={handleLogin}>
                <InputValue
                    type="email"
                    placeholder="Email"
                    title="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <InputValue
                    type="password"
                    placeholder="Password"
                    title="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="options">
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        ID 저장
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={autoLogin}
                            onChange={(e) => setAutoLogin(e.target.checked)}
                        />
                        자동로그인
                    </label>
                    <a href="#" className="find-id-pw">
                        ID/PW 찾기
                    </a>
                </div>
                <Button
                    type="submit"
                    className="login-btn"
                    text={'로그인하기'}
                />
            </form>
            <div className="register-link">
                아직 회원이 아니신가요? <a href="/signup">회원가입</a>
            </div>
            <Button
                className="kakao-login-btn"
                text={'카카오 로그인'}
                onClick={handleKakaoLogin}
            >
                <img
                    src={kakaoLogoSmall}
                    alt="Kakao Logo"
                    className="kakao-logo"
                />
            </Button>
        </div>
    );
};

export default Login;
