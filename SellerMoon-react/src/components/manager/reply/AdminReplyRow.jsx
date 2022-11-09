import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form, useParams } from "react-router-dom";

/*
  <<<<< 관리자 댓글 Row >>>>>
    - 추가할 것 : 삭제, 수정(블라인드)
*/
const AdminReplyRow = (props) => {
  console.log("adminReplyRow 호출 성공");
  
  // 현재 글 번호
  const { board_no } = useParams();
  console.log("현재 글 번호 ===> " + board_no);

  // [U] 블라인드 버튼
  const blindBtn = async(props) => {
    console.log("댓글 블라인드 버튼 클릭");
    console.log("블라인드 처리할 댓글 번호 ===> " + props.reply.REPLY_NO);
    
    if(window.confirm("블라인드 상태를 변경하시겠습니까?")) {
      document.querySelector("#reply_no").value = props.reply.REPLY_NO;
      document.querySelector("#f_replyBlind").action = "http://localhost:9005/admin/board/replyUpdate";
      document.querySelector("#f_replyBlind").submit();
      alert("블라인드 상태가 변경되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  }
  
  // [D] 삭제 버튼
  const delBtn = async() => {
    console.log("댓글 삭제 버튼 클릭");
    console.log("삭제할 댓글 번호 ===> " + props.reply.REPLY_NO);
    
    if(window.confirm("댓글을 삭제하시겠습니까?")) {
      window.location.href 
      = "http://localhost:9005/member/board/replyDelete?reply_no=" + props.reply.REPLY_NO;
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  }

  const replyBlind = (e) => {
    console.log(e.target.value);
  };

  // ******************** RENDER ********************
  return (
    <>
      <hr />
      <table>
        <thead>
          <tr>
            <td>{ props.reply.MEMBER_NAME }</td>
            <td>{ props.reply.REPLY_DATE }</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ props.reply.REPLY_CONTENT }</td>
          </tr>
        </tbody>
      </table>

      <form id="f_replyBlind" method="get">
        <div className="form-group">
          <input type="hidden" name="reply_no" id="reply_no" value={ props.reply.REPLY_NO } />
          <select id="reply_blind" name="reply_blind" onChange={replyBlind} size="sm">
            <option value="">현재 블라인드 상태 : { props.reply.REPLY_BLIND }</option>
            <option value="Y">Y</option>
            <option value="N">N</option>
          </select>
        </div>
      </form>

      <Button type="submit" variant="primary" onClick={blindBtn}>
        블라인드
      </Button>
      <Button variant="danger" onClick={delBtn}>
        삭제
      </Button>
    </>
  );
}

export default AdminReplyRow;