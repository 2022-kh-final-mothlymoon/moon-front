import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* 
  <<<<< 회원 게시판 글 작성 >>>>>

  회원이 로그인 했을 때 글 등록 시점에서 member_name이 저장..
*/
const MemberBoardForm = (props) => {
  const navigate = useNavigate();

  // [C] 글 전송 버튼 ---------------------------------------- 부적합한 열유형.. 수정중
  const boardSubmitBtn = (event) => {
    if(window.confirm("글을 등록하시겠습니까?")) {
      // 폼 전송이 일어나는 곳
      document.querySelector("#f_board").action = "http://localhost:9005/member/board/boardInsert";
      document.querySelector("#f_board").submit();
    } else {
      event.preventDefault();
       // 토스트로 변경
      alert("등록이 취소되었습니다.");
    }
  };
  
  // 글쓰기 취소 버튼
  const cancelBtn = (event) => {
    if(window.confirm("취소하시겠습니까? 내용은 저장되지 않습니다.")) {
      // 토스트로 변경
      alert("취소되었습니다.")
      navigate("/member/board/boardList");
    } else {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className='container'>

        {/********************  글 작성폼 시작 ********************/}
        <Form id="f_board" method="get">

          {/* <input type="hidden" name="filename" id="filename" />
          <input type="hidden" name="fileurl" id="fileurl" /> */}

          {/* 카테고리 선택 select 박스 시작*/}
          <Form.Group className="mb-3">
            <Form.Select id="board_category" name="board_category">
              <option>카테고리를 선택해주세요.</option>
              <option value="freeTalk">자유게시판</option>
              <option value="Q&A">Q&A</option>
            </Form.Select>
          </Form.Group>
          {/* 카테고리 선택 select 박스 종료 */}

          {/* 글 입력 폼 시작 */}
          <Form.Group className="mb-3" controlId="formBasicBoard_title">
            <Form.Label>제목</Form.Label>
            <Form.Control 
              type="text" 
              name="board_title" 
              placeholder="제목을 입력해주세요."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBoard_content">
            <Form.Label>내용</Form.Label>
            <Form.Control 
              type="text" 
              name="board_content" 
              placeholder="내용을 입력해주세요." 
            />
          </Form.Group>
          {/* 회원번호는 임시.. 로그인-세션과 결합 */}
          <Form.Group className="mb-3" controlId="formBasicMember_no">
            <Form.Label>회원번호</Form.Label>
            <Form.Control 
              type="text" 
              name="member_no" 
              placeholder="회원번호를 입력해주세요." 
            />
          </Form.Group>
          {/* 글 입력 폼 종료 */}

          {/* 부서 이미지 등록 첨부파일 */}
          {/* <Form.Group className="mb-3">
            <Form.Label>이미지 등록</Form.Label>
            <input
              className="form-control"
              type="file"
              id="img"
              name="img"
              // onClick={imgChange}
            />
          </Form.Group> */}

          {/* 부서 등록 이미지 미리보기 */}
          {/* <div id="uploadImg">
            <img
              className="thumbNail"
              src="https://via.placeholder.com/300X300"
              alt="미리보기"
            />
          </div> */}
        </Form>
        {/********************  글 작성폼 종료 ********************/}
      
        <Button variant="secondary" onClick={cancelBtn}>
          취소
        </Button>
        <Button variant="primary" onClick={boardSubmitBtn}>
          등록
        </Button>
      </div>

    </>
  );
}

export default MemberBoardForm;