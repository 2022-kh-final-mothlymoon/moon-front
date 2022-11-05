import React, { useEffect, useState } from 'react';
import { MYUL, MYLI1, MYLI2, MYSPAN, MYP } from './../../../styles/MypageStyle';

const NavbarMypage = ({ pointList }) => {


  return (
    <>
      <MYUL>
        <MYLI1>
          <MYSPAN>
            정기구독 
            <i className="fa-solid fa-angle-right"></i>
          </MYSPAN>
          <MYP>이지 탐폰 세트</MYP>
        </MYLI1>

        <MYLI2>
          <MYSPAN>
            회원등급 
            <i className="fa-solid fa-angle-right"></i>
          </MYSPAN>
          <MYP>초승달</MYP>
        </MYLI2>

        <MYLI2>
          <MYSPAN>
            적립금 
            <i className="fa-solid fa-angle-right"></i>
          </MYSPAN>
          <MYP> {pointList[0].POINT_SUM}  P</MYP>
        </MYLI2>
      </MYUL>
    </>
  );
};

export default NavbarMypage;