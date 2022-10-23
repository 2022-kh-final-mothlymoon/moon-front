import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/Main';
import "./App.css"
import Notice from './pages/Notice';
import axios from "axios"
import NoticeDetail from './pages/NoticeDetail';

function App() {
  return (
    <>
      <Routes>

        <Route path="*" element={<h1>잘못된 경로입니다😕</h1>}/> {/* 404페이지 */}

        <Route path="/" element={<Main />}/>
        
        <Route path="/notice" element={<Notice />} />

        <Route path="/noticedetail" element={<NoticeDetail />} />

      </Routes>
    </>
  );
}

export default App;
