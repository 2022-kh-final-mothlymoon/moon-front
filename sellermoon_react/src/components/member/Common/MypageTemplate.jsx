import React, { useEffect, useState } from 'react';
import Header from './Header';
import { CONTENTS } from './../../../styles/NoticeStyle';
import SidebarMypage from './SidebarMypage';
import NavbarMypage from './NavbarMypage';
import Footer from './Footer';


const MypageMain = ({pointList}) => {



  return (
    <>
      <Header />

      <div className="container">
        <CONTENTS className="row">

          <SidebarMypage />

          <div className="col-9">
            <div className="list-wrapper">

              {
                pointList.map((point, i) => (
                  <NavbarMypage key={i} point={point} />
                ))
              }

              <h3>내용</h3>
              





            </div> {/* end of list-wrapper */}
          </div> {/* end of col */}

        </CONTENTS>
      </div> {/* end of container */}

      <Footer />
    </>
  );
};

export default MypageMain;