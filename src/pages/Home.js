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
import { useMemberNo } from '../provider/PayProvider';

const Home = () => {
    const memberNo = useMemberNo();
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [totalSavePrice, setTotalSavePrice] = useState(0); //이번달 총 적립금액
    const [totalDiscountPrice, setTotalDiscountPrice] = useState(0); //이번달 총 할인금액

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
                        },
                        {
                            imageSrc: image2,
                            description: `이번달 ${totalDiscountPrice.toLocaleString()}원 할인`,
                        },
                        {
                            imageSrc: image3,
                            description: 'AI 맞춤 금융 알아보기',
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
