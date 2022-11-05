import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Route, useLocation, useParams } from "react-router-dom";

const PaymentResult = ({ props }) => {
  const location = useLocation();

  const ORDER_NO = location.state.ORDER_NO;
  console.log(ORDER_NO);

  return (
    <>
      <strong>주문되었습니다</strong>
      <Button>주문상세페이지로</Button>
      <Button>홈으로</Button>
    </>
  );
};

export default PaymentResult;
