import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLogin = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    // 인가코드 받아오기
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    axios
      .get(process.env.REACT_APP_SPRING_IP + `kakaologin?code=${code}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.member_no);
        alert("로그인 성공");
        sessionStorage.setItem("user_no", res.data.member_no); // 세션에 스프링에서 넘어온 member_no값 저장
        navigate("/");
        window.location.reload();
      });
  }, []);

  return (
    <>
      <div>
        <h1>카카오 로그인 중...</h1>
      </div>
    </>
  );
};

export default KakaoLogin;
