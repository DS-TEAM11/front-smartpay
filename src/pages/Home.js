import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import './Home.css';
import CardInfo from '../component/homeCards/CardInfo2';
import BenefitsAndManagement from '../component/BenefitsAndManagement'; // 컴포넌트를 모듈화
import image1 from '../img/home1.png';
import image2 from '../img/home2.png';
import image3 from '../img/home3.png';
import image4 from '../img/home4.png';
import image5 from '../img/home5.png';
import image6 from '../img/home6.png';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useMemberNo, useWebSocket } from '../provider/PayProvider';

const Home = () => {
    const memberNo = useMemberNo();
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [totalSavePrice, setTotalSavePrice] = useState(0); //이번달 총 적립금액
    const [totalDiscountPrice, setTotalDiscountPrice] = useState(0); //이번달 총 할인금액
    const { wsConnect, wsDisconnect, wsSubscribe, wsSendMessage } =
        useWebSocket();

    useEffect(() => {
        const fetchData = async () => {
            if (memberNo) {
                try {
                    const response = await axios.get(
                        'http://localhost:8091/member/getBenefit',
                        {
                            params: { memberNo: memberNo },
                        },
                    );

                    setTotalSavePrice(response.data.totalSavePrice);
                    setTotalDiscountPrice(response.data.totalDiscountPrice);
                } catch (error) {
                    console.error('Failed to fetch benefit data', error);
                } finally {
                    setIsLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
                }
            }
        };

        fetchData();
        if (!memberNo) return;
        // 컴포넌트가 마운트될 때 WebSocket 연결을 설정
        wsConnect(); // WebSocket 연결
        wsSendMessage(`/sellinfo`, { action: 'enter', message: memberNo }); // WebSocket 메시지 전송
        // WebSocket 구독 설정
        const subscription = wsSubscribe(`/sellinfo`, (message) => {
            // 메시지를 수신하면 콘솔에 출력
            console.log('Received message:', message);
        });

        // 컴포넌트가 언마운트될 때 구독 해제 및 WebSocket 연결 해제
        return () => {
            if (subscription) {
                subscription.unsubscribe(); // 구독 해제
            }
            wsDisconnect(); // WebSocket 연결 해제
        };
    }, [memberNo]);

    return (
        <>
            <Header />
            <div className="main-container">
                <CardInfo />
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
                            onClick: () => navigate('/cardDelete'),
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default Home;
