import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from 'query-string'
import Cart from "./Cart";
import { getAllMyCartAPI, insertCartAPI } from "../../../service/dbLogic";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const Carts = () => {
  const [carts, setCarts] = useState([]);
  
  // get param by queryString
  const location = useLocation();
  const query = queryString.parse(location.search)

  // 장바구니 타입
  const type = query.type;

  // 장바구니 금액정보
  const [sum, setSum] = useState(0);
  const [shipFee, setShipFee] = useState(0);
  const [checked, setChecked] = useState(true)

  const getCartsData = async () => {
    await getAllMyCartAPI(type).then((res) => {
      if (res.data === null) {
        return () => {};
      } else {
        setCarts(res.data)
      }
    });
  };

  // 카트 리스트 데이터 다시 불러오기
  const pReload = () => {
    getCartsData();
    setSum(0)
  }

  const pSum = (e) => {
    setSum(sum => e + sum)
  }
  
  const allSelect = () => {
    setChecked(!checked)
  }

  const deleteSelect = () => {
    
  }

  useEffect(() => {
    console.log("useEffet 호출");
    getCartsData();
  }, []);

  useEffect(() => {
    // 개별구매 총액이 30000원 이상이거나 정기배송일 경우 배송비 0원
    console.log(type == 'T')
    setShipFee((sum < 30000) &&  type != 'T'? 3000 : 0)
  }, [sum]);
  return (
    <>
      <Header />
      <div className="body_container">
        <div>
          <div className="cart_list_container">
            {carts && carts.length > 0 
              ? carts.map( e => (
              <div className="cart_list_wrapper" key={e.cartNo}>
                <input type="checkbox" value={e.cartNo} onChange={()=>{}} checked={checked}/>
                <Cart c={e} pReload={pReload} pSum={pSum}/> 
            </div>
            )) : "장바구니가 비어있습니다."} 
          </div>
        </div>
        <div className="cart_list_footer">
          <div className="cart_list_btn_container"> 
            <button className="cart_list_all" onClick={allSelect}>전체 선택</button> 
            <button className="cart_list_delete" onClick={deleteSelect}>선택 삭제</button>
          </div>
          <div className="cart_list_sum_price_container">
            <div className="cart_list_price">총 상품 금액 : {sum}원</div>
            <div className="cart_list_ship_fee">배송비 : {shipFee}원</div>
            <div className="cart_list_sum">총 주문금액 : {sum +shipFee}원</div>   
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Carts;
