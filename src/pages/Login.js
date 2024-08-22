import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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

    // 초기 상태 로깅
    console.log('Initial State:', {
        email,
        password,
        rememberMe,
        autoLogin,
    });

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('로그인 호출');

        const loginData = {
            email: email,
            password: password,
        };

        console.log('이메일,비번 입력받은 값:', loginData);

        try {
            //axios.defaults.withCredentials = true;
            const response = await axios.post(
                'http://localhost:8091/login',
                loginData,
            );

            console.log(response.headers);

            const accessToken = response.headers.authorization;
            const refreshToken = response.headers['authorization-refresh'];

            console.log('Tokens:', { accessToken, refreshToken });

            if (accessToken) {
                console.log('AccessToken exists, 로컬스토리지에 저장');
                localStorage.setItem('accessToken', accessToken);

                if (rememberMe) {
                    console.log('아이디 기억눌림, 로컬스토리지에 이메일저장');
                    localStorage.setItem('savedEmail', email);
                } else {
                    console.log(
                        '아이디 기억 해제, 로컬스토리지에서 이메일삭제 ',
                    );
                    localStorage.removeItem('savedEmail');
                }

                if (autoLogin) {
                    console.log('자동로그인 눌림, 리프레시토큰을 쿠키에 저장 ');
                    document.cookie = `refreshToken=${refreshToken}; path=/; httpOnly`;
                }

                console.log('로그인 성공, 메인으로 리다이렉트');
                alert('로그인 성공');
                navigate('/home');
            } else {
                console.error('액세스토큰 없음, 로그인 실패');
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
        console.log('카카오 로그인 눌림');
        window.location.href =
            'http://localhost:8091/oauth2/authorization/kakao';
    };

    // const handleKakaoLogin = async () => {
    //     console.log('카카오 로그인 눌림');

    //     try {
    //         // 카카오 로그인으로 리디렉션
    //         const response = await axios.get(
    //             'http://localhost:8091/oauth2/authorization/kakao',
    //             { withCredentials: true },
    //         );

    //         console.log('카카오 로그인 응답:', response.headers);

    //         const accessToken = response.headers.authorization;
    //         const refreshToken = response.headers['authorization-refresh'];

    //         console.log('Tokens:', { accessToken, refreshToken });

    //         if (accessToken) {
    //             console.log('AccessToken exists, 로컬스토리지에 저장');
    //             localStorage.setItem('accessToken', accessToken);

    //             if (autoLogin) {
    //                 console.log('자동로그인 눌림, 리프레시토큰을 쿠키에 저장 ');
    //                 document.cookie = `refreshToken=${refreshToken}; path=/; httpOnly`;
    //             }

    //             console.log('카카오 로그인 성공, 메인으로 리다이렉트');
    //             navigate('/');
    //         } else {
    //             console.error('액세스토큰 없음, 카카오 로그인 실패');
    //             alert('카카오 로그인에 실패했습니다.');
    //         }
    //     } catch (error) {
    //         console.error('카카오 로그인 실패:', error);
    //         alert('카카오 로그인에 실패했습니다.');
    //     }
    // };

    return (
        <div className="login-container">
            <div className="logo">
                <img src="assets/images/logo.png" alt="SP Logo" />
            </div>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary login-btn">
                    로그인하기
                </button>
            </form>
            <div className="register-link">
                아직 회원이 아니신가요? <a href="/register">회원가입</a>
            </div>
            <div className="or-divider">Or</div>
            <button
                className="btn btn-warning kakao-login-btn"
                onClick={handleKakaoLogin}
            >
                카카오 로그인
            </button>
        </div>
    );
};

export default Login;
