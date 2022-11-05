import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FindPass from "./FindPass";

const FindIdPass = (props) => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleInputId = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleInputName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleInputPhone = (e) => {
    console.log(e.target.value);
    setPhone(e.target.value);
  };

  // 이메일 찾기 버튼
  const findEmail = () => {
    axios
      .post(process.env.REACT_APP_SPRING_IP + "findemail", null, {
        params: { member_name: name, member_phone: phone },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data === null) {
          alert("가입된 이메일이 없습니다.");
        } else {
          setEmail(res.data.member_email);
        }
      })
      .catch();
  };

  return (
    <>
      <div>
        <h1>아이디 / 비밀번호 찾기</h1>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="member_name"
              value={name}
              onChange={handleInputName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>전화번호</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phonenumber"
              name="member_phone"
              value={phone}
              onChange={handleInputPhone}
            />
          </Form.Group>
        </Form>
        <Button variant="warning" onClick={findEmail}>
          아이디 찾기
        </Button>
        <h3>가입하신 이메일은 {email} 입니다.</h3>
      </div>
      <div>
        <FindPass />
      </div>
    </>
  );
};

export default FindIdPass;
