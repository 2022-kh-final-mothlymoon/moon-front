import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductDetailAPI } from "../../../service/dbLogic";
import queryString from 'query-string'
import { useLocation } from "react-router-dom";

const ProductDetail = ({  }) => {
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const query = queryString.parse(location.search)
  const name = new URLSearchParams(location).get("no");
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
      <div className="product_detail_container">
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
        <div className="product_detail_image">
          <img src={product.mdImageUrl} alt="img"/>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
