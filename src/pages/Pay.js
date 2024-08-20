import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaymentSuccess from "../component/Receipt";
import Button from "../component/Button";
import Order from "../component/Order";
import Header from "../component/Header";
import RecoCard from "../component/RecoCard";
const Pay = () => {
  const franchise = "gs25"
  const testprice= 150000;
  const testsave =300;
  const testtype= "적립";
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    //
    const paymentData = {
      orderNo: "TEST",
      price: 150000,
      product: "결제로그확인용",
      cardNo: "2222-2222-2222-2222",
      cardCode: 1,
      getIsAi: true,
      payDate: "20240101",
      saveType: 1,
      savePrice: 200,
      franchiseNo: 1,
      memberNo: "ce6e2639-3dda-46d2-8d14-1da870ff61e8"
    };

    try {
      const response = await axios.post(
        "http://localhost:8091/api/payment/request",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const paymentStatus = response.data; // API가 반환하는 return 값(결제 상태)

      console.log(paymentStatus);

      if (paymentStatus === 0) {
        // 결제 성공
        alert("결제가 완료되었습니다.");
        setPaymentSuccess(true);
        setPaymentData(response.data);
        navigate("/pay/success", { state: { paymentData: paymentData} }); //결제 요청 값? 데이터 그대로 보내주기
      } else if (paymentStatus === 1) {
        // 카드 불일치
        alert("결제 실패: 카드 정보 불일치");
      } else if (paymentStatus === 2) {
        // 유효기간 만료
        alert("결제 실패:  유효기간 만료");
      } else if (paymentStatus === 3) {
        // 한도 초과
        alert("결제 실패: 카드 한도");
      } else {
        // 예외 에러
        alert("결제 실패: 서버 에러");
      }

    } catch (error) { //?????
      if (error.response) {
        console.error("결제 실패:", error.response.data);
      } else if (error.request) {
        console.error("응답 없음:", error.request);
      } else {
        console.error("요청 에러:", error.message);
      }
    }
  };
//컴포넌트 확인용 데이터?
  let getIsAi = false;
  return (
    <div>
      <Header/>
      <Order/>
      
        <div className="d-flex justify-content-center">
          
          <div className="col-10 row">
          {getIsAi && (

            <div className="p-2 px-4 aiInfo">
              <p>
              ※ 이 카드는 편의점 이용금액 1,000원당 2마일리지 특별적립 혜택을 받을 수 있어요.
              </p>
            </div>
          )}
            <Button onClick={handlePayment} text={"이 카드로 결제하기"}/>
              
            <p className="text-decoration-underline text-end mt-2 p-0" href="">다른 카드 선택하기</p>
          
          </div>
        </div>
      
      {!getIsAi && (
         <RecoCard/> 
      )}
    </div>
  );
};



export default Pay;
