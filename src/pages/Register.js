import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import './Register.css';
import CardList from '../component/CardList';

const formatCardNo = (value) => {
    return value
        .replace(/\s?/g, '') // 모든 공백을 제거
        .replace(/(\d{4})/g, '$1 ') // 4자리마다 공백 추가
        .trim(); // 마지막에 남은 공백 제거
};

function Register() {
    const [cardNo, setCardNo] = useState('');
    const [cardNick, setCardNick] = useState('');
    const [category, setCategory] = useState('');
    const [isCredit, setIsCredit] = useState(null);
    const [cardPwd, setCardPwd] = useState('');
    const [validPeriod, setValidPeriod] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [cardCode, setCardCode] = useState('');
    const [cardImage, setCardImage] = useState('');
    const [memberNo, setMemberNo] = useState(null);

    const navigate = useNavigate();

    // 1. memberNo를 가져오는 useEffect
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

    // 2. memberNo를 사용해 카드 데이터를 가져오는 useEffect
    useEffect(() => {
        if (memberNo) {
            const token = localStorage.getItem('accessToken');

            axios
                .get('http://localhost:8091/api/cards/byMember', {
                    params: { memberNo },
                    headers: {
                        Authorization: token, // Bearer 포함
                    },
                })
                .then((response) => {
                    // 카드 데이터를 regDate 기준으로 정렬
                    const sortedCards = response.data.sort(
                        (a, b) => new Date(a.regDate) - new Date(b.regDate),
                    );
                    setCards(sortedCards);
                })
                .catch((error) => {
                    console.error(
                        '카드 데이터를 가져오는 데 실패했습니다.',
                        error,
                    );
                });
        }
    }, [memberNo]); // memberNo가 변경될 때만 이 useEffect가 실행됨

    const handleCardSelectClick = async () => {
        setIsModalOpen(true);
        try {
            const response = await axios.get(
                'http://localhost:8091/api/cards/byCompany',
                { params: { cardCompany: category } },
            );
            setCards(response.data);
        } catch (error) {
            console.error('카드 데이터를 가져오는 데 실패했습니다.', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!memberNo) {
            console.error('memberNo가 설정되지 않았습니다.');
            return;
        }

        const cardData = {
            cardNo: cardNo.replace(/\s/g, ''),
            cardNick,
            isCredit,
            cardPwd: parseInt(cardPwd),
            validPeriod,
            cardCode,
            cardImage,
            memberNo,
        };

        console.log('카드 등록 요청 데이터:', cardData);

        try {
            const response = await fetch('http://localhost:8091/api/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData),
            });

            if (response.ok) {
                console.log('카드가 성공적으로 등록되었습니다.');
                navigate('/memberPwd');
            } else {
                console.error('카드 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('네트워크 오류가 발생했습니다.', error);
        }
    };

    const handleCardNoChange = async (e) => {
        const formattedCardNo = formatCardNo(e.target.value);
        setCardNo(formattedCardNo);

        if (formattedCardNo.replace(/\s/g, '').length >= 6) {
            try {
                const response = await axios.get(
                    'http://localhost:8091/api/cards/company',
                    {
                        params: {
                            cardNumber: formattedCardNo.replace(/\s/g, ''),
                        },
                    },
                );
                const { argName, isCredit, Image } = response.data;

                setCategory(argName);
                setIsCredit(isCredit);
                setCardImage(Image);
            } catch (error) {
                setCategory('');
                setIsCredit(null);
                setCardImage('');
            }
        } else {
            setCategory('');
            setIsCredit(null);
            setCardImage('');
        }
    };

    const handleCardPwdChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d{0,2}$/.test(inputValue)) {
            setCardPwd(inputValue);
        }
    };

    return (
        <div>
            <div className="back-button">
                <button onClick={() => window.history.back()}>←</button>
            </div>
            <h1 className="title">카드 등록</h1>
            <form className="card-registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>카드사</label>
                    <input
                        type="text"
                        placeholder="자동입력"
                        readOnly
                        value={category}
                    />
                </div>
                <div className="form-group">
                    <label>카드번호</label>
                    <input
                        type="text"
                        placeholder="CARD NUMBER"
                        value={cardNo}
                        onChange={handleCardNoChange}
                        maxLength="19"
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>유효기간(MM/YY)</label>
                        <input
                            type="number"
                            placeholder="MM / YY"
                            value={validPeriod}
                            onChange={(e) => setValidPeriod(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={cardPwd}
                            onChange={handleCardPwdChange}
                            maxLength="2"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>카드 별칭</label>
                    <input
                        type="text"
                        placeholder="카드 별칭"
                        value={cardNick}
                        onChange={(e) => setCardNick(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>카드 선택</label>
                    <input
                        type="text"
                        placeholder="카드 선택"
                        readOnly
                        onClick={handleCardSelectClick}
                        value={selectedCard ? selectedCard : '카드 선택'}
                    />
                </div>
                <input
                    type="hidden"
                    value={cardImage} // 이미지 URL을 숨겨진 필드로 전달
                    name="cardImage"
                />
                <Button text="카드 등록" onClick={handleSubmit} />
            </form>

            {isModalOpen && (
                <CardList
                    cards={cards}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    setCardCode={setCardCode}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

export default Register;
