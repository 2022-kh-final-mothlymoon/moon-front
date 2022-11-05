//import axios from "axios";
import React, { useEffect, useState } from "react";
//import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header";

const SPayment = ({}) => {
  const navige = useNavigate();
  const [dataVO, setDataVO] = useState({});
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp15502331"); // 가맹점 식별코드 // 결제 데이터 정의
    const data = {
      pg: "Kakao", // PG사 (필수항목)
      pay_method: "card", // 결제수단 (필수항목)
      merchant_uid: `so_${new Date().getTime()}`, // 결제번호 (필수항목)
      name: "dataVO.name", // 주문명 (필수항목)
      amount: 500, // 금액 (필수항목)
      custom_uid: "buyer_name" + `so_${new Date().getTime()}`,
      buyer_name: "dataVO.buyer_name", // 구매자 이름
      buyer_tel: "dataVO.buyer_tel", // 구매자 전화번호 (필수항목)
      buyer_email: "dataVO.buyer_email", // 구매자 이메일
      buyer_addr: "주소",
      buyer_postalcode: "우편번호", // ....
    };
    IMP.request_pay(data, callback);
  };

  const callback = (res) => {
    const { success, merchant_uid, paid_amount } = res;
    if (success) {
      alert("결제 성공");
      console.log(res);
      console.log(res.merchant_uid);
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <Header />

      <button onClick={onClickPayment}>결제</button>
      <Footer />
    </>
  );
};

export default SPayment;
