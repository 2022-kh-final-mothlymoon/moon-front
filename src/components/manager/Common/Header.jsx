import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Button, Nav, Form } from 'react-bootstrap';
import TabCards from '../main/TabCards';
import { Link, useNavigate } from 'react-router-dom';
import data from '../../../data.js'

const Header = () => {
  let [ tab, setTab ] = useState(0); // 0이면 0번째 내용 보이게, 1이면 1번째 내용 ...
  let [fade, setFade] = useState('')
  let [padset, setPadset] = useState(data)
  useEffect(() => {
    // fade 변수 자리에 claaName 'end'를 탈부착 (css)
    // 부착만 하면 안되고, 뗐다가 부착해야 애니메이션이 보임
    // 따라서 cleanUp Function + setTimeout 사용하기!
    setTimeout(() => {
      setFade('end');
      console.log("setTimeout")
    }, 100) // 0.1 초뒤에 실행
  
    // useEffect 실행 전에 실행됨
    return () => {
      setFade('');
      console.log("return");
      }
    }, [tab])
  
  /* 
    useNavigate 라는 훅 -> 페이지 이동을 도와주는 함수를 담고 잇음.
    보통 변수에 담아서 사용함 
  */
  let navigate = useNavigate();
  const sellerMoon = () => {
    console.log("에휴");
  }
  const logout = () => {
    console.log("에휴");
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/statics">월간;문</Navbar.Brand>&nbsp;&nbsp;&nbsp;
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/astatics" className="nav-link">통계 관리</Link>
              <Link to="/amember" className="nav-link">회원 관리</Link>
              <Link to="/amd" className="nav-link">상품 관리</Link>
              <Link to="/aorder" className="nav-link">주문 관리</Link>
              <Link to="/aboard" className="nav-link">게시판 관리</Link>
              <Link to="/astore" className="nav-link">거래처 관리</Link>
            </Nav>
            <Button className="btn btn-light btn-outline-secondary px-3" onClick={sellerMoon}>회원용 사이트로 이동하기</Button>&nbsp;
            <Button className="btn btn-light btn-outline-secondary px-3" onClick={logout}>로그아웃</Button>
            {/* {onLogout && (<Button variant="primary" onClick={()=>{logout2(auth); window.location.reload();}}>Logout</Button>)} */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;

