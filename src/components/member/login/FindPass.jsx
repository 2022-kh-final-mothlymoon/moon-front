import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FindPass = (props) => {
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
  const findPass = () => {
    axios
      .post(process.env.REACT_APP_SPRING_IP + "sendmail", null, {
        params: { member_email: email, member_name: name, member_phone: phone },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data === 1) {
          alert("임시 비밀번호가 메일로 발급되었습니다.");
          navigate("/login");
        } else if (res.data === 0) {
          alert("해당하는 회원정보가 없습니다.");
        }
      })
      .catch();
  };
  return (
    <div>
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
        <Form.Group className="mb-3" controlId="formBasicName">
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
      <Button variant="warning" onClick={findPass}>
        임시비밀번호 발급받기
      </Button>
    </div>
  );
};

export default FindPass;
