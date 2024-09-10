import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import './Register.css';
import CardList from '../component/CardList';
import { InputValue } from '../component/common/InputValue';
import { useMemberNo } from '../provider/PayProvider';
import { error } from 'jquery';
import BlackContainer from '../component/BlackContainer';
import PwdItem from '../component/PwdItem';
import MemberPwd from './MemberPwd';
import CustomModal from '../component/common/Modal';

const formatCardNo = (value) => {
    return value
        .replace(/\s?/g, '') // 모든 공백을 제거
        .replace(/(\d{4})/g, '$1 ') // 4자리마다 공백 추가
        .trim(); // 마지막에 남은 공백 제거
};

function Register() {
    const [cardNo, setCardNo] = useState('');
    const [cardNick, setCardNick] = useState('');
    const [cardName, setCardName] = useState('');
    const [category, setCategory] = useState('');
    const [isCredit, setIsCredit] = useState(null);
    const [cardPwd, setCardPwd] = useState('');
    const [validPeriod, setValidPeriod] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [cardCode, setCardCode] = useState('');
    const [cardImage, setCardImage] = useState('');
    // const [memberNo, setMemberNo] = useState(null);

    const [showMemberPwd, setShowMemberPwd] = useState(false);
    const [showPwdItem, setShowPwdItem] = useState(false);

    const navigate = useNavigate();
    const memberNo = useMemberNo();

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [checkModal, setCheckModal] = useState(true); // 버튼 표시 여부

    const timeout = () => {
        setTimeout(() => {
            navigate('/home');
        }, 1000);
    };

    const ConfigEnum = Object.freeze({
        PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
        COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
    });

    //결제 비밀번호 등록
    const handlePasswordValidation = (isValid) => {
        if (isValid) {
            setShowMemberPwd(false);
            setShowPwdItem(true);
        } else {
            // alert("다시 시도해주세요");
            setModalTitle('알림');
            setModalContent('다시 시도해주세요');
            setShowModal(true);
            setCheckModal(false);
            setShowMemberPwd(false);
            setShowMemberPwd(true);
        }
    };

    const handlePasswordValidation2 = (isValid) => {
        if (isValid) {
            // alert("결제 비밀번호가 등록되었습니다.");
            setModalTitle('알림');
            setModalContent('결제 비밀번호가 등록되었습니다.');
            setShowModal(true);
            setCheckModal(false);
            setShowPwdItem(false);
            timeout();
            // navigate('/home');
        } else {
            setShowPwdItem(false);
            setShowMemberPwd(true);
        }
    };

    // memberNo로 카드 데이터 가져오기
    useEffect(() => {
        if (memberNo) {
            const token = localStorage.getItem('accessToken');

            axios
                .get(`${ConfigEnum.PAY_SERVER_URL}/api/cards/byMember`, {
                    params: { memberNo },
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
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
    }, [memberNo]);

    const handleCardSelectClick = async () => {
        if (category == '카드사 없음') {
            setModalTitle('알림');
            setModalContent('올바른 카드 번호를 입력해주세요.');
            setShowModal(true);
            setCheckModal(true);
            // return alert("올바른 카드 번호를 입력해주세요.");
            return;
        } else if (category == '' || cardNo.length < 17) {
            setModalTitle('알림');
            setModalContent('카드 번호를 입력해주세요');
            setShowModal(true);
            setCheckModal(true);
            // return alert("카드 번호를 입력해주세요");
            return;
        }
        setIsModalOpen(true);
        try {
            const response = await axios.get(
                `${ConfigEnum.PAY_SERVER_URL}/api/cards/byCompany`,
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

    const handleCloseModal = () => {
        setShowModal(false);
        setCheckModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!memberNo) {
            console.error('memberNo가 설정되지 않았습니다.');
            return;
        }

        const cardData = {
            cardNo: cardNo.replace(/\s/g, ''),
            cardNick: cardNick || selectedCard,
            isCredit,
            cardPwd: parseInt(cardPwd),
            validPeriod,
            cardCode,
            cardImage: cardImage,
            memberNo,
            cardName: selectedCard,
        };
        console.log(cardData);

        const values = Object.values(cardData);
        const hasNullValue = values.some(
            (value) => value === null || value === '',
        );

        if (hasNullValue) {
            setModalTitle('알림');
            setModalContent('모든 정보를 입력해주세요');
            setShowModal(true);
            setCheckModal(false);
            return;
        }

        // console.log('카드 등록 요청 데이터:', cardData);

        try {
            const response = await fetch(
                `${ConfigEnum.PAY_SERVER_URL}/api/cards`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cardData),
                },
            );

            if (response.ok) {
                try {
                    const pwdResponse = await axios.get(
                        `${ConfigEnum.PAY_SERVER_URL}/member/isPaypwdEmpty`,
                        { params: { memberNo } },
                    );

                    if (pwdResponse.status === 200) {
                        // 결제 비밀번호가 없는 경우 -> 비밀번호 등록 화면 띄우기
                        setShowMemberPwd(true);
                    } else {
                        // 결제 비밀번호가 있는 경우 -> 성공 모달 띄우기
                        setModalTitle('알림');
                        setModalContent('카드가 성공적으로 등록되었습니다.');
                        setShowModal(true);
                        setCheckModal(false);
                        timeout(); // 일정 시간이 지나면 홈 화면으로 이동
                    }
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        // 비밀번호가 이미 등록된 경우 -> 성공 모달 띄우기
                        setModalTitle('알림');
                        setModalContent('카드가 성공적으로 등록되었습니다.');
                        setShowModal(true);
                        setCheckModal(false);
                        timeout(); // 일정 시간이 지나면 홈 화면으로 이동
                    } else {
                        console.error(
                            '결제 비밀번호 확인 중 오류가 발생했습니다.',
                            error,
                        );
                    }
                }
            } else {
                setModalTitle('알림');
                setModalContent('카드 등록에 실패했습니다.');
                setShowModal(true);
                setCheckModal(false);
            }
        } catch (error) {
            console.error('네트워크 오류가 발생했습니다.', error);
        }
    };

    //아마도 카드사 자동입력
    const handleCardNoChange = async (e) => {
        const formattedCardNo = formatCardNo(e.target.value);
        setCardNo(formattedCardNo);

        if (formattedCardNo.replace(/\s/g, '').length < 6) {
            setCategory('');
            return;
        } else if (
            formattedCardNo.replace(/\s/g, '').length >= 6 &&
            formattedCardNo.replace(/\s/g, '').length <= 8
        ) {
            try {
                const response = await axios.get(
                    `${ConfigEnum.PAY_SERVER_URL}/api/cards/company`,
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
            } catch {
                // console.log(error);
            }
        } else if (
            formattedCardNo.replace(/\s/g, '').length > 15 &&
            category == ''
        ) {
            setCategory('카드사 없음');
            // console.log("확인`````````");
            // console.log(category);
        }
    };

    const handleCardPwdChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d{0,2}$/.test(inputValue)) {
            setCardPwd(inputValue);
        }
    };

    const handleInput = (e, type) => {
        let value = e.target.value;
        //숫자만 입력 가능하도록
        value = value.replace(/[^0-9]/g, '');

        // 카드 번호일 경우
        if (type === 'card') {
            e.target.value = value;
            // 유효기간일 경우
        } else if (type === 'validPeriod') {
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        }
    };

    // 방향키 감지 및 방지
    const preventArrowKeys = (e) => {
        if (
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowDown'
        ) {
            e.preventDefault();
        }
    };

    return (
        <div className="Register">
            {showMemberPwd && (
                <>
                    <BlackContainer />
                    <MemberPwd Success={handlePasswordValidation} />
                </>
            )}
            {showPwdItem && (
                <>
                    <BlackContainer />
                    <PwdItem Success={handlePasswordValidation2} />
                </>
            )}
            <div className="back-button">
                <button onClick={() => window.history.back()}>←</button>
            </div>
            <h1 className="title">카드 등록</h1>
            <form className="card-registration-form" onSubmit={handleSubmit}>
                {/* <div className="form-group">
                    <label>카드사</label>
                    <input
                        type="text"
                        placeholder="자동입력"
                        readOnly
                        value={category}
                    />
                </div> */}
                <InputValue
                    type="text"
                    placeholder="자동입력"
                    title="카드사"
                    value={category}
                    readOnly={true}
                />
                {/* <div className="form-group">
                    <label>카드번호</label>
                    <input
                        type="text"
                        placeholder="CARD NUMBER"
                        value={cardNo}
                        onChange={handleCardNoChange}
                        maxLength="19"
                    />
                </div> */}
                <InputValue
                    type="text"
                    placeholder="카드 번호"
                    title="카드번호"
                    value={cardNo}
                    onChange={handleCardNoChange}
                    onInput={(e) => handleInput(e, 'card')}
                    onKeyDown={preventArrowKeys}
                    maxLength="19"
                />
                <div className="form-row">
                    {/* <div className="form-group">
                        <label>유효기간(MM/YY)</label>
                        <input
                            type="text"
                            placeholder="MM / YY"
                            value={validPeriod}
                            onChange={(e) => setValidPeriod(e.target.value)}
                        />
                    </div> */}
                    <InputValue
                        type="text"
                        placeholder="MM / YY"
                        title="유효기간(MM/YY)"
                        value={validPeriod}
                        onChange={(e) => setValidPeriod(e.target.value)}
                        onInput={(e) => handleInput(e, 'validPeriod')}
                        maxLength="5"
                    />
                    {/* <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={cardPwd}
                            onChange={handleCardPwdChange}
                            maxLength="2"
                        />
                    </div> */}
                    <InputValue
                        type="password"
                        placeholder="앞 2자리"
                        title="비밀번호"
                        value={cardPwd}
                        onChange={handleCardPwdChange}
                        onInput={(e) => handleInput(e, 'validPeriod')}
                        maxLength="5"
                    />
                </div>
                {/* <div className="form-group">
                    <label>카드 별칭</label>
                    <input
                        type="text"
                        placeholder="카드 별칭"
                        value={cardNick}
                        onChange={(e) => setCardNick(e.target.value)}
                    />
                </div> */}
                <InputValue
                    type="text"
                    placeholder="카드 별칭"
                    title="카드 별칭"
                    value={cardNick}
                    onChange={(e) => setCardNick(e.target.value)}
                    maxLength="8"
                />
                {/* <div className="form-group">
                    <label>카드 선택</label>
                    <input
                        type="text"
                        placeholder="카드 선택"
                        readOnly
                        onClick={handleCardSelectClick}
                        value={selectedCard ? selectedCard : '카드 선택'}
                    />
                </div> */}
                <InputValue
                    type="text"
                    placeholder="카드 선택"
                    title="카드 선택"
                    value={selectedCard ? selectedCard : '카드 선택'}
                    onClick={handleCardSelectClick}
                    readOnly={true}
                />
                <input
                    type="hidden"
                    value={cardImage} // 이미지 URL을 숨겨진 필드로 전달
                    name="cardImage"
                />
                <input type="hidden" name="cardName" value={cardName} />
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
            {showModal && (
                <CustomModal
                    key={modalTitle + modalContent}
                    title={modalTitle}
                    content={modalContent}
                    check={checkModal}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default Register;
