import { useState } from "react";
import NumberCard from "../../../molecules/cards/NumberCard";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import AccountsTable from "../sales/AccountsTable";
import NpsSection from "./NpsSection";
import StatusBoard from "./StatusBoard";


import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register custom font (you'll need to provide the actual font file)
Font.register({
  family: 'Roboto',
  src: 'path/to/Roboto-Regular.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Roboto',
    marginBottom: 20,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Roboto',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

// Create Document Component
const ChallanPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Delivery Challan</Text>
        
        <View style={styles.section}>
          <Text style={styles.heading}>Deliver To:</Text>
          <Text style={styles.text}>Manish Sarkar</Text>
          <Text style={styles.text}>swagatadatta2013@gmail.com</Text>
          <Text style={styles.text}>Muzaffarnagar Medical College and Hospital, Muzaffarnagar, UP, India</Text>
          <Text style={styles.text}>Muzaffarnagar - 251203</Text>
          <Text style={styles.text}>India</Text>
          <Text style={styles.text}>M: 917005661692</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.text}>Order #: 5608627601</Text>
          <Text style={styles.text}>Order Date: 23-09-2024</Text>
          <Text style={styles.text}>Delivery Date: 08-10-2024</Text>
          <Text style={styles.text}>Shipping: Standard-Delivery</Text>
          <Text style={styles.text}>Time: 07:00:00 - 20:00:00</Text>
          <Text style={styles.text}>DelAreaName: muzafarnagar-os_ECDA</Text>
        </View>
        
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product Image</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Quantity</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>[Image Placeholder]</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Chocolate Cream Cake Half kg Eggless</Text>
              <Text style={styles.tableCell}>CAKE55181</Text>
              <Text style={styles.tableCell}>EGREGCAKE06A</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Weight 1/2 KG</Text>
              <Text style={styles.tableCell}>Cake Flavour- Chocolate</Text>
              <Text style={styles.tableCell}>Version- Eggless</Text>
              <Text style={styles.tableCell}>Type of Cake - Cream</Text>
              <Text style={styles.tableCell}>Shape- Round</Text>
              <Text style={styles.tableCell}>Serves- 4-6 People</Text>
              <Text style={styles.tableCell}>Candles & Knife Included</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>[Image Placeholder]</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Magic Relighting Candle</Text>
              <Text style={styles.tableCell}>CAKE76690</Text>
              <Text style={styles.tableCell}>CAKEADDON001</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Magic Relighting Candle</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.heading}>Cake Message:</Text>
          <Text style={styles.text}>Happy Birthday Manish</Text>
          
          <Text style={styles.heading}>Occasion:</Text>
          <Text style={styles.text}>Birthday</Text>
          
          <Text style={styles.heading}>Gift Message:</Text>
          <Text style={styles.text}>May your birthday be sweet as chocolates, fragrant as flowers and awesome as you are!</Text>
          <Text style={styles.text}>Sending you loads of hugs, love and best wishes on your special day! Happy Birthday Love ...see you soon</Text>
          
          <Text style={styles.heading}>Sender:</Text>
          <Text style={styles.text}>Swagata</Text>
        </View>
      </View>
    </Page>
  </Document>
);





















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
        <PDFViewer width="1000" height="600">
      <ChallanPDF />
    </PDFViewer>
        {renderType()}
        
      </HeaderLayout>
    </div>
  );
}

export default AdminDashboard;
