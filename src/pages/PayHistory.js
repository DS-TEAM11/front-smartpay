import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './PayHistory.css';
import Header from '../component/Header';

function PayHistory() {
    const [data, setData] = useState(null);
    const [memberNo, setMemberNo] = useState(null);
    const [cardNo, setCardNo] = useState(null);
    const [payDate, setPayDate] = useState(null);

    useEffect(() => {
        // 로컬스토리지에서 토큰 가져오기
        const token = localStorage.getItem('accessToken');

        if (token) {
            // 백엔드로 memberNo 요청
            axios
                .get('http://localhost:8091/member/findMember', {
                    headers: {
                        Authorization: token, // Bearer 포함
                    },
                })
                .then((response) => {
                    setMemberNo(response.data); // 응답받은 memberNo 저장
                })
                .catch((error) => {
                    console.error('memberNo 요청 에러', error);
                });
        }
    }, []);

    useEffect(() => {
        if (memberNo) {
            const token = localStorage.getItem('accessToken');

            axios
                .get('http://localhost:8091/api/payment/history')
                .then((response) => {
                    console(response.data);
                    setData(response.data);
                });
        }
    });

    return (
        <div className="main-container">
            <div className="header">
                <Header />
            </div>
            <div className="title">
                <p>결제내역</p>
            </div>
            <div className="condition-box">
                <div className="condition-date">
                    <input type="date" />
                </div>
                <div className="condition-cardList">
                    <select>
                        <option></option>
                    </select>
                </div>
            </div>
            <div className="data">
                <table>
                    <thead>
                        <tr>
                            <th>1</th>
                            <th>1</th>
                            <th>1</th>
                            <th>1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <th>1</th>
                            <th>1</th>
                            <th>1</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PayHistory;
