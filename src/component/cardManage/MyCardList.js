import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyCardList.css';
import CardImg from '../homeCards/CardImg';
import Button from '../Button';
import axios from 'axios';
import CustomModal from '../common/Modal';
import { InputValue } from '../common/InputValue';

// 모바일에서만 드래그 작동함
const MyCardList = ({ isLeftActive, cardList, onCardNickUpdate }) => {
    // console.log('MyCardList', cardList);
    const navigate = useNavigate();
    const [notCard, setNotCard] = useState(false);
    const [editCardList, setEditCardList] = useState(cardList);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [newCardNick, setNewCardNick] = useState('');

    const draggingItemRef = useRef(null);
    const touchStartY = useRef(0);
    useEffect(() => {
        if (cardList.length === 0) {
            setNotCard(true);
        } else {
            setNotCard(false);
            setEditCardList(cardList);
        }
    }, [cardList]);

    const handleTouchStart = (index) => (event) => {
        setDraggedIndex(index);
        touchStartY.current = event.touches[0].clientY;
        draggingItemRef.current = event.currentTarget;
    };

    const handleTouchMove = (event) => {
        if (draggingItemRef.current) {
            const currentY = event.touches[0].clientY;
            const deltaY = currentY - touchStartY.current;
            draggingItemRef.current.style.transform = `translateY(${deltaY}px)`;
            draggingItemRef.current.style.transition = 'none';
        }
    };

    const handleTouchEnd = (index) => (event) => {
        if (draggedIndex !== null) {
            const currentY = event.changedTouches[0].clientY;
            const draggedOverElement = document.elementFromPoint(
                event.changedTouches[0].clientX,
                currentY,
            );

            const newIndex = Array.from(
                draggedOverElement.closest('.container').parentNode.children,
            ).indexOf(draggedOverElement.closest('.container'));

            const updatedList = [...editCardList];
            const [draggedItem] = updatedList.splice(draggedIndex, 1);
            updatedList.splice(newIndex, 0, draggedItem);
            setEditCardList(updatedList);

            draggingItemRef.current.style.transform = 'none';
            draggingItemRef.current.style.transition = 'transform 0.2s ease';
            setDraggedIndex(null);
            draggingItemRef.current = null;
        }
    };

    const openModal = (card) => {
        setSelectedCard(card);
        setNewCardNick(card.cardNick);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        handleSaveNewNick();
        setIsModalOpen(false);
    };

    const handleSaveNewNick = () => {
        if (selectedCard) {
            console.log('Selected Card:', selectedCard); // 선택된 카드 확인
            console.log('New Card Nick:', newCardNick); // 새로운 별칭 확인

            // 수정된 별칭을 DB에 저장하는 API 요청
            axios
                .post('http://localhost:8091/api/cards/updateNickname', {
                    cardNo: selectedCard.cardNo, // 카드 번호로 카드 식별
                    newCardNick: newCardNick, // 변경된 별칭
                })
                .then((response) => {
                    console.log('API Response:', response.data); // 서버 응답 확인

                    // 서버 응답이 성공적일 때 로컬 상태 업데이트
                    const updatedList = cardList.map((card) =>
                        card.cardNo === selectedCard.cardNo
                            ? { ...card, cardNick: newCardNick }
                            : card,
                    );

                    console.log('Updated Card List:', updatedList); // 업데이트된 카드 리스트 확인

                    // 상위 컴포넌트에 수정된 별칭을 전달
                    onCardNickUpdate(updatedList);
                    alert('별칭이 성공적으로 수정되었습니다.');
                })
                .catch((error) => {
                    console.error('별칭 수정 중 오류가 발생했습니다.', error); // 에러 출력
                    alert('별칭 수정에 실패했습니다.');
                });
        }
    };

    const btnClick = () => {
        const sortedCards = editCardList.map((card, index) => {
            // 필드 이름이 일치하는 CardDTO 객체만 포함
            const cardDTO = {
                cardNo: card.cardNo, // 카드 번호
                cardNick: card.cardNick, // 카드 별칭
                isCredit: card.isCredit, // 신용카드 여부
                cardCode: card.cardCode, // 카드 코드
                memberNo: card.memberNo, // 회원 번호
                cardImage: card.cardImage, // 카드 이미지
                cardName: card.cardName, // 카드 이름
                cardCompany: card.cardCompany, // 카드사
                cardBenefit1: card.cardBenefit1, // 혜택 1
                cardBenefit2: card.cardBenefit2, // 혜택 2
                cardBenefit3: card.cardBenefit3, // 혜택 3
                benefitPriority: isLeftActive
                    ? index + 1
                    : card.benefitPriority, // 혜택 우선순위
                usagePriority: isLeftActive ? card.usagePriority : index + 1, // 사용 우선순위
            };
            return cardDTO;
        });

        // console.log(sortedCards);

        axios
            .post('http://localhost:8091/api/cards/update/benefit', sortedCards)
            .then((response) => {
                // console.log(response);
                alert('저장되었습니다.');
                navigate('/home');
            })
            .catch((error) => {
                console.error('우선순위 저장 중 오류가 발생했습니다.', error);
            });
    };
    return (
        <>
            {notCard ? (
                <div className="text-center fs-3">카드가 없습니다.</div>
            ) : (
                <div className="my-card-list-container mx-1">
                    {editCardList.map((item, index) => (
                        <div
                            key={index}
                            className={`container my-2 rounded-5 ${
                                index === 0 ? 'first' : ''
                            }`}
                            onTouchStart={handleTouchStart(index)}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd(index)}
                            style={{
                                opacity: draggedIndex === index ? 1 : 0.9,
                            }}
                        >
                            <div className="row align-items-center justify-content-evenly">
                                <div className="col-1 fs-2 fw-bolder">
                                    {index + 1}
                                </div>
                                <div className="col-3 d-flex justify-content-center pb-2">
                                    <CardImg
                                        src={item.cardImg}
                                        alt={item.cardName}
                                        direction="horizontal"
                                        className="sm"
                                    />
                                </div>
                                <div className="col-5 pt-2">
                                    <p
                                        className="fs-5 my-0 fw-medium cardName"
                                        onClick={() => openModal(item)}
                                    >
                                        {item.cardNick}({item.cardName})
                                    </p>
                                    <p className="fs-7 my-0 fw-medium">
                                        {item.cardCompany}
                                    </p>
                                </div>
                                <div className="col-2 pt-2">
                                    <div className="text-end">
                                        <svg
                                            width="100%"
                                            viewBox="0 0 25 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="priorityDragBtn"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
                                                fill="#121923"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-center mt-5">
                        <Button
                            className={'w-5'}
                            text={'저장하기'}
                            onClick={btnClick}
                        ></Button>
                    </div>
                </div>
            )}
            {/*모달 열기닫기 */}
            {isModalOpen && (
                <CustomModal
                    title="별칭 수정"
                    content={
                        <>
                            <p>현재 별칭 : {selectedCard.cardNick}</p>
                            <InputValue
                                type="text"
                                value={newCardNick}
                                onChange={(e) => setNewCardNick(e.target.value)}
                            />
                        </>
                    }
                    check={true}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default MyCardList;
