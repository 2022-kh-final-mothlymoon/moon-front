import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { jsonMemoList } from '../../../service/dbLogic';
import MemberSendMemoRow from './MemberSendMemoRow';

/*
  <<회원>> 보낸 쪽지 리스트 (user_id === from_id)
*/
const MemberSendMemoList = ({ props, no, isLogin }) => {
  console.log("MemberSendMemoList 호출 성공");

    // 세션에 담긴 정보 (로그인 한 사용자)
  const user_id = window.sessionStorage.getItem("user_id");
  console.log("로그인 한 사용자 user_id ==> " + user_id);
  const user_no = window.sessionStorage.getItem("user_no");
  console.log("로그인 한 사용자 user_no ==> " + user_no);

  // 쪽지 보내기 모달
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // [C] 쪽지 보내기
  const sendMemoBtn = () => {
    // confirm문 작성하기
    document.querySelector("#f_sendMemo").action = "http://localhost:9005/member/memo/memoInsert";
    document.querySelector("#f_sendMemo").submit();
  }

  // [R] 데이터 가져오기
  const [memoList, setMemoList] = useState([]);
  useEffect(() => {
    const memoListDB = async() => {
      console.log("[회원] memoListDB 호출 성공");
      const result = await jsonMemoList({ member_no: no });
      console.log(result);
      setMemoList(result.data);
    }
    memoListDB();
  }, []);

  return (
    <>
      <div className='container'>

        <div>
          <h2>보낸 쪽지 목록</h2>
          <hr />
          <p><Link to="/member/memo/receiveMemoList">받은 쪽지함으로</Link></p>
        </div>

        <div>
          {/* 메세지 보내기 */}
          <Button variant="warning" onClick={handleShow}>쪽지보내기</Button>
        </div>

        <div>
          <Table>
            <thead>
              <tr>
                {/* <th>보낸사람(나)</th> */}
                <th>받은사람(상대방)</th>
                <th>내용</th>
                <th>보낸날짜</th>
                <th>삭제</th>
              </tr> 
            </thead>
            <tbody>
              {
                memoList.map((memo, i) => (
                  <MemberSendMemoRow
                    key={i} 
                    memo={memo}
                  /> 
                ))
              }
            </tbody>
          </Table>
        </div>

        {/* 쪽지 보내기 모달 */}
        {/* 세션에서 받아온 로그인 한 회원 user_id, user_no 들어가야해! */}
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>쪽지 보내기</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form id="f_sendMemo" method="get">

              <input type="hidden" name="msg_no" id="msg_no" />
              <input type="hidden" name="read_yn" id="read_yn" />
              <input type="hidden" name="from_id" id="from_id" value={user_id} />
              {/* <input type="hidden" name="member_no" id="member_no" value={no} /> */}

              <Form.Group className="mb-3" controlId="formBasicFromMsg">
                <Form.Label>받는 사람</Form.Label>
                <Form.Control 
                  type="text"
                  name="to_id"
                  placeholder="받는 사람의 이메일을 입력하세요."
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicMsg_content">
                <Form.Label>내용</Form.Label>
                <Form.Control 
                  type="text"
                  as="textarea"
                  rows={10}
                  name="msg_content"
                  placeholder="내용을 입력해주세요."
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMember_no">
                <Form.Control
                  type="text"
                  name="member_no"
                  defaultValue={no}
                  hidden={true}
                />
              </Form.Group>

            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={sendMemoBtn}>
              전송
            </Button>
            <Button variant="danger" onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
}

export default MemberSendMemoList;