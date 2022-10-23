import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputId = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleInputPw = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };
  const memLogin = () => {
    axios
      .post("http://localhost:9005/monthlymoon/login", null, {
        params: { member_email: email, member_password: password },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.member_email === email) {
          console.log("로그인 성공");
          sessionStorage.setItem("user_id", email);
        }
      })
      .catch();
  };
  return (
    <>
      <h1>로그인 페이지</h1>
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="member_email"
            value={email}
            onChange={handleInputId}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="member_password"
            value={password}
            onChange={handleInputPw}
          />
        </Form.Group>
        <Button variant="primary" onClick={memLogin}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginPage;
