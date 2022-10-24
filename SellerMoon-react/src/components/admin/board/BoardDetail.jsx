import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/*
  [[[[[[[[[[ 전체 게시글 상세 조회 ]]]]]]]]]]
  
  조건1. 게시글 전체 조회(BoardList.jsx)에서 선택한 값 모든 컬럼 조회 가능
  조건2. 관리자는 게시글 삭제 가능
    조건2-1. 게시글 삭제 조건 :  신고 10회 이상일 때 삭제 가능
    조건2-2. 관리자가 해당 글을 삭제하면 '관리자에 의해 삭제된 게시글입니다.' 해당 td에 출력
    조건2-3. 삭제된 게시글 보관 가능 (협의할 것)
*/

const BoardDetail = (props) => {
  const { board_no } = useParams();
  const [ boardVO, setBoardVO] = useState({
    BOARD_NO: 0,
    BOARD_CATEGOTY: "",
    BOARD_TITLE: "",
    BOARD_CONTENT: "",
    MEMBER_NAME: "",
    BOARD_WRITTEN_DATE: "",
    BOARD_HIT: 0,
    BOARD_LIKE: 0,
    BOARD_DISLIKE: 0,
    BOARD_BLIND: "",
    BOARD_REPORT_COUNT: 0,
  });
  useEffect(() => {
    const asyncBoardDB = async() => {
      const res = await jsonBoardList({ board_no: board_no });
      console.log(res);
      setBoardVO(res.data[0]);
    }
    asyncBoardDB();
  }, [board_no]);

  return (
    <div>
      상세 보기 페이지
    </div>
  );
}

export default BoardDetail;