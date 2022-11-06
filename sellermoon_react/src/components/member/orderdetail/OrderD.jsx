import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsonOrderDetail, jsonOrderDetail2 } from "../../../service/dbLogic";

const OrderD = (props) => {
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
    STORE_NO: 0,
    MD_NO: 0,
    MD_NAME: "",
    MD_CONTENT: "",
    MD_PRICE: 0,
    MD_COST: 0,
    MD_CATEGORY: "",
    MD_IMAGE: "",
    MD_IMAGE_URL: "",
    MD_DETAIL_IMAGE: "",
    MD_DETAIL_IMAGE_URL: "",
    MD_DISCOUNT: 0,
    MD_BRAND: "",
    ST_AMOUNT: "",
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
  return (
    <>
      {odVO.ORDER_NO}
      {odVO.ORDER_PAYMENT}
      {odVO.ORDER_USED_POINT}
      {odVO.ORDER_DE_CANCEL}
      {odVO.DELIVERY_STATUS}
      {odVO.DELIVERY_DATE}
      {odVO.DELIVERY_COMPANY}
      {odVO.DELIVERY_NO}
      {odVO.DELIVERY_FEE}
      {odVO.DELIVERY_ADDRESS}
      {odVO.DELIVERY_PHONE}
      {odVO.PURCHASE_METHOD}
    </>
  );
};

export default OrderD;
