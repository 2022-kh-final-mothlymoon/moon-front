import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/views/_member/login/LoginPage";
import RegisterPage from "./components/views/_member/register/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/monthlymoon/login" exact={true} element={<LoginPage />} />
        <Route
          path="/monthlymoon/register"
          exact={true}
          element={<RegisterPage />}
        />
      </Routes>
    </>
  );
}

export default App;
