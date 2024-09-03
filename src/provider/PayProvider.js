import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
const ConfigEnum = Object.freeze({
    PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
    COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
});
const ConfigContext = createContext(ConfigEnum); // ConfigContext 생성

// Context 생성
const MemberContext = createContext(null);
const SelectedCardContext = createContext({
    selectedCard: '',
    setSelectedCard: () => {},
});
const ShowQrContext = createContext({
    showQr: false,
    setShowQr: () => {},
});
const excludedPaths = [
    '/',
    '/login',
    '/signup',
    '/welcome',
    '/seller',
    '/test',
];
// Provider 컴포넌트
let memberNo = null;
export const PayProvider = ({ children }) => {
    const [selectedCard, setSelectedCard] = useState('');
    const [showQr, setShowQr] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    let token = localStorage.getItem('accessToken');
    let newRefreshToken = null;
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchMemberNo = async () => {
            if (!token) {
                // 액세스 토큰이 없을 경우 쿠키에 있는 리프레시 토큰으로 재발급 요청
                // console.log('토큰 없음');
                await axios
                    .get(`${ConfigEnum.PAY_SERVER_URL}/member/jwt-test`, {
                        withCredentials: true, // 쿠키 자동 전송
                    })
                    .then((res) => {
                        // console.log('리프레시 토큰을 통한 재발급 요청', res);
                        token = res.headers['authorization'];
                        newRefreshToken = res.headers['authorization-refresh'];

                        // 새로운 토큰들을 저장
                        if (token) {
                            localStorage.setItem('accessToken', token);
                        }
                        if (newRefreshToken) {
                            document.cookie = `refreshToken=${newRefreshToken}; path=/; HttpOnly`;
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            // 인증 에러 발생 시 리프레시 토큰 삭제 및 로그인 페이지로 리다이렉트
                            document.cookie =
                                'refreshToken=; Max-Age=0; path=/;';
                            navigate('/login');
                            return;
                        }
                        if (err.response.status === 404) {
                            console.log(
                                '404 에러 발생, 로그인 페이지로 리다이렉트',
                            );
                            navigate('/login', {
                                replace: true,
                            }); // replace 옵션을 추가해 브라우저 기록을 남기지 않음
                            return;
                        }
                        if (err.response.status === 500) {
                            console.log(
                                '500 에러 발생, 로그인 페이지로 리다이렉트',
                            );
                            navigate('/login', {
                                replace: true,
                            }); // replace 옵션을 추가해 브라우저 기록을 남기지 않음
                            return;
                        }
                    });
            }
            // console.log('액세스 토큰:', token);
            // console.log('리프레시 토큰:', newRefreshToken);
            // console.log('액세스 토큰으로 memberNo 가져오기');
            // 액세스 토큰으로 memberNo 가져오기

            memberNo = await axios
                .get(`${ConfigEnum.PAY_SERVER_URL}/member/findMember`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((res) => {
                    // console.log('axios 내부', res.data);
                    return res.data;
                })
                .catch((err) => {
                    console.log('Failed to fetch memberNo', err);
                    if (err.response.status === 500) {
                        console.log(token, '500 에러 발생');
                        // navigate('/login', { replace: true });
                    }
                });
            // console.log('axois 이후', memberNo);
            setIsLoading(false);
        };
        if (
            !excludedPaths.includes(location.pathname.toLowerCase()) &&
            !memberNo
        ) {
            fetchMemberNo();
        }
    }, [location.pathname, navigate]);
    //멤버 정보 없으면 로그인 페이지로 이동
    useEffect(() => {
        if (
            !isLoading &&
            !excludedPaths.includes(location.pathname.toLowerCase()) &&
            !memberNo
        ) {
            navigate('/login', { replace: true });
        }
    }, [location.pathname, navigate]);
    // console.log(' 최종 멤버번호:', memberNo);
    return (
        <ConfigContext.Provider value={ConfigEnum}>
            <MemberContext.Provider value={memberNo}>
                <SelectedCardContext.Provider
                    value={{ selectedCard, setSelectedCard }}
                >
                    <ShowQrContext.Provider value={{ showQr, setShowQr }}>
                        {children}
                    </ShowQrContext.Provider>
                </SelectedCardContext.Provider>
            </MemberContext.Provider>
        </ConfigContext.Provider>
    );
};

// Custom Hooks for accessing contexts
const useMemberNo = () => {
    return useContext(MemberContext);
};

const useSelectedCard = () => {
    const context = useContext(SelectedCardContext);
    if (!context) {
        throw new Error('useSelectedCard must be used within a PayProvider');
    }
    return context;
};

const useShowQr = () => {
    const context = useContext(ShowQrContext);
    if (!context) {
        throw new Error('useShowQr must be used within a PayProvider');
    }
    return context;
};

const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a PayProvider');
    }
    return context;
};

export { useMemberNo, useSelectedCard, useShowQr, useConfig };
