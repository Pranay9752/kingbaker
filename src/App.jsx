import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetail from "./components/product_detail";

function App() {
  return (
    <div className="p-0">
      <Routes>
        <Route path="/gift/name" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
