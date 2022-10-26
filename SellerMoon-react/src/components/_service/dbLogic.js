/* ********** ORACLE 경유하여 CRUD 처리할 함수 ********** */

import axios from "axios";

/* [[[[[[[[[[ 관리자 && 회원 ]]]]]]]]]] *****/
    // 게시글 전체 조회 / 상세 조회 / (해야할 것 : 조건 검색)
    // (jsonBoardList에서 select문 사용하는 쿼리문 모두 호출 가능)
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

// jsonBoardDetail
// 문제점 : map으로 한 건을 받아오는 RestController의 jsonBoardDetail 메서드와 상응하는 boardDetail sql문이 전달되지 않는다.
// export const jsonBoardDetail = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const bDetail = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "admin/board/jsonBoardDetail?board_no=", // 이렇게 하려면 파라미터 값을 어떻게 설정해야하는지..
//         params: params,
//       });
//       resolve(bDetail);
//     } catch (error) {
//         reject("error =====> " + error);
//     }
//   })
// };

/* [[[[[[[[[[ 회원 ]]]]]]]]]] *****/
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

/* [[[[[[[[[[ 관리자 ]]]]]]]]]] *****/
    // 게시글 블라인드 처리 Y/N
export const boardBlind = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const bBlind = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "admin/board/boardBlind",
        params: params
      })
      resolve(bBlind);
    } catch (error) {
        reject("error =====> " + error);
    }
  })
}