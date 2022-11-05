import React from "react";

/*
  <<<<< 관리자 댓글 Row >>>>>
    - 추가할 것 : 삭제, 수정(블라인드)
*/
const AdminReplyRow = (props) => {
  console.log("adminReplyRow 호출 성공");

  // ******************** RENDER ********************
  return (
    <>
      <tr>
        <td>{ props.reply.MEMBER_NAME }</td>
        <td>{ props.reply.REPLY_DATE }</td>
        <td>{ props.reply.REPLY_CONTENT }</td>
      </tr>
    </>
  );
}

export default AdminReplyRow;