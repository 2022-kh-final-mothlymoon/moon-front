import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import MemberBoardRow from './MemberBoardRow';
import { jsonBoardList } from '../../../service/dbLogic';
import Pagination from '../Common/Pagination';

/* 
  <<<<< 회원 게시판 전체 조회 >>>>>
*/
const MemberBoardList = ({ pictureUpload }) => {
  // 페이지 이동 시 필요한 객체 선언
  const navigate = useNavigate(); 
  
  // 페이지네이션 선언
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  
  // [ R ] 데이터 가져오기 ---------------------------------------
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const boardListDB = async() => {
      console.log("[회원] boardListDB 호출 성공");
      // spring - jsonBoardList 데이터 읽기
      const result = await jsonBoardList();
      console.log(result);
      // console.log(result.data);
      // console.log(result.data[1].MEMBER_NAME);
      setBoardList(result.data); // 여러 건을 받아올 때는 배열 사용 X
    }
    boardListDB();
  }, []);

  // 글쓰기 버튼 (페이지 이동)
  const insertBtn = () => {
    console.log("[회원] 글쓰기 버튼 클릭");
    navigate("/member/board/boardForm");
  }


  // ******************** RENDER ********************
  return (
    <>
      <div className="container">

        {/******************** 게사판 안내 시작 ********************/}
        <div>
          <h2>
            Moon Story (커뮤니티)
          </h2>

          {/******************** 카테고리 시작  ********************/}
          <div>
            카테고리 나눠야할 부분 입니당
          </div>
          {/******************** 카테고리 종료  ********************/}

          <hr />
        </div>
        {/******************** 게시판 안내 종료 ********************/}



        <div className="row">

        {/******************** 조건 검색 시작  ********************/}
          <div className="col-3">
            <select aria-label="분류선택">
              <option defaultValue>분류선택</option>
              <option value="board_title">글제목</option>
              <option value="member_name">작성자</option>
              <option value="board_title">글내용</option>
            </select>
          </div>
          <div className="col-6">
            <input 
              type="text"
              placeholder="검색어를 입력하세요." 
              />
          </div>
          <div className="col-3">
            <Button variant="danger">
              검색
            </Button>
          </div>
          {/******************** 조건 검색 종료  ********************/}



          {/******************** 글쓰기 버튼 시작  ********************/}
          <div className="col-3">
            <Button variant="info" onClick={insertBtn}>
              글쓰기
            </Button>
          </div>
          {/******************** 글쓰기 버튼 종료  ********************/}
        
        </div>



        {/******************** 게시글 리스트 테이블 시작  ********************/}
        <Table>
          <thead>
            <tr>
              <th>글번호</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr> 
          </thead>
          <tbody>
            {
              boardList.map((board, i) => (
                // 한 건의 데이터를 불러오기 (MemberRow가 한 건을 보여준다.)
                <MemberBoardRow
                  key={i}
                  board={board}
                  pictureUpload={pictureUpload}
                /> 
              ))
            }
          </tbody>
        </Table>
        {/******************** 게시글 리스트 테이블 종료 ********************/}


        {/******************** 페이지네이션 시작 ********************/}
        <Pagination
          total={boardList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        {/******************** 페이지네이션 종료 ********************/}

      </div>

    </>
  );
}

export default MemberBoardList;