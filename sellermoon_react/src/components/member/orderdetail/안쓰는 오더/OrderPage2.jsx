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

//상수거나

const OrderPage2 = ({ no, props, myPoint }) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataVO, setDataVO] = useState({});

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
      name: "주문", // 주문명 (필수항목)
      //name: payList[0].MD_NAME, // 주문명 (필수항목)
      amount: "5000", // 금액 (필수항목)
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
        ORDER_USED_POINT: res.order_used_point,
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
    console.log("useEffect 호출");
    const oracleDB = async () => {
      console.log("oracleDB 호출");
      const result = await paymentlist({ member_no: no }); // pMap : {}
      console.log(result);
      console.log(result.data[0]);
      setDataVO(result.data);
    };
    oracleDB();
  }, [no]);
  console.log(dataVO);

  /* **************************************************** */
  return (
    <>
      <Header />
      <div className="container" style={{ padding: "100px 0 200px 0" }}>
        <P_STRONG>주문하기 (개별구매)</P_STRONG>

        <Row className="mb-5">
          <Col xs={12} md={7}>
            {/* ************회원정보시작 ************ */}
            <FORM id="f_modifym" method="post">
              <P_SMALL>배송정보</P_SMALL>
              <div className="mb-3 mt-3 row">
                <label className="col-sm-2 col-form-label">주문먕</label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="name"
                    value="주문"
                    className="form-control"
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-3 mt-3 row">
                <label className="col-sm-2 col-form-label">이름</label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="member_name"
                    defaultValue={dataVO.MEMBER_NAME || ""}
                    onChange={handleChangeForm}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">배송지</label>
                <div className="col-sm-5 d-flex">
                  <input
                    type="text"
                    name="member_zipcode"
                    value={dataVO.member_zipcode || ""}
                    onChange={handleChangeForm}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">주소</label>
                <div className="col-sm-7 d-flex">
                  <input
                    type="text"
                    name="member_address"
                    defaultValue={dataVO.member_address || ""}
                    onChange={handleChangeForm}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">상세주소</label>
                <div className="col-sm-7 d-flex">
                  <input
                    type="text"
                    name="member_address_detail"
                    defaultValue={dataVO.member_address_detail || ""}
                    onChange={handleChangeForm}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-4 row">
                <label className="col-sm-2 col-form-label">전화번호 </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="member_phone"
                    defaultValue={dataVO.member_phone || ""}
                    onChange={handleChangeForm}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-4 row">
                <label className="col-sm-2 col-form-label">이멜 </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="member_email"
                    defaultValue={dataVO.member_email || ""}
                    onChange={handleChangeForm}
                    className="form-control"
                  />
                </div>
              </div>
            </FORM>
          </Col>
        </Row>
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

      <div className="d-flex justify-content-center"></div>
      <Button onClick={handleChangeForm}>저장하기</Button>
      <Button onClick={onClickPayment}>결제</Button>
      {/* end of container */}
      <Footer />

      <Footer />
    </>
  );
};

export default OrderPage2;
