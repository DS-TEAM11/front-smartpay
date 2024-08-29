import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
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

// Provider 컴포넌트
export const PayProvider = ({ children }) => {
    const [memberNo, setMemberNo] = useState(null);
    const [selectedCard, setSelectedCard] = useState('');
    const [showQr, setShowQr] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const excludedPaths = [
            '/',
            '/login',
            '/register',
            '/welcome',
            '/seller',
            '/test',
        ];

        if (!excludedPaths.includes(location.pathname.toLowerCase())) {
            const token = localStorage.getItem('accessToken');

            if (token) {
                axios
                    .get(`${ConfigEnum.PAY_SERVER_URL}/member/findMember`, {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .then((response) => {
                        setMemberNo(response.data);
                    })
                    .catch((error) => {
                        console.error('memberNo 요청 에러', error);
                    });
            }
        }
    }, [location.pathname]);

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
