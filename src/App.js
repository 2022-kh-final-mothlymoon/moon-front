import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/Main';
import "./App.css"
import Notice from './pages/Notice';
import axios from "axios"
import NoticeDetail from './pages/NoticeDetail';
import NoticeAdmin from './pages/NoticeAdmin';
import NoticeUpAdmin from './pages/NoticeUpAdmin';
import Faq from './pages/Faq';

function App() {


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
      </Routes>
    </>
  );
}

export default App;