import React, { useState } from 'react';
import axios from 'axios';
import Policy from '../component/Policy'; // Policy 컴포넌트 추가
import Button from '../component/Button';
import GrayButton from '../component/GrayButton';
import LongButton from '../component/LongButton';
import BlackContainer from '../component/BlackContainer';
import { useNavigate } from 'react-router-dom';
import { InputValue } from '../component/common/InputValue'; // InputValue 컴포넌트 임포트
import './Signup.css';
import logoImage from '../img/logo3.png'; // 로고 이미지 임포트

const Signup = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [phone, setPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isSmsSent, setIsSmsSent] = useState(false);
    const [isPolicyVisible, setIsPolicyVisible] = useState(false);
    const navigate = useNavigate();

    const validatePhone = (phone) => {
        const re = /^\d{11}$/; // 기본 전화번호 형식 검증
        return re.test(phone);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/;
        return re.test(password);
    };

    const validateName = (name) => {
        const re = /^[가-힣a-zA-Z]+$/;
        return re.test(name);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // 숫자만 남기고 필터링
        const onlyNums = value.replace(/[^0-9]/g, '');
        setPhone(onlyNums);
    };

    // 현재 방식
    const handleSendSmsCurrent = (e) => {
        e.preventDefault();
        if (validatePhone(phone)) {
            axios
                .get(`http://localhost:8091/member/checkSms?phone=${phone}`)
                .then((response) => {
                    setVerificationCode(response.data); // 서버에서 받은 인증번호 설정
                    setIsSmsSent(true);
                    alert('인증번호가 발송되었습니다.');
                })
                .catch((error) => {
                    console.error('인증번호 생성 실패:', error);
                    alert('인증번호 생성에 실패했습니다.');
                });
        } else {
            alert('전화번호를 올바르게 입력해주세요.');
        }
    };

    // 새로운 API 방식
    const handleSendSmsApi = (e) => {
        e.preventDefault();
        if (validatePhone(phone)) {
            axios
                .post('http://localhost:8091/api/sms/send', {
                    phoneNumber: phone,
                })
                .then((response) => {
                    setIsSmsSent(true);
                    alert('인증번호가 발송되었습니다.');
                })
                .catch((error) => {
                    console.error('인증번호 생성 실패:', error);
                    alert('인증번호 생성에 실패했습니다.');
                });
        } else {
            alert('전화번호를 올바르게 입력해주세요.');
        }
    };

    // 현재 방식
    const handleVerifyCodeCurrent = (e) => {
        e.preventDefault();
        const trimmedInputCode = inputCode.trim(); // 입력된 값의 공백 제거
        const verificationCodeString = verificationCode.toString().trim(); // verificationCode를 문자열로 변환하고 공백 제거

        if (trimmedInputCode === verificationCodeString) {
            setIsVerified(true);
            alert('인증이 완료되었습니다.');
        } else {
            alert('인증번호가 올바르지 않습니다.');
        }
    };

    // 새로운 API 방식
    const handleVerifyCodeApi = (e) => {
        e.preventDefault();
        if (validatePhone(phone)) {
            axios
                .post('http://localhost:8091/api/sms/verify', {
                    phoneNumber: phone,
                    code: inputCode,
                })
                .then((response) => {
                    setIsVerified(true);
                    alert('인증이 완료되었습니다.');
                })
                .catch((error) => {
                    console.error('인증 실패:', error);
                    alert('인증에 실패했습니다.');
                });
        } else {
            alert('전화번호를 올바르게 입력해주세요.');
        }
    };

    const handleSignup = (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('올바른 이메일 형식을 입력해주세요.');
            return;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError(
                '비밀번호는 영어 소문자와 숫자 조합의 8자리 이상이어야 합니다.',
            );
            return;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        } else {
            setConfirmPasswordError('');
        }

        if (!validateName(name)) {
            setNameError('이름은 한글 또는 영어만 입력 가능합니다.');
            return;
        } else {
            setNameError('');
        }

        if (!isVerified) {
            alert('전화번호 인증을 완료해주세요.');
            return;
        }

        if (!termsAccepted) {
            alert('사이트 이용약관에 동의해주세요.');
            return;
        }

        const signupData = {
            email: email,
            password: password,
            name: name,
            phone: phone,
        };

        axios
            .post('http://localhost:8091/member/signup', signupData)
            .then(() => {
                alert('회원가입이 완료되었습니다.');
                navigate('/login');
            })
            .catch((error) => {
                console.error('회원가입 실패:', error);
                alert('회원가입에 실패했습니다.');
            });
    };

    const togglePolicyVisibility = () => {
        setIsPolicyVisible(!isPolicyVisible);
    };

    return (
        <div className="signup-container">
            {isPolicyVisible && (
                <>
                    <BlackContainer onClick={togglePolicyVisibility} />
                    <Policy onClose={togglePolicyVisibility} />
                </>
            )}
            <img src={logoImage} alt="SP Logo" className="signup-logo" />
            <h2 className="signup-title">회원가입하고 똑똑하게 혜택 챙기기</h2>
            <form onSubmit={handleSignup}>
                <InputValue
                    type="email"
                    placeholder="Email"
                    title="이메일"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (!validateEmail(e.target.value)) {
                            setEmailError('올바른 이메일 형식을 입력해주세요.');
                        } else {
                            setEmailError('');
                        }
                    }}
                    required
                />
                {emailError && <p className="error-message">{emailError}</p>}

                <InputValue
                    type="password"
                    placeholder="Password"
                    title="비밀번호(영어 소문자 + 숫자 8자리 이상)"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (!validatePassword(e.target.value)) {
                            setPasswordError(
                                '비밀번호는 영어 소문자와 숫자 조합의 8자리 이상이어야 합니다.',
                            );
                        } else {
                            setPasswordError('');
                        }
                    }}
                    required
                />
                {passwordError && (
                    <p className="error-message">{passwordError}</p>
                )}

                <InputValue
                    type="password"
                    placeholder="Password Check"
                    title="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (e.target.value !== password) {
                            setConfirmPasswordError(
                                '비밀번호가 일치하지 않습니다.',
                            );
                        } else {
                            setConfirmPasswordError('');
                        }
                    }}
                    required
                />
                {confirmPasswordError && (
                    <p className="error-message">{confirmPasswordError}</p>
                )}

                <InputValue
                    type="text"
                    placeholder="Name"
                    title="이름"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (!validateName(e.target.value)) {
                            setNameError(
                                '이름은 한글 또는 영어만 입력 가능합니다.',
                            );
                        } else {
                            setNameError('');
                        }
                    }}
                    required
                />
                {nameError && <p className="error-message">{nameError}</p>}

                <div className="form-group">
                    <label>전화번호</label>
                    <div className="phone-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        {isVerified ? (
                            <GrayButton text="인증번호 발송" disabled={true} />
                        ) : (
                            <Button
                                text="인증번호 발송"
                                onClick={
                                    // 현재 방식 사용
                                    // handleSendSmsCurrent

                                    // 새로운 API 방식 사용
                                    handleSendSmsApi
                                }
                                disabled={isSmsSent}
                            />
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>인증번호 입력</label>
                    <div className="verification-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Verification Code"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            required
                        />
                        {isVerified ? (
                            <GrayButton text="인증번호 확인" disabled={true} />
                        ) : (
                            <Button
                                text="인증번호 확인"
                                onClick={
                                    // 현재 방식 사용
                                    // handleVerifyCodeCurrent

                                    // 새로운 API 방식 사용
                                    handleVerifyCodeApi
                                }
                                disabled={isVerified}
                            />
                        )}
                    </div>
                </div>

                <div className="form-group terms-group">
                    <div className="d-flex">
                        <input
                            type="checkbox"
                            id="custom-checkbox"
                            className="custom-checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <label className="terms-label" for="custom-checkbox">
                            사이트 이용약관에 동의하십니까?
                        </label>
                    </div>
                    <span
                        className="policy-link"
                        onClick={() => {
                            togglePolicyVisibility();
                        }}
                    >
                        약관 확인하기
                    </span>
                </div>

                <LongButton
                    text="회원가입"
                    onClick={handleSignup}
                    disabled={!termsAccepted || !isVerified}
                />
            </form>
        </div>
    );
};

export default Signup;
