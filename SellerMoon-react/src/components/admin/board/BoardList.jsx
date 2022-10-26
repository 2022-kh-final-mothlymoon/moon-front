import React, { useEffect, useState } from 'react';
import { jsonBoardList } from '../../_service/dbLogic';
import { Button, Table } from 'react-bootstrap';
import BoardRow from './BoardRow';

/*
  [[[[[[[[[[ 전체 게시글 조회 ]]]]]]]]]]
  
  조건1. 관리자 페이지 내 게시판 관리 카테고리의 메인화면
  조건2. 콤보박스로 전체게시글(default) / 자유게시판 / Q&A 선택하여 
        해당 카테고리(board_category)와 일치하는 데이터 출력
  조건3. 조건 검색창 
  조건4. 제목을 클릭하면 게시글 번호(board_no)와 일치하는 게시글 상세 페이지로 이동 (BoardDetail.jsp)
*/

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const boardListDB = async() => {
      console.log("boardListDB 호출 성공");
      const result = await jsonBoardList();
      console.log(result);
      console.log(result.data);
      console.log(result.data[1].MEMBER_NAME);
      setBoardList(result.data);
    }
    boardListDB();
  }, []);

  // rendering
  return (
    <>
      <div className="container">
        <div>
          <h2>
            게시판 관리 (Moon Story)&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>전체 글 목록</small>
          </h2>
          <hr />
        </div>

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
                  <BoardRow key={i} board={board} /> // 한 건의 데이터를 불러오기 (BoardRow가 한 건을 보여준다.)
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default BoardList;