import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import pictureUpload from '../../../service/pictureUpload';

/* 
  <<<<< 회원 게시판 글 작성 >>>>>
    - 수정할 것 : 사진 기능(cloudinary)
*/
const MemberBoardForm = (props) => {
  console.log("memberBoardForm 호출 성공");

  const navigate = useNavigate();

  // cloudinary 사진 추가 기능
  const [file, setFile] = useState({ fileName: null, fileURL: null }); // 이미지 업로드

  // [C] 글 전송 버튼 ----------------------------------------
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

  // 이미지 업로드 (cloudinary) --------------------------- 잘 안됩니다.. 
  const imgChange = async (event) => {
    console.log("imgChange 호출");
    console.log(event.target.files[0]);
    const upload = await pictureUpload.upload(event.target.files[0]);
    setFile({
      fileName: upload.public_id + "." + upload.format,
      fileURL: upload.url,
    })
    const uploadIMG = document.getElementById("img");
    const holder = document.getElementById("uploadImg");
    const file = uploadIMG.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      // if (img.width > 150) {
      //   //넣으려는 사진 크기에 맞춰 width값을 제한하면 된다.
      // }
      img.width = 150;
      holder.innerHTML = "";
      holder.appendChild(img);
    }
    reader.readAsDataURL(file);
    return false;
  };

  // ******************** RENDER ********************
  return (
    <>
      <div className='container'>

        {/******************** 게시판 안내 시작 ********************/}
        <div>
          <h2>
            Moon Story (커뮤니티) <small>글 작성하기</small>
          </h2>
          <hr />
        </div>
        {/******************** 게시판 안내 종료 ********************/}

        {/********************  글 작성폼 시작 ********************/}
        <Form id="f_board" method="get">

          {/* cloudinary 사진 업로드 */}
          <input type="hidden" name="filename" id="filename" />
          <input type="hidden" name="fileurl" id="fileurl" />

          {/* 카테고리 선택 select 박스 시작*/}
          <Form.Group className="mb-3">
            <Form.Select id="board_category" name="board_category">
              <option>카테고리를 선택해주세요.</option>
              <option value="자유게시판">자유게시판</option>
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
              as="textarea"
              rows={10}
              name="board_content" 
              placeholder="내용을 입력해주세요." 
            />
          </Form.Group>

          {/* 회원번호는 임시.. 로그인-세션과 결합 후 지울 것.. */}
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
          <Form.Group className="mb-3">
            <Form.Label>이미지 등록</Form.Label>
            <input
              className="form-control"
              type="file"
              id="img"
              name="img"
              onClick={imgChange}
            />
          </Form.Group>

          {/* 부서 등록 이미지 미리보기 */}
          <div id="uploadImg">
            <img
              className="thumbNail"
              src="https://via.placeholder.com/300X300"
              alt="미리보기"
            />
          </div>
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