import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Footer from "../components/Footer";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../utils/constants";
import { Spinner } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Simulating fetching orders from an API
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    // send GET request with AXIOS
    axios
      .get(`${BASE_URL}${API_PATHS.ORDERS}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteOrder = (orderId) => {
    setLoading(true);
    // Fetch order details to get item IDs
    axios
      .get(`${BASE_URL}${API_PATHS.ORDERS}/${orderId}`)
      .then((response) => {
        const order = response.data;

        // Extract item IDs from the order
        const itemIds = order.items.map((item) => item.id);

        // Delete items
        return Promise.all(
          itemIds.map((itemId) =>
            axios.delete(`${BASE_URL}${API_PATHS.ITEMS}/${itemId}`)
          )
        );
      })
      .then(() => {
        // After deleting items, delete the order
        return axios.delete(`${BASE_URL}${API_PATHS.ORDERS}/${orderId}`);
      })
      .then(() => {
        // Remove the deleted order from the state
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
        setLoading(false);
        // You can also show a success message if needed
      })
      .catch((error) => {
        console.log("Error deleting order:", error);
        // Handle error, show error message, etc.
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pending Orders</Text>
      <View style={styles.ordersContainer}>
        {loading && (
          <View style={styles.spinnerContainer}>
            <Spinner size="lg" />
          </View>
        )}
        {!loading && (
          <>
            {orders.length === 0 ? (
              <Text style={styles.noOrdersText}>No orders available.</Text>
            ) : (
              <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    <View style={styles.orderItem}>
                      <View style={styles.deleteButtonContainer}>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => handleDeleteOrder(item.id)}>
                          <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.productText}>
                        Order Number-{item.id}
                      </Text>
                      <Text style={styles.productText}>
                        Order Name:-{item.orderNo}
                      </Text>
                      <Text style={styles.quantityText}>
                        Supplier: {item.supplier ? item.supplier.name : "N/A"}
                      </Text>
                      <Text style={styles.quantityText}>
                        Delivery Date: {item.deliverDate}
                      </Text>
                      <View style={styles.tableContainer}>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableHeader}>Item</Text>
                          <Text style={styles.tableHeader}>Quantity</Text>
                        </View>
                        {item.items.map((itemDetail) => (
                          <View key={itemDetail.id} style={styles.tableRow}>
                            <Text style={styles.tableCell}>
                              {itemDetail.itemName}
                            </Text>
                            <Text style={styles.tableCell}>
                              {itemDetail.qty}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </>
        )}
      </View>
      <Footer navigation={navigation} />
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
    backgroundColor: "#d8e4fa",
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
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#3498db",
  },
  columnText: {
    fontSize: 16,
    color: "#555",
  },
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 10,
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3498db",
  },
  tableCell: {
    fontSize: 16,
    color: "#555",
  },
  deleteButtonContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 5,
    borderRadius: 5,
    marginTop: -10,
  },
  deleteButtonText: {
    color: "#fff",
  },
});

export default PendingOrders;
