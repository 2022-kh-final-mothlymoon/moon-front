import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { boardDelete, jsonBoardList } from '../../_service/dbLogic';

// 게시글 상세조회
// if(로그인 세션 유지 상태일 때) { 상세 조회 가능.. . } ==> authLogin import
// if(member_no == member_no) { 게시글 수정, 게시글 삭제 }
// 해당하는 글 번호의 댓글 전체 조회 (댓글 갯수 확인하기)
// 댓글 입력 폼
const BoardDetail = () => {
  // 경로 이동 함수 선언
  const navigate = useNavigate(0);
  const { board_no } = useParams();
  // oracle 테이블 tb_community의 컬럼 초기화
  const [ boardVO, setBoardVO] = useState({
    BOARD_NO: 0,
    BOARD_CATEGORY: "",
    BOARD_TITLE: "",
    BOARD_CONTENT: "",
    MEMBER_NAME: "",
    BOARD_WRITTEN_DATE: "",
    BOARD_HIT: 0,
    BOARD_LIKE: 0,
    BOARD_DISLIKE: 0,
  });

  useEffect(() => {
    // oracle 경유
    const boardDetailDB = async() => {
      console.log("boardDetailDB 호출 성공")
      const res = await jsonBoardList({ board_no: board_no });
      console.log(res.data);
      // console.log(res.data[0].BOARD_TITLE);
      setBoardVO(res.data[0]); // 데이터 초기화
    };
    boardDetailDB();
  }, [board_no]);

  // Btn 목록으로 
  const listBtn_BoardList = () => {
    console.log("목록으로 버튼 클릭")
    navigate("/member/board/boardList");
  };

  // Btn 삭제
  const delBtn = async() => {
    console.log("삭제할 글 번호 ===> " + boardVO.BOARD_NO);
    // comfirm 창 확인하기
    const res = await boardDelete({ board_no: board_no});
    setBoardVO(res.data[0]);
  };

  /********* RENDER **********/
  return (
    <>
      <div className='container'>
        <h2>
          게시판 관리 (Moon Story)&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
          <small>상세 조회</small>
        </h2>
        <hr />

        <div>
          <Button variant="primary" onClick={listBtn_BoardList}>목록으로</Button>
          {/* 로그인한 회원과 작성자 번호가 일치하면 삭제 가능 */}
          <Button variant="danger" onClick={delBtn}>삭제</Button>
        </div>

        <div className="container">
          <div className="form-group">
            <label>글번호</label>
            <p>{ boardVO.BOARD_NO }</p>
          </div>
          <div className="form-group">
            <label>카테고리</label>
            <p>{ boardVO.BOARD_CATEGORY }</p>
          </div>
          <div className="form-group">
            <label>제목</label>
            <p>{ boardVO.BOARD_TITLE }</p>
          </div>
          <div className="form-group">
            <label>내용</label>
            <p>{ boardVO.BOARD_CONTENT }</p>
          </div>
          <div className="form-group">
            <label>작성자</label>
            <p>{ boardVO.BOARD_NO }</p>
          </div>
          <div className="form-group">
            <label>작성일</label>
            <p>{ boardVO.BOARD_WRITTEN_DATE }</p>
          </div>
          <div className="form-group">
            <label>조회수</label>
            <p>{ boardVO.BOARD_HIT }</p>
          </div>
          <div className="form-group">
            <label>좋아요</label>
            <p>{ boardVO.BOARD_LIKE }</p>
          </div>
          <div className="form-group">
            <label>싫어요</label>
            <p>{ boardVO.BOARD_DISLIKE }</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardDetail;