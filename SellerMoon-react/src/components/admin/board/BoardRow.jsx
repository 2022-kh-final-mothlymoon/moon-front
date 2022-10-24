import React from 'react';
import { Link } from 'react-router-dom';

// 한 건의 데이터 렌더
const BoardRow = (props) => {
  return (
    <tr>
      <td>{ props.tb_community.BOARD_NO }</td>
      <td>{ props.tb_community.BOARD_CATEGORY }</td>
      <td>
        <Link 
          to={ "/boardDetail/" + props.tb_community.BOARD_NO }
          className="btn btn-primary"
        >
          { props.tb_community.BOARD_TITLE }
        </Link>
      </td>
      <td>{ props.tb_community.MEMBER_NAME }</td>
      <td>{ props.tb_community.BOARD_WRITTEN_DATE }</td>
      <td>{ props.tb_community.BOARD_HIT }</td>
    </tr>
  );
}

export default BoardRow;