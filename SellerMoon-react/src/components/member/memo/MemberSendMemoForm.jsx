import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Form } from 'react-router-dom';

const MemberSendMemoForm = (props) => {

  // 쪽지 보내기 모달
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  return (
    <>
      <Button variant="warning" onClick={handleShow}>쪽지보내기</Button>

      {/* 쪽지 보내기 모달 */}
      {/* <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>받은 메세지 (상세)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_sendMemo" method="get">
            <Form.Group className="mb-3" controlId="formBasicFromMsg">
              <Form.Label>받는 사람</Form.Label>
              <Form.Control 
                type="text"
                name="msg_content"
                value={ props.memo.MSG_CONTENT }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default MemberSendMemoForm;