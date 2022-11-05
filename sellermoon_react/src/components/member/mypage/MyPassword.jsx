import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { modifyPass } from "../../../service/dbLogic";

const MyPassword = ({ no }) => {
  let navigate = useNavigate();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  // 새 비밀번호 담기
  const handleInputPw1 = (e) => {
    setPassword1(e.target.value);
    console.log(e.target.value);
  };
  // 새로운 비밀번호 확인
  const handleInputPw2 = (e) => {
    setPassword2(e.target.value);
    console.log(e.target.value);
  };

  const passModify = (e) => {
    e.preventDefault();
    if (password1 === password2) {
      modifyPass({
        member_no: no,
        member_password: password1,
      }).then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data === 1) {
          alert("수정되었습니다. 다시 로그인해주세요");
          sessionStorage.clear();
          window.localStorage.removeItem("user_no");
          window.localStorage.removeItem("com.naver.nid.access_token");
          navigate("/");
          window.location.reload();
        } else {
          alert("수정에 실패했습니다.");
        }
      });
    } else {
      alert("비밀번호가 같은지 확인해주세요");
    }
  };
  return (
    <div>
      <h1>비밀번호 수정</h1>
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>새 비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="member_password"
            value={password1}
            onChange={handleInputPw1}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>새 비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password2"
            value={password2}
            onChange={handleInputPw2}
          />
        </Form.Group>
      </Form>
      <Button variant="warning" onClick={passModify}>
        수정하기
      </Button>
    </div>
  );
};

export default MyPassword;
