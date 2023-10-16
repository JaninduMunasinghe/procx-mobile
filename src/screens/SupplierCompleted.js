import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Footer from "../components/Footer";

const SupplierCompleted = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulating fetching orders from an API
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    // Replace this with your actual API call to fetch orders
    // For now, we're using an empty array when no orders are available
    const mockOrders = [
      {
        id: 1,
        item: "Item 1",
        order: "Order 1",
        quantity: 5,
        date: "2021-05-01",
        status: "Pending",
        price: 1000,
      },
      {
        id: 2,
        item: "Item 2",
        order: "Order 2",
        quantity: 10,
        date: "2021-05-01",
        status: "Pending",
        price: 1000,
      },
      {
        id: 3,
        item: "Item 3",
        order: "Order 3",
        quantity: 3,
        date: "2021-05-01",
        status: "Pending",
        price: 1000,
      },
    ];

    setOrders(mockOrders);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Completed Orders</Text>
      <View style={styles.ordersContainer}>
        {orders.length === 0 ? (
          <Text style={styles.noOrdersText}>No orders available.</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Text style={styles.productText}>{`${item.order}`}</Text>
                <Text style={styles.quantityText}>{`Item: ${item.item}`}</Text>
                <Text
                  style={
                    styles.quantityText
                  }>{`Quantity: ${item.quantity}`}</Text>
                <Text style={styles.quantityText}>{`Date: ${item.date}`}</Text>
                <Text
                  style={styles.quantityText}>{`Status: ${item.status}`}</Text>
                <Text
                  style={styles.quantityText}>{`Price: ${item.price}`}</Text>
              </View>
            )}
          />
        )}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 0,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3498db",
    textAlign: "center",
  },
  ordersContainer: {
    flex: 1, // Take up remaining space
    minHeight: 100, // Set a minimum height
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
  orderItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f1f1f1", // Border color
    shadowColor: "#2c3e50", // Shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#3498db",
  },
  quantityText: {
    fontSize: 16,
    color: "#555",
  },
});

export default SupplierCompleted;
