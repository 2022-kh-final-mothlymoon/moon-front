import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { boardDelete, jsonBoardList } from '../../_service/dbLogic';

/* 
  <<<<< 관리자 게시판 상세 조회 >>>>>
*/
const AdminBoardDetail = (props) => {
  const navigate = useNavigate(); // 페이지 이동 시 필요한 객체 선언
  const { board_no } = useParams();
  // 데이터 초기화
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

  // 데이터 가져오기
  useEffect(() => {
    const boardDetailDB = async() => {
      console.log("[관리자] : boardDetailDB 호출 성공")
      // spring - jsonBoardList 데이터 읽기
      const result = await jsonBoardList({ board_no: board_no });
      console.log(result);
      // console.log(result.data);
      // console.log(res.data[0].BOARD_TITLE);
      setBoardVO(result.data[0]); // 한 건을 받아올 때는 [] 배열 사용
    };
    boardDetailDB();
  }, [board_no]);
  
  // 목록으로 버튼
  const listBtn = () => {
    console.log("목록으로 버튼 클릭")
    navigate("/admin/board/boardList");
  };

  // 삭제 버튼
  const delBtn = async() => {
    console.log("삭제할 글 번호 ===> " + boardVO.BOARD_NO);
    // 삭제 시, 확인 comfirm alert
    if(window.confirm("삭제하시겠습니까?")) {
      const result = await boardDelete({ board_no: board_no });
      setBoardVO(result.data[0]);
      navigate("/admin/board/boardList");
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  // 블라인드 상태 변경 확인하기
  const blindYn = (event) => {
    console.log("변경된 블라인드 상태는? ===> " + event.target.value);
  }
  
  // 블라인드 저장 버튼
  const blindSubmitBtn = async(event) => {
    if(window.confirm("블라인드 상태를 변경하시겠습니까?")) {
      document.querySelector("#board_no").value = boardVO.BOARD_NO;
      document.querySelector("#f_blind").action = "http://localhost:9005/admin/board/boardUpdate";
      document.querySelector("#f_blind").submit();
      alert("블라인드 상태가 변경되었습니다.");
      // navigate("/admin/board/boardList");
      event.preventDefault();
    } else {
      alert("취소되었습니다.");
    }
  } 

  // ********** RENDER **********
  return (
    <>
      <div className="container">
        {/******************** 게시판 안내 시작 ********************/}
        <div>
          <h2>
            게시판 관리 (Moon Story)
          </h2>
          <hr />
        </div>
        {/******************** 게시판 안내 종료 ********************/}



        {/******************** 목록으로 버튼 및 삭제 버튼 시작 ********************/}
        <div>
          <Button variant="primary" onClick={listBtn}>목록으로</Button>
          <Button variant="danger" onClick={delBtn}>삭제</Button>
        </div>
        {/******************** 목록으로 버튼 및 삭제 버튼 종료 ********************/}



        {/******************** 선택한 글 상세 보기 시작 ********************/}
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

          {/******************** 블라인드 처리 폼 시작 ********************/}
          <Form id="f_blind" method="get">
            <div className="form-group">

              <input type="hidden" name="board_no" id="board_no" />

              <label>블라인드</label>
              <Form.Select id="board_blind" name="board_blind" onChange={blindYn} size="sm">
                <option value="">현재 블라인드 상태 : { boardVO.BOARD_BLIND }</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
              </Form.Select>
            </div>
          </Form>
          {/******************** 블라인드 처리 폼 종료 ********************/}
          
          <Button type="submit" variant="primary" onClick={blindSubmitBtn}>
            변경
          </Button>

        </div>
        {/******************** 선택한 글 상세 보기 종료 ********************/}

      </div>
    </>
  );
}

export default AdminBoardDetail;