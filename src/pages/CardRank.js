import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Categoryselect from '../component/CardCategory';
import RankItem from '../component/RankItem';
import Header from '../component/Header';

const CardRank = () => {
    const [rankItems, setRankItems] = useState([]);
    const [category, setCategory] = useState('전체');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value); // 카테고리 상태 업데이트
    };

    const ConfigEnum = Object.freeze({
        PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
        COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
    });

    const handleRank = async () => {
        try {
            const response = await axios.get(
                `${ConfigEnum.PAY_SERVER_URL}/api/payment/ranking`,
                {
                    params: { category },
                },
            );
            setRankItems(response.data); // 응답 데이터를 상태에 저장
        } catch (error) {
            console.error('에러남', error);
        }
    };

    useEffect(() => {
        handleRank(); // 컴포넌트 마운트 시 데이터 로드
    }, [category]);

    return (
        <>
            <Header />
            {/* <Loading text={"AI가 최적의 카드를 찾는 중입니다."} /> */}
            <div className="container pt-4 pt-sm-5">
                <div className="mb-3">
                    <h1 className="text-center">이 달의 카드 TOP 5</h1>
                    <p className="text-center">
                        스마트 페이 고객님들이 가장 많이 사용한 카드에요.
                    </p>
                </div>

                <div className="py-3">
                    <div className="mb-4">
                        <Categoryselect
                            category={category}
                            onChange={handleCategoryChange}
                        />
                    </div>

                    <RankItem rankItems={rankItems} />
                </div>
            </div>
        </>
    );
};
export default CardRank;
