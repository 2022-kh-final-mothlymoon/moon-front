import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsonReplyList } from '../../../service/dbLogic';
import AdminReplyRow from './AdminReplyRow';

/*
  <<<<< 회원 해당 글 번호 댓글 전체 조회 >>>>>
    - 수정할 것 : 해당하는 글 번호의 댓글을 가져오는게 아니라 전체 댓글을 가지고 옴
*/
const AdminReplyList = () => {
  console.log("AdminReplyList 호출 성공");
  
// [ R ] 데이터 가져오기 ---------------------------------------
  const { board_no } = useParams();
  const [replyList, setReplyList] = useState([]);
  useEffect(() => {
    const replyListDB = async() => {
      console.log("[관리자] replyListDB 호출 성공");
      // spring - jsonReplyList 데이터 읽기
      const result = await jsonReplyList();
      console.log(result);
      // console.log(result.data);
      // console.log(result.data[1].MEMBER_NAME);
      console.log(result.data.length); // 댓글 개수
      const replyLength = result.data.length;
      setReplyList(result.data); // 여러 건을 받아올 때는 배열 사용 X
    }
    replyListDB();
  }, [board_no]);

  // ******************** RENDER ********************
  return (
    <>
      <div className='container'>
        <small>댓글 (n)</small>
        {
          replyList.map((reply, i) => (
            <AdminReplyRow
              key={i}
              reply={reply}
            />
          ))
        }
      </div>
    </>
  );
}

export default AdminReplyList;