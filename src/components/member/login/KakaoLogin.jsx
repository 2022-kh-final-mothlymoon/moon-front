import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REDIRECT_URL, REST_API_KEY } from "../../../service/kakaologin";

const KakaoLogin = (props) => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
  // 인가코드 받아오기
  const code = new URL(window.location.href).searchParams.get("code");

  return (
    <>
      <div className="KaKaoBtn">
        <a href={KAKAO_AUTH_URL}>카카오로 시작하기</a>
      </div>
    </>
  );
};

export default KakaoLogin;
