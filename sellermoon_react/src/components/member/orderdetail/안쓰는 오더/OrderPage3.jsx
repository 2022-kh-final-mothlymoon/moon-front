import React from "react";
import axios from "axios";
import { P_SMALL, P_STRONG } from "../../../styles/SubStyle";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Col, Row, Modal, Form, Button } from "react-bootstrap";
import {
  modifyProfile,
  memberProfile,
  paymentlist,
  paytotal,
} from "./../../../service/dbLogic";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BROWN_BTN } from "../../../styles/NoticeStyle";
import {
  FORM,
  ORDER_CHECKS,
  ORDER_LI,
  ORDER_NUM1,
  ORDER_P1,
  ORDER_SPAN,
  ORDER_UL,
  POINTSUM,
} from "../../../styles/PaymentStyle";
import {
  ORDER_WRAPPER,
  ORDER_CHECK,
  ORDER_BTN,
  ORDER_NUM2,
  ORDER_P2,
} from "./../../../styles/PaymentStyle";
import OrderPageRow from "./OrderPageRow";

//간단 데이터 푸시 버전

const OrderPage3 = ({ no, props, myPoint }) => {
  document.cookie = "cookie1=soo; SameSite=None; Secure";
  document.cookie = "cookie2=soo; SameSite=None; Secure";
  document.cookie = "cookie3=hoo; SameSite=None; Secure";
  document.cookie = "crossCookie=bar; SameSite=None; Secure";
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataVO, setDataVO] = useState({
    member_no: 0,
    member_name: "",
    member_zipcode: "",
    member_address: "",
    member_address_detail: "",
    member_address_total: "",
    member_phone: 0,
    member_email: "",

    cart_no: "",
    cart_quantity: 0,
    order_type: "",
    md_name: "",
    //md_brand: "",
    md_price: 0,
    order_amount: 0 /* 주문총금액 (상품금액*개수)  */,
    order_payment: 0 /* 총결제금액 (상품금액*개수 - 포인트사용) */,
    order_used_point: 0,
  });

  //iamport
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

  const onClickPayment = (props) => {
    const { IMP } = window;
    IMP.init("imp15502331"); // 가맹점 식별코드 // 결제 데이터 정의
    const data = {
      pg: "html5_inicis", // PG사 (필수항목)
      pay_method: "card", // 결제수단 (필수항목)
      merchant_uid: `o_${new Date().getTime()}`, // 결제번호 (필수항목)
      name: dataVO.name, // 주문명 (필수항목)
      //name: payList[0].MD_NAME, // 주문명 (필수항목)
      amount: payList.order_payment, // 금액 (필수항목)
      buyer_name: dataVO.member_name, // 구매자 이름
      buyer_tel: dataVO.member_phone, // 구매자 전화번호 (필수항목)
      buyer_email: dataVO.member_email, // 구매자 이메일
      buyer_addr: dataVO.member_address + dataVO.member_address_detail,
      //buyer_postalcode: "우편번호", // ....
    };
    IMP.request_pay(data, callback);
    //console.log(payList[0].MD_NAME); /* 주문리스트 중 1번째 배열 상품명.. */
    //console.log(data.buyer_addr);
  };

  const callback = (res) => {
    const { success } = res;
    if (success) {
      alert("결제 성공");
      console.log(res);
      console.log(res.merchant_uid);
      //navigate("/payment/result", { state: { ORDER_NO: res.merchant_uid } });
      let list = {
        // json 형태로 spring에 값을 넘김
        ORDER_NO: res.merchant_uid,
        MEMBER_NO: no,
        //CART_NO: "1", /////////////////// 일단 상수로 넣음 -> insert 안해도 될거가틈..
        CART_NO: "1",
        ORDER_PAYMENT: res.paid_amount,
        ORDER_AMOUNT: res.paid_amount,
        ORDER_DATE: `${new Date().getTime()}`,
        ORDER_USED_POINT: 0,
        PURCHASE_NO: "p" + res.merchant_uid,
        PURCHASE_METHOD: res.pay_method + res.card_name + res.card_number,
        ORDER_DE_NO: "d" + res.merchant_uid,
        ORDER_DE_QUANTITY: 1,
        ORDER_DE_PRICE: res.paid_amount,
        ORDER_DE_CANCEL: "N",
        DELIVERY_STATUS: "상품준비중",
        DELIVERY_ADDRESS: res.buyer_addr,
        DELIVERY_PHONE: res.buyer_tel,
      };

      axios
        .post(process.env.REACT_APP_SPRING_IP + "paymentInsert", list)
        .then((response) => {
          console.log(response);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleChangeForm = (e) => {
    if (e.currentTarget == null) return;
    e.preventDefault();
    setDataVO({
      ...dataVO, // 처음에 초기화된 정보에 얕은 복사 처리

      [e.target.name]: e.target.value,
    });
    console.log(dataVO);
  };
  // 수정할 회원정보 불러오기
  useEffect(() => {
    console.log("useEffet 호출");
    memberProfile({ member_no: no }).then((res) => {
      if (res.data === null) {
        return () => {};
      } else {
        console.log(res.data);
        setDataVO(res.data);
      }
    });
  }, [no]);

  const [payList, setPayList] = useState({
    STORE_NO: 0,
    MD_NO: 0,
    MD_NAME: "",
    STORE_CONTACT: "",
    STORE_MANAGER: "",
    STORE_MEMO: "",
    STORE_YN: "",
    STORE_START_DATE: "",
    FIELD: "",
  });

  /* payList 데이터 가져오기 */
  useEffect(() => {
    const paymentList = async () => {
      const res = await paymentList({ member_no: no });
      console.log(res);
      setPayList(res.data);
    };
    paymentList();
  }, [no]);
  const orderp = [];

  for (let i = 0; i < paymentlist.length; i++) {
    const element = payList[i].MD_PRICE;
    if (orderp.length > 0) {
      orderp.push(element);
      console.log(orderp);
    }
    /* *********포인트 모두사용************************* */

    const pointUseAll = () => {
      setPayList({
        order_used_point: parseInt(myPoint.POINT_SUM),
        order_amount: 5000,
        order_payment: 5000 - parseInt(myPoint.POINT_SUM),
      });
    };

    /* **************************************************** */
    return (
      <>
        <Header />
        <div className="container" style={{ padding: "100px 0 200px 0" }}>
          <P_STRONG>주문하기 (개별구매)</P_STRONG>

          <Row className="mb-5">
            <Col xs={12} md={7}>
              {/* ************회원정보시작 ************ */}
              <Form>
                <Form.Label>주문명</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue="아임포트 결제 데이터 분석"
                  onChange={handleChangeForm}
                />
              </Form>
              <Form>
                <Form.Label>결제금액</Form.Label>
                <Form.Control
                  type="text"
                  name="order_payment"
                  defaultValue="100"
                  onChange={handleChangeForm}
                />
              </Form>

              <Form>
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  name="buyer_name"
                  defaultValue={dataVO.member_name}
                  onChange={handleChangeForm}
                />
              </Form>
              <Form>
                <Form.Label>주소</Form.Label>
                <Form.Control
                  type="text"
                  name="member_address"
                  defaultValue={dataVO.member_address}
                  onChange={handleChangeForm}
                />
              </Form>
              <Form>
                <Form.Label>상세주소</Form.Label>
                <Form.Control
                  type="text"
                  name="member_address_detail"
                  defaultValue={dataVO.member_address_detail}
                  onChange={handleChangeForm}
                />
              </Form>
              <Form>
                <Form.Label>전화번호</Form.Label>
                <Form.Control
                  type="text"
                  name="member_phone"
                  defaultValue={dataVO.member_phone}
                  onChange={handleChangeForm}
                />
              </Form>
              <Form>
                <Form.Label>이메일</Form.Label>
                <Form.Control
                  type="text"
                  name="buyer_email"
                  defaultValue={dataVO.member_email}
                  onChange={handleChangeForm}
                />
              </Form>
              {/* ************적립금사용여부 ************ */}
              <FORM>
                <br />
                <P_SMALL>적립금 사용</P_SMALL>
                <div className="mt-2 mb-2 row">
                  <label className="col-sm-2 col-form-label">적립금</label>
                  <div className="col-sm-5 d-flex">
                    <input
                      type="number"
                      name="order_used_point"
                      onChange={handleChangeForm}
                      value={payList.order_used_point}
                      className="form-control"
                    />
                    <BROWN_BTN onClick={pointUseAll} type="button">
                      모두사용
                    </BROWN_BTN>
                  </div>
                </div>
                <div className="mb-4 row">
                  <label className="col-sm-2 col-form-label"></label>
                  <div className="col-sm-7 d-flex">
                    <span>&nbsp;보유 적립금</span>
                    <POINTSUM>
                      {myPoint.POINT_SUM > 0 ? myPoint.POINT_SUM : 0} P
                    </POINTSUM>
                  </div>
                </div>
              </FORM>

              {/* ********************************************************** */}
            </Col>
            <Col xs={6} md={5}>
              <ORDER_WRAPPER>
                <P_SMALL>주문상품 / 총 1개</P_SMALL>

                <hr />

                <div className="d-flex justify-content-left">
                  <ORDER_NUM1>총 상품금액</ORDER_NUM1>
                  <ORDER_NUM2>{orderp}원</ORDER_NUM2>
                </div>

                <div className="d-flex justify-content-left">
                  <ORDER_NUM1>배송비&nbsp; &nbsp; &nbsp; &nbsp;</ORDER_NUM1>
                  <ORDER_NUM2>무료배송</ORDER_NUM2>
                </div>

                <div className="d-flex justify-content-left">
                  <ORDER_NUM1>
                    <strong>총 결제금액</strong>
                  </ORDER_NUM1>
                  <ORDER_P2>5000-{payList.order_used_point} 원</ORDER_P2>
                </div>

                <hr />

                <p style={{ margin: "8px 18px" }}>
                  주문 내용을 확인했으며, 아래 내용에 동의합니다.
                </p>
                <div className="d-flex">
                  <ORDER_CHECK type="checkbox" defaultChecked />
                  <ORDER_CHECKS>(필수) 개인정보 수집/이용 동의</ORDER_CHECKS>
                </div>
                <div className="d-flex">
                  <ORDER_CHECK type="checkbox" defaultChecked />
                  <ORDER_CHECKS>(필수) 개인정보 제3자 제공 동의</ORDER_CHECKS>
                </div>
                <div className="d-flex">
                  <ORDER_CHECK type="checkbox" defaultChecked />
                  <ORDER_CHECKS>(필수) 결제대행 서비스 이용약관</ORDER_CHECKS>
                </div>

                <div className="d-flex justify-content-center">
                  <ORDER_BTN onClick={onClickPayment}>결제하기</ORDER_BTN>
                </div>
              </ORDER_WRAPPER>
            </Col>
          </Row>
        </div>
        <Button onClick={handleChangeForm}>저장하기</Button>
        <Button onClick={onClickPayment}>결제</Button>
        <Footer />
      </>
    );
  }
};

export default OrderPage3;
