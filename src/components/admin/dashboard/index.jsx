import { useState } from "react";
import NumberCard from "../../../molecules/cards/NumberCard";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import AccountsTable from "../sales/AccountsTable";
import NpsSection from "./NpsSection";
import StatusBoard from "./StatusBoard";

const types = {
  order: 1,
  sales: 2,
};

function AdminDashboard() {
  const [type, setType] = useState("order");

  const accounts = [
    { name: "My Receivable", count: 1, amount: 360 },
    { name: "My Orders", count: 0, amount: 0 },
    { name: "Gross Receivable", count: null, amount: 360 },
    { name: "SLA Eligibility", count: null, amount: -9 },
  ];
  const renderType = () => {
    if (type == "order") {
      return (
        <>
          <StatusBoard />
        </>
      );
    } else if (type == "sales") {
      return (
        <>
          <AccountsTable accounts={accounts} />
        </>
      );
    }
  };

  return (
    <div>
      <HeaderLayout
        id={types[type]}
        logoSrc="https://i.ibb.co/NYGqQxs/Screenshot-20240915-192128-Drive.jpg"
        logoAlt="King Baker Logo"
        title="KING BAKER"
      >
        {/* <DateRangeOneFilter handleDateChange={(date) => console.log(date)} /> */}
        <NpsSection />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumberCard
            title="Sales Today"
            value="30"
            textColor="text-electric"
            active={type == "sales"}
            onClick={() => setType("sales")}
          />
          <NumberCard
            title="Orders Today"
            value="20"
            textColor="text-neon"
            active={type == "order"}
            onClick={() => setType("order")}
          />
          <NumberCard
            title="SLA"
            value="COMING SOON"
            textColor="text-electric"
          />
        </div>
        {renderType()}
        
      </HeaderLayout>
    </div>
  );
}

export default AdminDashboard;
