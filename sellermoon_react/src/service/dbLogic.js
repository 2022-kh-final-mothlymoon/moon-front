import axios from "axios";

export const RegisterMember = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "register",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const loginMember = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "login",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const adminLogin = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "admin/login",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberProfile = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "meminfo",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const modifyProfile = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "membermodify",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const modifyPass = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "updpass",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const delMember = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "deletemember",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const noticelist = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "notice/noticelist",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const faqlist = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "faq/faqlist",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const pointlist = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "point/pointlist",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "admin/member",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const jsonStoreList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "admin/store/jsonStoreList",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const jsonStoreDetail = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "admin/store/jsonStoreDetail",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const jsonAmdList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "amd/jsonAmdList",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const amdInsert = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "amd/amdInsert",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/*   Cart     */
export const getAllCarts = () => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "cart/jsonList",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllProductAPI = () => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "product/list",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProductDetailAPI = (no) => {
  const url = process.env.REACT_APP_SPRING_IP + "product/detail?no=" + no;
  console.log(url);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: url,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const mypoint = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "point/mypoint",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 마이페이지 정기구독 기본정보 */
export const subslist = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "subs/subslist",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 마이페이지 정기구독 배송정보 */
export const subsdeliver = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "subs/subsdeliver",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 마이페이지 정기구독 결제정보 */
export const subspurchase = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "subs/subspurchase",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

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
  });
};

// 댓글 전체 조회
export const jsonReplyList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const rList = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "admin/board/jsonReplyList",
        params: params,
      });
      resolve(rList);
    } catch (error) {
      reject(error);
    }
  });
};

/* 주문,결제 - 개별구매 */
export const paymentlist = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "paymentlist",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 총결제금액 - 개별구매 */
export const paytotal = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "paytotal",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 총결제금액 - 정기구독 */
export const spaymentlist = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "spaymentlist",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 주문,결제 - 정기구독 */
export const spaytotal = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "spaytotal",
        params: params,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};