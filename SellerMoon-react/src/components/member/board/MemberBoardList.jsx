import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { jsonBoardList } from '../../_service/dbLogic';
import MemberBoardRow from './MemberBoardRow';

// 홈페이지 게시판
// 조건1. 회원일 경우에만 사용 가능
// if(로그인 세션 유지 상테일 때) { 글쓰기 가능 }
  // 게시글 전체 조회, 게시글 상세 조회, 게시글 작성, 게시글 수정, 게시글 삭제
  // 카테고리 구분하기 (자유게시판 / Q&A)
  // 게시글 상세 조회 내의 댓글 전체 조회, 댓글 작성
const MemberBoardList = (props) => {
  const navigate = useNavigate();
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

  // 글쓰기 버튼
  const insertBtn = () => {
    console.log("글쓰기 버튼 클릭");
    navigate("/member/board/boardInsert");
  }

  // RENDER
  return (
    <>
      <div className="container">
        <div>
          <h2>
            Moon Story &nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>전체 글</small>
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
          <div className="col-3">
            <Button variant="info" onClick={insertBtn}>
              글쓰기
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
              </tr> 
            </thead>
            <tbody>
              {
                boardList.map((board, i) => (
                  <MemberBoardRow key={i} board={board} /> // 한 건의 데이터를 불러오기 (BoardRow가 한 건을 보여준다.)
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default MemberBoardList;