import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// Define your PDF document
const styles = StyleSheet.create({
  page: { backgroundColor: "#f0f0f0" },
  title: { color: "green", textAlign: "center", margin: 20, fontSize: 30 },
  subtitle: { color: "black", textAlign: "center", margin: 20, fontSize: 20 },
  donor: { color: "black", fontSize: 15, marginLeft: 50, marginTop: 25 },
  ngo: { color: "black", marginTop: 25, marginLeft: 50, fontSize: 15 },
  donation_details: {
    color: "black",
    marginTop: 25,
    marginLeft: 50,
    fontSize: 15,
  },
  donatedItems: { color: "black", marginTop: 10, marginLeft: 55, fontSize: 15 },
  item_container: { display: "flex" },
  item: { flex: 1 },
});
const MyDocument = (prp) => {
  const props = prp.prp;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>DaanNetwork</Text>
        </View>
        <View style={styles.subtitle}>
          <Text>Donation Receipt</Text>
        </View>
        <View style={styles.donor}>
          <Text>Donor Name: {props.donor.name}</Text>
          <Text>Donor Address: {props.donor.address}</Text>
          <Text>Donor Phone Number: {props.donor.phoneNumber}</Text>
        </View>
        <View style={styles.ngo}>
          <Text>NGO Name: {props.ngo_name}</Text>
          <Text>NGO Contact: {props.ngo_contactNumber}</Text>
          <Text>NGO Website: {props.ngo_website}</Text>
        </View>
        <View style={styles.donation_details}>
          <Text>Pickup Location: {props.pickUpLocation}</Text>
          <Text>Pickup Date: {props.pickUpDate}</Text>
          <Text>Description: {props.description}</Text>
          <Text>Total Quantity: {props.total_quantity}</Text>
        </View>
        <View style={styles.donation_details}>
          <Text>Donated Items:</Text>
        </View>
        {props.items.map((val) => (
          <View style={styles.donatedItems}>
            <Text>
              Item: {val.name} Quantity: {val.quantity}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

const PDFGenerator = (props) => {
  // console.log(props);
  return (
    <div>
      {/* Component to generate PDF and download */}
      <PDFDownloadLink
        document={<MyDocument prp={props} />}
        fileName={
          props.donor.name +
          "_" +
          props.ngo_name +
          "_" +
          props.pickUpDate +
          "_Receipt"
        }
        style={{ textDecoration: "none" }}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Receipt"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFGenerator;
