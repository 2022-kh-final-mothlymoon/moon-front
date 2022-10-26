import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeRowAdmin = (props) => {

  let navigate = useNavigate();

  return (
    <>
      <tr>
        <td> <input type="checkbox"/></td>
        <td>{props.notice.NOTICE_NO}</td>
        <td onClick={()=>{ navigate('/admin/notice/update/'+props.notice.NOTICE_NO)}} id="list-title">
          [{props.notice.NOTICE_CATEGORY}] &nbsp;
          {props.notice.NOTICE_TITLE}
        </td>
        <td>{props.notice.NOTICE_WRITER}</td>
        <td>{props.notice.NOTICE_REGDATE}</td>
        <td>{props.notice.NOTICE_HIT}</td>
      </tr>
    </>
  );
};

export default NoticeRowAdmin;