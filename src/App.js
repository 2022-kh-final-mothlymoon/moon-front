import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import axios from "axios"
import { useEffect, useState } from "react";
import Main from './components/member/main/Main';
import Notice from './components/member/notice/Notice';
import NoticeDetail from './components/member/notice/NoticeDetail';
import NoticeAdmin from './components/manager/notice/NoticeAdmin';
import NoticeUpAdmin from './components/manager/notice/NoticeUpAdmin';
import Faq from './components/member/faq/Faq';
import FaqDetail from './components/member/faq/FaqDetail';
import FaqAdmin from './components/manager/faq/FaqAdmin';
import FaqUpAdmin from './components/manager/faq/FaqUpAdmin';
import Point from './components/member/point/Point';
import { pointlist } from './service/dbLogic';


function App() {

const [pointList, setPointList] = useState([])

/* **************************************************** */
/* ###################### 로그인정보 member_id 값 필요 ########################### */
  ///pointList 데이터 가져오기 */
    useEffect(() => {
      const oracleDB = async () => {
        //const result = await jsonDeptList({ DEPTNO: 30 }) -> 스프링콘솔에 com.example.demo.dao.DeptDao  : pMap : {DEPTNO=30}
        const result = await pointlist({member_no : 101}) // 상수로 넣어둠
        console.log(result)
         //console.log(result.data[3])
        setPointList(result.data)
      }
    oracleDB()
    }, [])
/* **************************************************** */


  return (
    <>
      <Routes>

        <Route path="*" element={<h1>잘못된 경로입니다😕</h1>}/> {/* 404페이지 */}

        <Route path="/" element={<Main />} exact={true} />
        
        <Route path="/notice" element={<Notice />} exact={true} />
        <Route path="/notice/detail/:notice_no" element={<NoticeDetail />} exact={true} />
        <Route path="/admin/notice" element={<NoticeAdmin />} exact={true} />
        <Route path="/admin/notice/update/:notice_no" element={<NoticeUpAdmin />} exact={true} />
      
        <Route path="/faq" element={<Faq />} exact={true} />
        <Route path="/faq/detail/:faq_no" element={<FaqDetail />} exact={true} />
        <Route path="/admin/faq" element={<FaqAdmin />} exact={true} />
        <Route path="/admin/faq/update/:faq_no" element={<FaqUpAdmin />} exact={true} />
        
        <Route path="/mypage/point" element={<Point pointList={pointList} />} exact={true} />


      </Routes>
    </>
  );
}

export default App;