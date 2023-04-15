import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Article from "./Pages/Article/Article";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:id" element={<Article />} />
    </Routes>
  );
}

export default App;
