import React, { useState } from 'react';
import { useEffect } from 'react';
import { jsonReplyList } from '../../../service/dbLogic';
import AdminReplyRow from './AdminReplyRow';

/*
  <<<<< 회원 해당 글 번호 댓글 전체 조회 >>>>>
*/
const AdminReplyList = () => {
  console.log("AdminReplyList 호출 성공");
  
// [ R ] 데이터 가져오기 ---------------------------------------
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
  }, []);

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