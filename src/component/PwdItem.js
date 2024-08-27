import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../component/PwdItem.css';
import Button from './Button';
import { useNavigate, useLocation } from 'react-router-dom';

function PwdItem({ Success }) {
    const [checkPin, setCheckPin] = useState(['', '', '', '', '', '']);
    const [activeCheckPinIndex, setActiveCheckPinIndex] = useState(0);
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const [memberNo, setMemberNo] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // location.state에서 pin과 memberNo를 가져옴, 기본값 설정
    const { pin = [], memberNo: locationMemberNo } = location.state || {};

    useEffect(() => {
        const shuffleNumbers = () => {
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            return numbers.sort(() => Math.random() - 0.5);
        };
        setShuffledNumbers(shuffleNumbers());

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
                        setMemberNo(response.data);
                    })
                    .catch((error) => {
                        console.error('회원 번호 요청 에러', error);
                    });
            }
        } else {
            setMemberNo(locationMemberNo);
        }
    }, [locationMemberNo]);

    const handleCheckPinChange = (value) => {
        if (activeCheckPinIndex < checkPin.length) {
            const newCheckPin = [...checkPin];
            newCheckPin[activeCheckPinIndex] = value;
            setCheckPin(newCheckPin);
            setActiveCheckPinIndex(activeCheckPinIndex + 1);
        }
    };

    const handleUndo = () => {
        if (activeCheckPinIndex > 0) {
            const newCheckPin = [...checkPin];
            newCheckPin[activeCheckPinIndex - 1] = '';
            setCheckPin(newCheckPin);
            setActiveCheckPinIndex(activeCheckPinIndex - 1);
        }
    };

    const verifyPin = () => {
        const checkPinCode = checkPin.join('');

        // // pin이 배열인지 확인하고 비교
        // if (!Array.isArray(pin) || pin.join('') !== checkPinCode) {
        //     alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        //     setCheckPin(['', '', '', '', '', '']);
        //     setActiveCheckPinIndex(0);
        //     return;
        // }

        const payload = {
            memberNo: memberNo,
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
                    // console.log('Data sent:', payload);
                    Success(true);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    alert('비밀번호가 일치하지 않습니다. 다시 시도해 주세요.');
                    Success(false);
                } else {
                    alert('비밀번호 검증에 실패했습니다. 다시 시도해 주세요.');
                    Success(false);
                }
                console.error('비밀번호 검증 오류:', error);
                Success(false);
                setCheckPin(['', '', '', '', '', '']);
                setActiveCheckPinIndex(0);
            });
    };

    return (
        <div className="pwd-pwd-container">
            <h2>스마트페이 결제</h2>
            <div className="passwordText">비밀번호 확인</div>
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
                {shuffledNumbers.map((number, index) => (
                    <button
                        key={number}
                        className={`pin-button ${
                            number === '0' ? 'centered' : ''
                        }`}
                        onClick={() => handleCheckPinChange(number)}
                    >
                        {number}
                    </button>
                ))}
                <button className="pin-button undo-button" onClick={handleUndo}>
                    ⌫
                </button>
            </div>
            <Button
                onClick={verifyPin}
                text="비밀번호 확인"
                className="wide-button"
            />
        </div>
    );
}

export default PwdItem;
