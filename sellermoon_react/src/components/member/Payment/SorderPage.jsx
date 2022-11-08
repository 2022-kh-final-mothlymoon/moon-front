import React from 'react';
import axios from "axios";
import { P_SMALL, P_STRONG } from '../../../styles/SubStyle';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import DaumPostcodeEmbed from "react-daum-postcode";
import { Col, Row, Modal } from 'react-bootstrap';
import { modifyProfile, memberProfile, paymentlist, spaymentlist, spaytotal } from '../../../service/dbLogic';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BROWN_BTN } from '../../../styles/NoticeStyle';
import { FORM, ORDER_CHECKS, ORDER_LI, ORDER_NUM1, ORDER_P1, ORDER_SPAN, ORDER_UL, POINTSUM } from '../../../styles/PaymentStyle';
import { ORDER_WRAPPER, ORDER_CHECK, ORDER_BTN, ORDER_NUM2, ORDER_P2 } from '../../../styles/PaymentStyle';
import OrderPageRow from './OrderPageRow';

const SorderPage = ({no, props, myPoint}) => {

  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [payInfo, setPayInfo] = useState({
    member_no: 0,
    member_name: "",
    member_zipcode: "",
    member_address: "",
    member_address_detail: "",
    member_address_total: "",
    member_phone: 0,
    member_email: "",
    cart_no: 0,
    cart_quantity: 0,
    order_type: "",
    md_name : "",
    md_brand : "",
    md_price : 0,
    order_amount: 0, /* 주문총금액 (상품금액*개수)  */
    order_payment: 0, /* 총결제금액 (상품금액*개수 - 포인트사용) */
    order_used_point: 0,
  });


  // 수정할 회원정보 불러오기
  useEffect(() => {
    console.log("useEffet 호출");
    memberProfile({ member_no: no }).then((res) => {
      if (res.data === null) {
        return () => {};
      } else {
        setPayInfo(res.data);
      }
    });
  }, [no]);


  // 수정하기 onChange 함수
  const EditChange = (e) => {
    setPayInfo({
      ...payInfo,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };


  ///// 다음 우편번호 찾기 함수 //////
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(data.zonecode); // 우편번호
    console.log(fullAddress); // 주소
    setPayInfo({
      ...payInfo,
      member_zipcode: data.zonecode, // 새로 수정할 우편번호 담기
      member_address: fullAddress, // 수정할 주소 담기
      member_address_detail: "", // 우편번호 api에서 셀렉되면 상세주소 칸은 비워주기
    });

    setShow(false);
  };


/* **************************************************** */

  const [payList, setPayList] = useState([])

/* payList 데이터 가져오기 */
useEffect(() => {
  const paymentList = async () => {
      await spaymentlist({member_no: no}).then((res) => {
        if (res.data === null) {
          return 0;
        } else {
          console.log(res.data)
          setPayList(res.data)
        }
      })
  }
  paymentList()
  },[no])

/* 총결제금액 데이터 가져오기 */
  useEffect(() => {
    const payTotal = async () => {
        await spaytotal({member_no: no}).then((res) => {
          if (res.data === null) {
            return 0;
          } else {
            console.log(res.data)
            setPayInfo({order_amount : res.data.ORDER_AMOUNT})
          }
        })
    }
    payTotal()
    },[no])


  /* *********포인트 모두사용************************* */

  const pointUseAll = () => {
    setPayInfo({
      order_used_point : parseInt(myPoint.POINT_SUM), 
      order_amount : parseInt(payInfo.order_amount),
      order_payment : (parseInt(payInfo.order_amount) - parseInt(payInfo.order_used_point)),
    })
  }

  
/* ***************************************************** */

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
      name:  payList[0].MD_NAME, // 주문명 (필수항목)
      amount: payInfo.order_payment, // 금액 (필수항목)
      custom_data: { name: "부가정보", desc: "세부 부가정보" },
      buyer_name: payInfo.member_name, // 구매자 이름
      buyer_tel: payInfo.member_phone, // 구매자 전화번호 (필수항목)
      buyer_email: payInfo.member_email, // 구매자 이메일
      buyer_addr: payInfo.member_address + payInfo.member_address_detail,
      //buyer_postalcode: "우편번호", // ....
      };
    IMP.request_pay(data, callback);
    console.log(payList[0].MD_NAME); /* 주문리스트 중 1번째 배열 상품명.. */
    console.log(data.buyer_addr)
    };


  const callback = (res) => {
    const { success } = res;
    if (success) {
      alert("결제 성공");
      console.log(res);
      console.log(res.merchant_uid);
      //navigation.navigate("/payment/result", { ORDER_NO: "res.merchant_uid" })
      navigate("/payment/result", { state: { ORDER_NO: res.merchant_uid } });
      let list = {
        // json 형태로 spring에 값을 넘김
        ORDER_NO: res.merchant_uid,
        MEMBER_NO: no,
        //CART_NO: "1", /////////////////// 일단 상수로 넣음 -> insert 안해도 될거가틈..
        ORDER_PAYMENT: res.order_payment,
        ORDER_AMOUNT: res.order_amount,
        ORDER_DATE: `${new Date().getTime()}`,
        ORDER_USED_POINT: res.order_used_point,
        PURCHASE_NO: "p" + res.merchant_uid,
        PURCHASE_METHOD: res.pay_method + res.card_name + res.card_number,
        ORDER_DE_NO: "d" + res.merchant_uid,
        ORDER_DE_QUANTITY: payList.length, 
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

/* ***************************************************** */



  return (
    <>
      <Header />

      <div className="container" style={{padding:"100px 0 300px 0"}}>

        <P_STRONG>주문하기 (정기구독)</P_STRONG>

        <Row className="mb-5">
          <Col xs={12} md={7}>

      {/* ************회원정보시작 ************ */}
      <FORM id="f_modifym" method="post">
      <P_SMALL>배송정보</P_SMALL>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">이름</label>
          <div className="col-sm-5">
            <input type="text" name="member_name" value={payInfo.member_name} onChange={EditChange} className="form-control" />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">배송지</label>
          <div className="col-sm-5 d-flex">
            <input type="text" name="member_zipcode" value={payInfo.member_zipcode} onChange={EditChange} className="form-control" />
            <BROWN_BTN onClick={handleShow} type="button">우편번호</BROWN_BTN>
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label"></label>
          <div className="col-sm-7 d-flex">
            <input type="text" name="member_address" value={payInfo.member_address} onChange={EditChange} className="form-control" />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label"></label>
          <div className="col-sm-7 d-flex">
            <input type="text" name="member_address_detail" value={payInfo.member_address_detail} onChange={EditChange} className="form-control" />
          </div>
        </div>

        <div className="mb-4 row">
          <label className="col-sm-2 col-form-label">전화번호{" "}</label>
          <div className="col-sm-5">
            <input type="text" name="member_phone" value={payInfo.member_phone} onChange={EditChange} className="form-control" />
          </div>
        </div>

        <input type="hidden" value={payInfo.member_email} name="member_email" onChange={EditChange} />
      
      </FORM>

      {/* ************적립금사용여부 ************ */}
      <FORM>
      <br/>
      <P_SMALL>적립금 사용</P_SMALL>
        <div className="mt-2 mb-2 row">
          <label className="col-sm-2 col-form-label">적립금</label>
          <div className="col-sm-5 d-flex">
            <input type="number" name="order_used_point" onChange={EditChange} 
                  value={payInfo.order_used_point} className="form-control" />
            <BROWN_BTN onClick={pointUseAll} type="button">모두사용</BROWN_BTN>
          </div>
        </div>
        <div className="mb-4 row">
          <label className="col-sm-2 col-form-label"></label>
          <div className="col-sm-7 d-flex">
            <span>&nbsp;보유 적립금</span>
            <POINTSUM>{myPoint.POINT_SUM > 0 ? myPoint.POINT_SUM : 0} P</POINTSUM>
          </div>
        </div>

      </FORM>

{/* ********************************************************** */}
          </Col>
          
          
          <Col xs={6} md={5}>
            <ORDER_WRAPPER>
              <P_SMALL>주문상품 / 총 {payList.length}개</P_SMALL>
              <ORDER_UL>
                  {
                    payList.map((pay, i) => (
                      <OrderPageRow key={i} pay={pay} />
                    ))
                  }
              </ORDER_UL>

              <hr />

            <div className="d-flex justify-content-left">
              <ORDER_NUM1>총 상품금액</ORDER_NUM1>
              <ORDER_NUM2>{parseInt(payInfo.order_amount).toLocaleString()}원</ORDER_NUM2>
            </div>

            <div className="d-flex justify-content-left">
              <ORDER_NUM1>적립금 사용</ORDER_NUM1>
              <ORDER_NUM2>
                {
                  parseInt(payInfo.order_used_point) > 0 
                  ? parseInt(payInfo.order_used_point).toLocaleString() : 0
                }
              원</ORDER_NUM2>
            </div>

            <div className="d-flex justify-content-left">
              <ORDER_NUM1>배송비&nbsp; &nbsp; &nbsp; &nbsp;</ORDER_NUM1>
              <ORDER_NUM2>무료배송</ORDER_NUM2>
            </div>

            <div className="d-flex justify-content-left">
              <ORDER_NUM1><strong>총 결제금액</strong></ORDER_NUM1>
              <ORDER_P2>
                { 
                  parseInt(payInfo.order_used_point) > 0
                  ? (parseInt(payInfo.order_amount) - parseInt(payInfo.order_used_point)).toLocaleString()
                  : parseInt(payInfo.order_amount).toLocaleString()
                } 원
              </ORDER_P2>
            </div>

            <hr />
            
            <p style={{margin:"8px 18px"}}>주문 내용을 확인했으며, 아래 내용에 동의합니다.</p>
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
              <ORDER_BTN>결제하기</ORDER_BTN>
            </div>

            </ORDER_WRAPPER>

          </Col>



        </Row>
      </div> {/* end of container */}

      <Footer />



      {/* 우편번호 모달 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>우편번호 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SorderPage;