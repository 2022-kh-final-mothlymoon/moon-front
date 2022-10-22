import { Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import "./App.css"

function App() {
  return (
    <>
      <Routes>

        <Route path="*" element={<h1>잘못된 경로입니다😕</h1>}/> {/* 404페이지 */}

        <Route path="/" element={<Main />}/>
        
      </Routes>
    </>
  );
}

export default App;
