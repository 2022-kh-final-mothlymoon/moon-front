import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DaumPostcodeEmbed from "react-daum-postcode";
import axios from "axios";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { RBUTTON, RDIV, RDIV2, RDIV3, RINPUT } from "../../../styles/Register";

const RegisterPage = (props) => {
  const registerM = (e) => {
    e.preventDefault();
    document.querySelector("#f_register").action =
      process.env.REACT_APP_SPRING_IP + "register";
    document.querySelector("#f_register").submit();
  };
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [zipcode, setZipcode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 주소

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
    console.log(data.zonecode);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setZipcode(data.zonecode);
    setAddress(fullAddress);
    setShow(false);
  };
  ////// 다음 우편번호 함수 끝 //////
  const Inputzipcode = (e) => {
    console.log(e.target.value);
    setZipcode(e.target.value);
  };
  const Inputaddress = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  };

  const eCheck = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const emailChk = (e) => {
    console.log("이메일 중복체크");
    axios
      .post(process.env.REACT_APP_SPRING_IP + "emailcheck", null, {
        params: { member_email: email },
      })
      .then((result) => {
        console.log(result);
        if (result.data === 1) {
          alert("중복된 이메일 입니다.");
          return () => {};
        } else {
          alert("가입 가능한 이메일입니다.");
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <Header />
      <RDIV>
        <h1>회원가입</h1>
        <hr />
        <RDIV3>
          <form id="f_register" method="post">
            <RDIV2>
              <label>이메일</label>
              <RINPUT
                type="email"
                name="member_email"
                value={email}
                onChange={eCheck}
                placeholder="Enter email"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={emailChk}
              >
                이메일 중복검사
              </button>
            </RDIV2>
            <RDIV2>
              <label>비밀번호</label>
              <RINPUT
                type="password"
                name="member_password"
                placeholder="Password"
              />
            </RDIV2>
            <RDIV2>
              <label>이 름</label>
              <RINPUT type="text" name="member_name" placeholder="이름" />
            </RDIV2>
            <RDIV2>
              <label>우편번호</label>
              <RINPUT
                name="member_zipcode"
                value={zipcode}
                onChange={Inputzipcode}
                type="text"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleShow}
              >
                우편번호 찾기
              </button>
            </RDIV2>
            <RDIV2>
              <label>주 소</label>
              <RINPUT
                type="text"
                name="member_address"
                value={address}
                onChange={Inputaddress}
                placeholder="주소"
              />
            </RDIV2>
            <RDIV2>
              <label>상세주소</label>
              <RINPUT
                type="text"
                name="member_address_detail"
                placeholder="상세주소"
              />
            </RDIV2>
            <RDIV2>
              <label>전화번호</label>
              <RINPUT type="text" name="member_phone" placeholder="전화번호" />
            </RDIV2>
            <RDIV2>
              <label>생일</label>
              <RINPUT name="member_birth" type="date" />
            </RDIV2>
            <RDIV2>
              <label>추천인 코드</label>
              <RINPUT name="member_recommend" type="text" />
            </RDIV2>
            <RBUTTON>
              <button
                className="btn btn-outline-secondary"
                type="submit"
                onClick={registerM}
              >
                회원가입
              </button>
            </RBUTTON>
          </form>
        </RDIV3>
      </RDIV>
      <Footer />
      {/* 우편번호 모달 시작 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>우편번호 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
        </Modal.Body>
      </Modal>
      {/* 우편번호 모달 끝 */}
    </>
  );
};

export default RegisterPage;
