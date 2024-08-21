import React, { useState } from 'react';
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
    const [cardImage, setCardImage] = useState(''); // 이미지 URL 상태 추가

    const navigate = useNavigate();

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

        const cardData = {
            cardNo: cardNo.replace(/\s/g, ''),
            cardNick,
            isCredit,
            cardPwd: parseInt(cardPwd),
            validPeriod,
            cardCode,
            cardImage,
        };

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
        const formattedCardNo = formatCardNo(e.target.value); // 입력된 카드 번호를 형식화
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
                setCardImage(Image); // 카드 이미지 URL을 상태에 설정
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
                            type="text"
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
