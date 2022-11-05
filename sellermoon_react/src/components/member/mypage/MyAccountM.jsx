import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { memberProfile, modifyProfile } from "../../../service/dbLogic";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Link, useNavigate } from "react-router-dom";
import MyPassword from "./MyPassword";

const MyAccountM = ({ no, props }) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  });
  // 수정할 회원정보 불러오기
  useEffect(() => {
    console.log("useEffet 호출");
    memberProfile({ member_no: no }).then((res) => {
      if (res.data === null) {
        return () => {};
      } else {
        setMemInfo(res.data);
        console.log(res);
        console.log(res.data);
      }
    });
  }, [no]);
  // 수정하기 onChange 함수
  const EditChange = (e) => {
    setMemInfo({
      ...memInfo,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  ///// 다음 우편번호 찾기 함수 //////
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(data.zonecode); // 우편번호
    console.log(fullAddress); // 주소
    setMemInfo({
      ...memInfo,
      member_zipcode: data.zonecode, // 새로 수정할 우편번호 담기
      member_address: fullAddress, // 수정할 주소 담기
      member_address_detail: "", // 우편번호 api에서 셀렉되면 상세주소 칸은 비워주기
    });

    setShow(false);
  };
  const memModify = (e) => {
    modifyProfile({
      member_no: no,
      member_name: memInfo.member_name,
      member_email: memInfo.member_email,
      member_zipcode: memInfo.member_zipcode,
      member_address: memInfo.member_address,
      member_address_detail: memInfo.member_address_detail,
      member_phone: memInfo.member_phone,
    }).then((res) => {
      console.log(res);
      console.log(res.data);
      if (res.data === 1) {
        alert("수정되었습니다. 다시 로그인해주세요");
        sessionStorage.clear();
        window.localStorage.removeItem("user_no");
        window.localStorage.removeItem("com.naver.nid.access_token");
        navigate("/");
        window.location.reload();
      } else {
        alert("수정에 실패했습니다.");
      }
    });
  };
  return (
    <>
      <div>
        <h1>회원정보</h1>&nbsp;&nbsp;
        <MyPassword no={no} />
        <hr />
      </div>
      <Form id="f_modifym" method="post">
        회원번호 : {memInfo.member_no}
        <br />
        이름 :
        <input
          type="text"
          value={memInfo.member_name}
          name="member_name"
          onChange={EditChange}
        />
        <br />
        회원등급 : {memInfo.member_level}
        <br />
        이메일 :
        <input
          type="text"
          value={memInfo.member_email}
          name="member_email"
          onChange={EditChange}
        />
        <br />
        주소 :
        <input
          type="text"
          value={memInfo.member_zipcode}
          name="member_zipcode"
          onChange={EditChange}
        />
        <input
          type="text"
          value={memInfo.member_address}
          name="member_address"
          onChange={EditChange}
        />
        <input
          type="text"
          name="member_address_detail"
          value={memInfo.member_address_detail}
          onChange={EditChange}
        />
        <br />
        <Button variant="warning" type="button" onClick={handleShow}>
          Open
        </Button>
        <br />
        전화번호 :{" "}
        <input
          type="text"
          value={memInfo.member_phone}
          name="member_phone"
          onChange={EditChange}
        />
        <br />
        생일 : {memInfo.member_birth}
        <br />
        가입일 : {memInfo.member_date}
      </Form>
      <Button variant="warning" onClick={memModify}>
        수정하기
      </Button>
      <br />
      <Link to={"/mypage/delmember"}>탈퇴하기</Link>
      {/* 우편번호 모달 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>우편번호 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyAccountM;
