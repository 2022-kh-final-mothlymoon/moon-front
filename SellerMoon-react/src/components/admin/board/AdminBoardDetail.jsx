import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { boardBlind, boardDelete, jsonBoardList } from '../../_service/dbLogic';

/*
  [[[[[[[[[[ 전체 게시글 상세 조회 ]]]]]]]]]]
  
  조건1. 게시글 전체 조회(BoardList.jsx)에서 선택한 값 모든 컬럼 조회 가능
  조건2. 관리자는 게시글 삭제 가능
    조건2-1. 게시글 삭제 조건 :  신고 10회 이상일 때 삭제 가능
    조건2-2. 관리자가 해당 글을 삭제하면 '관리자에 의해 삭제된 게시글입니다.' 해당 td에 출력
    조건2-3. 삭제된 게시글 보관 가능 (협의할 것)
*/

const AdminBoardDetail = () => {
  // 경로 이동 합수 선언 
  const navigate = useNavigate();
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
    BOARD_BLIND: "",
    BOARD_REPORT_COUNT: 0,
  });

  // oracle에서 값 가져오기
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
    navigate("/admin/board/boardList");
  };

  // Btn 삭제
  const delBtn = async() => {
    console.log("삭제할 글 번호 ===> " + boardVO.BOARD_NO);
    if(window.confirm("삭제하시겠습니까?")) {
      const res = await boardDelete({ board_no: board_no});
      setBoardVO(res.data[0]);
      navigate("/admin/board/boardList");
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  // 블라인드 YN 설정된 내용 확인하기 (default N)
  const blindYn = (event) => {
    console.log("블라인드 상태 변경 ===> " + event.target.value);
  }
  
  // 블라인드 상태 변경된 내용 저장하기
  const blindSubmitBtn = () => {
    // 바뀐 셀렉트 박스의 value 값을 DB에 전달해야함
    document.querySelector("#f_boardBlindYn").submit(); // 업데이트 할 때 submit이 적용되는건지 모르겠음...
  } 

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
            <p>{ boardVO.MEMBER_NAME }</p>
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
          <div className="form-group">
            <label>신고수</label>
            <p>{ boardVO.BOARD_REPORT_COUNT }</p>
          </div>
          <Form id="f_boardBlindYn" method="get">
            <div className="form-group">
              <label>블라인드</label>
              <select id="blindVal" onChange={blindYn} size="sm">
                <option value="N" default>{ boardVO.BOARD_BLIND }</option>
                <option value="Y">Y</option>
              </select>
              <Button variant="primary" onClick={blindSubmitBtn}>
                변경
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AdminBoardDetail;