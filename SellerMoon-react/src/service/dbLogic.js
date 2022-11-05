// 오라클 경유하여 CRUD를 받아오는 로직

import axios from "axios";

// <<<<<<<<<< 공통 DB 시작 >>>>>>>>>>

//게시글 전체조회/상세조회/조건검색
export const jsonBoardList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const bList = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "admin/board/jsonBoardList",
        params: params,
      });
      resolve(bList);
    } catch (error) {
        reject(error);
    }
  })
};

// 댓글 전체 조회
export const jsonReplyList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const rList = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "admin/board/jsonReplyList",
        params: params,
      })
      resolve(rList);
    } catch (error) {
      reject(error);
    }
  })
}



// <<<<<<<<<< 공통 DB 종료 >>>>>>>>>>