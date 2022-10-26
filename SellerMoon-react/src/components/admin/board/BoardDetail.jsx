import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { boardBlind, boardDelete, jsonBoardList } from '../../_service/dbLogic';

/*
  [[[[[[[[[[ 전체 게시글 상세 조회 ]]]]]]]]]]
  
  조건1. 게시글 전체 조회(BoardList.jsx)에서 선택한 값 모든 컬럼 조회 가능
  조건2. 관리자는 게시글 삭제 가능
    조건2-1. 게시글 삭제 조건 :  신고 10회 이상일 때 삭제 가능
    조건2-2. 관리자가 해당 글을 삭제하면 '관리자에 의해 삭제된 게시글입니다.' 해당 td에 출력
    조건2-3. 삭제된 게시글 보관 가능 (협의할 것)
*/

const BoardDetail = () => {
  const navigate = useNavigate();
  const { board_no } = useParams();
  const [ boardVO, setBoardVO] = useState({
    BOARD_NO: 0,
    BOARD_CATEGORY: "",
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
    // oracle 경유
    const boardDetailDB = async() => {
      console.log("boardDetailDB 호출 성공")
      const res = await jsonBoardList({ board_no: board_no });
      console.log(res.data);
      // console.log(res.data[0].BOARD_TITLE);
      setBoardVO(res.data[0]); // 데이터 초기화
    };
    boardDetailDB();
  }, [board_no]);
  
  // Btn 목록으로 
  const listBtn_BoardList = () => {
    console.log("목록으로 버튼 클릭")
    navigate("/admin/board/boardList");
  };

  // Btn 삭제
  const delBtn = async() => {
    console.log("삭제할 글 번호 ===> " + boardVO.BOARD_NO);
    // comfirm 창 확인하기
    const res = await boardDelete({ board_no: board_no});
    setBoardVO(res.data[0]);
  };

  // Btn 블라인드 (해당하는 글 번호의 board_blind 여부를 설정한다. Y/N)
  const blindBtn = async() => {
    console.log("블라인드 처리할 글 번호 ===> " + boardVO.BOARD_NO)
    const blindYN = document.getElementById("#blindYN").value;
    console.log(blindYN)
    const res = await boardBlind({ board_no: board_no });
    setBoardVO(res.data[0]);
  };

  /********* RENDER **********/
  return (
    <>
      <div className='container'>
        <h2>
          게시판 관리 (Moon Story)&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
          <small>상세 조회</small>
        </h2>
        <hr />

        <div>
          <Button variant="primary" onClick={listBtn_BoardList}>목록으로</Button>
          <Button variant="danger" onClick={blindBtn}>블라인드</Button>
        </div>

        <div>
          <Table>
            <thead>
              <tr>
                <th>NO</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>내용</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
                <th>좋아요</th>
                <th>싫어요</th>
                <th>신고수</th>
                <th>블라인드</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ boardVO.BOARD_NO }</td>
                <td>{ boardVO.BOARD_CATEGORY }</td>
                <td>{ boardVO.BOARD_TITLE }</td>
                <td>{ boardVO.BOARD_CONTENT }</td>
                <td>{ boardVO.MEMBER_NAME }</td>
                <td>{ boardVO.BOARD_WRITTEN_DATE }</td>
                <td>{ boardVO.BOARD_HIT }</td>
                <td>{ boardVO.BOARD_LIKE }</td>
                <td>{ boardVO.BOARD_DISLIKE }</td>
                <td>{ boardVO.BOARD_REPORT_COUNT }</td>
                <td>
                  <Form.Select id="blindYN" value={ boardVO.BOARD_BLIND } size="sm">
                    {/* 여기가 default N ! --> Y or N으로 업데이트 할 수 있도록.. */}
                    <option default>{ boardVO.BOARD_BLIND }</option>
                    <option>Y</option>
                  </Form.Select>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default BoardDetail;