import React, { useEffect, useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import Footer from '../../member/Common/Footer';
import Header from '../../member/Common/Header';
import TabCards from '../../member/main/TabCards';
import data from '../../../data.js'

const Order = (props) => {
  let [ tab, setTab ] = useState(0); // 0이면 0번째 내용 보이게, 1이면 1번째 내용 ...
  let [fade, setFade] = useState('')
  let [padset, setPadset] = useState(data)
  const reset = () => {
    console.log("선택 초기화");
  }
  const search = () => {
    console.log("검색");
  }

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


  return (
    <>
      <Header />
      <div className="body_container">
        <h4>주문 관리</h4>
          {/* 검색 시작 */}
          <div className="tb_search" style={{marginBottom: 40}}>
            <table style={{width: '100%', marginBottom: 10}}>
              <tbody>
                <tr>
                  <th className="bdb bdr">검색</th>
                  <td className="bdb bdr">
                    <input type="text" name="s_keyword" className="AXInput" style={{width:'95%'}} placeholder="주문번호를 입력해주세요"/>
                  </td>
                  <th className="bdb bdr">주문일자</th>
                  <td className="bdb bdr">
                    <div className="inlineBlock">
                      <input type="text" name="s_srdate" className="AXInput W100 hasDatepicker" autoComplete="off" maxLength="10"/>
                      ~
                      <input type="text" name="s_srdate" className="AXInput W100 hasDatepicker" autoComplete="off" maxLength="10"/>
                    </div>
                  </td>
                  <th>정렬</th>
                  <td>
                    <select name="s_align" id="s_align" className="AXSelect">
                      <option value="0">주문일자</option>
                      <option value="1">주문자명</option>
                      <option value="2">구매수량</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              <Button className="btn btn-light btn-outline-secondary px-3" onClick={reset}>초기화</Button>&nbsp;
              <Button className="btn btn-light btn-outline-secondary px-3" onClick={search}>검색</Button>
            </div>
          </div>
          {/* 검색 끝 */}
        <Nav fill variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">결제완료</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">배송준비</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">배송완료</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(3)}} eventKey="link3">주문취소</Nav.Link>
          </Nav.Item>
        </Nav>

        <div className={`start ${fade}`}>
          {/* tab state가 0이면, 첫번째 div보여주고, 1이면 두번째 div보여줌... */}
          {[
          
          <div className="container">
            <div className="row">
              {
                padset.map(function(data, i){
                  //console.log(padset[i].type);
                  if(padset[i].type === "padset")
                  return <TabCards padset={padset[i]} key={i} />
                })
              }
            </div>
          </div>,

          <div className="container">
            <div className="row">
              {
                padset.map(function(data, i){
                  //console.log(padset[i].type);
                  if(padset[i].type === "popular")
                  return <TabCards padset={padset[i]} key={i} />
                })
              }
            </div>
          </div>,

          <div className="container">
            <div className="row">
              {
                padset.map(function(data, i){
                  //console.log(padset[i].type);
                  if(padset[i].type === "new")
                  return <TabCards padset={padset[i]} key={i} />
                })
              }
            </div>
          </div>,

          <div className="container">
            <div className="row">
              {
                padset.map(function(data, i){
                  //console.log(padset[i].type);
                  if(padset[i].type === "experience")
                  return <TabCards padset={padset[i]} key={i} />
                })
              }
            </div>
          </div>,
          
          ][tab]}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;

