import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { jsonBoardList } from '../../../service/dbLogic';
import MemberReplyForm from '../reply/MemberReplyForm';
import MemberReplyList from '../reply/MemberReplyList';

/* 
  <<<<< 회원 게시판 상세 조회 >>>>>
    - 추가할 것 : (해당 글 번호 상세 페이지 진입 시) 조회수 증가, 좋아요/싫어요
*/
const MemberBoardDetail = ({ props, no, isLogin }) => {
  console.log("MemberBoardDetail 호출 성공");

  // 세션에 담긴 정보 (로그인 한 사용자)
  const user_id = window.sessionStorage.getItem("user_id");
  console.log("로그인한 아이디 ===> " + user_id);
  
  const navigate = useNavigate(); 

  // 신고 모달 관련
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  // 데이터 초기화
  const { board_no } = useParams();
  const [ boardVO, setBoardVO ] = useState({
    BOARD_NO: 0,
    BOARD_CATEGORY: "",
    BOARD_TITLE: "",
    BOARD_CONTENT: "",
    MEMBER_NAME: "",
    MEMBER_NO: 0,
    BOARD_WRITTEN_DATE: "",
    BOARD_HIT: 0,
    BOARD_LIKE: 0,
    BOARD_DISLIKE: 0,
    FILENAME: "",
    FILENAME: "",
  });

  // [R] 데이터 가져오기
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

  // [D] 삭제 버튼
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

  // [C] 좋아요 버튼
  // const likeBtn = () => {
  //   if() { // 좋아요 클릭 +1

  //   } else if () { // re좋아요 클릭 -1

  //   }
  // };

  // [C] 신고 폼 전송하기
  const sendReport = () => {
    if(window.confirm("해당 게시글을 신고 하시겠습니까?")) {
      document.querySelector("#f_bReport").action = "http://localhost:9005/member/board/reportBInsert";
      document.querySelector("#f_bReport").submit();
      alert("신고되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  }

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

          <div>
            <Button variant="danger" onClick={handleShow}>
              신고
            </Button>
          </div>
        </div>
        {/******************** 선택한 글 상세 보기 종료 ********************/}
      

        <div>
          <MemberReplyList no={no} />
        </div>


        <div>
          <MemberReplyForm no={no} />
        </div>

        {/* 신고 모달 */}
        <Modal show={show} onHide={handleClose} animation={false}>
        
          <Modal.Header closeButton>
            <Modal.Title>신고하기</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form id="f_bReport" method="get">

              {/* <input type="hidden" name="report_no" id="report_no" /> */}

              <Form.Group className="mb-3" controlId="formBasicFromMsg">
                <Form.Label>신고할 회원</Form.Label>
                <Form.Control 
                  type="text"
                  name="member_no2"
                  plaintext readOnly defaultValue={ boardVO.MEMBER_NO }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFromMsg">
                <Form.Label>신고할 글 번호</Form.Label>
                <Form.Control 
                  type="text"
                  name="board_no"
                  plaintext readOnly defaultValue={ boardVO.BOARD_NO }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFromMsg">
                <Form.Label>신고 내용</Form.Label>
                <p>신고할 글 내용을 확인해주세요.</p>
                <Form.Control 
                  type="text"
                  as="textarea"
                  // name="report_content"
                  plaintext readOnly defaultValue={ boardVO.BOARD_CONTENT }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFromMsg">
                <Form.Label>신고 사유 선택</Form.Label>
                <Form.Select id="report_sort" name="report_sort">
                    <option defaultValue="">신고 사유를 선택헤주세요.</option>
                    <option value="욕설, 비방, 차별, 혐오">욕설, 비방, 차별, 혐오</option>
                    <option value="홍보, 영리목적">홍보, 영리목적</option>
                    <option value="불법 정보">불법 정보</option>
                    <option value="음란, 청소년 유해">음란, 청소년 유해</option>
                    <option value="개인 정보 노출, 유포, 거래">개인 정보 노출, 유포, 거래</option>
                    <option value="도배, 스팸">도배, 스팸</option>
                    <option value="기타">기타</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMember_no">
                <Form.Label>신고 이유</Form.Label>
                <p>신고 이유를 작성해주세요.</p>
                <Form.Control
                  type="text"
                  as="textarea"
                  name="report_reason"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMember_no">
                <Form.Control
                  type="text"
                  name="member_no"
                  value={no}
                  hidden={true}
                />
              </Form.Group>

            </Form>

            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                취소
              </Button>
              <Button variant="danger" onClick={sendReport}>
                신고
              </Button>
            </Modal.Footer>

          </Modal.Body>
        </Modal>


      </div>
    </>
  );
}

export default MemberBoardDetail;