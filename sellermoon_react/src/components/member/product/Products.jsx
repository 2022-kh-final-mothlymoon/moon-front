import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductAPI} from "../../../service/dbLogic";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  
  // 페이징, 소팅, 카테고라이징
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('전체')
  const [sort, setSort] = useState('판매순')

  // 모든 상품 불러오기 
  const getProduct = async () => {
    const data = {
      page : page,
      category : category,
      sort : sort
    }
    await getAllProductAPI(data).then((res) => {
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
      <Header />
      <div className="body_container">
        {products && products.length > 0
              ? products.map(p => (
                <div className="product_list_wrap" key={p.mdNo}>
                  <Product p={p}/>
                  </div>

                ))
              : '결과 없음'}
      </div>
      <Footer />
    </>
  );
};

export default Products;
