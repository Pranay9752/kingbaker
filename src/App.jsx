import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ProductDetail from "./components/product_detail";
import CountryWrapper from "./molecules/wrappers/CountryWrapper";
import CheckOutLogin from "./components/product_detail/checkoutLogin";
import AddNewAddress from "./components/product_detail/AddAddress";
import { Toaster } from "sonner";
import Home from "./components/home";
import CheckOutDetails from "./components/product_detail/CheckOutDetails";
import ProductSearch from "./components/productListing/index.jsx";
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
import OwnerTickets from "./components/owner/tickets";
import OwnerOrders from "./components/owner/orders";
import OwnerVendors from "./components/owner/vendors";
import Landing from "./components/owner/landing";
import BecomeAPartner from "./components/partner/partner.jsx";
import ContactUs from "./components/contactus/contackus.jsx";
import OwnerProducts from "./components/owner/products/index.jsx";
import PaymentStatus from "./components/product_detail/PaymentStatus.jsx";
import POSTHandler from "./components/product_detail/PaymentHandler.jsx";

function App() {
  //   // return <MaintenancePage />;
  window.global = window;
  return (
    <>
      {/* <TopNavbar /> */}
      <div className="bg-white md:bg-[#f2f2f2] trun">
        <Routes>
          <Route element={<CountryWrapper />}>
            <Route path="/account/login" element={<Login />} />
            <Route path="/become-a-partner" element={<BecomeAPartner />} />
            <Route path="/contact-us" element={<ContactUs />} />
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
            <Route path="/status/:taxId" element={<PaymentStatus />} />
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

        {/* Owner Routes */}
        <Routes element={<BodyBackgroud color={"bg-black"} />}>
          <Route path="/owner/vendors" element={<OwnerVendors />} />
          <Route path="/owner/tickets" element={<OwnerTickets />} />
          <Route path="/owner/products" element={<OwnerProducts />} />
          <Route path="/owner/orders" element={<OwnerOrders />} />
          <Route path="/owner/bulk-update" element={<OwnerBulkUpdate />} />
          <Route path="/owner/landing" element={<Landing />} />
          <Route path="/test" element={<TestComp />} />
        </Routes>
      </div>
      <Toaster duration={3000} position="top-center" richColors />
    </>
  );
}

export default App;

import * as XLSX from "xlsx";
import { useState } from "react";
import OwnerBulkUpdate from "./components/owner/bulk-update/index.jsx";

const TestComp = () => {
  const [excelData, setExcelData] = useState(null);

  const getProductData = (data) => {
    const product_details = {
      prices: "",
      pp: "",
      imageLink: [],
      title: "",
      description: "",
      specifications: "",
      details: [],
      amenities: { Delivery: "" },
      event: [],
      rating: 1,
      reviews: [{ user_id: "", reviews: "" }],
      tags: [],
      weight: [],
      brand: "",
      color: "",
      is_veg: true,
      is_image: true,
      is_message: true,
    };
  
    data?.forEach((element) => {
      if (element["Title"]) {
        Object.assign(product_details, {
          title: element["Title"],
          prices: element["Price"],
          pp: element["pp"],
          specifications: element["Specifications"],
          is_veg: element["Is_Veg"],
          is_image: element["Is_Image"],
          is_message: element["Is_Message"],
          brand: element["Brand"],
          tags: element["Tags"]?.split(",") || [],
          event: element["events"]?.split(",") || [],
        });
      }
  
      if (element["Image Links"]) product_details.imageLink.push(element["Image Links"]);
  
      if (element["detail_key"] && element["detail_value"]) {
        product_details.details.push({
          key: element["detail_key"],
          value: element["detail_value"],
        });
      }
  
      if (element["weight"]) {
        const weightEntry = {
          weight: element["weight"],
          price: element["weight_price"],
          images: element["weight_image"] ? [element["weight_image"]] : [],
        };
        product_details.weight.push(weightEntry);
      } else if (element["weight_image"] && product_details.weight.length > 0) {
        // Ensure the last weight entry exists before pushing an image
        product_details.weight[product_details.weight.length - 1].images.push(element["weight_image"]);
      }
    });
  
    return product_details;
  };
  
  const arrangeData = (data) => {
    const groupedData = data.reduce(
      (acc, item) => {
        if (item["Title"]) acc.index++;
        acc.result[acc.index] = [...(acc.result[acc.index] || []), item];
        return acc;
      },
      { result: {}, index: 0 }
    ).result;
  
    return Object.values(groupedData).map(getProductData);
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      // Read the file as a binary string
      const binaryString = event.target.result;

      // Parse the Excel file
      const workbook = XLSX.read(binaryString, { type: "binary" });

      // Get the first sheet name
      const worksheetName = workbook.SheetNames[0];

      // Get the first worksheet
      const worksheet = workbook.Sheets[worksheetName];

      // Convert worksheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const products = arrangeData(jsonData);
      console.log(products)
      // Set the parsed data in state
    };

    // Read the file as a binary string
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Excel File Reader</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4 block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />

      {excelData && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Excel Data:</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-64">
            {JSON.stringify(excelData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
