import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { jsonAmdList } from "../../../service/dbLogic";

const AmdDetail = (props) => {
  const navigate = useNavigate();
  const { MD_NO } = useParams();
  console.log(MD_NO);
  const [isOk, setIsOk] = useState(false);
  const [amdVO, setAmdVO] = useState({
    STORE_NO: 0,
    MD_NO: 0,
    MD_NAME: "",
    MD_CONTENT: "",
    MD_PRICE: 0,
    MD_COST: 0,
    MD_CATEGORY: "",
    MD_IMAGE: "",
    MD_IMAGE_URL: "",
    MD_DETAIL_IMAGE: "",
    MD_DETAIL_IMAGE_URL: "",
    MD_DISCOUNT: 0,
    MD_BRAND: "",
    ST_AMOUNT: "",
  });
  useEffect(() => {
    const asyncDB = async () => {
      const res = await jsonAmdList({ MD_NO: MD_NO });
      console.log(res);
      setAmdVO(res.data[0]);
    };
    asyncDB();
  }, [MD_NO]);
  console.log(MD_NO);
  const amdDel = () => {
    window.location.href =
      "http://localhost:9005/admin/amd/amdDelete?MD_NO=" + amdVO.MD_NO;
  };
  return (
    <>
      <Header />
      <Table>
        <tr>
          <td>상품번호</td>
          <td>{amdVO.MD_NO}</td>
          <td>상품이름</td>
          <td>{amdVO.MD_NAME}</td>
        </tr>
        <tr>
          <td>거래처 번호</td>
          <td>{amdVO.STORE_NO}</td>
          <td>브랜드</td>
          <td>{amdVO.MD_BRAND}</td>
          <td>카테고리</td>
          <td>{amdVO.MD_CATEGORY}</td>
        </tr>
        <tr>{amdVO.MD_CONTENT}</tr>
        <tr>
          <td>상품가격</td>
          <td>{amdVO.MD_PRICE}</td>
          <td>상품원가</td>
          <td>{amdVO.MD_COST}</td>
        </tr>
        <tr>
          <td>할인율</td>
          <tr>{amdVO.MD_DISCOUNT}</tr>
          <td>상품재고</td>
          <tr>{amdVO.ST_AMOUNT}</tr>
        </tr>

        <br />
        <Card.Img
          variant="top"
          style={{ width: "250px" }}
          src={`${amdVO.MD_IMAGE_URL}`}
        />
        <br />
        <br />
        <Card.Img
          variant="top"
          style={{ width: "250px" }}
          src={`${amdVO.MD_DETAIL_IMAGE_URL}`}
        />
        <br />
        {amdVO.MD_DISCOUNT}
        <br />
        <Button
          onClick={() => {
            navigate("/admin/amd/modify/" + amdVO.MD_NO);
          }}
        >
          수정
        </Button>
        <Button onClick={amdDel}>삭제</Button>
        <Button
          onClick={() => {
            navigate("/admin/amd");
          }}
        >
          뒤로가기
        </Button>
        <br />
        <br />
        <br />
      </Table>
      <Footer />
    </>
  );
};

export default AmdDetail;
