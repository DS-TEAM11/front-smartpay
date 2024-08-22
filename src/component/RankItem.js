import React,  { useState, useEffect } from "react";
import axios from "axios";
import "./RankItem.css";

const RankItem = () => {
    const [rankItems, setRankItems] = useState([]); 
    const [category, setCategory] = useState("전체");

     
     const handleCategoryChange = (event) => {
        setCategory(event.target.value); // 카테고리 상태 업데이트
    };

    const handleRank = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8091/api/payment/ranking",
        {
            params: {
                category: category,
            },
        }
      );
      const requestData = response.data;
      setRankItems(requestData); // 응답 데이터를 상태에 저장

    } catch (error) { 
        console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    handleRank(); // 컴포넌트 마운트 시 데이터 로드
  }, [category]);

    return (
        <>
        <div className="d-flx align-items-center col-5">
        <select className="form-select " aria-label="Default select example" value={category}  onChange={handleCategoryChange}>
            <option value="전체">전체</option>
            <option value="마트+교육비">마트+교육비</option>
            <option value="점심+교통">점심+교통</option>
            <option value="여행 + 바우처">여행 + 바우처</option>
            <option value="배달앱+간편결제">배달앱+간편결제</option>
            <option value="해외직구">해외직구</option>
            <option value="편의점+카페">편의점+카페</option>
            <option value="쇼핑">쇼핑</option>
            <option value="항공 마일리지">항공 마일리지</option>
            <option value="주유 + 차량정비">주유 + 차량정비</option>
        </select>
    </div>
            {rankItems.map((item, index) => (
                <div
                    key={index}
                    className={`container  my-2  rounded-5 ${
                        index === 0 ? 'borderTest' : 'border'
                    } `}
                >
                    <div className="row py-2 align-items-center mt-1">
                        <div className="col-1 fs-2 fw-bolder">{index + 1}</div>
                        <div className="col-3 d-flex justify-content-center pb-2">
                            <img src={item[4]} className="rankImg" alt="rankCard" />
                        </div>
                        <div className="col-8 pt-2">
                            <p className="fs-5 my-0 fw-medium">{item[2]}</p>
                            <p className="fs-7 my-0 fw-lighter">{item[3]}</p>
                            <div className="text-end">
                                <a href={item[5]} className={`icon-link icon-link-hover fs-7 ${index === 0 ? 'text-light   ' : ''} `}>
                                    신청하기<i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default RankItem;
