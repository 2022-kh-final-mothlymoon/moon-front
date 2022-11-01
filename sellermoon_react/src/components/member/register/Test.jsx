import React from "react";
import { REDIRECT_URL, REST_API_KEY } from "../../../service/kakaologin";

const Test = (props) => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
  const resCode = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <div>
      <h1>인가코드 받기</h1>
      <button onClick={resCode}>인가코드받기</button>
    </div>
  );
};

export default Test;
