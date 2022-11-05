import React from 'react';
import { Navbar, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import KakaoMap from './../main/KakaoMap';

const Footer = () => {

  let navigate = useNavigate();

  return (
    <>
      {/* <Navbar
        className="navbar navbar-expand-sm justify-content-center"
        fixed="bottom"
        bg="dark"
        style={{ color: "white" }}
      >
        Monthly-Moon &copy; 2022
      </Navbar> */}
      <footer>
        <div className="foot-container">
          <Row>
            <Col xs={12} md={8}>
              <div className="foot-row1">
                <div style={{ display:"block" }}>
                  <span className="foot-span">고객센터</span>
                  <div className="foot-btnbox">
                    1:1 채팅
                  </div>
                  <div className="foot-btnbox" onClick={()=>{ navigate('/faq') }}>
                    자주묻는질문(FAQ)
                  </div>
                  <p className="foot-info">
                    평일 10:00 ~ 18:00 (점심시간 12:00 ~ 13:30) / 휴무: 토요일, 일요일, 공휴일
                    <br />
                    전화문의 02-1010-1010&nbsp;&nbsp;  이메일문의&nbsp; 
                    <span className="email">help@monthlymoon.com</span>
                  </p>
                </div>
              </div> {/* end of foot-row1 */}


          <div className="foot-row2">
            <div style={{ display:"block" }}>
              <span className="foot-span">로그아웃&nbsp;단체구매&nbsp;인재채용&nbsp;배송/반품&nbsp;이용약관&nbsp;개인정보처리방침</span>
              <p className="foot-info">
              상호명: (주)월간문 | 사업자등록번호: 410-11-11111 | 통신판매업번호 : 제2022-서울-1234호
              <br />
              주소: 서울 강남구 테헤란로14길 6 남도빌딩, 2층 월간문 | 
              <b> 업무 및 제휴 </b>
              biz@monthlymoon.com | FAX 02-0101-0101
              <br />
              &copy;
              <b>MONTHLY MOON </b>
              Inc. ALL Rights Reserved
              </p>
            </div>
          </div> {/* end of foot-row2 */}
            </Col>

            <Col xs={6} md={4} style={{marginTop:"35px"}}>
              <KakaoMap />
            </Col>
          </Row>

          

        </div> {/* end of foot-container */}
      </footer>
      

    </>
  );
};

export default Footer;