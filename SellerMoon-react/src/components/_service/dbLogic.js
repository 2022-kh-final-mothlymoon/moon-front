import axios from "axios";

// json형식으로 출력한 jsonBoardList 출력 (전체 게시글)
export const jsonBoardList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const bList = axios({
        method: "GET",
        url: process.env.REACT_APP_SPRING_IP + "admin/board/jsonBoardList",
        params: params,
      });
      resolve(bList);
    } catch (error) {
        reject(error);
    }
  })
};