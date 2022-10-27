import React from 'react';
import Header from './../components/Common/Header';
import Footer from './../components/Common/Footer';
import { CONTENTS } from './../styles/NoticeStyle';
import SidebarNotice from './../components/notice/SidebarNotice';

const Faq = () => {
  return (
    <>
      <Header />

      <div className="container">
        <CONTENTS className="row">

          <SidebarNotice />
    

          <div className="col-9">
            <div className="list-wrapper">


              <h3>자주묻는질문</h3>


            </div>
           </div> {/* end of col */}

          </CONTENTS>
      </div> {/* end of container */}

    <Footer />

  </>
  );

}

export default Faq;