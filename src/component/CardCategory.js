import React from 'react';

const Categoryselect = ({ category, onChange }) => {
  return (
    <div className="d-flx align-items-center col-5">
      <select
        className="form-select"
        aria-label="Default select example"
        value={category}
        onChange={onChange}
      >
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
  );
};

export default Categoryselect;