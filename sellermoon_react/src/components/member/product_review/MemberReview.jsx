import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { reviewInsert, reviewList } from "../../../service/dbLogic";
import MemberReviewRow from "./MemberReviewRow";
import { ImStarFull } from "react-icons/im";
import { STARDIV } from "../../../styles/ReviewStyle";
import { Button, Form, Modal } from "react-bootstrap";
import Pagination from "../Common/Pagination";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const MemberReview = ({ no, isLogin, logout }) => {
  const [reviews, setReviews] = useState([]); // 리뷰 리스트 담기
  const [content, setContent] = useState(""); // 작성할 리뷰 내용 담기
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // 별점 기본값 설정
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  // 더미 배열을 통해 항상 별이 총 5개가 나오도록 한다.
  const array = [0, 1, 2, 3, 4];

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    console.log(clickStates);
  };
  let score = clicked.filter(Boolean).length;

  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    reviewList({ md_no: 2 }).then((res) => {
      if (res.data === null) {
        return () => {};
      } else {
        console.log(res);
        console.log(res.data);
        setReviews(res.data);
      }
    });
  }, []);

  const InputReview = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };

  const insertR = (e) => {
    console.log("버튼 클릭");
    reviewInsert({
      member_no: no,
      md_no: 2,
      md_review_content: content,
      md_star: score,
    }).then((res) => {
      console.log(res.data);
      if (res.data === 1) {
        alert("등록되었습니다!");
        window.location.reload();
      }
    });
  };
  return (
    <>
      <Header isLogin={isLogin} logout={logout} />
      <div>
        <h1>리뷰페이지</h1>
        <button onClick={handleShow}>리뷰 쓰기</button>
        <br />
        {reviews.slice(offset, offset + limit).map((review, i) => (
          <MemberReviewRow key={i} review={review} no={no} />
        ))}
      </div>
      <Pagination
        total={reviews.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <Footer isLogin={isLogin} logout={logout} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>리뷰 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <STARDIV>
            {array.map((el) => (
              <ImStarFull
                key={el}
                onClick={() => handleStarClick(el)}
                className={clicked[el] && "yellow"}
                size="30"
              />
            ))}
          </STARDIV>
          <br />
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            type="text"
            placeholder="리뷰를 입력해주세요"
            name="md_review_content"
            value={content}
            onChange={InputReview}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={insertR}>
            리뷰 등록
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MemberReview;
