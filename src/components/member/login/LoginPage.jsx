import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginMember } from "../../../service/dbLogic";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const LoginPage = ({ no, isLogin }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 아이디(이메일) 담기
  const handleInputId = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  // 비밀번호 담기
  const handleInputPw = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };
  // 로그인
  const memLogin = (e) => {
    e.preventDefault();
    let body = {
      member_email: email,
      member_password: password,
    };
    loginMember(body).then((res) => {
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
        sessionStorage.setItem("user_id", email); // 세션에 회원 이메일 저장 브라우저 닫기 전까지 유지
        sessionStorage.setItem("user_name", res.data.member_name); // 세션에 회원 이름 저장
        sessionStorage.setItem("user_no", res.data.member_no); // 세션에 회원 번호 저장
        navigate("/");
        window.location.reload();
        // 로그인을 실패하면 스프링에서 입력한 값만 vo에 담아 보내기때문에
        // member_no의 값은 0이 출력됨 -> 로그인을 실패한 걸 알 수 있음
      } else if (res.data.member_no === 0) {
        alert("이메일 또는 비밀번호를 확인하세요");
      }
    });
  };

  // 이메일 찾기 버튼
  const findEmail = () => {
    navigate("/findemail");
  };
  // 비밀번호 찾기 버튼
  const findPass = () => {
    navigate("/findpass");
  };

  return (
    <>
      <Header />
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
        <Button variant="secondary" onClick={memLogin}>
          로그인
        </Button>
        &nbsp;&nbsp;
        <Button variant="warning" onClick={findEmail}>
          아이디 찾기
        </Button>
        &nbsp;&nbsp;
        <Button variant="warning" onClick={findPass}>
          비밀번호 찾기
        </Button>
      </Form>
      <Link to="/register">회원가입하기</Link>
      <Footer />
    </>
  );
};

export default LoginPage;
