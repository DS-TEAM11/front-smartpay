import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './404.css';
import './IdPwCheck.css';
import logoImage from '../img/logo3.png';
import Button from '../component/Button';

const IdPwCheck = () => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const navigate = useNavigate();

    const validatePhone = (phone) => {
        const re = /^\d{11}$/;
        return re.test(phone);
    };

    const handleSearch = async () => {
        setError(''); // 초기화
        setSuccess(''); // 초기화
        if (!validatePhone(phone)) {
            setError('전화번호를 맞춰서 입력해주세요');
            setEmail(''); // 이메일 초기화
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8091/member/findByPhone?phone=${phone}`,
            );
            if (response.ok) {
                const data = await response.json();
                setEmail(data.email);
                setSuccess('회원님의 이메일을 성공적으로 찾았습니다.');
                setIsButtonClicked(true);
            } else if (response.status === 404) {
                setError('해당 전화번호로 등록된 회원이 없습니다.');
                setEmail('');
            } else {
                setError('요청 처리 중 문제가 발생했습니다.');
                setEmail('');
            }
        } catch (err) {
            setError('서버 요청에 실패했습니다.');
            setEmail('');
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo-wrapper1">
                <img src={logoImage} alt="SP Logo" className="login-logo" />
            </div>
            <div className="mainTitle">아이디 찾기</div>
            <div className="form-group">
                <label className="label1">번호를 입력해주세요</label>
                <div className="verification-group">
                    <input
                        type="phone"
                        className="form-control"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <Button onClick={handleSearch} text="이메일 찾기" />
                </div>
                {success && (
                    <div className="error-message" style={{ color: 'green' }}>
                        {success}
                    </div>
                )}
                {error && <div className="error-message">{error}</div>}
                {email && (
                    <div>
                        회원의 이메일: <strong>{email}</strong>
                    </div>
                )}

                <div className="backForward" onClick={() => navigate('/login')}>
                    ← 로그인으로 돌아가기
                </div>
            </div>
        </div>
    );
};

export default IdPwCheck;
