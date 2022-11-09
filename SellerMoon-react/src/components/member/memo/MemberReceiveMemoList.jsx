import React, { memo, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { jsonMemoList } from '../../../service/dbLogic';
import MemberReceiveMemoRow from './MemberReceiveMemoRow';
import MemberSendMemoForm from './MemberSendMemoForm';

/*
  <<회원>> 받은 쪽지리스트 (user_id === to_id)
*/
const MemberReceiveMemoList = ({ props, no, isLogin }) => {
  console.log("MemberReceiveMemoList 호출 성공");

  // 세션에 담긴 정보 (로그인 한 사용자)
  const user_id = window.sessionStorage.getItem("user_id");
  console.log("로그인 한 사용자 ==> " + user_id);
  
  // [R] 데이터 가져오기
  const [memoList, setMemoList] = useState([]);
  useEffect(() => {
    const memoListDB = async() => {
      console.log("[회원] memoListDB 호출 성공");
      const result = await jsonMemoList({ member_no: no });
      console.log(result);
      setMemoList(result.data);
    }
    memoListDB();
  }, []);

  return (
    <>
      <div className='container'>

        <div>
          <h2>받은 쪽지 목록</h2>
          <hr />
        </div>

        <div>
          {/* 메세지 보내기 */}
          <MemberSendMemoForm />
        </div>

        <div>
          <Table>
            <thead>
              <tr>
                {/* <th>받은사람(나)</th> */}
                <th>보낸사람(상대방)</th>
                <th>내용</th>
                <th>보낸날짜</th>
                <th>읽음여부</th>
                <th>답장</th>
                <th>삭제</th>
              </tr> 
            </thead>
            <tbody>
              {
                memoList.map((memo, i) => (
                  <MemberReceiveMemoRow
                    key={i} 
                    memo={memo}
                  /> 
                ))
              }
            </tbody>
          </Table>
        </div>

      </div>
    </>
  );
}

export default MemberReceiveMemoList;