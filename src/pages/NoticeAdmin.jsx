import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { noticelist } from './../service/dbLogic';
import NoticeRowAdmin from '../components/notice/NoticeRowAdmin';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Swal from 'sweetalert2'

const NoticeAdmin = () => {

  let navigate = useNavigate();

  const [noticeList, setNoticeList] = useState([])

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  /* noticelist 데이터 가져오기 */
  useEffect(() => {
    const oracleDB = async () => {
        //const result = await jsonDeptList({ DEPTNO: 30 }) -> 스프링콘솔에 com.example.demo.dao.DeptDao  : pMap : {DEPTNO=30}
        const result = await noticelist() // pMap : {}
        console.log(result)
        console.log(result.data[3])
        setNoticeList(result.data)
    }
    oracleDB()
    }, [])


  /* *************************************************  */
  // onchange 이벤트로 input 값 가져오기
  //File은 e.target.files[0]로 가져오는게 핵심 - e.target.value로 가져오면 에러
  const onChange = (e) => {
    if(e.currentTarget == null) return;
  }

  const onChangeFile = (e) => {
    if(e.currentTarget == null) return;
      console.log(e.target.files[0]);
  }

  /* ************************************************** */
  ////////////// 글등록 //////////////////
  const noticeInsert = (e) => {

    e.preventDefault()
    let list = {
        // json 형태로 spring에 값을 넘김
        admin_id: "001", /////////////////// 일단 상수로 넣음
        notice_title: e.target.notice_title.value,
        notice_content: e.target.notice_content.value,
        notice_category: e.target.notice_category.value,
        notice_file: e.target.notice_file.files[0],
    }
    console.log(e.target.notice_file.files[0]);
    console.log("noticeInsert => "+ JSON.stringify(list));

    axios
    .post(process.env.REACT_APP_SPRING_IP +"notice/noticeinsert", list, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response);
      console.log(response.data);
      handleClose()
      window.location.replace("/admin/notice")
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: '등록되었습니다!'
            })
    })
    .catch((error) => {
        console.log(error);
    })
  }
  /* ************************************************** */



  return (
    <>
      <div className="list-wrapper">

        <h4>공지사항 관리</h4>
        <hr />
        <p>제목을 클릭하면 상세보기와 수정하기로 이동합니다.</p>

        <div className="d-flex justify-content-end">
          <Button variant="outline-secondary" id="btn_search" style={{ marginLeft: "20px", width:"130px"}}>
            <i className="fa-regular fa-trash-can"></i>
              &nbsp;선택삭제
          </Button>
          <Button variant="outline-secondary" id="btn_search" style={{ marginLeft: "10px", width:"100px"}}
            onClick={handleShow}>
              <i className="fa-regular fa-pen-to-square"></i>
              &nbsp;글쓰기
          </Button>
        </div>

          <table>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "40%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>

            <thead>
              <tr>
                <th><input type="checkbox"/></th>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>

            <tbody>
              {
                noticeList.map((notice, i) => (
                  <NoticeRowAdmin key={i} notice={notice} />
                ))
              }
            </tbody>
          </table>

          {/* ####################[[조건 검색]]############################## */}
          <Form className="d-flex mx-auto" style={{ width:"50%", height:"45px"}}>
            <select id="gubun" className="form-select" aria-label="분류선택" style={{ width: "40%", marginRight: "10px" }}>
              <option defaultValue>분류선택</option>
              <option value="deptno">번호</option>
              <option value="dname">제목</option>
              <option value="loc">작성자</option>
            </select>
            <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" />
            <Button variant="outline-secondary" id="btn_search" style={{ marginLeft: "10px", width:"100px"}}>
              검색
            </Button>
          </Form>
          {/* ###################[[조건검색 끝]]####################### */}


{/* ========[[[등록 모달 시작]]]======= */}
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>공지사항 등록</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        {/* ##########################[[Form 전송 insert]]########################### */}
        <form id="f_board" onSubmit={noticeInsert} encType="multipart/form-data" >
            <input id="admin_id" name="admin_id" type="hidden" />
            <Form.Group className="mb-3" controlId="formBasicDeptno">
                <Form.Label>글제목</Form.Label>
                <input type='text' name='notice_title' onChange={onChange}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDeptno">
                <Form.Label>카테고리</Form.Label>
                <input type='text' name='notice_category' onChange={onChange}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLoc">
                <Form.Label>글내용</Form.Label>
                <input type='textarea' name='notice_content' onChange={onChange}  />
            </Form.Group>
            <Form.Group className="mb-3">
                <input
                    className="form-control"
                    type="file"
                    id="notice_file"
                    name="notice_file"
                    onChange={onChangeFile} 
                />
            </Form.Group>

        <Button variant="secondary" onClick={handleClose}>
            닫기
        </Button>
        <input type="submit" value="저장" />

        </form>
        {/* ##########################[[Form 전송 insert]]########################### */}
    </Modal.Body>
  </Modal>
  {/* ========[[[ 등록 모달 끝]]]======= */}

      </div>
    </>
  );
};

export default NoticeAdmin;