import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductAPI } from "../../../service/dbLogic";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);
 
  const getProduct = async () => {
    await getAllProductAPI().then((res) => {
      if (res.data === null) {
        return () => {};
      } else {
        setProducts(res.data);
      }
    });
  };
  useEffect(() => {
    console.log("useEffet 호출");
   
    getProduct();
  }, []);
  return (
    <>
    <div className="product_list_container">
      {products.length > 0
            ? products.map(p => (
              <div className="product_list_wrap">
                <Product p={p} key={p.mdNo} />
                </div>
              ))
            : '결과 없음'}
     </div>
    </>
  );
};

export default Products;
