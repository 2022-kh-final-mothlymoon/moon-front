import React, { useState } from "react";
import { useEffect } from "react";
import { adminReview, selectReview } from "../../../service/dbLogic";
import Pagination from "../../member/Common/Pagination";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import AdminReviewRow from "./AdminReviewRow";

const AdminReview = ({ isLogin, isAdmin, adminId }) => {
  const [reviews, setReviews] = useState([]); // 리뷰 리스트 담기
  const [selectMd, setSelectMd] = useState(""); // 리뷰 리스트 담기
  const [mdList, setMdList] = useState([]); // 상품명 리스트 담기
  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const reviewChange = (e) => {
    console.log(e.target.value);
    setSelectMd(e.target.value);
    adminReview({ md_no: e.target.value }).then((res) => {
      console.log(res.data);
      setReviews(res.data);
    });
  };
  useEffect(() => {
    selectReview().then((res) => {
      console.log(res.data);
      setMdList(res.data);
    });
  }, []);

  useEffect(() => {
    adminReview().then((res) => (console.log(res.data), setReviews(res.data)));
  }, []);
  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <div>
        <h1>관리자 리뷰관리 페이지</h1>
        <select value={selectMd} onChange={reviewChange}>
          {mdList.map((selectMd, i) => (
            <option key={i} value={selectMd.MD_NO}>
              {selectMd.MD_NAME}
            </option>
          ))}
        </select>
        {reviews.slice(offset, offset + limit).map((review, i) => (
          <AdminReviewRow key={i} review={review} />
        ))}
      </div>
      <Pagination
        total={reviews.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AdminReview;
