import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkMem } from "../../../service/dbLogic";

const MyAccountConfirm = ({ no, isLogin, logout }) => {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleInputPw = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const chkPass = (e) => {
    e.preventDefault();
    checkMem({ member_no: no, member_password: password }).then((res) => {
      console.log(res.data);
      console.log(res.data.member_no);
      if (password !== res.data.member_password) {
        alert("비밀번호가 확인되었습니다!");
        navigate("/mypage/modifyprofile");
      } else {
        alert("비밀번호를 확인해주세요!");
      }
    });
  };
  return (
    <>
      <h1>비밀번호 확인</h1>
      <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          placeholder="정보보호를 위해 비밀번호를 확인합니다."
          name="member_password"
          value={password}
          onChange={handleInputPw}
        />
      </Form.Group>
      <Button variant="warning" onClick={chkPass}>
        비밀번호 확인하기
      </Button>
    </>
  );
};

export default MyAccountConfirm;
