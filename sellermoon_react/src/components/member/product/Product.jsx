import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { insertCartAPI } from "../../../service/dbLogic";

const Product = ({ p }) => {
  const [product, setProduct] = useState([]);
  // 페이지 이동을 위한 useNavigate 함수 이용
  const navigate = useNavigate();

  /*  모달관련  */
  // 장바구니 담기 전 확인 메세지 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // 장바구니 담은 후 성공 메세지 & 장바구니 페이지로 이동 모달
  const [showSucc, setShowSucc] = useState(false);
  const handleCloseSucc = () => setShowSucc(false);
  const handleShowSucc = () => setShowSucc(true);

  useEffect(() => {
    setProduct(p);
  }, [p]);

  const details = (e) => {
    navigate(`/product/detail?no=${e}`);
  };
  const insertCart = async (e) => {
    const data = {
      mdNo: e,
      orderType: "O",
      cartQuantity: 1,
    };

    await insertCartAPI(data).then((res) => {
      if (res.data) {
        setShow(false);
        setShowSucc(true);
      }
    });
  };

  const goToCart = async () => {
    navigate("/cart?type=O");
  };
  return (
    <>
      <div className="product_container">
        {/* <div className="product_brand">{product.mdBrand}</div> */}
        {/* <div className="product_category">{product.mdCategory}</div> */}
        {/* <div className="product_content">{product.mdContent}</div> */}
        {/* <div className="product_cost">{product.mdCost}</div> */}
        <div className="product_image">
          <img src={product.mdImageUrl} alt="img" />
        </div>
        <div className="product_name">{product.mdName}</div>
        <div className="product_price">{product.mdPrice}원</div>
        <div className="product_dc">{product.mdDiscount}%</div>
        {/* <div className="product_amount">{product.stAmout}</div> */}
        {/* 디테일 보기는 추후 버튼이 아닌 상품 컨테이너 클릭시 이동하기로 변경  */}
        <button
          onClick={() => {
            details(product.mdNo);
          }}
        >
          상세보기
        </button>
        &nbsp;
        <button onClick={handleShow}>장바구니 담기</button>
      </div>

      {/* =========================== [[ 장바구니 담기 확인 모달 시작 ]] =========================== */}
      <Modal size="md" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            장바구니 담기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-container">
            <span>해당 상품을 장바구니에 담으시겠습니까?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              insertCart(product.mdNo);
            }}
          >
            담기
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================== [[ 장바구니 담기 확인 모달 종료 ]] =========================== */}

      {/* =========================== [[ 장바구니 담기 완료 모달 시작 ]] =========================== */}
      <Modal
        size="md"
        show={showSucc}
        onHide={handleCloseSucc}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            장바구니로 이동
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-container">
            <span>장바구니 담기에 성공하였습니다! </span> <br />
            <span>장바구니로 이동하시겠습니까? </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to={"/payment"}>결제</Link>
          <Button variant="secondary" onClick={handleCloseSucc}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              goToCart();
            }}
          >
            이동
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================== [[ 장바구니 담기 완료 모달 종료 ]] =========================== */}
    </>
  );
};

export default Product;
