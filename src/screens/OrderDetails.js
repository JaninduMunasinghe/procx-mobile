// OrderDetails.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { Table, Row } from "react-native-table-component";

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();

  const navigateToPendingOrders = () => {
    // Navigate to Invoice component
    navigation.navigate("Invoice");
  };

  const { item } = route.params;

  const handleApprove = () => {
    // Handle the logic for approving the order
    console.log("Order Approved");
    navigateToPendingOrders();
  };

  const handleReject = () => {
    // Handle the logic for rejecting the order
    console.log("Order Rejected");
  };
  const tableHead = ["Item", "Quantity"];
  const tableData = [
    [item.item, ""], // Product in the first column
    ["", item.quantity], // Quantity in the second column
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Order Details</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Order ID:</Text>
              <Text style={styles.value}>{item.OrderID}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{item.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{item.status}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Price:</Text>
              <Text style={styles.value}>{`$${item.price.toFixed(2)}`}</Text>
            </View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={{ ...styles.text, textAlign: "center" }}
              />
              <Row
                data={tableData}
                style={styles.row}
                textStyle={{ ...styles.text, textAlign: "center" }}
              />
            </Table>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={handleApprove}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "90%",
    height: "auto",
    backgroundColor: "#ecf0f1",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3498db",
    textAlign: "center",
  },
  detailsContainer: {
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498db",
  },
  value: {
    fontSize: 18,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center the buttons horizontally
    marginVertical: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  rejectButton: {
    backgroundColor: "#e74c3c",
    marginRight: 10,
  },
  approveButton: {
    backgroundColor: "#27ae60",
    marginLeft: 10,
  },
});

export default OrderDetails;
