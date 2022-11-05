import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { memberList } from "../../../service/dbLogic";

const MemAdminDetail = ({ isLogin, isAdmin }) => {
  const { member_no } = useParams();
  const [mem, setMem] = useState({
    MEMBER_NO: 0,
    MEMBER_NAME: "",
    MEMBER_EMAIL: "",
    MEMBER_PHONE: "",
    MEMBER_LEVEL: "",
    MEMBER_BIRTH: "",
    MEMBER_ZIPCODE: "",
    MEMBER_ADDRESS: "",
    MEMBER_ADDRESS_DETAIL: "",
    MEMBER_CODE: "",
    MEMBER_DATE: "",
    MEMBER_METHOD: "",
  });

  useEffect(() => {
    memberList({ member_no: member_no }).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(res.data[0]);
      console.log(res.data[0].MEMBER_NO);
      setMem(res.data[0]);
    });
  }, [member_no]);

  return (
    <>
      <div>
        <h1>회원 상세보기</h1>
        <hr />
        <table>
          <tbody>
            <tr>
              <th>회원번호</th>
              <td>{mem.MEMBER_NO}</td>
            </tr>
            <tr>
              <th>회원명</th>
              <td>{mem.MEMBER_NAME}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{mem.MEMBER_EMAIL}</td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>{mem.MEMBER_PHONE}</td>
            </tr>
            <tr>
              <th>등급</th>
              <td>{mem.MEMBER_LEVEL}</td>
            </tr>
            <tr>
              <th>생일</th>
              <td>{mem.MEMBER_BIRTH}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{mem.MEMBER_ZIPCODE}</td>
              <td>{mem.MEMBER_ADDRESS}</td>
              <td>{mem.MEMBER_ADDRESS_DETAIL}</td>
            </tr>
            <tr>
              <th>회원코드</th>
              <td>{mem.MEMBER_CODE}</td>
            </tr>
            <tr>
              <th>가입방법</th>
              <td>{mem.MEMBER_METHOD}</td>
            </tr>
            <tr>
              <th>가입일</th>
              <td>{mem.MEMBER_DATE}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MemAdminDetail;
