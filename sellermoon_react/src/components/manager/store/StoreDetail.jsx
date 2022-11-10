import React, { useEffect, useState } from "react";
import { Button, Col, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { jsonStoreDetail } from "../../../service/dbLogic";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { CONTENTS } from "../../../styles/NoticeStyle";
import styled from "styled-components";
import { TD } from "../../../styles/SubStyle";
import { BANNER_P2 } from "../../../styles/MainStyle";
import { BANNER_P3 } from "../../member/orderdetail/TOrderD";

/*
 * /admin/store/detail/store.STORE_NO
 * 거래처 디테일 페이지입니다.
 * 가능한 기능 R
 */

const StoreDetail = (props) => {
  const navigate = useNavigate();

  const { STORE_NO } = useParams();

  console.log(STORE_NO);

  const [storeVO, setStoreVO] = useState({
    STORE_NO: 0,
    MD_NO: 0,
    MD_NAME: "",
    STORE_CONTACT: "",
    STORE_MANAGER: "",
    STORE_MEMO: "",
    STORE_YN: "",
    STORE_START_DATE: "",
    FIELD: "",
  });

  // storeList 불러오기용(한 건)
  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonStoreDetail({ STORE_NO: STORE_NO });
      console.log(res);
      setStoreVO(res.data);
    };
    asyncDB();
  }, [STORE_NO]); // 의존배열의 존재 유무는 useState의 순서에는 영향이 없음.
  const storemd = [];

  //store가 취급하는 md의 갯수가 여러 개일 경우 for문 돌려 보여주기
  for (let i = 0; i < storeVO.length; i++) {
    const element = storeVO[i].MD_NO + storeVO[i].MD_NAME;
    if (element.length > 0) {
      storemd.push(element);
      console.log(storemd);
    }
  }

  /*  for (let i = 0; i < storeVO.length; i++) {
    const element = storeVO[i].MD_NO + storeVO[i].MD_NAME;
    if (element.length > 0) {
      storemd.push(element);
      console.log(storemd);
    } else {
      storemd.push("없음");
    }
  }
 */

  return (
    <>
      <Header />
      <CONTENTS>
        <TABEL>
          <tr>
            <TD colspan="4">{STORE_NO}</TD>
            <Col></Col>
          </tr>

          <tr>
            <TD>거래여부</TD>
            <TD>{storeVO.length && storeVO[0].STORE_YN}</TD>
            <TD>거래처이름</TD>
            <TD>{storeVO.length && storeVO[0].FIELD}</TD>
          </tr>
          <tr>
            <td>담당자</td>
            <td>{storeVO.length && storeVO[0].STORE_MANAGER}</td>
            <td>번호</td>
            <td>{storeVO.length && storeVO[0].STORE_CONTACT}</td>
          </tr>
          <tr>
            <td>담당자</td>
            <td>{storeVO.length && storeVO[0].STORE_MANAGER}</td>
            <td>번호</td>
            <td>{storeVO.length && storeVO[0].STORE_CONTACT}</td>
          </tr>
          <tr>
            <td>거래시작일</td>
            <td>{storeVO.length && storeVO[0].STORE_START_DATE}</td>
          </tr>
          <tr>
            <td>거래상품</td>
            {storemd.map((storemd) => (
              <tr>{storemd}</tr>
            ))}
          </tr>
          <tr>
            <td>메모</td>
            <td>{storeVO.length && storeVO[0].STORE_MEMO}</td>
          </tr>
        </TABEL>
      </CONTENTS>

      <Button
        onClick={() => {
          navigate("/admin/store/modify/" + STORE_NO);
        }}
      >
        수정
      </Button>
      <Button
        onClick={() => {
          navigate("/admin/store");
        }}
      >
        뒤로가기
      </Button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default StoreDetail;

const TABEL = styled.table`
  margin: 10px;
  padding-bottom: 30px;
  border: 2px solid grey;
`;
const TR = styled.tr`
  text-align: center;
`;

const P = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.3;
  font-weight: 700;
  color: #5e514d;
  border-bottom: 2px solid grey;
  padding-bottom: 30px;
`;
