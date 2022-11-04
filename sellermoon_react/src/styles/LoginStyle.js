import { Link } from "react-router-dom";
import styled from "styled-components";

/* 전체를 감싸는 div */
export const LDIV = styled.div`
  width: 50%;
  margin: 2rem auto;
  padding: 2.5rem;
  border: 0px;
  background-color: #f8eedc;
  border-radius: 1rem;
`;

/* text,input 요소들을 감싸는 div */
export const LDIV2 = styled.div`
  width: 100%;
  margin: 1.5rem auto;
`;

export const LDIV3 = styled.div`
  width: 100%
  margin: 0 auto;
  text-align: center;
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
  border-top: 0.1rem solid gray;
  border-right: none;
  border-left: none;
  border-bottom: none;
  color: gray;
  width: 50%;
  margin: 3rem auto 0;
  padding: 0.3em;
`;

export const SOCIALBTN = styled.img`
  width: 40%;
  height: 56px;
  margin: 0.8rem;
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
