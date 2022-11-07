import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { myReview } from "../../../service/dbLogic";
import MyReviewRow from "./MyReviewRow";

const MyReview = ({ no, isLogin }) => {
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    myReview({ member_no: no }).then((res) => {
      if (res.data.length === 0) {
        return () => {};
      } else {
        console.log(res.data);
        setMyReviews(res.data);
      }
    });
  }, [no]);
  return (
    <>
      <h1>마이 리뷰</h1>
      {myReviews.map((review, i) => (
        <MyReviewRow key={i} review={review} no={no} />
      ))}
    </>
  );
};

export default MyReview;
