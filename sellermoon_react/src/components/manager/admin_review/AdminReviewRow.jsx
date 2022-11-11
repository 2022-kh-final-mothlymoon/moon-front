import React, { useState } from "react";
import { bestReview, reviewDelete } from "../../../service/dbLogic";
import { PLUSBTN, STARSPAN } from "../../../styles/ReviewStyle";

const AdminReviewRow = ({ review }) => {
  const [limit, setLimit] = useState(30); // 더보기 버튼 글자수 제한
  const toggleEllipsis = (str, limit) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit,
    };
  };
  const onClickMore = (str) => () => {
    setLimit(str.length);
  };
  // 베스트 리뷰 선정
  const bestR = () => {
    console.log(review.MD_REVIEW_NO);
    console.log(review.MEMBER_NO);
    bestReview({
      md_review_no: review.MD_REVIEW_NO,
      member_no: review.MEMBER_NO,
    }).then((res) => {
      console.log(res.data);
      if (res.data === 1) {
        alert("베스트 리뷰로 선정했습니다!");
        window.location.reload();
      }
    });
  };
  // 삭제 버튼
  const delReview = () => {
    console.log(review.MD_REVIEW_NO);
    reviewDelete({ md_review_no: review.MD_REVIEW_NO }).then((res) => {
      console.log(res.data);
      if (res.data === 1) {
        alert("삭제되었습니다!");
        window.location.reload();
      }
    });
  };
  return (
    <>
      <div>
        <br />
        상품 번호: {review.MD_NO}
        <br />
        상품명: {review.MD_NAME}
        <br />
        내용 : {toggleEllipsis(review.MD_REVIEW_CONTENT, limit).string}
        {toggleEllipsis(review.MD_REVIEW_CONTENT, limit).isShowMore && (
          <PLUSBTN onClick={onClickMore(review.MD_REVIEW_CONTENT)}>
            ...더보기
          </PLUSBTN>
        )}
        <br />
        작성자: {review.MEMBER_NAME}
        <br />
        작성 날짜: {review.MD_REVIEW_WRITTEN_DATE}
        <br />
        좋아요: {review.MD_REVIEW_LIKE}
        <br />
        별점:{" "}
        {review.MD_STAR === 1 ? (
          <STARSPAN>★</STARSPAN>
        ) : review.MD_STAR === 2 ? (
          <STARSPAN>★★</STARSPAN>
        ) : review.MD_STAR === 3 ? (
          <STARSPAN>★★★</STARSPAN>
        ) : review.MD_STAR === 4 ? (
          <STARSPAN>★★★★</STARSPAN>
        ) : (
          <STARSPAN>★★★★★</STARSPAN>
        )}
        <br />
        베스트 리뷰: {review.BEST_REVIEW}
        &nbsp;
        <button onClick={bestR}>베스트 리뷰 선정</button>
        <br />
        <button onClick={delReview}>삭제</button>
        <hr />
        <br />
      </div>
    </>
  );
};

export default AdminReviewRow;
