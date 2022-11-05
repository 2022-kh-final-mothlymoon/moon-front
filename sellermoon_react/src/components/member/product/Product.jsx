import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const Product = ({p}) => {
  const [product, setProduct] = useState([]);

const navigate = useNavigate();

  useEffect(() => {
    setProduct(p)
  }, [p]);

 const details = (e) => {
  console.log(e);
  //navigate(`/product/detail?no=${e}`)
 // history.push(`/product/detail?n=${e}`)
 }


  return (
    <>
      <div className="product_container">
      <div className="product_brand">{product.mdBrand}</div>
      <div className="product_category">{product.mdCategory}</div>
      <div className="product_name">{product.mdName}</div>
      <div className="product_content">{product.mdContent}</div>
      <div className="product_cost">{product.mdCost}</div>
      <div className="product_price">{product.mdPrice}</div>
      <div className="product_dc">{product.mdDiscount}</div>
      <div className="product_amount">{product.stAmout}</div>
      <div className="product_d_image">
        <img src={product.mdDetailImageUrl} alt="d-img"/>
      </div>
      <div className="product_image">
        <img src={product.mdImageUrl} alt="img"/>
      </div>
      <button onClick={details(product.mdNo)} >details</button>
     </div>
    </>
  );
};

export default Product;
