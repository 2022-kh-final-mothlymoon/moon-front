import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

/*
  <<<<< 회원 댓글 Row >>>>>
    - 추가할 것 : 좋아요/싫어요, 신고, 댓글 수정
    - 수정할 것 : 댓글 수정, 삭제 / 현재 머물고있는 board_no의 reply_no를 보여줘야한다.
*/
const MemberReplyRow = ({ no, reply, isLogin }) => {
  console.log("memberReplyRow 호출 성공");

  // 현재 글 번호
  const { board_no } = useParams();
  console.log("현재 글 번호 ===> " + board_no);

  // [U] 수정 버튼 -----------------------------------------------------
  const editBtn = async () => {
    console.log("댓글 수정 버튼 클릭");
    console.log("수정할 댓글 번호 ===> " + reply.REPLY_NO);
  };

  // [D] 삭제 버튼 -----------------------------------------------------
  const delBtn = async () => {
    console.log("삭제할 댓글 번호 ===> " + reply.REPLY_NO);
    if (window.confirm("삭제하시겠습니까?")) {
      window.location.href =
        "http://localhost:9005/member/board/replyDelete?reply_no=" +
        reply.BOARD_NO;
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };
  // [C] 댓글 신고
  const sendReplyReport = () => {
    if (window.confirm("해당 댓글을 신고 하시겠습니까?")) {
      document.querySelector("#f_rReport").action =
        "http://localhost:9005/member/board/reportRInsert";
      document.querySelector("#f_rReport").submit();
      alert("신고되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  // ******************** RENDER ********************
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>글 번호 : {reply.BOARD_NO}</td>
            {/* <td>댓글 번호 : {reply.REPLY_NO}</td> */}
          </tr>

          <tr>
            <td>{reply.REPLY_CONTENT}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{reply.MEMBER_NAME}</td>
            <td>{reply.REPLY_DATE}</td>
          </tr>
        </tbody>
      </table>
      {/* 댓글 신고 */}
      <Form id="f_rReport" method="get">
        <input type="hidden" name="member_no" id="member_no" value={no} />
        <input
          type="hidden"
          name="member_no2"
          id="member_no2"
          value={reply.MEMBER_NO}
        />
        <input
          type="hidden"
          name="reply_no"
          id="reply_no"
          value={reply.REPLY_NO}
        />
        <input
          type="hidden"
          name="board_no"
          id="board_no"
          value={reply.BOARD_NO}
        />
      </Form>
      <Button variant="warning" onClick={sendReplyReport}>
        신고
      </Button>
      {no == reply.MEMBER_NO ? (
        <Button variant="danger" onClick={delBtn}>
          삭제
        </Button>
      ) : null}
      {no == reply.MEMBER_NO ? (
        <Button variant="primary" onClick={editBtn}>
          수정
        </Button>
      ) : null}
      &nbsp;
    </>
  );
};

export default MemberReplyRow;
