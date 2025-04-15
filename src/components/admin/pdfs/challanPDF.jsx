import generateBarcodeImage from "../../../atom/utils/barcode";
import boldfile from "../../../assets/fonts/Roboto-Regular.ttf";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import formatDate from "../../../atom/utils/formatDate";
// Register a font (Make sure to self-host or use a valid TTF URL)

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf",
      fontWeight: 400,
    }, // Regular
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu51xIIzc.ttf",
      fontWeight: 400,
      fontStyle: "italic",
    }, // Italic
    { src: boldfile, fontWeight: 700 }, // Bold
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    // border: '1px solid #000',
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Roboto",
    marginBottom: 20,
    borderBottom: "1px solid black",
  },
  heading: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Roboto",
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
    fontFamily: "Roboto",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    marginTop: 5,
    fontSize: 10,
  },
});

const ChallanPDF = ({ data = [] }) => {
  return (
    <Document>
      {data?.map((item, index) => {
        // console.log("item: ", item);
        const deliveryAddress = item?.deliveryAddresses?.[0] ?? {};
        const addOn = item?.addOn;
        const shipping = item?.shipping ?? {};

        const productDetails = item?.productDetails?.[0];
        const barcode = generateBarcodeImage(item?.order_id ?? "");
        const username = item?.user?.[0]?.name ?? "";
        return (
          <Page size="A4" style={styles.page}>
            <View style={{ ...styles.section, border: "1px solid #000" }}>
              <View>
                <Image
                  style={{ height: "50px", width: "150px" }}
                  src={
                    "https://i.ibb.co/b5GBCFpx/jojo-cart-logo-updated-05.png"
                  }
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ ...styles.section }}>
                  <Text style={styles.heading}>Deliver To:</Text>
                  <Text style={styles.text}>
                    {deliveryAddress?.recipientName ?? ""}
                  </Text>
                  <Text style={styles.text}>
                    {deliveryAddress?.alternateEmail ?? ""}
                  </Text>
                  <Text style={styles.text}>
                    {deliveryAddress?.recipientAddress ?? ""}
                  </Text>
                  <Text style={styles.text}>
                    {deliveryAddress?.area ?? ""} -{" "}
                    {deliveryAddress?.pincode ?? ""}
                  </Text>
                  <Text style={styles.text}>
                    {deliveryAddress?.country ?? ""}
                  </Text>
                  <Text style={styles.text}>
                    M: {deliveryAddress?.recipientMobnumber ?? ""}
                  </Text>
                </View>

                {/* Order Details */}
                <View style={{ ...styles.section }}>
                  <Text style={styles.text}>
                    <Text style={styles.heading}>Order #:</Text>{" "}
                    {item?.order_id}
                  </Text>
                  {/* <Text style={styles.text}>
                    <Text style={styles.heading}>Order Date:</Text> {item?.order_id}
                  </Text> */}
                  <Text style={styles.text}>
                    <Text style={styles.heading}>Delivery Date:</Text>{" "}
                    {formatDate(shipping?.delivery_date)}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.heading}>Shipping:</Text>{" "}
                    {shipping?.methods ?? ""}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.heading}>Time:</Text>{" "}
                    {shipping?.time ?? ""}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.heading}>DelAreaName:</Text>
                    {deliveryAddress?.area ?? ""}
                  </Text>
                </View>
              </View>
              {/* Deliver To Section */}

              {/* Product Table */}
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={{ ...styles.tableCol, width: "15%" }}>
                    <Text style={styles.tableCell}>Product Image</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Product</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "50%" }}>
                    <Text style={styles.tableCell}>Product Description</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "10%" }}>
                    <Text style={styles.tableCell}>Quantity</Text>
                  </View>
                </View>

                {/* Product 1 */}
                <View style={styles.tableRow}>
                  <View
                    style={{ ...styles.tableCol, padding: "5px", width: "15%" }}
                  >
                    <Image
                      style={{ aspectRatio: "1/1", borderRadius: "5px" }}
                      src={
                        "data:image/jpeg;base64,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"
                      }
                    />
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {productDetails?.title ?? ""}
                    </Text>
                    <Text style={styles.tableCell}>
                      {productDetails?.productId ?? ""}
                    </Text>
                    <Text style={styles.tableCell}>
                      {productDetails?.specification ?? ""}
                    </Text>

                    <Text
                      style={{
                        ...styles.text,
                        border: "1px solid #000",
                        padding: 5,
                        alignSelf: "flex-start",
                        marginHorizontal: "auto",
                        marginTop: "auto",
                      }}
                    >
                      <Text style={styles.heading}>Weight:</Text>{" "}
                      {productDetails?.product_details?.weight ?? ""}
                    </Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "50%" }}>
                    <Text style={styles.tableCell}>
                      Weight: {productDetails?.product_details?.weight ?? ""}
                    </Text>
                    <Text style={styles.tableCell}>
                      Cake Flavour: {productDetails?.specification ?? ""}
                    </Text>
                    <Text style={styles.tableCell}>
                      Version:{" "}
                      {productDetails?.product_details?.eggless
                        ? "Eggless"
                        : "With Egg"}
                    </Text>
                    <Text style={styles.tableCell}>
                      Type: {productDetails?.tags?.join(",") ?? ""}
                    </Text>
                    <Text style={styles.tableCell}>Shape: Round</Text>
                    <Text style={styles.tableCell}>Serves: 4-6 People</Text>
                    <Text style={styles.tableCell}>
                      Candles & Knife Included
                    </Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "10%" }}>
                    <Text style={styles.tableCell}>1</Text>
                  </View>
                </View>

                {/* Product 2 */}
                {addOn?.length > 0 &&
                  addOn?.map((addon) => {
                    console.log("addon: ", addon);

                    return (
                      <View style={styles.tableRow}>
                        <View
                          style={{
                            ...styles.tableCol,
                            padding: "5px",
                            width: "15%",
                          }}
                        >
                          <Image
                            style={{
                              aspectRatio: "1/1",
                              borderRadius: "5px",
                              width: "40px",
                            }}
                            src={
                              "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg"
                              // addon?.images?.length > 0
                              //   ? addon?.images?.[0]
                              //   : "data:image/jpeg;base64,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"
                            }
                          />
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {addon?.title ?? ""}
                          </Text>
                          <Text style={styles.tableCell}>
                            {" "}
                            {addon?.addOn_id ?? ""}
                          </Text>
                          <Text style={styles.tableCell}>
                            {" "}
                            {addon?.category ?? ""}
                          </Text>
                        </View>
                        <View style={{ ...styles.tableCol, width: "50%" }}>
                          <Text style={styles.tableCell}>
                            {addon?.description ?? ""}
                          </Text>
                        </View>
                        <View style={{ ...styles.tableCol, width: "10%" }}>
                          <Text style={styles.tableCell}>
                            {addon?.count?.count ?? 0}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </View>

              {/* Messages */}
              <View
                style={[
                  styles.section,
                  { display: "flex", flexDirection: "column", gap: 14 },
                ]}
              >
                {/* <Text style={styles.heading}>
                  Cake Message:
                  {`
              `}
                  <Text
                    style={{
                      ...styles.text,
                      fontStyle: "italic",
                      fontSize: 12,
                      marginLeft: 20,
                    }}
                  >
                    {`      `}Happy Birthday Mr. Baliyan
                  </Text>
                </Text>

                <Text style={styles.text}>
                  <Text style={styles.heading}>Occasion:</Text> Birthday
                </Text>

                <Text style={styles.heading}>
                  Gift Message:
                  {`
              `}
                  <Text
                    style={{
                      ...styles.text,
                      fontStyle: "italic",
                      fontSize: 12,
                      marginLeft: 20,
                    }}
                  >
                    {`      `}Happy Birthday, my love! May you always find the
                    courage and strength to pursue your dreams.
                  </Text>
                </Text> */}

                <Text style={styles.heading}>
                  Sender: <Text style={styles.text}>{username}</Text>
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  // paddingHorizontal: 5,
                  display: "flex",
                  flexDirection: "col",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  // backgroundColor: "pink",
                  height: 100,
                }}
              >
                <Image style={{ height: 50 }} src={barcode} />
                <Text style={styles.text}>{item?.order_id ?? ""}</Text>
              </View>
            </View>
            <Text
              render={() => `${index + 1} of ${data.length}`}
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
};

export default ChallanPDF;
