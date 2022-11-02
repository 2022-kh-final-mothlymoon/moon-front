import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../service/dbLogic";

const AdminLogin = ({ isLogin, isAdmin }) => {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 아이디 담기
  const handleInputId = (e) => {
    setId(e.target.value);
    console.log(e.target.value);
  };
  // 비밀번호 담기
  const handleInputPw = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const adminLoginBtn = (e) => {
    e.preventDefault();
    let body = {
      admin_id: id,
      admin_pw: password,
    };
    adminLogin(body).then((res) => {
      console.log(res);
      console.log(res.data);
      if (res.data.admin_id === id && res.data.admin_pw !== password) {
        console.log("로그인 성공");
        sessionStorage.setItem("admin", id);
        sessionStorage.setItem("level", 5);
        navigate("/");
        window.location.reload();
      } else if (res.data.member_no === 0) {
        alert("아이디 또는 비밀번호를 확인하세요");
      }
    });
  };

  return (
    <>
      <h1>관리자 로그인 페이지</h1>
      <hr />
      <label>아이디</label>
      <input type="text" name="admin_id" value={id} onChange={handleInputId} />
      <br />
      <label>비밀번호</label>
      <input
        type="password"
        name="admin_password"
        value={password}
        onChange={handleInputPw}
      />
      <button onClick={adminLoginBtn}>로그인</button>
    </>
  );
};

export default AdminLogin;
