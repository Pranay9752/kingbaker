import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetail from "./components/product_detail";
import CountryWrapper from "./molecules/wrappers/CountryWrapper";


function App() {
  return (
    <div className="p-0">
      <Routes>
        <Route element={<CountryWrapper />}>
          <Route path="/gift/name" element={<ProductDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
