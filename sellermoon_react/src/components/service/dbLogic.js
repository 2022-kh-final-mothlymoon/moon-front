import axios from "axios";

export const registerMember = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "monthlymoon/register",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
