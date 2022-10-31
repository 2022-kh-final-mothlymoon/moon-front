import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { boardUpdateMember, jsonBoardList } from '../../_service/dbLogic';

/* 
  <<<<< 회원 게시판 글 수정 >>>>>

  회원이 로그인 했을 때 글 등록 시점에서 member_name이 저장..
  수정을 하려면 일단 해당하는 글 번호의 값을 불러와야함
  useState로 값 가져오기..
*/
const MemberBoardForm = (props) => {
  const navigate = useNavigate(); // 페이지 이동 시 필요한 객체 선언
  const { board_no } = useParams();
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

  // [R] 데이터 가져오기 -------------------------------------
  // useEffect(() => {
  //   const boardDetailDB = async() => {
  //     console.log("[관리자] : boardDetailDB 호출 성공")
  //     // spring - jsonBoardList 데이터 읽기
  //     const result = await jsonBoardList({ BOARD_NO: board_no });
  //     console.log(result);
  //     console.log(result.data);
  //     console.log(result.data[0].BOARD_TITLE);
  //     setBoardVO(result.data[0]); // 한 건을 받아올 때는 [] 배열 사용
  //   };
  //   boardDetailDB();
  // }, [board_no]);

  useEffect(() => {
    const boardDetailDB = async() => {
      console.log("[회원] : boardDetailDB 호출 성공")
            // spring - jsonBoardList 데이터 읽기
      const result = await jsonBoardList({ board_no: board_no });
      console.log(result);
      // console.log(result.data);
      // console.log(res.data[0].BOARD_TITLE);
      setBoardVO(result.data[0]); // 한 건을 받아올 때는 [] 배열 사용
    };
    boardDetailDB();
  }, [board_no]);

  // [U] 글 수정 버튼 ---------------------------------------- 
  const boardUpdateBtn = (event) => {
    if(window.confirm("글을 수정하시겠습니까?")) {
      // 폼 전송이 일어나는 곳
      document.querySelector("#f_board").action = "http://localhost:9005/member/board/boardUpdate?board_no" + board_no;
      document.querySelector("#f_board").submit();
    } else {
      event.preventDefault();
       // 토스트로 변경
      alert("수정이 취소되었습니다.");
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

  // 
  const handleChangeForm = (e) => {
    if (e.currentTarget == null) return;
    e.preventDefault();
    console.log(board_no);
    setBoardVO({
      ...boardVO, // 처음에 초기화된 정보에 얕은 복사 처리
      BOARD_NO: board_no,

      [e.target.name]: e.target.value,
    });
    console.log(board_no);
  };
  return (
    <>
      <div className='container'>

        글 수정하기 ~
        
        <strong>{board_no}</strong>

        {/********************  글 작성폼 시작 ********************/}
        <Form id="f_board" method="get">

          {/* <input type="hidden" name="filename" id="filename" />
          <input type="hidden" name="fileurl" id="fileurl" /> */}

          {/* 글번호 가져오가 hidden */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="hidden"
              name="board_no"
              defaultValue={boardVO.BOARD_NO}
              onChange={handleChangeForm}
            />
          </Form.Group>

          {/* 카테고리 선택 select 박스 시작*/}
          <Form.Group className="mb-3">
            <Form.Select 
              id="board_category"
              type="text" 
              name="board_category"
              defaultValue={boardVO.BOARD_CATEGORY}
              onChange={handleChangeForm}
            >
              <option value={boardVO.BOARD_CATEGORY}>선택된 카테고리 : {boardVO.BOARD_CATEGORY}</option>
              <option value="자유게시판">자유게시판</option>
              <option value="QnA">QnA</option>
            </Form.Select>
          </Form.Group>
          {/* 카테고리 선택 select 박스 종료 */}

          {/* 글 입력 폼 시작 */}
          <Form.Group className="mb-3" controlId="formBasicBoard_title">
            <Form.Label>제목</Form.Label>
            <Form.Control 
              type="text" 
              name="board_title" 
              defaultValue={boardVO.BOARD_TITLE}
              onChange={handleChangeForm}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBoard_content">
            <Form.Label>내용</Form.Label>
            <Form.Control 
              type="text" 
              name="board_content" 
              defaultValue={boardVO.BOARD_CONTENT}
              onChange={handleChangeForm}
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
        <Button variant="primary" onClick={boardUpdateBtn}>
          수정
        </Button>
      </div>

    </>
  );
}

export default MemberBoardForm;