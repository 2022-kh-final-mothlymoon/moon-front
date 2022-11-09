import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { jsonMemoList } from '../../../service/dbLogic';

const MemberReceiveMemoRow = (props) => {
  console.log("[회원] MemberReceiveMemoRow 호출 성공");

    // 세션에 담긴 정보 (로그인 한 사용자)
  const user_id = window.sessionStorage.getItem("user_id");
  console.log("로그인한 아이디 ===> " + user_id);
  
  // 보낸 / 받은 쪽지 모달 관련
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // 답장 모달
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  // [C] 답장하기


  // [D] 쪽지 한 건 삭제하기
  const msgDelBtn = () => {
    // alert("삭제 버튼 클릭");
    console.log("삭제할 쪽지 번호 ===> " + props.memo.MSG_NO);

    if(window.confirm("쪽지를 삭제하시겠습니까?")) {
      window.location.href 
      = "http://localhost:9005/member/memo/memoDelete?msg_no=" + props.memo.MSG_NO;
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  // ******************** RENDER ********************
  return (
    <>
      {
        // receive --> 로그인한 user_id가 받은메세지 (user_id === to_id)
        user_id === props.memo.TO_ID
        ?
        <>
          <tr>
            {/* <td>{ props.memo.TO_ID }</td> */}
            <td>{ props.memo.FROM_ID }</td>
            <td>
              {/* 클릭하면 모달 띄우기 */}
              <Button
                onClick={handleShow}
              >
                { props.memo.MSG_CONTENT }
              </Button>
            </td>
            <td>{ props.memo.MSG_SEND_DATE }</td>
            <td>{ props.memo.READ_YN }</td>
            <td><Button variant="success" onClick={handleShow2}>답장</Button></td>

            <td><Button variant="danger" onClick={msgDelBtn}>삭제</Button></td>
          </tr>
        </>
        :
        null
      }

      {/* 받은 상세보기 모달 */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>받은 메세지 (상세)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_receivememi" method="get">
            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              <Form.Label>보낸 사람 : { props.memo.FROM_ID }</Form.Label>
              <Form.Control 
                readOnly
                type="text"
                name="msg_content"
                value={ props.memo.MSG_CONTENT }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={msgDelBtn}>
            삭제
          </Button>
          <Button variant="primary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 답장 모달 띄우기 */}
      <Modal show={show2} onHide={handleClose2} animation={false}>

      </Modal>
    </>
  );
}

export default MemberReceiveMemoRow;