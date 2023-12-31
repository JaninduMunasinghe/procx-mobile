import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Footer from "../components/Footer";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library
import { useNavigation } from "@react-navigation/native";

const ViewOrders = () => {
  const navigation = useNavigation();

  const navigateToPendingOrders = () => {
    // Navigate to PendingOrder component
    navigation.navigate("PendingOrders");
  };

  const navigateToApproveOrders = () => {
    // Navigate to ApproveOrders component
    navigation.navigate("ApprovedOrders");
  };

  const navigateToRejectedOrders = () => {
    // Navigate to RejectedOrders component
    navigation.navigate("RejectedOrders");
  };

  const navigateToSuppliers = () => {
    // Navigate to FourthCard component
    navigation.navigate("CreateOrder");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={navigateToPendingOrders}
            style={styles.card}>
            <Icon name="clock-o" size={40} color="#3498db" />
            <Text style={styles.cardTitle}>Pending Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToApproveOrders}
            style={styles.card}>
            <Icon name="check" size={40} color="#2ecc71" />
            <Text style={styles.cardTitle}>Approve Orders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={navigateToRejectedOrders}
            style={styles.card}>
            <Icon name="times" size={40} color="#e74c3c" />
            <Text style={styles.cardTitle}>Rejected Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSuppliers} style={styles.card}>
            <Icon name="plus-circle" size={40} color="#f39c12" />
            <Text style={styles.cardTitle}>Create Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    backgroundColor: "#d8e4fa",
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
