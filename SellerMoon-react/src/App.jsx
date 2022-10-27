import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AdminBoardDetail from "./components/admin/board/AdminBoardDetail";
import AdminBoardList from "./components/admin/board/AdminBoardList";
import MemberBoardList from "./components/member/board/MemberBoardList";
import MemberBoardDetail from "./components/member/board/MemberBoardDetail";
import MemberBoardInsert from "./components/member/board/MemberBoardInsert";

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
          path="/member/board/boardInsert"
          exact={true}
          element={<MemberBoardInsert />}
        />
      </Routes>
    </>
  );
}

export default App;
