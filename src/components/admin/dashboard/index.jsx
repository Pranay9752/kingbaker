import { useEffect, useMemo, useState } from "react";
import NumberCard from "../../../molecules/cards/NumberCard";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import AccountsTable from "../sales/AccountsTable";
import NpsSection from "./NpsSection";
import StatusBoard from "./StatusBoard";
import boldfile from "../../../assets/fonts/Roboto-Regular.ttf";
import ReactPDF from "@react-pdf/renderer";
import BasicButton from "../../../atom/button/BasicButton";
import ChallanPDF from "../pdfs/challanPDF";
import BrandingChallanPDF from "../pdfs/brandingChallan";
import {
  useGetalloatedAndAcceptedOrderQuery,
  useGetOrdersMutation,
} from "../../../redux/apiSlices/admin/vendor";
import getCookie from "../../../atom/utils/getCookies";
import SEO from "../../../atom/seo/SEO";

const types = {
  order: 1,
  sales: 2,
};

function AdminDashboard() {
  const [type, setType] = useState("order");
  const [amount, setAmount] = useState(0);
  const { data, isLoading } = useGetalloatedAndAcceptedOrderQuery({
    vendor_id: getCookie('_id'),
  });
  const [getOrders] = useGetOrdersMutation();

  const todayOrders = useMemo(() => {
    if (!data) return 0;
    const order = Object.values(data?.data).reduce((prev, curr) => {
      return [...prev, ...curr?.today?.order_id];
    }, []);
    return order;
  }, [data]);

  useEffect(() => {
    const getData = () => {
      getOrders({ data: todayOrders }).then((res) => {
        const amt = res?.data?.reduce((prev, curr) => {
          let a = 0;
          curr?.addOn?.forEach((item) => {
            a += (item?.price ?? 0) * (item?.count?.count ?? 0);
          });
          return (
            prev +
            (curr?.shipping?.shipping_amount ?? 0) +
            (curr?.productDetails?.[0]?.prices ?? 0) + a
          );
        }, 0);
        setAmount(amt);
      });
    };
    if (todayOrders?.length > 0) {
      getData();
    }
  }, [todayOrders]);

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

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const orderData = {
      orderNo: "5638808902",
      gstNo: "07AAECF4247K1ZH",
      cinNo: "U52100DL2021PTC376303",
      recipient: {
        name: "Ashu baliyan",
        address:
          "House no. 3, bhourakalan, muzzafarnagar, UP, Muzaffarnagar, - 251319 India",
        mobile: "919958969549",
      },
      sender: "neeti",
      awbNo: "(NONF-00419)",
      weight: "1 kg",
      dimension: "15 x 10 x 5(in)",
      deliveryDate: "09-10-2024",
      occasions: "Birthday",
      delAreaName: "muzafarnagar-os_ECDA",
      product: {
        name: "Crunchy Butterscotch Cake Half Kg Eggless",
        id: "CAKE78132",
        sku: "EGFLACAKES19-044-A",
        description:
          "Cake Flavour- Butterscotch, Version- Eggless, Type of Cake- Cream, Weight- Half Kg, Shape- Round, Serves- 4-6 People, Size- 6 inches in Diameter, Candles & Knife Included",
        quantity: "1",
      },
      additionalProduct: {
        name: "Magic Relighting Candle",
        id: "CAKE76690",
        sku: "CAKEADDON001",
        description: "Magic Relighting Candle",
        quantity: "1",
      },
    };
    const blob = await ReactPDF.pdf(
      <BrandingChallanPDF data={[orderData, orderData]} />
    ).toBlob();

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "TAX INVOICE.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <HeaderLayout
        id={types[type]}
        logoSrc="https://i.ibb.co/LdtMrSfq/jojo-cart-logo-02.png"
        logoAlt="King Baker Logo"
        title="KING BAKER"
      >
      <SEO title={'Dashboard'} />

        <NpsSection />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumberCard
            title="Sales Today"
            value={`₹ ${amount ?? 0}`}
            textColor="text-electric"
            active={type == "sales"}
            onClick={() => setType("sales")}
          />
          <NumberCard
            title="Orders Today"
            value={todayOrders?.length ?? 0}
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
      {/* <BasicButton onClick={handleDownload}>DOWNLOAD</BasicButton> */}
    </div>
  );
}

export default AdminDashboard;
