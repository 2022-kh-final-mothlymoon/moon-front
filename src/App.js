import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/manager/pages/Main';
import "./App.css"
import axios from "axios"
import Statics from "./components/manager/statics/Statics";
import Customer from "./components/manager/member/Member";
import Amd from "./components/manager/amd/Amd";
import Order from "./components/manager/order/Order";
import Board from "./components/manager/board/Board";
import Store from "./components/manager/store/Store";
import FindEmail from "./components/member/login/FindEmail";
import Cart from "./components/member/cart/Cart";
import LoginPage from "./components/member/login/LoginPage";
import Products from "./components/member/product/Products";
import ProductDetail from "./components/member/product/ProductDetail";

function App() {
  return (
    <>
      <Routes>

        <Route path="" element={<Main />}/>
        
        <Route path="/astatics" element={<Statics />}/>

        <Route path="/amember" element={<Customer />}/>
        
        <Route path="/amd" element={<Amd />} />

        <Route path="/aorder" element={<Order />} />

        <Route path="/aboard" element={<Board />} />

        <Route path="/astore" element={<Store />} />
      
        <Route path="/products" element={<Products/>} />

        <Route path="/product/:id" element={<ProductDetail/>} />
        
        <Route path="/cart" element={<Cart />} />

{/*         <Route path="/login" element={<LoginPage/>} /> */}

      </Routes>
    </>
  );
}

export default App;
