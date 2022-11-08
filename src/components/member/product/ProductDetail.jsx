import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductDetailAPI } from "../../../service/dbLogic";
import queryString from 'query-string'
import { useLocation } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const ProductDetail = ({  }) => {
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const query = queryString.parse(location.search)
  const no = query.no;

  useEffect(() => {
    console.log("useEffet 호출");
    const getProductDetail = async () => {
      await getProductDetailAPI(no).then((res) => {
        if (res.data === null) {
          return () => {};
        } else {
          setProduct(res.data);
        }
      });
    };
    getProductDetail();
  }, []);
  return (
    <>
    <Header />
      <div className="body_container">
        <div className="product_detail_image">
          <img src={product.mdImageUrl} alt="img"/>
        </div>
        <div className="product_detail_brand">{product.mdBrand}</div>
        <div className="product_detail_category">{product.mdCategory}</div>
        <div className="product_detail_name">{product.mdName}</div>
        <div className="product_detail_content">{product.mdContent}</div>
        <div className="product_detail_cost">{product.mdCost}</div>
        <div className="product_detail_price">{product.mdPrice}</div>
        <div className="product_detail_dc">{product.mdDiscount}</div>
        <div className="product_detail_amount">{product.stAmout}</div>
        <div className="product_detail_d_image">
          <img src={product.mdDetailImageUrl} alt="d-img"/>
        </div>
      </div>
    <Footer />
    </>
  );
};

export default ProductDetail;
