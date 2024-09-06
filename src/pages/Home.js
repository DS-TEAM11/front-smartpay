import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import './Home.css';
import CardInfo from '../component/homeCards/CardInfo2';
import BenefitsAndManagement from '../component/BenefitsAndManagement';
import image1 from '../img/home1.png';
import image2 from '../img/home2.png';
import image3 from '../img/home3.png';
import image4 from '../img/home4.png';
import image5 from '../img/home5.png';
import image6 from '../img/home6.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemberNo, useWebSocket } from '../provider/PayProvider';
import CardDeletePicker from '../component/CardDeletePicker'; // CardDeletePicker 추가
const Home = () => {
    const memberNo = useMemberNo();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [isFirst, setIsFirst] = useState(true);
    const [totalSavePrice, setTotalSavePrice] = useState(0);
    const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
    const [cards, setCards] = useState([]); // 사용자가 소유한 카드 목록
    const [showCardDeletePicker, setShowCardDeletePicker] = useState(false); // 카드 삭제 모달 상태
    const { wsConnect, wsDisconnect, wsSubscribe, wsSendMessage } =
        useWebSocket();
    // Ref를 사용하여 subscription을 관리
    const subscriptionRef = useRef(null);
    const [subMessage, setSubMessage] = useState(null);

    const ConfigEnum = Object.freeze({
        PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
        COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
    });
    const fetchData = async () => {
        if (memberNo) {
            try {
                const benefitResponse = await axios.get(
                    `${ConfigEnum.PAY_SERVER_URL}/member/getBenefit`,
                    {
                        params: { memberNo: memberNo },
                    },
                );
                setTotalSavePrice(benefitResponse.data.totalSavePrice);
                setTotalDiscountPrice(benefitResponse.data.totalDiscountPrice);

                const cardResponse = await axios.get(
                    `${ConfigEnum.PAY_SERVER_URL}/api/cards/details/byMember`,
                    {
                        params: { memberNo: memberNo },
                    },
                );
                setCards(cardResponse.data);
            } catch (error) {
                console.error('Failed to fetch benefit data', error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    useEffect(() => {
        fetchData();
        if (!memberNo) return;
        // WebSocket 연결 후 구독 설정
        wsConnect(() => {
            // console.log('WebSocket 연결 successfully');
            // 구독 시도
            try {
                subscriptionRef.current = wsSubscribe(
                    `/topic/sellinfo`,
                    (message) => {
                        // console.log('홈 받은 값 ', message);
                        if (message.to === memberNo) {
                            setSubMessage(message);
                        }
                    },
                );
                // console.log('Subscribed to /topic/sellinfo successfully');
            } catch (error) {
                console.error('Failed to subscribe:', error);
            }

            // 메시지 전송
            // console.log('Sending enter message to /topic/sellinfo');
            wsSendMessage(`/topic/sellinfo`, {
                action: 'enter',
                from: memberNo,
                to: 'seller',
            });
        });
        // 컴포넌트가 언마운트될 때 구독 해제 및 WebSocket 연결 해제
        // return () => {
        //     if (subscriptionRef.current) {
        //         subscriptionRef.current.unsubscribe(); // 구독 해제
        //     }
        //     wsDisconnect(); // WebSocket 연결 해제
        // };
    }, [memberNo, location.pathname]);

    const handleCardDelete = (deletedCard) => {
        setCards((prevCards) =>
            prevCards.filter((card) => card.cardNo !== deletedCard.cardNo),
        );
    };
    return (
        <>
            <Header
                subscription={subscriptionRef.current}
                subMessage={subMessage}
            />
            <div className="main-container">
                <CardInfo
                    cards={cards}
                    onDeleteCard={handleCardDelete} // onDeleteCard 전달
                    subscription={subscriptionRef.current}
                    subMessage={subMessage}
                />
                <BenefitsAndManagement
                    benefits={[
                        {
                            imageSrc: image1,
                            description: `이번달 ${totalSavePrice.toLocaleString()}원 적립`,
                            className: 'benefit-point',
                        },
                        {
                            imageSrc: image2,
                            description: `이번달 ${totalDiscountPrice.toLocaleString()}원 할인`,
                            className: 'benefit-discount',
                        },
                    ]}
                    managementItems={[
                        {
                            imageSrc: image4,
                            description: (
                                <>
                                    카드 추가 <br /> 등록하기
                                </>
                            ),
                            onClick: () => navigate('/register'),
                        },
                        {
                            imageSrc: image5,
                            description: (
                                <>
                                    카드 순서 <br /> 편집하기
                                </>
                            ),
                            onClick: () => navigate('/cardEdit'),
                        },
                        {
                            imageSrc: image6,
                            description: (
                                <>
                                    등록된 카드 <br /> 삭제하기
                                </>
                            ),
                            onClick: () => setShowCardDeletePicker(true), // 모달 표시
                        },
                    ]}
                />
                {showCardDeletePicker && (
                    <CardDeletePicker
                        title="삭제할 카드를 선택하세요"
                        cards={cards}
                        onRemove={() => setShowCardDeletePicker(false)} // 모달 닫기
                        onDeleteCard={handleCardDelete} // 카드 삭제 핸들러
                    />
                )}
            </div>
        </>
    );
};

export default Home;
