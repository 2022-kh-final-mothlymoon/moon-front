import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { jsonBoardList } from '../../../service/dbLogic';
import MemberReplyForm from '../reply/MemberReplyForm';
import MemberReplyList from '../reply/MemberReplyList';

/* 
  <<<<< 회원 게시판 상세 조회 >>>>>
    - 추가할 것 : (해당 글 번호 상세 페이지 진입 시) 조회수 증가, 좋아요/싫어요
*/
const MemberBoardDetail = () => {
  // 페이지 이동 시 필요한 객체 선언
  const navigate = useNavigate(); 
  
  // 데이터 초기화 -----------------------------------------------------
  const { board_no } = useParams();
  const [ boardVO, setBoardVO ] = useState({
    BOARD_NO: 0,
    BOARD_CATEGORY: "",
    BOARD_TITLE: "",
    BOARD_CONTENT: "",
    MEMBER_NAME: "",
    BOARD_WRITTEN_DATE: "",
    BOARD_HIT: 0,
    BOARD_LIKE: 0,
    BOARD_DISLIKE: 0,
    FILENAME: "",
    FILENAME: "",
  });

  // [R] 데이터 가져오기 -----------------------------------------------
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

  // [D] 삭제 버튼 -----------------------------------------------------
  const delBtn = async() => {
    console.log("삭제할 글 번호 ===> " + boardVO.BOARD_NO);
    if(window.confirm("삭제하시겠습니까?")) {
      window.location.href 
      = "http://localhost:9005/member/board/boardDelete?board_no=" + boardVO.BOARD_NO;
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  // [C] 좋아요 버튼 -> 
  // const likeBtn = () => {
  //   if() { // 좋아요 클릭 +1

  //   } else if () { // re좋아요 클릭 -1

  //   } else if () { // if 싫어요가 눌러져있는 상태에서 좋아요를 클릭한다면? 싫어요 -1 좋아요 +1

  //   }
  // };

  // 싫어요 버튼 -> db 저장
  // const dislikeBtn = () => {
  //   // 싫어요 클릭 +1

  //   // re싫어요 클릭 -1

  //   // if 좋아요가 눌러져있는 상태에서 싫어요를 클릭한다면?
  //   // 좋아요 -1 후 싫어요 +1
  // }

  // 목록으로 버튼
  const listBtn = () => {
    console.log("목록으로 버튼 클릭")
    navigate("/member/board/boardList");
  };

  // 수정 폼 이동 버튼
  const editBtn = () => {
    console.log("수정할 글 번호 ===> " + boardVO.BOARD_NO);
    // 수정 버튼 누르면 해당 게시글의 모든 정보를 가지고 와야함.. 
    navigate("/member/board/boardEditForm/" + boardVO.BOARD_NO);
  };


  // ******************** RENDER ********************
  return (
    <>
      <div className='container'>



        <div>
          <h2>
            Moon Story (커뮤니티)
          </h2>
          <hr />
        </div>



        <div>
          <Button variant="primary" onClick={listBtn}>목록으로</Button>
          {/* 로그인한 회원과 작성자 번호가 일치하면 삭제 / 업데이트 가능 */}
          <Button variant="success" onClick={editBtn}>수정</Button>
          <Button variant="danger" onClick={delBtn}>삭제</Button>
        </div>



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
            <Card.Img 
              variant="top" 
              style={{ width: '250px' }} 
              src={`${ boardVO.FILEURL }`} 
            />
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

          {/* 좋아요/싫어요 버튼 시작 */}
          <div>
            <div className="form-group">
              <label>좋아요</label>
              {/* <Button onClick={}>👍🏻</Button> */}
              <p>{ boardVO.BOARD_LIKE }</p>
            </div>
            <div className="form-group">
              <label>싫어요</label>
              {/* <Button onClick={}>👎🏻</Button> */}
              <p>{ boardVO.BOARD_DISLIKE }</p>
            </div>
          </div>
          {/* 좋아요/싫어요 버튼 종료 */}

        </div>
        {/******************** 선택한 글 상세 보기 종료 ********************/}
      

        <div>
          <MemberReplyList />
        </div>


        <div>
          <MemberReplyForm />
        </div>
      </div>
    </>
  );
}

export default MemberBoardDetail;