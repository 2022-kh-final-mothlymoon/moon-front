import React from "react"; 
import { Route, Routes } from "react-router-dom";
import BoardList from "./components/admin/board/BoardList";

const App = () => {

  return (
    <>
      <Routes>
        <Route
          path="/"
          exact={true}
          element={<BoardList />}
        />
      </Routes>
    </>
  );
}

export default App;
