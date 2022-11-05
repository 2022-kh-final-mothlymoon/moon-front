import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { jsonStoreDetail } from "../../../service/dbLogic";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const StoreModify = (props) => {
  const navigate = useNavigate();
  const { STORE_NO } = useParams();
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
    // 서버를 왔다갔다 하기 때문에 비동기처리가 필요함
    const asyncDB = async () => {
      // 처리될 때까지 기다려야하기 때문에 반드시 await을 사용!
      const res = await jsonStoreDetail({ STORE_NO: STORE_NO });
      // 여기서 호출하게 되면 fetch 함수와의 차이점을 발견할 수 있다
      // JSON.stringify, JSON.parse
      console.log(res);
      setStoreVO(res.data[0]);
    };
    asyncDB();
  }, [STORE_NO]); // 의존배열의 존재 유무는 useState의 순서에는 영향이 없음.
  const storeUpdate = () => {
    document.querySelector("#f_store").action =
      "http://localhost:9005/admin//store/storeUpdate";
    document.querySelector("#f_store").submit();
  };
  const handleChangeForm = (e) => {
    if (e.currentTarget == null) return;
    // console.log("폼 내용 변경 발생 name : " + e.target.name);
    // console.log("폼 내용 변경 발생 value : " + e.target.value);
    e.preventDefault();
    setStoreVO({
      ...storeVO, // 처음에 초기화된 정보에 얕은 복사 처리
      STORE_NO: STORE_NO,
      [e.target.name]: e.target.value,
    });
    console.log(storeVO);
  };
  // 목록 이동 구현
  return (
    <>
      <Header />
      <h1>
        <strong>{storeVO.STORE_NO}</strong>
      </h1>
      <Form id="f_store" method="get">
        <Form.Group className="mb-3" controlId="formBasicWriter">
          <Form.Label>FIELD</Form.Label>
          <Form.Control
            type="text"
            name="FIELD"
            value={storeVO.FIELD}
            onChange={handleChangeForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicWriter">
          <Form.Select
            type="text"
            name="STORE_YN"
            id="STORE_YN"
            aria-label="Default select example"
            value={storeVO.STORE_YN}
            onChange={handleChangeForm}
          >
            <option defaultValue>{"사용여부:" + storeVO.STORE_YN}</option>
            <option value="Y">Y</option>
            <option value="N">N</option>
          </Form.Select>
        </Form.Group>
        {/*  <Form.Group className="mb-3" controlId="formBasicWriter">
          <Form.Label>STORE_YN</Form.Label>
          <Form.Control
            type="text"
            name="STORE_YN"
            value={storeVO.STORE_YN}
            onChange={handleChangeForm}
          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicWriter">
          <Form.Label>STORE_MANAGER</Form.Label>
          <Form.Control
            type="text"
            name="STORE_MANAGER"
            value={storeVO.STORE_MANAGER}
            onChange={handleChangeForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>STORE_CONTACT</Form.Label>
          <Form.Control
            type="text"
            name="STORE_CONTACT"
            value={storeVO.STORE_CONTACT}
            onChange={handleChangeForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>STORE_MEMO</Form.Label>
          <Form.Control
            type="text"
            name="STORE_MEMO"
            value={storeVO.STORE_MEMO}
            onChange={handleChangeForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            type="hidden"
            name="STORE_NO"
            value={storeVO.STORE_NO}
            onChange={handleChangeForm}
          />
        </Form.Group>
      </Form>

      <Button variant="primary" onClick={storeUpdate}>
        수정
      </Button>
      <Footer />
    </>
  );
};

export default StoreModify;
