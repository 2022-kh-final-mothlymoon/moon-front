import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import { CONTENTS } from '../styles/NoticeStyle';
import SidebarNotice from '../components/notice/SidebarNotice';
import { noticelist } from './../service/dbLogic';
import { Button } from 'react-bootstrap';
import NoticeRow from '../components/notice/NoticeRow';

const Notice = () => {

  const [noticeList, setNoticeList] = useState([])

    // html 렌더링 된 후 호출됨
    useEffect(() => {
      console.log("useEffect 호출")
      const oracleDB = async () => {
          console.log("oracleDB 호출")
          //const result = await jsonDeptList({ DEPTNO: 30 }) -> 스프링콘솔에 com.example.demo.dao.DeptDao  : pMap : {DEPTNO=30}
          const result = await noticelist() // pMap : {}
          console.log(result)
          console.log(result.data[0])
          setNoticeList(result.data)
      }
      oracleDB()
      }, [])

  return (
    <>
      
      <Header />

      <div className="container">
        <CONTENTS className="row">
          <SidebarNotice />
          
{/******************NoticeList*******************/}
          <div className="col-9">
            <div className="list-wrapper">

              <h4>공지사항</h4>
                <table>
                  <colgroup>
                    <col style={{ width: "10%", textAlign: "center" }} />
                    <col style={{ width: "40%", textAlign: "left" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "10%" }} />
                  </colgroup>

                  <thead>
                    <tr>
                      <th>번호</th>
                      <th>제목</th>
                      <th>작성자</th>
                      <th>작성일</th>
                      <th>조회수</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      noticeList.map((notice, i) => (
                        <NoticeRow key={i} notice={notice} />
                      ))
                    }
                  </tbody>

                </table>


    {/* ####################[[조건 검색]]############################## */}
              <div className="row">
                <div className="col-3">
                    <select id="gubun" className="form-select" aria-label="분류선택">
                        <option defaultValue>분류선택</option>
                        <option value="deptno">번호</option>
                        <option value="dname">제목</option>
                        <option value="loc">작성자</option>
                    </select>
                </div>

                <div className="col-6">
                    <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" />
                </div>
                
                <div className="col-3">
                    <Button id="btn_search" variant="outline-secondary">검색</Button>
                </div>
              </div>
    {/* ###################[[조건검색 끝]]####################### */}

            </div>
          </div> {/* end of container */}
{/* ***************** NoticeList 끝************************** */}

        </CONTENTS>
      </div>

      <Footer />

    </>
  );
};

export default Notice;