import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import './MemberPwd.css';
import Button from '../component/Button';
import { useMemberNo } from '../provider/PayProvider';

function MemberPwd({ Success }) {
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [activePinIndex, setActivePinIndex] = useState(0);
    // const [memberNo, setMemberNo] = useState(null); // 서버로부터 받아온 회원 번호 상태
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const [statePwd, setStatePwd] = useState(false);
    const navigate = useNavigate();
    const memberNo = useMemberNo();

    useEffect(() => {
        // 임의로 섞인 숫자 패드를 설정
        const shuffleNumbers = () => {
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            return numbers.sort(() => Math.random() - 0.5);
        };
        setShuffledNumbers(shuffleNumbers());

        // 회원 번호를 가져오는 요청을 추가
        const token = localStorage.getItem('accessToken');
        // if (token) {
        //     axios
        //         .get('http://localhost:8091/member/findMember', {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         })
        //         .then((response) => {
        //             setMemberNo(response.data); // 서버로부터 회원 번호 설정
        //         })
        //         .catch((error) => {
        //             console.error('회원 번호 요청 에러', error);
        //         });
        // }
    }, []);

    const handlePinChange = (value) => {
        if (activePinIndex < pin.length) {
            const newPin = [...pin];
            newPin[activePinIndex] = value;
            setPin(newPin);
            setActivePinIndex(activePinIndex + 1);
        }
    };

    const submitPin = () => {
        if (!memberNo) {
            alert('회원 번호를 가져오는 중입니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        // 서버에 비밀번호를 설정 요청
        const payload = {
            memberNo: memberNo,
            payPwd: pin.join(''), // 입력한 PIN을 문자열로 변환
        };

        axios
            .post('http://localhost:8091/member/setPaypwd', payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken',
                    )}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    // navigate('/checkPwd', {
                    //     state: { pin: pin, memberNo: memberNo },
                    // }); // CheckPwd 화면으로 이동
                    Success(true);
                }
            })
            .catch((error) => {
                alert('비밀번호 설정에 실패했습니다. 다시 시도해 주세요.');
                Success(false);
                console.error('비밀번호 설정 오류:', error);
            });
    };

    const undoPinChange = () => {
        if (activePinIndex > 0) {
            const newPin = [...pin];
            newPin[activePinIndex - 1] = '';
            setPin(newPin);
            setActivePinIndex(activePinIndex - 1);
        }
    };

    return (
        <div>
            <div className="pwd-container">
                <h2>스마트페이 결제</h2>
                <div className="mainText">
                    <div className="passwordText">비밀번호 등록</div>
                </div>
                <div className="pin-circles">
                    {pin.map((_, index) => (
                        <div
                            key={index}
                            className={`circle ${
                                index < activePinIndex ? 'filled' : ''
                            }`}
                        ></div>
                    ))}
                </div>
                <div className="pin-keypad">
                    {shuffledNumbers.map((number) => (
                        <button
                            key={number}
                            className={`pin-button ${
                                number === '0' ? 'centered' : ''
                            }`}
                            onClick={() => handlePinChange(number)}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        className="pin-button undo-button"
                        onClick={undoPinChange}
                    >
                        ⌫
                    </button>
                </div>
                <Button
                    onClick={submitPin}
                    text="비밀번호 설정"
                    className="wide-button"
                    disabled={pin.join('').length < 6}
                />
            </div>
        </div>
    );
}

export default MemberPwd;
