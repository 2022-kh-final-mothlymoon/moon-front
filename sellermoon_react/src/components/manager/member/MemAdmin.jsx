import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { memberList } from "../../../service/dbLogic";
import Pagination from "../../member/Common/Pagination";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import MemAdminRow from "./MemAdminRow";

const MemAdmin = ({ isLogin, isAdmin }) => {
  let navigate = useNavigate();
  const [members, setMembers] = useState([]);
  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  /* memberlist 데이터 가져오기 */
  useEffect(() => {
    const oracleDB = async () => {
      const result = await memberList();
      console.log(result);
      setMembers(result.data);
    };
    oracleDB();
  }, []);
  /////////// 조건검색
  const dataSearch = (e) => {
    e.preventDefault();
    const gubun = document.querySelector("#gubun").value;
    const keyword = document.querySelector("#keyword").value;
    console.log(gubun + "," + keyword);
    const asyncDB = async () => {
      const res = await memberList({ gubun: gubun, keyword: keyword });
      if (res.data) {
        console.log(res.data);
        setMembers(res.data);
      }
    };
    asyncDB();
  };
  return (
    <>
      <Header />
      <div className="body_container">
        <h1>회원관리</h1>
        <hr />
        <Col xs={12} md={6}>
          {/* ####################[[조건 검색]]############################## */}
          <div
            className="d-flex justify-content-baseline"
            style={{ width: "90%", height: "45px" }}
          >
            <select
              id="gubun"
              name="gubun"
              className="form-select"
              aria-label="분류"
              style={{ width: "40%", marginRight: "10px" }}
            >
              <option defaultValue>분류선택</option>
              <option value="member_no">번호</option>
              <option value="member_email">이메일</option>
            </select>
            <input
              type="text"
              id="keyword"
              name="keyword"
              className="form-control"
              placeholder="검색어를 입력하세요"
            />
            <Button
              variant="outline-secondary"
              id="btn_search"
              style={{ marginLeft: "10px", width: "100px" }}
              onClick={dataSearch}
            >
              검색
            </Button>
          </div>
          {/* ###################[[조건검색 끝]]####################### */}
        </Col>
        <div className="tb_list">
          <table style={{ width: "100%", marginBottom: 10 }}>
            <tbody>
              <tr>
                <th className="bdr">회원번호</th>
                <th className="bdr">이름</th>
                <th className="bdr">이메일</th>
                <th className="bdr">가입일</th>
                <th className="bdr">회원등급</th>
                <th className="bdr">구독여부</th>
              </tr>
              {members.slice(offset, offset + limit).map((member, i) => (
                <MemAdminRow key={i} member={member} />
              ))}
            </tbody>
          </table>
          <Pagination
            total={members.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MemAdmin;
