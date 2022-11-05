import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsonReplyList } from '../../../service/dbLogic';
import MemberReplyForm from './MemberReplyForm';
import MemberReplyRow from './MemberReplyRow';

/*
  <<<<< 관리자 해당 글 번호 댓글 전체 조회 >>>>>
    - 추가할 것 : 댓글 pagination
    - 수정할 것 : 댓글 갯수 추가하기
*/
const MemberReplyList = () => {
  const { board_no } = useParams();

// [ R ] 데이터 가져오기 ---------------------------------------
  const [replyList, setReplyList] = useState([]);
  useEffect(() => {
    const replyListDB = async() => {
      console.log("[관리자] replyListDB 호출 성공");
      // spring - jsonReplyList 데이터 읽기
      const result = await jsonReplyList({ board_no: board_no });
      console.log(result);
      // console.log(result.data);
      // console.log(result.data[1].MEMBER_NAME);
      console.log(result.data.length); // 댓글 개수
      setReplyList(result.data); // 여러 건을 받아올 때는 배열 사용 X
    }
    replyListDB();
  }, []);

  // ******************** RENDER ********************
  return (
    <>



      <hr />

      <div className='container'>
        <small>댓글 (n)</small>
        {
          replyList.map((reply, i) => (
            <MemberReplyRow
              key={i}
              reply={reply}
            />
          ))
        }
      </div>



    </>
  );
}

export default MemberReplyList;