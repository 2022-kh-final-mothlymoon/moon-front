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
    try{
      const response = axios({
        method : "get",
        url : process.env.REACT_APP_SPRING_IP + "point/pointlist",
        params : params,
      })

      resolve(response)
        
    }catch(error) {
      reject(error)
    }
  })
}

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

/* 마이페이지 정기구독 기본정보 */
export const subslist = (params) => {
  return new Promise((resolve, reject) => {
    try{
      const response = axios({
        method : "get",
        url : process.env.REACT_APP_SPRING_IP + "subs/subslist",
        params : params,
      })

      resolve(response)
        
    }catch(error) {
      reject(error)
    }
  })
}

/* 마이페이지 정기구독 배송정보 */
export const subsdeliver = (params) => {
  return new Promise((resolve, reject) => {
    try{
      const response = axios({
        method : "get",
        url : process.env.REACT_APP_SPRING_IP + "subs/subsdeliver",
        params : params,
      })

      resolve(response)
        
    }catch(error) {
      reject(error)
    }
  })
}

/* 마이페이지 정기구독 결제정보 */
export const subspurchase = (params) => {
  return new Promise((resolve, reject) => {
    try{
      const response = axios({
        method : "get",
        url : process.env.REACT_APP_SPRING_IP + "subs/subspurchase",
        params : params,
      })

      resolve(response)
        
    }catch(error) {
      reject(error)
    }
  })
}