import React, { useState } from 'react';
import { useEffect } from 'react';
import { TABTITLE } from './../../../styles/MainStyle';
import { Nav, Table } from 'react-bootstrap';
import { jsonReportBoardList, jsonReportReplyList } from '../../../service/dbLogic';
import AdminReportReplyRow from './AdminReportReplyRow';
import AdminReportBoardRow from './AdminReportBoardRow';

/*
  <<<<< 관리자 >>>>> 신고 내역 전체 조회
*/
const AdminReportList = (props) => {
  console.log("AdminReportList 호출 성공");

  let [ tab, setTab ] = useState(0); // 0이면 0번째 내용 보이게, 1이면 1번째 내용 ...
  let [fade, setFade] = useState('')

  const [reportBoardList, setReportBoardList] = useState([]);
  const [reportReplyList, setReportReplyList] = useState([]);

  // [R] 게시글 신고 데이터 가져오기 
  useEffect(() => {
    const reportBoardListDB = async() => {
      console.log("[관리자] reportBoardListDB 호출 성공");
      const result = await jsonReportBoardList();
      console.log(result);      
      setReportBoardList(result.data);
    }
    reportBoardListDB();
  }, []);

  // [R] 게시글 신고 데이터 가져오기 
  useEffect(() => {
    const reportReplyListDB = async() => {
      console.log("[관리자] reportReplyListDB 호출 성공");
      const result = await jsonReportReplyList();
      console.log(result);      
      setReportReplyList(result.data);
    }
    reportReplyListDB();
  }, []);

  useEffect(() => {
    // fade 변수 자리에 claaName 'end'를 탈부착 (css)
    // 부착만 하면 안되고, 뗐다가 부착해야 애니메이션이 보임
    // 따라서 cleanUp Function + setTimeout 사용하기!
    setTimeout(() => {
      setFade('end');
    }, 100) // 0.1 초뒤에 실행
  
    // useEffect 실행 전에 실행됨
    return () => {
      setFade('');
      }
    }, [tab])
  

  return (
    <>
      <div className='container'>

        <div>
          <h2>
            신고 내역 관리
          </h2>
          <br />
          <hr />
          <br />

          <div>
            <Nav fill variant="tabs" defaultActiveKey="link0">
              <Nav.Item>
                <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">
                  <TABTITLE>게시글 신고 내역</TABTITLE>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">
                  <TABTITLE>댓글 신고 내역</TABTITLE>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className={`start ${fade}`}>
              {/* tab state가 0이면, 첫번째 div보여주고, 1이면 두번째 div보여줌... */}
              {[
              
              <div className="container">
                <br />
                <div className="row">
                  <Table>
                    <thead>
                      <tr>
                        <th>신고번호</th>
                        <th>신고종류</th>
                        <th>신고내용</th>
                        <th>글번호</th>
                        <th>글작성자</th>
                        <th>신고날짜</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        reportBoardList.map((report, i) => (
                          <AdminReportBoardRow
                            key={i}
                            report={report}
                          />
                        ))
                      }
                    </tbody>
                  </Table>
                </div>
              </div>,

              <div className="container">
                <div className="row">
                  <Table>
                      <thead>
                        <tr>
                          <th>신고번호</th>
                          <th>댓글번호</th>
                          <th>댓글내용</th>
                          <th>댓글작성자</th>
                          <th>신고날짜</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          reportReplyList.map((report, i) => (
                            <AdminReportReplyRow
                              key={i}
                              report={report}
                            />
                          ))
                        }
                      </tbody>
                    </Table>
                </div>
              </div>,
              
              ][tab]}
            </div>
          </div>

          <hr />
        </div>


      </div>
    </>
  );
}

export default AdminReportList;