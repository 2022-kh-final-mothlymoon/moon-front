import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { jsonStoreDetail } from "../../../service/dbLogic";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
const StoreDetail = () => {
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

  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonStoreDetail({ STORE_NO: STORE_NO });
      console.log(res);
      setStoreVO(res.data);
    };
    asyncDB();
  }, [STORE_NO]); // 의존배열의 존재 유무는 useState의 순서에는 영향이 없음.
  const storemd = [];

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

  // 목록 이동 구현
  return (
    <>
      <Header />
      <Table>
        <tbody>
          <tr>{STORE_NO}</tr>
          <tr>
            <td>거래여부</td>
            <td>{storeVO.length && storeVO[0].STORE_YN}</td>
            <td>거래처이름</td>
            <td>{storeVO.length && storeVO[0].FIELD}</td>
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
        </tbody>
      </Table>
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
      <Footer />
    </>
  );
};

export default StoreDetail;
