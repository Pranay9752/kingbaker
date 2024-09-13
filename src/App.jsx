import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetail from "./components/product_detail";
import CountryWrapper from "./molecules/wrappers/CountryWrapper";
import CheckOutLogin from "./components/product_detail/checkoutLogin";
import AddNewAddress from "./components/product_detail/AddAddress";


function App() {
  return (
    <div className="p-0">
      <Routes>
        <Route element={<CountryWrapper />}>
          <Route path="/gift/name" element={<ProductDetail />} />
          <Route path="/checkout/login" element={<CheckOutLogin />} />
          <Route path="/checkout/add-address" element={<AddNewAddress />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
