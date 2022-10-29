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

// 게시글 삭제
export const boardDelete = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const bDelete = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "admin/board/boardDelete",
        params: params
      })
      resolve(bDelete);
    } catch (error) {
        reject("error =====> " + error);
    }
  })
}

// <<<<<<<<<< 공통 DB 종료 >>>>>>>>>>



// <<<<<<<<<< 관리자 DB 시작 >>>>>>>>>>

// 게시글 수정 (블라인드 처리)
export const boardUpdateAdmin = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const bUpdateAdmin = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "admin/board/boardDetail",
        params: params
      })
      resolve(bUpdateAdmin);
    } catch (error) {
      reject("error =====> " + error);
    }
  })
}

// <<<<<<<<<< 관리자 DB 종료 >>>>>>>>>>



// <<<<<<<<<< 회원 DB 시작 >>>>>>>>>>

// 게시글 입력
export const boardInsertMember = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const bInsertMember = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/board/boardInsert",
        params: params
      })
      resolve(bInsertMember);
    } catch (error) {
      reject("error =====>" + error);
    }
  })
}

// 게시글 수정
export const boardUpdateMember = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const bUpdateMember = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/board/boardUpdate",
        params: params
      })
      resolve(bUpdateMember);
    } catch (error) {
      reject("error =====> " + error);
    }
  })
}

// <<<<<<<<<< 회원 DB 끝 >>>>>>>>>>