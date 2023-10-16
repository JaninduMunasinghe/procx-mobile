/* import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Footer from "../components/Footer";

const Invoice = () => {
  // Hardcoded invoice data for demonstration
  const hardcodedInvoiceData = {
    orderID: "ABC123",
    price: 150.0,
    quantity: 2,
    date: "2023-10-14",
    item: "Sample Product",
  };

  const [invoiceData] = useState(hardcodedInvoiceData);

  // Commenting out the network request simulation for hardcoded data
  const fetchInvoiceData = async () => {
    try {
      const response = await fetch("your_api_endpoint");
      const data = await response.json();
      setInvoiceData(data);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  useEffect(() => {
    // Fetch invoice data when the component mounts
    fetchInvoiceData();
  }, []);

  if (!invoiceData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const generateReceipt = () => {
    // Replace this with logic to generate or save the receipt
    Alert.alert(
      "Receipt Generated",
      "Your receipt has been generated successfully!"
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.invoiceContainer}>
        <Text style={styles.invoiceHeader}>Invoice</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Order ID:</Text>
            <Text style={styles.value}>{invoiceData.orderID}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{invoiceData.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Item:</Text>
            <Text style={styles.value}>{invoiceData.item}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Quantity:</Text>
            <Text style={styles.value}>{invoiceData.quantity}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{`$${invoiceData.price.toFixed(
              2
            )}`}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.generateButton} onPress={generateReceipt}>
        <Text style={styles.generateButtonText}>Generate Receipt</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
  },
  invoiceContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  invoiceHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#3498db",
  },
  details: {
    backgroundColor: "#ecf0f1",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3498db",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  generateButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  generateButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Invoice;
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default InvoiceView = () => {
  const invoiceData = {
    invoiceNumber: "12345",
    invoiceDate: "01/01/2022",
    customerName: "Janindu",
    customerEmail: "janindu@gmail.com",
    customerAddress: "Kalutara",
    items: [
      {
        id: 1,
        name: "Item 1",
        quantity: 2,
        price: 9.99,
        total: 19.98,
      },
      {
        id: 2,
        name: "Item 2",
        quantity: 1,
        price: 19.99,
        total: 19.99,
      },
    ],
    total: 39.97,
  };
  const generateReceipt = async () => {
    //const receiptContent = generateReceiptContent(invoiceData);
    Alert.alert(
      "Receipt Generated",
      "Your receipt has been generated successfully!"
    );
  };

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
        </View>
        <View style={styles.invoiceInfoContainer}>
          <View style={styles.invoiceInfo}>
            <Text style={styles.label}>Invoice Number:</Text>
            <Text style={styles.text}>{invoiceData.invoiceNumber}</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.label}>Invoice Date:</Text>
            <Text style={styles.text}>{invoiceData.invoiceDate}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.customerInfoContainer}>
          <Text style={styles.subtitle}>Customer Information</Text>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{invoiceData.customerName}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{invoiceData.customerEmail}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.text}>{invoiceData.customerAddress}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.itemsContainer}>
          <Text style={styles.subtitle}>Invoice Items</Text>
          {invoiceData.items.map((item) => (
            <View style={styles.item} key={item.id}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                {item.quantity} x ${item.price}
              </Text>
              <Text style={styles.itemTotal}>${item.total}</Text>
            </View>
          ))}
        </View>
        <View style={styles.divider} />
        <View style={styles.totalContainer}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.total}>${invoiceData.total}</Text>
        </View>
      </Card>
      <TouchableOpacity style={styles.generateButton} onPress={generateReceipt}>
        <Text style={styles.generateButtonText}>Generate Receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 3,
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  invoiceInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  invoiceInfo: {
    flexDirection: "row",
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    marginLeft: 5,
  },
  divider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  customerInfoContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  customerInfo: {
    flexDirection: "row",
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemName: {
    fontSize: 16,
  },
  itemDetails: {},
  itemTotal: {
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
  },
  generateButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20, // Added margin to align with other content
  },
  generateButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
