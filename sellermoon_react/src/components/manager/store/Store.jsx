import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jsonStoreList } from "../../../service/dbLogic";
import { CONTENTS } from "../../../styles/NoticeStyle";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Pagination from "../Common/Pagination";
import StoreRow from "./StoreRow";

const Store = () => {
  //페이지네이션
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  //모달관련
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [storeList, setStoreList] = useState([]);

  // html 렌더링 된 후 호출됨 -> StoreList
  useEffect(() => {
    console.log("useEffect 호출");
    const oracleDB = async () => {
      console.log("oracleDB 호출");
      const result = await jsonStoreList();
      console.log(result);
      console.log(result.data[0]);
      setStoreList(result.data);
    };
    oracleDB();
  }, []);

  // 모달 통한 거래처 등록
  const storeInsert = () => {
    document.querySelector("#f_store").action =
      "http://localhost:9005/admin/store/storeInsert";
    document.querySelector("#f_store").submit();
  };

  // 검색
  const StoreSearch = () => {
    const gubun = document.querySelector("#gubun").value;
    const word = document.querySelector("#word").value;
    console.log(gubun + "," + word);
    const asyncDB = async () => {
      const res = await jsonStoreList({ gubun: gubun, word: word });
      if (res.data) {
        console.log(res.data);
        setStoreList(res.data);
      }
    };
    asyncDB();
  };

  // 전체조회
  const allList = () => {
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className="container">
        <CONTENTS className="row">
          {/* ####################[[조건 검색]]############################## */}
          <div className="row">
            <div className="col-3">
              <select id="gubun" className="form-select" aria-label="분류선택">
                <option defaultValue>분류선택</option>
                <option value="STORE_YN">거래여부</option>
                <option value="FIELD">거래처이름</option>
                <option value="STORE_MANAGER">매니저</option>
              </select>
            </div>

            <div className="col-6">
              <input
                type="text"
                id="word"
                className="form-control"
                placeholder="검색어를 입력하세요"
              />
            </div>

            <div className="col-3">
              <Button
                id="btn_search"
                variant="outline-secondary"
                onClick={StoreSearch}
              >
                검색
              </Button>
            </div>
          </div>
          {/* ###################[[조건검색 끝]]####################### */}
          {/******************StoreList*******************/}
          <div className="col-9">
            <div className="list-wrapper">
              <h4>거래처 관리</h4>
              <table>
                <colgroup>
                  <col style={{ width: "10%", textAlign: "center" }} />
                  <col style={{ width: "10%", textAlign: "center" }} />
                  <col style={{ width: "20%", textAlign: "center" }} />
                  <col style={{ width: "20%", textAlign: "center" }} />
                  <col style={{ width: "40%", textAlign: "center" }} />
                </colgroup>

                <thead>
                  <tr>
                    <th>번호</th>
                    <th>거래 여부</th>
                    <th>거래처 이름</th>
                    <th>담당자</th>
                    <th>전화번호</th>
                  </tr>
                </thead>

                <tbody>
                  {storeList.slice(offset, offset + limit).map((store, i) => (
                    <StoreRow key={i} store={store} />
                  ))}
                </tbody>
              </table>
              <Pagination
                total={storeList.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
              <hr />
              <div className="deptlist-footer">
                <Button variant="warning" onClick={allList}>
                  전체조회
                </Button>
                &nbsp;
                <Button variant="success" onClick={handleShow}>
                  거래처등록
                </Button>
              </div>
            </div>
          </div>{" "}
          {/* end of container */}
          {/* ***************** StoreList 끝************************** */}
        </CONTENTS>
      </div>
      {/* ============================== [[ 부서등록 모달 시작 ]] ============================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>거래처 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_store" method="get">
            {/* 부서 입력 폼 */}
            <Form.Group className="mb-3" controlId="formBasicDeptno">
              <Form.Label>FIELD</Form.Label>
              <Form.Control
                type="text"
                name="FIELD"
                placeholder="Enter FIELD"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>STORE_MANAGER</Form.Label>
              <Form.Control
                type="text"
                name="STORE_MANAGER"
                placeholder="Enter STORE_MANAGER"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>STORE_CONTACT</Form.Label>
              <Form.Control
                type="text"
                name="STORE_CONTACT"
                placeholder="Enter STORE_CONTACT"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
              <Form.Label>STORE_MEMO</Form.Label>
              <Form.Control
                type="text"
                name="STORE_MEMO"
                placeholder="Enter STORE_CONTACT"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={storeInsert}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ============================== [[ 부서등록 모달 종료 ]] ============================== */}
      <Footer />
    </>
  );
};

export default Store;
