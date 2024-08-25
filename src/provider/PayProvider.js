import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
                    .get('http://localhost:8091/member/findMember', {
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
        <MemberContext.Provider value={memberNo}>
            <SelectedCardContext.Provider
                value={{ selectedCard, setSelectedCard }}
            >
                <ShowQrContext.Provider value={{ showQr, setShowQr }}>
                    {children}
                </ShowQrContext.Provider>
            </SelectedCardContext.Provider>
        </MemberContext.Provider>
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

export { useMemberNo, useSelectedCard, useShowQr };
