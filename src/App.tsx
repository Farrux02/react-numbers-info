import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AnswerPage from "./pages/AnswerPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/answer" element={<AnswerPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
