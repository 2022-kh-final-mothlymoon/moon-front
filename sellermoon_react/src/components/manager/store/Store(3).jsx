import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const Store = (props) => {
  return (
    <>
      <Header />
        <div className="body_container">
          <div>거래처 관리 페이지</div>
        </div>
      <Footer />
    </>
  );
}

export default Store;