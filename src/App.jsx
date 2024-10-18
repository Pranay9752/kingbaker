import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetail from "./components/product_detail";
import CountryWrapper from "./molecules/wrappers/CountryWrapper";
import CheckOutLogin from "./components/product_detail/checkoutLogin";
import AddNewAddress from "./components/product_detail/AddAddress";
import { Toaster } from "sonner";
import Home from "./components/home";
import CheckOutDetails from "./components/product_detail/CheckOutDetails";
import ProductSearch from "./components/productListing";
import Login from "./components/account/login";
import MyAccount from "./components/accountProfile/MyAccount";
import AdminDashboard from "./components/admin/dashboard";
import PrivateRoute from "./routes/PrivateRoutes";
import AdminSales from "./components/admin/sales";
import BodyBackgroud from "./atom/utils/BodyBackgroud";
import OrderList from "./components/admin/order/VendorList";
import OrderDetailsCard from "./components/admin/order/OrderDetail";
import MyTicket from "./components/admin/order/MyTickets";
import DeliveryBoysManagement from "./components/admin/deliverer";
import CheckOutPayment from "./components/product_detail/CheckOutPayment";
import { useSelector } from "react-redux";
import MaintenancePage from "./atom/maintain";

function App() {

    // return <MaintenancePage />;

  return (
    <>
      {/* <TopNavbar /> */}
      <div className="bg-[#f2f2f2] trun">
        <Routes>
          <Route element={<CountryWrapper />}>
            <Route path="/account/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/account/details/:phase?" element={<MyAccount />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/checkout/account" element={<CheckOutLogin />} />
            <Route path="/checkout/add-address" element={<AddNewAddress />} />
            <Route path="/checkout/details" element={<CheckOutDetails />} />
            <Route path="/checkout/payment" element={<CheckOutPayment />} />
            <Route path="/search/:tag" element={<ProductSearch />} />
          </Route>

          <Route element={<BodyBackgroud color={"bg-[#2f2f2]"} />}>
            {/* ADMIN ROUTES */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/sales" element={<AdminSales />} />
            <Route
              path="/admin/order-list/:day/:type/:ids"
              element={<OrderList />}
            />
            <Route
              path="/admin/order-detail/:id"
              element={<OrderDetailsCard />}
            />
            <Route path="/admin/my-ticket" element={<MyTicket />} />
            <Route
              path="/admin/delivery-boy"
              element={<DeliveryBoysManagement />}
            />
          </Route>
        </Routes>
      </div>
      <Toaster duration={600} position="top-center" richColors />
    </>
  );
}

export default App;
