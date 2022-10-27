import React from 'react';
import { Link } from 'react-router-dom';

// 한 건의 데이터 렌더 (전체조회 시)
// 제목 클릭 시 해당 글 상세보기로 이동
const AdminBoardRow = (props) => {

  // RENDER
  return (
    <tr>
      <td>{ props.board.BOARD_NO }</td>
      <td>{ props.board.BOARD_CATEGORY }</td>
      <td>
        <Link 
          to={ "/admin/board/boardDetail/" + props.board.BOARD_NO }
          className="btn btn-primary"
        >
          { props.board.BOARD_TITLE }
        </Link>
      </td>
      <td>{ props.board.MEMBER_NAME }</td>
      <td>{ props.board.BOARD_WRITTEN_DATE }</td>
      <td>{ props.board.BOARD_HIT }</td>
      <td>{ props.board.BOARD_BLIND }</td>
    </tr>
  );
}

export default AdminBoardRow;