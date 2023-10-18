import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Footer from "../components/Footer";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../utils/constants";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // fetchOrders();
  }, []);

  const fetchOrders = () => {
    // send GET request with AXIOS
    axios
      .post(`${BASE_URL}${API_PATHS.ORDERS}`, {
        status: "pending",
      })
      .then((res) => {
        console.log(res);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pending Orders</Text>
      <View style={styles.ordersContainer}>
        {orders.length === 0 ? (
          <Text style={styles.noOrdersText}>No orders available.</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Text style={styles.productText}>{`${item.orderNo}`}</Text>
                <Text
                  style={
                    styles.quantityText
                  }>{`Item: ${item.deliverDate}`}</Text>
                <Text
                  style={
                    styles.quantityText
                  }>{`Quantity: ${item.supllier}`}</Text>
                <Text style={styles.quantityText}>{`Date: ${item.item}`}</Text>
                <Text style={styles.quantityText}>{`Status: ${item.qty}`}</Text>
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

export default PendingOrders;
