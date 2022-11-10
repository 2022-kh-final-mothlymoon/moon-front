import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  jsonOrderDetail,
  jsonOrderDetail2,
  paymentlist,
  spaymentlist,
  spaytotal,
} from "../../../service/dbLogic";
import { BANNER_P } from "../../../styles/MainStyle";
import {
  FORM,
  ORDER_BTN,
  ORDER_NUM1,
  ORDER_NUM2,
  ORDER_P2,
  ORDER_UL,
} from "../../../styles/PaymentStyle";
import { P_STRONG, TABLE, TD } from "../../../styles/SubStyle";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import SorderPageRow from "../Payment/SorderPageRow";

const TOrderD = ({ no, props }) => {
  const navigate = useNavigate();

  const { ORDER_NO } = useParams();

  const [payList, setPayList] = useState([]);

  /* payList 데이터 가져오기 */
  useEffect(() => {
    const spaymentList = async () => {
      await spaymentlist({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          console.log(res.data);
          setPayList(res.data);
        }
      });
    };
    spaymentList();
  }, [no]);

  const [orderInfo, setOrderInfo] = useState({
    cart_no: 0,
    cart_quantity: 0,
    order_type: "",
    md_name: "",
    order_amount: 0 /* 주문총금액 (상품금액*개수)  */,
    order_payment: 0 /* 총결제금액 (상품금액*개수 - 포인트사용) */,
    order_used_point: 0,
  });

  /* 총결제금액 데이터 가져오기 */
  useEffect(() => {
    const spayTotal = async () => {
      await spaytotal({ member_no: no }).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          console.log(res.data);
          setOrderInfo({ order_amount: res.data.ORDER_AMOUNT });
        }
      });
    };
    spayTotal();
  }, [no]);

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

  //주문취소 업데이트
  const orderCancle = () => {
    let list = {
      // json 형태로 spring에 값을 넘김
      ORDER_NO: ORDER_NO,
    };

    //주문취소 배송테이블 업데이트
    axios
      .post(process.env.REACT_APP_SPRING_IP + "deliUpdate", list)
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //주문취소 배송테이블 업데이트
    axios
      .post(process.env.REACT_APP_SPRING_IP + "cancelUpdate", list)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("주문이 취소되었습니다");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <P_STRONG2>주문되었습니다</P_STRONG2>
      <BANNER_P3>{odVO.ORDER_NO}[정기구독]</BANNER_P3>
      <FORM2>
        <P_SMALL2>주문상품정보</P_SMALL2>
        <FORM3>
          <ORDER_UL2>
            {payList.map((pay, i) => (
              <SorderPageRow key={i} pay={pay} />
            ))}
          </ORDER_UL2>
          <ORDER_UL2>배송 현황 : {odVO.DELIVERY_STATUS}</ORDER_UL2>
        </FORM3>
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
        배송 주소 : {odVO.DELIVERY_ADDRESS}
        <br />
        주문자 : {odVO2.MEMBER_NAME}
        <br />
        전화번호 : {odVO.DELIVERY_PHONE}
        <br />
        결제수단 : {odVO.PURCHASE_METHOD}
        <TABLE>
          <tr>
            <TD>
              <ORDER_NUM1>총 상품금액</ORDER_NUM1>
            </TD>
            <TD>
              <ORDER_NUM1>적립금 사용</ORDER_NUM1>
            </TD>
            <TD>
              <ORDER_NUM1>배송비</ORDER_NUM1>
            </TD>
            <TD>
              {" "}
              <ORDER_NUM1>
                <strong>총 결제금액</strong>
              </ORDER_NUM1>
            </TD>
          </tr>
          <tr>
            <TD>
              <ORDER_NUM2>
                {parseInt(orderInfo.order_amount).toLocaleString()}원
              </ORDER_NUM2>
            </TD>
            <TD>
              <ORDER_NUM2>
                {parseInt(odVO.ORDER_USED_POINT) > 0
                  ? parseInt(odVO.ORDER_USED_POINT).toLocaleString()
                  : 0}
                원
              </ORDER_NUM2>
            </TD>
            <TD>
              <ORDER_NUM2>무료배송</ORDER_NUM2>
            </TD>
            <TD>
              <ORDER_P2>
                {parseInt(odVO.ORDER_USED_POINT) > 0
                  ? (
                      parseInt(orderInfo.order_amount) -
                      parseInt(odVO.ORDER_USED_POINT)
                    ).toLocaleString()
                  : parseInt(orderInfo.order_amount).toLocaleString()}{" "}
                원
              </ORDER_P2>
            </TD>
          </tr>
        </TABLE>
        <br />
        <ORDER_BTN2 onClick={orderCancle}>주문취소</ORDER_BTN2>
        <ORDER_BTN2
          onClick={() => {
            navigate("/");
          }}
        >
          뒤로가기
        </ORDER_BTN2>
      </FORM2>
      <Footer />
    </>
  );
};

export default TOrderD;

export const BANNER_P3 = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.3;
  font-weight: 700;
  color: #5e514d;
  border-bottom: 2px solid #b29d82;
  padding-bottom: 30px;
`;
export const ORDER_BTN2 = styled.button`
  width: 100px;
  height: 50px;
  color: #fafafa;
  background-color: #5e514d;
  border: none;
  margin: 30px 15px 0 15px;
  font-weight: 600;
  font-size: 15px;
`;

export const P_STRONG2 = styled.p`
  text-align: center;
  font-size: 1.7rem;
  margin: 30px 0 0 0;
  font-weight: 600;
  padding-bottom: 13px;
`;

export const P_SMALL2 = styled.p`
  font-size: 1.15rem;
  font-weight: 600;
  padding: 0;
`;

export const FORM2 = styled.form`
  padding: 20px 20px 50px 20px;
  border-bottom: 2px solid #b29d82;
`;

export const FORM3 = styled.form`
  border-top: 2px solid #b29d82;
  border-bottom: 2px solid #b29d82;
`;
export const ORDER_UL2 = styled.ul`
  margin: 0;
`;
