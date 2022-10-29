import React from 'react';
import { Link } from 'react-router-dom';

/* 
  <<<<< 회원 게시판 Row (BoardList에 보여질 리스트 한 건) >>>>>
*/
const BoardRow = (props) => {
  const blindYN = (event) => {
    if(props.board.BOARD_BLIND == "Y") {
      console.log("해당 게시글은 관리자에 의해 숨김 처리 되었습니다.");
      alert("해당 게시글은 관리자에 의해 숨김 처리 되었습니다.")
      event.preventDefault(); // 페이지는 넘어가지 않지만 url에 글번호를 입력하면 넘어가게 된다.
    }
  };

  
  // ********** RENDER **********
  return (
    // AdminBaordList의 Table >> tbody 안의 반복되는 tr
    <tr>
      <td>{ props.board.BOARD_NO }</td>
      <td>{ props.board.BOARD_CATEGORY }</td>
      <td>
        <Link 
          to={ "/member/board/boardDetail/" + props.board.BOARD_NO }
          onClick={ blindYN }
        >
          { props.board.BOARD_TITLE }
        </Link>
      </td>
      <td>{ props.board.MEMBER_NAME }</td>
      <td>{ props.board.BOARD_WRITTEN_DATE }</td>
      <td>{ props.board.BOARD_HIT }</td>
    </tr>
  );
}

export default BoardRow;