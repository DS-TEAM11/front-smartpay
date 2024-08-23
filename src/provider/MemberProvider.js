import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Context 생성
const MemberContext = createContext(null);

// Provider 컴포넌트
export const MemberProvider = ({ children }) => {
    const [memberNo, setMemberNo] = useState(null);

    useEffect(() => {
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
    }, []);

    return (
        <MemberContext.Provider value={memberNo}>
            {children}
        </MemberContext.Provider>
    );
};

// Custom Hook
export const useMemberNo = () => {
    return useContext(MemberContext);
};
