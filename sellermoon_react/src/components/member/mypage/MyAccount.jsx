import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { memberProfile } from "../../../service/dbLogic";

const MyAccount = ({ no, isLogin }) => {
  const [memInfo, setMemInfo] = useState({
    member_no: 0,
    member_name: "",
    member_zipcode: "",
    member_address: "",
    member_address_detail: "",
    member_method: "",
    member_level: "",
    member_phone: 0,
    member_birth: "",
    member_email: "",
    member_date: "",
    member_code: "",
  });

  useEffect(() => {
    console.log("useEffet 호출");
    const memProfile = async () => {
      await memberProfile({ member_no: no }).then((res) => {
        if (res.data === null) {
          return () => {};
        } else {
          setMemInfo(res.data);
          console.log(res);
          console.log(res.data);
        }
      });
    };
    memProfile();
  }, [no]);
  return (
    <>
      <div>
        <h1>회원정보</h1>&nbsp;&nbsp;
        <p>
          {" "}
          <Link to={"/mypage/modifyprofile"}>내정보수정</Link>
        </p>
        <hr />
      </div>
      <div>
        회원번호 : {memInfo.member_no}
        <br />
        이름 : {memInfo.member_name}
        <br />
        회원등급 : {memInfo.member_level}
        <br />
        이메일 :{memInfo.member_email}
        <br />
        주소 :{" "}
        {memInfo.member_zipcode +
          memInfo.member_address +
          memInfo.member_address_detail}
        <br />
        전화번호 : {memInfo.member_phone}
        <br />
        생일 : {memInfo.member_birth}
        <br />
        가입일 : {memInfo.member_date}
        <br />
        회원코드 : {memInfo.member_code}
      </div>
    </>
  );
};

export default MyAccount;
