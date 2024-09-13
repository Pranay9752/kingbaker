import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetail from "./components/product_detail";
import CountryWrapper from "./molecules/wrappers/CountryWrapper";
import CheckOutLogin from "./components/product_detail/checkoutLogin";
import AddNewAddress from "./components/product_detail/AddAddress";
import TopNavbar from "./molecules/header/MainNavbar";
import { Toaster } from "sonner";
import Home from "./components/home";
import CheckOutDetails from "./components/product_detail/CheckOutDetails";
import ProductSearch from "./components/productListing";

function App() {
  return (
    <>
      {/* <TopNavbar /> */}
      <div className="">
        <Routes>
          <Route element={<CountryWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/checkout/account" element={<CheckOutLogin />} />
            <Route path="/checkout/add-address" element={<AddNewAddress />} />
            <Route path="/checkout/details" element={<CheckOutDetails />} />
            <Route path="/search/" element={<ProductSearch />} />
          </Route>
        </Routes>
      </div>
      <Toaster duration={600} position="top-center" richColors />
    </>
  );
}

export default App;
