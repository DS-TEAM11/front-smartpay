import React, { useState } from 'react';
import './Seller.css';
// import logo from '../../public/assets/images/logo.png';

const Seller = () => {
    const [merchantId, setMerchantId] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [storeName, setStoreName] = useState('');
  const [price, setPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  // 가맹점 코드에 대한 임시 데이터 매핑
  const merchantData = {
    '123456': { businessType: '편의점', storeName: 'GS25' },
    '654321': { businessType: '카페', storeName: '스타벅스' },
    '111111': { businessType: '서점', storeName: '교보문고' },
    '222222': { businessType: '패스트푸드', storeName: '맥도날드' },
    '333333': { businessType: '슈퍼마켓', storeName: '이마트' }
  };

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setMerchantId(inputValue);

    if (inputValue.length === 6) {
      const data = merchantData[inputValue];
      if (data) {
        setBusinessType(data.businessType);
        setStoreName(data.storeName);
      } else {
        setBusinessType('');
        setStoreName('');
      }
    } else {
      setBusinessType('');
      setStoreName('');
    }
  };

  return (
    <div className="App">
      <div className="my-content-box">
        <div className="logo">
            <img src="assets/images/logo.png" alt="SP Logo" />
        </div>
        {/* <img src={logo} alt="logo" className="logo" /> */}
        <div className="page-title">판매자 페이지</div>
        <div className="my-content">
          <p>
            가맹점 코드<br />
            <input
              id="merchantId"
              type="text"
              className="form-control"
              value={merchantId}
              placeholder="가맹점 코드"
              onChange={handleInput}
            />
          </p>
          <p>
            업종<br />
            <input
              id="businessType"
              type="text"
              className="form-control"
              value={businessType}
              placeholder="업종"
              readOnly
            />
          </p>
          <p>
            상호명<br />
            <input
              id="storeName"
              type="text"
              className="form-control"
              value={storeName}
              placeholder="상호명"
              readOnly
            />
          </p>
          <p>
            가격<br />
            <input
              type="text"
              className="form-control"
              value={price}
              placeholder="가격"
              onChange={(e) => setPrice(e.target.value)}
            />
          </p>
          <p>
            상품명<br />
            <input
              type="text"
              className="form-control"
              value={productName}
              placeholder="상품명"
              onChange={(e) => setProductName(e.target.value)}
            />
          </p>
          <p>
            총합계<br />
            <input
              type="text"
              className="form-control"
              value={totalAmount}
              placeholder="총합계"
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </p>
        </div>
        <div className="my-msgbox">
          결제 요청 전송
        </div>
      </div>
    </div>
  );
}

export default Seller;
