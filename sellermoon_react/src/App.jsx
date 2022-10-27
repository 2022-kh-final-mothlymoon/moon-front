import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/views/_member/login/LoginPage";
import RegisterPage from "./components/views/_member/register/RegisterPage";
import Test from "./components/views/_member/register/Test";
import FindEmail from "./components/views/_member/login/FindEmail";
import FindPass from "./components/views/_member/login/FindPass";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" exact={true} element={<LoginPage />} />
        <Route path="/findemail" exact={true} element={<FindEmail />} />
        <Route path="/findpass" exact={true} element={<FindPass />} />
        <Route path="/register" exact={true} element={<RegisterPage />} />
        <Route path="/" exact={true} element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
