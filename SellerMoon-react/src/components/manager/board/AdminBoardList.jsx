import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { jsonBoardList } from '../../../service/dbLogic';
import AdminBoardRow from './AdminBoardRow';
import Pagination from '../Common/Pagination';

/*
  <<<<< 관리자 게시판 전체 조회 >>>>>
*/
const AdminBoardList = (props) => {
  console.log("AdminBoardList 호출 성공");

  // 페이지네이션 선언
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // [ R ] 데이터 가져오기
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const boardListDB = async() => {
      console.log("[관리자] boardListDB 호출 성공");
      const result = await jsonBoardList();
      // console.log(result);
      // console.log(result.data);
      // console.log(result.data[1].MEMBER_NAME);
      setBoardList(result.data);
    }
    boardListDB();
  }, []);


  // ******************** RENDER ********************
  return (
    <>
      <div className='container'>

        <div>
          <h2>게시판 관리 (Moon Story)</h2>
          <hr />
        </div>

        <div>
          카테고리 나눠야할 부분 입니당
        </div>

        <hr />

        <div>
          <div className="row">
            <div className="col-3">
              <select aria-label="분류선택">
                <option defaultValue>분류선택</option>
                <option value="board_title">글제목</option>
                <option value="member_name">작성자</option>
                <option value="board_title">글내용</option>
              </select>
            </div>
            <div className="col-6">
              <input 
                type="text"
                placeholder="검색어를 입력하세요." 
              />
            </div>
            <div className="col-3">
              <Button variant="danger">
                검색
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Table>
            <thead>
              <tr>
                <th>글번호</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
                <th>블라인드</th>
              </tr> 
            </thead>
            <tbody>
              {
                boardList.map((board, i) => (
                  // 한 건의 데이터를 불러오기 (BoardRow가 한 건을 보여준다.)
                  <AdminBoardRow
                    key={i} 
                    board={board}
                  /> 
                ))
              }
            </tbody>
          </Table>
        </div>

        <Pagination
          total={boardList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />

      </div>
    </>
  );
}

export default AdminBoardList;