import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/Header';
import './MemberPwd.css'; // MemberPwd와 동일한 CSS 사용
import Button from '../component/Button';

function CheckPwd() {
    const [checkPin, setCheckPin] = useState(['', '', '', '', '', '']);
    const [activeCheckPinIndex, setActiveCheckPinIndex] = useState(0);
    const [shuffledNumbers, setShuffledNumbers] = useState([]); // 상태 정의
    const [memberNo, setMemberNo] = useState(null); // 상태 정의
    const location = useLocation();
    const navigate = useNavigate();

    // location.state에서 pin과 memberNo를 모두 가져옴
    const { pin, memberNo: locationMemberNo } = location.state || {};

    useEffect(() => {
        // 입력 패드를 랜덤으로 섞기 위한 코드
        const shuffleNumbers = () => {
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            return numbers.sort(() => Math.random() - 0.5);
        };
        setShuffledNumbers(shuffleNumbers());

        // location.state로 전달된 memberNo가 없으면 API를 통해 가져옴
        if (!locationMemberNo) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                axios
                    .get('http://localhost:8091/member/findMember', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        setMemberNo(response.data); // 서버로부터 회원 번호 설정
                    })
                    .catch((error) => {
                        console.error('회원 번호 요청 에러', error);
                    });
            }
        } else {
            setMemberNo(locationMemberNo); // location에서 받은 memberNo 설정
        }
    }, [locationMemberNo]); // locationMemberNo가 변경될 때마다 useEffect 재실행

    const handleCheckPinChange = (value) => {
        if (activeCheckPinIndex < checkPin.length) {
            const newCheckPin = [...checkPin];
            newCheckPin[activeCheckPinIndex] = value;
            setCheckPin(newCheckPin);
            setActiveCheckPinIndex(activeCheckPinIndex + 1);
        }
    };

    const verifyPin = () => {
        const checkPinCode = checkPin.join('');

        if (pin.join('') !== checkPinCode) {
            alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
            setCheckPin(['', '', '', '', '', '']);
            setActiveCheckPinIndex(0);
            return;
        }

        const payload = {
            memberNo: memberNo, // 상태에서 memberNo를 사용
            payPwd: checkPinCode,
        };

        axios
            .post('http://localhost:8091/member/isTruePaypwd', payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken',
                    )}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    alert('정상적으로 등록되었습니다.');
                    navigate('/home'); // 홈 화면으로 이동
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    alert('비밀번호가 일치하지 않습니다. 다시 시도해 주세요.');
                } else {
                    alert('비밀번호 검증에 실패했습니다. 다시 시도해 주세요.');
                }
                console.error('비밀번호 검증 오류:', error);
                setCheckPin(['', '', '', '', '', '']); // 비밀번호 입력 초기화
                setActiveCheckPinIndex(0); // 인덱스 초기화
            });
    };

    return (
        <div>
            <Header />
            <div className="member-pwd-container">
                <h2>스마트페이 결제</h2>
                <p>비밀번호 확인</p>
                <div className="pin-circles">
                    {checkPin.map((_, index) => (
                        <div
                            key={index}
                            className={`circle ${
                                index < activeCheckPinIndex ? 'filled' : ''
                            }`}
                        ></div>
                    ))}
                </div>
                <div className="pin-keypad">
                    {[...Array(10).keys()].map((number) => (
                        <button
                            key={number}
                            className="pin-button"
                            onClick={() =>
                                handleCheckPinChange(number.toString())
                            }
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        className="pin-button undo-button"
                        onClick={() => {
                            if (activeCheckPinIndex > 0) {
                                const newCheckPin = [...checkPin];
                                newCheckPin[activeCheckPinIndex - 1] = '';
                                setCheckPin(newCheckPin);
                                setActiveCheckPinIndex(activeCheckPinIndex - 1);
                            }
                        }}
                    >
                        ⌫
                    </button>
                </div>
                <Button
                    onClick={verifyPin}
                    text="비밀번호 확인"
                    className="wide-button"
                />
            </div>
        </div>
    );
}

export default CheckPwd;
