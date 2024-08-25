import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import './Home.css';
import CardInfo from '../component/homeCards/CardInfo2';
// import CardItem from '../component/CardItem';
import BenefitsAndManagement from '../component/BenefitsAndManagement'; // 컴포넌트를 모듈화
import image1 from '../img/home1.png';
import image2 from '../img/home2.png';
import image3 from '../img/home3.png';
import image4 from '../img/home4.png';
import image5 from '../img/home5.png';
import image6 from '../img/home6.png';

import { useMemberNo } from '../provider/PayProvider';
const Home = () => {
    const memberNo = useMemberNo();
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    return (
        <>
            <Header />
            <div className="main-container">
                <CardInfo />
                <BenefitsAndManagement
                    benefits={[
                        {
                            imageSrc: image1,
                            description: '이번달 30,100원 적립',
                        },
                        {
                            imageSrc: image2,
                            description: '이번달 7,800원 할인',
                        },
                        {
                            imageSrc: image3,
                            description: 'AI 맞춤 금융 알아보기',
                        },
                    ]}
                    managementItems={[
                        { imageSrc: image4, description: '카드 추가 등록하기' },
                        { imageSrc: image5, description: '카드 순서 편집하기' },
                        {
                            imageSrc: image6,
                            description: '등록된 카드 삭제하기',
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default Home;
