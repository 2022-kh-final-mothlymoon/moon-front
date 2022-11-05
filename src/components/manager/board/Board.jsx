import React from 'react';
import Footer from '../Common/Footer';
import Header from '../Common/Header';

const Board = (props) => {
  return (
    <>
      <Header />
        <div className="body_container">
          <div>게시판 관리 페이지</div>
        </div>
      <Footer />
    </>
  );
}

export default Board;