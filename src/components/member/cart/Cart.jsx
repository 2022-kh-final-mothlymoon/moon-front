import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { deleteCartAPI , updateCartAPI} from "../../../service/dbLogic";

const Cart = ({c, pReload, pSum}) => {
  const [cart, setCart] = useState({});
  const [md, setMd] = useState({});
   // 갯수 
  const [quantity, setQuantity] = useState(0);
  // 총 가격 
  const [sum, setSum] = useState(0);
  
  /*  모달관련  */
  // 장바구니 삭제 모달 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // 카트 객체
    setCart(c)
    // 카트 객체 안의 상품 정보 객체
    setMd(c.mdVO)
    // 갯수 
    setQuantity(c.cartQuantity)
    // 총액
    const s = c.mdVO.mdDcPrice * c.cartQuantity
    setSum(s)
    pSum(s)
    
  }, [c]);

  // API 호출 함수
  const deleteCart = async (e) => {
    const data = {
      cartNo : e
    }
  
    await deleteCartAPI(data)
    .then((res) => {
      if(res.data){
        setShow(false)
        pReload()
      }
    })
}

const updateCart = async (e) => {
  const data = {
    cartNo : cart.cartNo,
    quantity : e
  }

  await updateCartAPI(data)
  .then((res) => {
    if(res.data){
      setShow(false)
      pReload()
    }
  })
}

// 옵션값 변경시 호출되는 함수
const handleOption = (q) => {
  updateCart(q)
  setQuantity(q)
  const s = md.mdDcPrice * q
  setSum(s)
  pSum(s)
}

const handleIncre = () => {
  handleOption(quantity + 1)
}

const handleDecre = () => {
  if(quantity != 1){
    handleOption(quantity-1)
  }
}

return (
  <>
    <div className="body_container">
      <div className="cart_md_name">
        {md.mdName}
      </div>
      <div className="cart_qtt">
        {quantity}
        <button onClick={ handleIncre}>+</button>
        <button onClick={handleDecre}>-</button>
      {/*  <select value={cart.cartQuantity} onChange={handleOption} className="cart_qtt_select" name="quantity" > 
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6+</option>
        </select> */}
      </div>
      <div className="cart_md_price">
        정가: {md.mdPrice}
      </div>
      <div className="cart_md_discount">
        할인(%): {md.mdDiscount}
      </div>  
      <div className="cart_md_dcprice">
        할인가: {md.mdDcPrice}
      </div>  
      <div className="cart_md_image">
        <img src={md.mdImageUrl} alt="img"/>
      </div>  
      <div className="cart_sum">
        총액: {sum}
      </div>  
      <div className="cart_btn_container">
        <button onClick={handleShow}>삭제</button>
      </div>
    </div>
      {/* =========================== [[ 장바구니 삭제 완료 모달 시작 ]] =========================== */}
      <Modal size="md" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">장바구니로 이동</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-container">
            <span>해당 장바구니를 삭제하시겠습니까?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={() => {deleteCart(cart.cartNo)}}>
            삭제 
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================== [[ 장바구니 삭제 완료 모달 종료 ]] =========================== */}

        {/* =========================== [[ 장바구니 삭제 완료 모달 시작 ]] =========================== */}
      <Modal size="md" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">장바구니로 이동</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-container">
            <span>해당 장바구니를 삭제하시겠습니까?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={() => {deleteCart(cart.cartNo)}}>
            삭제 
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================== [[ 장바구니 삭제 완료 모달 종료 ]] =========================== */}
</>

)
};
export default Cart;
