import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCarts } from "../../../service/dbLogic";

const Cart = () => {
  const [cart, setCart] = useState({

  });


  const getCartsData = async () => {
    await getAllCarts().then((res) => {
      if (res.data === null) {
        return () => {};
      } else {
        //setMemInfo(res.data);
        console.log(res);
       // console.log(res.data);
      }
    });
  };

  useEffect(() => {
    console.log("useEffet 호출");
    getCartsData();

  }, []);
  return (
    <>
    <div>
      
    </div>
    </>
  );
};

export default Cart;
