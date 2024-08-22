import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import './Home.css';
import CardInfo from '../component/CardInfo';
import CardItem from '../component/CardItem';
import BenefitsAndManagement from '../component/BenefitsAndManagement'; // 컴포넌트를 모듈화
import image1 from '../img/home1.png';
import image2 from '../img/home2.png';
import image3 from '../img/home3.png';
import image4 from '../img/home4.png';
import image5 from '../img/home5.png';
import image6 from '../img/home6.png';

const Home = () => {
    const [cards, setCards] = useState([]);
    const memberNo = 2;

    useEffect(() => {
        if (memberNo) {
            axios
                .get(`http://localhost:8091/api/cards/byMember`, {
                    params: { memberNo },
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
    }, [memberNo]);

    return (
        <>
            <Header />
            <div className="main-container">
                {/* 카드가 있는 경우 카드 정보를 보여주고, 없는 경우 카드 등록 버튼을 보여줌 */}
                <CardInfo cards={cards} />
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
