import generateBarcodeImage from "../../../atom/utils/barcode";
import boldfile from "../../../assets/fonts/Roboto-Regular.ttf";

// Font.register({
//   family: "Roboto",
//   fonts: [
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf",
//       fontWeight: 400,
//     }, // Regular
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu51xIIzc.ttf",
//       fontWeight: 400,
//       fontStyle: "italic",
//     }, // Italic
//     { src: boldfile, fontWeight: 700 }, // Bold
//   ],
// });
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register custom fonts if needed
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 20,
    fontFamily: "Roboto",
  },
  rotatedSection: {
    position: "absolute",
    left: -20,
    top: 30,
    width: 400,
    height: 20,
    transform: "rotate(-90deg)",
  },
  rotatedText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#333333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 20,
  },
  orderInfo: {
    fontSize: 6,
    marginBottom: 5,
  },
  recipientBox: {
    border: "1px solid #000000",
    padding: 5,
    marginBottom: 10,
  },
  recipientText: {
    fontSize: 6,
    marginBottom: 2,
  },
  senderInfo: {
    fontSize: 6,
    marginBottom: 10,
  },

  section: {
    marginBottom: 10,
  },
  border: {
    border: "1px solid black",
    padding: 10,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 11,
  },
  text: {
    marginBottom: 3,
    fontSize: 10,
  },
  disclaimer: {
    fontSize: 8,
    marginTop: 10,
  },
  barcode: {
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 8,
  },
});
const styles2 = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 20,
    border: "1px solid black",
  },
  section: {
    marginVertical: 3,
  },
  border: {
    border: "1px solid black",
    padding: 10,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    marginBottom: 2,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 5,
    border: "1px solid black",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    flexGrow: 1,
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  disclaimer: {
    fontSize: 8,
    marginTop: 5,
  },
  barcode: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
  },
  productImage: {
    width: 70,
    height: 70,
  },
  smallText: {
    fontSize: 9,
  },
  wrapText: {
    overflow: "hidden",
    // textOverflow: 'ellipsis',
  },
});

