import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  let navigate = useNavigate();
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
        // 암호화된 비밀번호와 입력한 비밀번호가 스프링 단에서 비교되기 때문에
        // 출력되는 비밀번호와 res.data.member_password는 서버에서 비교하기엔 다른 값
        // 만약 틀린 비밀번호를 입력한다면 res.data.member_password는 입력한 password와
        // 같은 값으로 출력되므로 res.data.member_password !== password 조건을 추가해 로그인 실패를 비교
        if (
          res.data.member_email === email &&
          res.data.member_password !== password
        ) {
          console.log("로그인 성공");
          sessionStorage.setItem("user_id", email);
          sessionStorage.setItem("user_name", res.data.member_name);
          navigate("/monthlymoon/register");
          // 로그인을 실패하면 스프링에서 입력한 값만 vo에 담아 보내기때문에
          // member_no의 값은 0이 출력됨 -> 로그인을 실패한 걸 알 수 있음
        } else if (res.data.member_no === 0) {
          alert("이메일 또는 비밀번호를 확인하세요");
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
