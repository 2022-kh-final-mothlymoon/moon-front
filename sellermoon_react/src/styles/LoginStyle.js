import { Link } from "react-router-dom";
import styled from "styled-components";

/* 전체를 감싸는 div */
export const LDIV = styled.div`
  width: 45%;
  margin: 2rem auto;
  padding: 2.5rem;
  border: 0px;
  background-color: #f8eedc;
  border-radius: 1rem;
`;

/* text,input 요소들을 감싸는 div */
export const LDIV2 = styled.div`
  width: 100%;
  margin: 1rem auto;
`;

export const LDIV3 = styled.div`
  width: 100%
  margin: 0 auto;
  text-align: center;
`;

export const LDIV4 = styled.div`
  margin-top: 3rem;
`;

/* input 스타일 */
export const LINPUT = styled.input`
  width: 50%;
  height: 33%;
  margin-top: 5rem;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 0.1rem solid gray;
  background: transparent;
  outline: none;
`;

export const CHKDIV = styled.div`
  width: 40%;
  margin-left: 5rem;
`;

export const CHKINPUT = styled.input`
  margin-right: 0.5rem;
`;

export const VALIDDIV = styled.div`
  width: 50%;
  color: #a63838;
  margin: 0.5em auto;
  text-align: left;
`;

export const LOGINBTN = styled.button`
  width: 50%;
  height: 56px;
  margin: 0.2rem auto;
  background: #b29d82;
  font-size: 1.5em;
  border: 0px;
  border-radius: 0.3rem;
  &:hover:not([disabled]) {
    color: #f8eedc;
  }
`;

export const LOGINDIV = styled.div`
  width: 80%;
  margin: 7rem auto 0;
  display: grid;
`;

export const BORDERDIV = styled.div`
  border-top: 0.1px solid gray;
  border-right: none;
  border-left: none;
  border-bottom: none;
  color: gray;
  width: 50%;
  margin: 3rem auto 0;
  padding: 0.1em;
`;

export const SOCIALBTN = styled.img`
  width: 42%;
  height: 56px;
  margin: 0.5rem;
  cursor: pointer;
`;

export const SOCIALDIV = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const REGISTERLINK = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #b29d82;
  }
`;
