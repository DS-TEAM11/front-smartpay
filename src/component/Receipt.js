import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = ({ paymentData }) => {
  const location = useLocation();
  const data = paymentData || location.state?.paymentData;

  const formatDate = (dateString) => {
    if (!dateString) return '날짜 없음';

    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    return `${year}년 ${month}월 ${day}일`;
  };

  const getCardLastFourDigits = (cardNo) => {
    if (!cardNo) return '카드 번호 없음';
    return cardNo.slice(-4);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>결제 완료</h2>
      {data ? (
        <div style={styles.receipt}>
          <p>주문 번호: {data.orderNo}</p>
          <p>가맹점: {data.franchiseNo}</p>
          <p>결제 금액: {data.price ? `${data.price}원` : '결제 금액 없음'}</p>
          <p>상품: {data.product}</p>
          <p>결제 일자: {data.payDate ? formatDate(data.payDate) : '결제 일자 없음'}</p>
          <p>결제 카드: {getCardLastFourDigits(data.cardNo)}</p>
          <p>받은 혜택: {data.savePrice ? `${data.savePrice}원` : '혜택 금액 없음'}</p>
          <p>소지자: 본인</p>
        </div>
      ) : (
        <p>결제 데이터가 없습니다.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  receipt: {
    fontSize: '18px',
  },
};

export default PaymentSuccess;
