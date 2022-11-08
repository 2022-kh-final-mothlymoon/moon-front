import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { jsonOrderDetail, jsonOrderDetail2 } from "../../../service/dbLogic";

const OrderD = (props) => {
  const navigate = useNavigate();
  const { ORDER_NO } = useParams();
  const [odVO, setOdVO] = useState({
    ORDER_NO: "",
    ORDER_PAYMENT: 0,
    ORDER_DATE: "",
    ORDER_USED_POINT: 0,
    ORDER_DE_CANCEL: "",
    DELIVERY_STATUS: "",
    DELIVERY_DATE: "",
    DELIVERY_COMPANY: "",
    DELIVERY_NO: "",
    DELIVERY_FEE: "",
    DELIVERY_ADDRESS: "",
    DELIVERY_PHONE: "",
    PURCHASE_METHOD: "",
  });
  const [odVO2, setOdVO2] = useState({
    //ORDER_NO: "",
    ORDER_PAYMENT: 0,
    ORDER_DATE: "",
    ORDER_USED_POINT: 0,
    MD_NO: 0,
    CART_QUANTITY: 0,
    ORDER_TYPE: "",
    MD_PRICE: 0,
    MD_IMAGE: "",
    MD_NAME: "",
    MD_BRAND: "",
    MD_IMAGE_URL: "",
  });
  console.log(ORDER_NO);
  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonOrderDetail({ ORDER_NO: ORDER_NO });
      console.log(res);
      setOdVO(res.data[0]);
    };
    asyncDB();
  }, [ORDER_NO]);
  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonOrderDetail2({ ORDER_NO: ORDER_NO });
      console.log(res);
      setOdVO2(res.data[0]);
    };
    asyncDB();
  }, [ORDER_NO]);

  const orderCancle = () => {};
  return (
    <>
      주문번호 : {odVO.ORDER_NO}[{odVO2.ORDER_TYPE}]
      <br />
      사용 포인트 : {odVO.ORDER_USED_POINT}
      <br />
      취소여부 : {odVO.ORDER_DE_CANCEL}
      <br />
      배송 현황 : {odVO.DELIVERY_STATUS}
      <br />
      배송 회사 : {odVO.DELIVERY_COMPANY}
      <br />
      배송 번호 :{odVO.DELIVERY_NO}
      <br />
      배송 시작 일자 : {odVO.DELIVERY_DATE}
      <br />
      배송비 : {odVO.DELIVERY_FEE}
      <br />
      배송 주소 : {odVO.DELIVERY_ADDRESS}
      <br />
      주문자 : {odVO2.MEMBER_NAME}
      <br />
      전화번호 : {odVO.DELIVERY_PHONE}
      <br />
      결제수단 : {odVO.PURCHASE_METHOD}
      <br />
      구매 상품 no : {odVO2.MD_NAME}
      <br />
      구매 상품 갯수 : {odVO2.CART_QUANTITY}
      <br />
      구매 상품 금액 : {odVO2.MD_PRICE}
      <br />
      총금액 : {odVO.ORDER_PAYMENT}
      <br />
      구매 상품 : [{odVO2.MD_BRAND}]{odVO2.MD_NAME}
      {/* {odVO2.MD_IMAGE} */}
      <br />
      <Card.Img
        variant="top"
        style={{ width: "250px" }}
        src={`${odVO2.MD_IMAGE_URL}`}
      />
      <Button onClick={orderCancle}>주문취소</Button>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        뒤로가기
      </Button>
    </>
  );
};

export default OrderD;
