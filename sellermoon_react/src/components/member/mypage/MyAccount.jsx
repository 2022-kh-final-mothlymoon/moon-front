import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { memberProfile } from "../../../service/dbLogic";
import { CONTENTS } from "../../../styles/NoticeStyle";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import SidebarMypage from './../Common/SidebarMypage';
import NavbarMypage from './../Common/NavbarMypage';
import { P_STRONG, P_SMALL } from './../../../styles/SubStyle';

const MyAccount = ({ no, isLogin, myPoint }) => {
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
      <Header />

      <div className="container">
        <CONTENTS className="row">

          <SidebarMypage />

          <div className="col-9">
            <div className="list-wrapper">

              <NavbarMypage myPoint={myPoint} />

    {/* ************회원정보시작 ************ */}
      <div className="container" style={{padding:"20px 0 100px 0", borderBottom: "2px solid #b29d82"}}>
      <P_STRONG>회원정보 수정</P_STRONG>

      <P_SMALL>나의 정보</P_SMALL>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">이름</label>
          <div className="col-sm-5">
            <input type="text" name="member_name" value={memInfo.member_name} className="form-control-plaintext" />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">회원번호</label>
          <div className="col-sm-7 d-flex">
            <input type="text" name="member_address_detail" value={memInfo.member_no} className="form-control-plaintext" />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">주소</label>
          <div className="col-sm-7 d-flex">
            <input type="text" name="member_address" value={memInfo.member_address +", "+memInfo.member_address_detail} className="form-control-plaintext" />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label"></label>
          <div className="col-sm-7 d-flex">
            <input type="text" name="member_address_detail" value={memInfo.member_address_detail} className="form-control-plaintext" />
          </div>
        </div>

        <div className="mb-4 row">
          <label className="col-sm-2 col-form-label">전화번호{" "}</label>
          <div className="col-sm-5">
            <input type="text" name="member_phone" value={memInfo.member_phone} className="form-control-plaintext" />
          </div>
        </div>
        
        <hr />
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

        <p>
          {" "}
          <Link to={"/mypage/modifyprofile"}>내정보수정</Link>
        </p>
      </div>
      {/* ************************************ */}

            </div> {/* end of list-wrapper */}
          </div> {/* end of col */}

        </CONTENTS>
      </div> {/* end of container */}

      <Footer />

    </>
  );
};

export default MyAccount;