const BrandingChallanPDF = ({ data }) => (
  <Document>
    {data.map((orderData, index) => {
      const barcode = generateBarcodeImage("5638808902");
      return (
        <Page orientation="landscape" size="A4" style={styles.page}>
          <View style={[styles.rotatedSection, { height: "300px" }]}>
            <Text style={styles.rotatedText}>
              Happy Birthday,
              {`

                   `}{" "}
              my love! May you always find the courage and strength to pursue
              your dreams.
            </Text>
          </View>
          <View style={[{ marginLeft: 160, width: 250 }]}>
            <View style={styles.section}>
              <Text style={styles.text}>Order No : 5638808902</Text>
              <Text style={styles.text}>GST No : 07AAFEC7427K1ZH</Text>
              <Text style={styles.text}>CIN No : U52100DL2021PTC376303</Text>
            </View>

            <View
              style={[styles.section, styles.border, { borderRadius: "20px" }]}
            >
              <Text style={styles.header}>To : Ashu baliyani</Text>
              <Text style={styles.text}>
                House no. 3, Bhoura Kalan, Muzaffarnagar, UP
              </Text>
              <Text style={styles.text}>Muzaffarnagar, - 251319 India</Text>
              <Text style={styles.text}>M: 919958969549</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>Sender : Neeti</Text>
              <Text style={styles.text}>AWB No : (NONF-00419)</Text>
              <Text style={styles.text}>Weight : 1 kg</Text>
              <Text style={styles.text}>Dimension : 15 x 10 x 5 (in)</Text>
              <Text style={styles.text}>Delivery Date : 09-10-2024</Text>
              <Text style={styles.text}>Occasions : Birthday</Text>
              <Text style={styles.text}>Lead Days :</Text>
              <Text style={styles.text}>
                Del Area Name : Muzaffarnagar-os ECDA
              </Text>
            </View>

            <View style={styles.disclaimer}>
              <Text>
                Disclaimer: This packet contains a gift hence, value has not
                been disclosed on the packet.
              </Text>
              <Text>Invoice has been sent to the person who ordered.</Text>
              <Text>
                This is an electronically generated document, hence does not
                require signature.
              </Text>
            </View>

            <View style={styles.barcode}>
              <Image style={{ height: 20 }} src={barcode} />
              <Text>5638808902</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>
                Address : Estate, Ashram Marg, Mandi Road, Gadaipur, New
                Delhi-110030
              </Text>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              right: 30,
              width: 350,
              // marginLeft: "50px",
              fontSize: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles2.section}>
                <Text style={styles2.text}>Order No : 5638808902</Text>
                <Text style={styles2.text}>GST No : 07AAFEC7427K1ZH</Text>
                <Text style={styles2.text}>CIN No : U52100DL2021PTC376303</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  // paddingHorizontal: 5,
                  display: "flex",
                  flexDirection: "col",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  // backgroundColor: "pink",
                  height: 100,
                }}
              >
                <Image style={{ height: 30 }} src={barcode} />
                <Text style={styles.text}>5638808902</Text>
              </View>{" "}
            </View>

            {/* Delivery Information */}
            <View style={[styles2.section, styles2.border]}>
              <Text style={styles2.header}>Sender : Neeti</Text>
              <Text style={styles2.text}>Occasions : Birthday</Text>
              <Text style={styles2.text}>Lead Days : </Text>
              <Text style={styles2.text}>
                Del Area Name : muzaffarnagar-os ECDA
              </Text>
              <Text style={styles2.text}>Order Date : 05-10-2024</Text>
              <Text style={styles2.text}>Delivery Date : 09-10-2024</Text>
            </View>
            <View style={{ display: "flex", gap: 3 }}>
              {Array(5)
                .fill(0)
                .map((item) => (
                  <View
                    style={{
                      // width: 450,
                      borderRadius: 5,
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid #000",
                    }}
                  >
                    <View style={{ padding: 5 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={styles2.productImage}
                          src="https://images.pexels.com/photos/13574108/pexels-photo-13574108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text style={styles2.header}>
                            Product : Crunchy Butterscotch Cake Half Kg Eggless
                          </Text>
                          <Text style={styles2.smallText}>
                            Product Id : CAKE78132 SKU : EGFLACAKES19-044-A
                          </Text>
                          <Text style={styles2.smallText}>
                            Description : Cake Flavour - Butterscotch {"\n"}-
                            Version - Eggless {"\n"}- Type of Cake - Cream{" "}
                            {"\n"}- Weight - Half Kg {"\n"}- Shape - Round{" "}
                            {"\n"}- Serves - 4-6 People {"\n"}- Size - 6 inches
                            in Diameter {"\n"}- Candles & Knife Included {"\n"}
                          </Text>
                          <Text>Weight : 1/2 KG</Text>
                          <Text>Instruction : PROCEED WITH FRESH CAKE</Text>
                        </View>
                      </View>
                    </View>

                    {/* Table Component */}
                    <View style={styles2.table}>
                      <View style={[styles2.tableRow, styles2.tableHeader]}>
                        <View style={[styles2.tableCol, { width: 80 }]}>
                          <Text>ID</Text>
                        </View>
                        <View style={[styles2.tableCol, { width: 80 }]}>
                          <Text>SKU</Text>
                        </View>
                        <View style={[styles2.tableCol, { width: 80 }]}>
                          <Text>Name</Text>
                        </View>
                        <View style={[styles2.tableCol]}>
                          <Text>Qty</Text>
                        </View>
                      </View>

                      {/* First Row */}
                      <View style={styles2.tableRow}>
                        <View
                          style={[
                            styles2.tableCol,
                            styles2.wrapText,
                            { width: 80 },
                          ]}
                        >
                          <Text>CIDCA78132</Text>
                        </View>

                        <View
                          style={[
                            styles2.tableCol,
                            styles2.wrapText,
                            { width: 80 },
                          ]}
                        >
                          <Text>CIDEGFLACAKES19-044-A</Text>
                        </View>
                        <View
                          style={[
                            styles2.tableCol,
                            styles2.wrapText,
                            { width: 80 },
                          ]}
                        >
                          <Text>
                            Crunchy Butterscotch Cake- Half Kg Eggless
                          </Text>
                        </View>
                        <View style={[styles2.tableCol, styles2.wrapText]}>
                          <Text>1</Text>
                        </View>
                      </View>

                      {/* Second Row */}
                    </View>
                  </View>
                ))}
            </View>
            {/* Product Information */}

            {/* Page Number */}
          </View>
          <Text
            render={() => `${index + 1} of ${data?.length ?? 1}`}
            style={[
              {
                position: "absolute",
                bottom: 10,
                fontSize: 9,
                width: "100%",
                textAlign: "center",
                color: "black",
              },
            ]}
          />
        </Page>
      );
    })}
  </Document>
);

export default BrandingChallanPDF;
