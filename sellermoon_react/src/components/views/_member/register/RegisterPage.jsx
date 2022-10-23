import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterPage = (props) => {
  const registerM = () => {
    // document.querySelector("#f_register").action =
    // "http://localhost:9005/monthlymoon/register";
    // document.querySelector("#f_register").submit();
  };
  return (
    <>
      <h1>회원가입 페이지</h1>
      <Button variant="dark" type="submit">
        <Link to="/monthlymoon/login">로그인</Link>
      </Button>
      <hr />
      <Form id="f_register" method="post">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="member_email"
            placeholder="Enter email"
          />
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
        <Form.Group className="mb-3" controlId="formBasicZipcode">
          <Form.Label>우편번호</Form.Label>
          <Form.Control name="member_zipcode" type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>주 소</Form.Label>
          <Form.Control type="text" name="member_address" placeholder="주소" />
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
    </>
  );
};

export default RegisterPage;
