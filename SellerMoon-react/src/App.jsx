import React from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import pictureUpload from "./service/pictureUpload";
import AdminBoardDetail from "./components/manager/board/AdminBoardDetail";
import AdminBoardList from "./components/manager/board/AdminBoardList";
import MemberBoardList from "./components/member/board/MemberBoardList";
import MemberBoardDetail from "./components/member/board/MemberBoardDetail";
import MemberBoardForm from "./components/member/board/MemberBoardForm";
import MemberBoardEditForm from "./components/member/board/MemberBoardEditForm";
import MemberSendMemoList from "./components/member/memo/MemberSendMemoList";
import MemberReceiveMemoList from "./components/member/memo/MemberReceiveMemoList";

// 화면 구성 router 추가하기 (http://localhost:3000/ + )
const App = () => {
  return (
    <>
      <Routes>
        {/* 관리자 주소 */}
        <Route
          path="/admin/board/boardList"
          exact={true}
          element={<AdminBoardList />}
        />
        <Route 
          path="/admin/board/boardDetail/:board_no"
          exact={true}
          element={<AdminBoardDetail />}
        />

        {/* 회원 주소 */}
        <Route 
          path="/member/board/boardList"
          exact={true}
          element={<MemberBoardList />}
        />
        <Route 
          path="/member/board/boardDetail/:board_no"
          exact={true}
          element={<MemberBoardDetail />}
        />
        <Route
          path="/member/board/boardForm"
          exact={true}
          element={<MemberBoardForm pictureUpload={pictureUpload} /> }
        />
        <Route
          path="/member/board/boardEditForm/:board_no"
          exact={true}
          element={<MemberBoardEditForm />}
        />
        <Route
          path="/member/memo/receiveMemoList"
          exact={true}
          element={<MemberReceiveMemoList />}
        />
        <Route
          path="/member/memo/sendMemoList"
          exact={true}
          element={<MemberSendMemoList />}
        />
      </Routes>
    </>
  );
}

export default App;
