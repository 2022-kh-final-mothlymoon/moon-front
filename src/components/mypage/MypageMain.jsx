import React, { useEffect, useState } from 'react';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import { CONTENTS } from '../../styles/NoticeStyle';
import SidebarMypage from '../Common/SidebarMypage';
import Pagination from '../Common/Pagination';
import { pointlist } from '../../service/dbLogic';
import NavbarMypage from './../Common/NavbarMypage';
import { propTypes } from 'react-bootstrap/esm/Image';

const MypageMain = () => {



  return (
    <>
      <Header />

      <div className="container">
        <CONTENTS className="row">

          <SidebarMypage />

          <div className="col-9">
            <div className="list-wrapper">

              <NavbarMypage />

              <h3>MypageMain</h3>
              
            </div> {/* end of list-wrapper */}
          </div> {/* end of col */}

        </CONTENTS>
      </div> {/* end of container */}

      <Footer />
    </>
  );
};

export default MypageMain;