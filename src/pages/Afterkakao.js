import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Afterkakao = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // URL에서 쿼리 파라미터로 토큰 추출
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');

        console.log('URL에서 추출한 AccessToken:', accessToken);
        console.log('URL에서 추출한 RefreshToken:', refreshToken);

        // 로컬 스토리지에 AccessToken 저장
        if (accessToken) {
            console.log('AccessToken exists, 로컬스토리지에 저장');
            localStorage.setItem('accessToken', accessToken);
        }

        // 쿠키에 RefreshToken 저장
        if (refreshToken) {
            console.log('RefreshToken exists, 쿠키에 저장');
            document.cookie = `refreshToken=${refreshToken}; path=/; httpOnly`;
        }

        // 메인 페이지로 리디렉트
        navigate('/home');
    }, [navigate]);

    return (
        <div>
            <h2>카카오 로그인 처리 중...</h2>
        </div>
    );
};

export default Afterkakao;
