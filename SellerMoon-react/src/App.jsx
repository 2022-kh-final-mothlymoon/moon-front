import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import BoardDetail from "./components/admin/board/BoardDetail";
import BoardList from "./components/admin/board/BoardList";

// 화면 구성 router 추가하기 (http://localhost:3000/ + )
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admin/board/boardList"
          exact={true}
          element={<BoardList />}
        />
        <Route 
          path="/admin/board/boardDetail/:board_no"
          exact={true}
          element={<BoardDetail />}
        />
      </Routes>
    </>
  );
}

export default App;
