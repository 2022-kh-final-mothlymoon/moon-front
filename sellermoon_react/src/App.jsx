import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/member/main/Main";
import LoginPage from "./components/member/login/LoginPage";
import RegisterPage from "./components/member/register/RegisterPage";
import FindEmail from "./components/member/login/FindEmail";
import FindPass from "./components/member/login/FindPass";
import MyAccount from "./components/member/mypage/MyAccount";
import MyAccountM from "./components/member/mypage/MyAccountM";
import MyDelAccount from "./components/member/mypage/MyDelAccount";
import Notice from "./components/member/notice/Notice";
import NoticeDetail from "./components/member/notice/NoticeDetail";
import NoticeAdmin from "./components/manager/notice/NoticeAdmin";
import NoticeUpAdmin from "./components/manager/notice/NoticeUpAdmin";
import Faq from "./components/member/faq/Faq";
import FaqDetail from "./components/member/faq/FaqDetail";
import FaqAdmin from "./components/manager/faq/FaqAdmin";
import FaqUpAdmin from "./components/manager/faq/FaqUpAdmin";
import AdminLogin from "./components/manager/login/AdminLogin";
import { useState, useEffect } from "react";
import MemAdmin from "./components/manager/member/MemAdmin";
import MemAdminDetail from "./components/manager/member/MemAdminDetail";
import { pointlist } from './service/dbLogic';
import Point from './components/member/point/Point';
import Friends from './components/member/point/Friends';
import ChatLogin from './components/member/chat/ChatLogin';
import ChatMessage from './components/member/chat/ChatMessage';
import PointAdmin from './components/manager/point/PointAdmin';
import Subscription from './components/member/subscription/Subscription';


function App({ authLogic }) {
  let [no, setNo] = useState(0); // 회원 번호 담기 props로 넘겨주기 위함
  let [adminId, setAdminId] = useState(""); // 관리자 id담기 props로 넘겨주기 위함
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태 관리
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 권한 관리
  useEffect(() => {
    if (sessionStorage.getItem("user_no") !== null) {
      // session에 담긴 값이 null이 아닐때
      setNo(sessionStorage.getItem("user_no")); // user_no(회원번호) 가져옴
    }
  }, [no]);

  useEffect(() => {
    if (sessionStorage.getItem("user_no") !== null) {
      console.log("isLogin ===> ", isLogin);
      setIsLogin(true);
    } else if (sessionStorage.getItem("admin") !== null) {
      setIsAdmin(true);
      setIsLogin(true);
      console.log("isLogin ===> ", isLogin);
      console.log("isAdmin ===> ", isAdmin);
    } else {
      console.log("isLogin ===> ", isLogin);
      console.log("isAdmin ===> ", isAdmin);
    }
    console.log("useEffect 호출");
  }, [isLogin, isAdmin]);

  // 로그아웃
  const logout = () => {
    sessionStorage.clear();
    alert("로그아웃되었습니다.");
    window.location.reload();
  };

  
  /* **************************************************** */
  //pointList 데이터 가져오기 */

  const [pointList, setPointList] = useState([])

    useEffect(() => {
      const oracleDB = async () => {
        const result = await pointlist({member_no : no}) 
        //console.log(result)
        //console.log(result.data)
        setPointList(result.data)
      }
    oracleDB()
    }, [no])
/* **************************************************** */


  return (
    <>
      <Routes>
        <Route
          path="/"
          exact={true}
          element={
            <Main isAdmin={isAdmin} isLogin={isLogin} logout={logout} no={no} />
          }
        />
        <Route
          path="/login"
          exact={true}
          element={
            !isLogin ? (
              <LoginPage isLogin={isLogin} no={no} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/findemail"
          exact={true}
          element={
            !isLogin ? (
              <FindEmail isLogin={isLogin} logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/findpass"
          exact={true}
          element={
            !isLogin ? (
              <FindPass isLogin={isLogin} logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/mypage/profile"
          exact={true}
          element={
            isLogin ? (
              <MyAccount isLogin={isLogin} no={no} logout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/mypage/modifyprofile"
          exact={true}
          element={
            isLogin ? (
              <MyAccountM isLogin={isLogin} no={no} logout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/mypage/delmember"
          exact={true}
          element={
            isLogin ? (
              <MyDelAccount isLogin={isLogin} no={no} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register"
          exact={true}
          element={
            !isLogin ? <RegisterPage isLogin={isLogin} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/notice"
          element={<Notice isLogin={isLogin} />}
          exact={true}
        />
        <Route
          path="/notice/detail/:notice_no"
          element={<NoticeDetail />}
          exact={true}
        />
        <Route path="/faq" element={<Faq isLogin={isLogin} />} exact={true} />
        <Route
          path="/faq/detail/:faq_no"
          element={<FaqDetail isLogin={isLogin} />}
          exact={true}
        />
        
        <Route path="/mypage/point" element={<Point pointList={pointList} isLogin={isLogin}  no={no} />} exact={true} />

        <Route path="/mypage/friends" element={<Friends pointList={pointList} isLogin={isLogin} no={no} />} exact={true} />
        
        <Route path="/chat/login" element={<ChatLogin authLogic={authLogic} />} exact={true} />
        <Route path="/chat/chatroom/:userId" element={<ChatMessage authLogic={authLogic} />} exact={true} />
        
        <Route path="/mypage/subscription" element={<Subscription pointList={pointList} isLogin={isLogin} no={no} />} exact={true} />
        


        {/*************************  관리자 페이지 영역 *********************************************/}
        <Route
          path="/admin/login"
          element={
            !isAdmin ? (
              <AdminLogin isLogin={isLogin} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/" />
            )
          }
          exact={true}
        />
        <Route
          path="/admin/notice"
          element={<NoticeAdmin isLogin={isLogin} isAdmin={isAdmin} />}
          exact={true}
        />
        <Route
          path="/admin/notice/update/:notice_no"
          element={<NoticeUpAdmin isLogin={isLogin} isAdmin={isAdmin} />}
          exact={true}
        />
        <Route
          path="/admin/faq"
          element={<FaqAdmin isLogin={isLogin} isAdmin={isAdmin} />}
          exact={true}
        />
        <Route
          path="/admin/faq/update/:faq_no"
          element={<FaqUpAdmin isLogin={isLogin} isManage={isAdmin} />}
          exact={true}
        />
        <Route
          path="/admin/member"
          element={
            isAdmin &&
            (isAdmin ? (
              <MemAdmin isLogin={isLogin} isAdmin={isAdmin} />
            ) : (
              <Navigate to="/admin/login" />
            ))
          }
          exact={true}
        />
        <Route
          path="/admin/member/:member_no"
          element={<MemAdminDetail isLogin={isLogin} isAdmin={isAdmin} />}
          exact={true}
        />

      <Route path="/admin/point" element={<PointAdmin pointList={pointList} />} exact={true} />
      
      
      


      </Routes>
    </>
  );
}

export default App;
