import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import DaumPostcodeEmbed from "react-daum-postcode";
import axios from "axios";

const RegisterPage = (props) => {
  const registerM = () => {
    document.querySelector("#f_register").action =
      process.env.REACT_APP_SPRING_IP + "monthlymoon/register";
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
      .post(process.env.REACT_APP_SPRING_IP + "monthlymoon/emailcheck", null, {
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
      <h1>회원가입 페이지</h1>
      <Button variant="dark" type="submit">
        <Link to="/login">로그인</Link>
      </Button>
      <hr />
      <Form id="f_register" method="post">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="member_email"
            value={email}
            onChange={eCheck}
            placeholder="Enter email"
          />
          <Button onClick={emailChk}>이메일 중복검사</Button>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="member_password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>이 름</Form.Label>
          <Form.Control type="text" name="member_name" placeholder="이름" />
        </Form.Group>
        <Button variant="warning" type="button" onClick={handleShow}>
          Open
        </Button>
        <Form.Group className="mb-3" controlId="formBasicZipcode">
          <Form.Label>우편번호</Form.Label>
          <Form.Control
            name="member_zipcode"
            value={zipcode}
            onChange={Inputzipcode}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>주 소</Form.Label>
          <Form.Control
            type="text"
            name="member_address"
            value={address}
            onChange={Inputaddress}
            placeholder="주소"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddressDetail">
          <Form.Label>상세주소</Form.Label>
          <Form.Control
            type="text"
            name="member_address_detail"
            placeholder="상세주소"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTel">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            type="text"
            name="member_phone"
            placeholder="전화번호"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBirth">
          <Form.Label>생일</Form.Label>
          <Form.Control name="member_birth" type="date" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={registerM}>
          Submit
        </Button>
      </Form>
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

export default RegisterPage;
