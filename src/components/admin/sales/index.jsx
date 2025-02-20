import SEO from "../../../atom/seo/SEO";
import NumberCard from "../../../molecules/cards/NumberCard";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import NpsSection from "../dashboard/NpsSection";
import AccountsTable from "./AccountsTable";

function AdminSales() {

  const accounts = [
    { name: "My Receivable", count: 1, amount: 360 },
    { name: "My Orders", count: 0, amount: 0 },
    { name: "Gross Receivable", count: null, amount: 360 },
    { name: "SLA Eligibility", count: null, amount: -9 },
  ];
  return (
    <div>
      <HeaderLayout
        id={2}
        logoSrc="https://i.ibb.co/LdtMrSfq/jojo-cart-logo-02.png"
        logoAlt="King Baker Logo"
        title="KING BAKER"
      >
      <SEO title={'Sales'} />

        {/* <DateRangeOneFilter handleDateChange={(date) => console.log(date)} /> */}
        <NpsSection />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <NumberCard
            title="Sales Today"
            value="30"
            textColor="text-electric"
            active
          />
          <NumberCard title="Orders Today" value="20" textColor="text-neon" />
          <NumberCard
            title="SLA"
            value="COMING SOON"
            textColor="text-electric"
          />
        </div>

        <AccountsTable accounts={accounts} />
      </HeaderLayout>
    </div>
  );
}

export default AdminSales;
