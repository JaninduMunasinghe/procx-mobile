import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Footer from "../components/Footer";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library

const ViewOrders = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>View All Orders</Text>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Icon name="clock-o" size={40} color="#3498db" />
            <Text style={styles.cardTitle}>Pending Orders</Text>
            {/* Render pending orders here */}
          </View>
          <View style={styles.card}>
            <Icon name="check" size={40} color="#2ecc71" />
            <Text style={styles.cardTitle}>Approve Orders</Text>
            {/* Render approved orders here */}
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Icon name="times" size={40} color="#e74c3c" />
            <Text style={styles.cardTitle}>Rejected Orders</Text>
            {/* Render rejected orders here */}
          </View>
          <View style={styles.card}>
            <Icon name="star" size={40} color="#f39c12" />
            <Text style={styles.cardTitle}>Fourth Card</Text>
            {/* Render content for the fourth card here */}
          </View>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3498db",
    textAlign: "center",
  },
  contentContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    height: 150,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f1f1f1",
    padding: 15,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2c3e50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#3498db",
  },
});

export default ViewOrders;
