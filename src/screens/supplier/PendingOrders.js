import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_PATHS, BASE_URL, SORT_METHOD } from "../../utils/constants";
import axios from "axios";
import { sortOrders } from "../../utils/helpers/supplier/sortOrders";
import Footer from "../../components/Footer";
import {
  Button,
  HStack,
  Icon,
  Popover,
  ScrollView,
  Spinner,
  VStack,
} from "native-base";
import OrderCard from "../../components/OrderCard";
import { MaterialIcons } from "@expo/vector-icons/MaterialIcons";
import SortButton from "../../components/Common/SortButton";

const SupplierPendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState(SORT_METHOD.DESCENDING);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setOrders(sortOrders(orders, sortMethod));
  }, [sortMethod]);

  const fetchOrders = () => {
    // send GET request with AXIOS
    axios
      .get(`${BASE_URL}${API_PATHS.ORDERS}`)
      .then((res) => {
        const fetchedOrders = res.data;
        const sortedOrders = sortOrders(fetchedOrders, sortMethod);
        setOrders(sortedOrders); // Update orders after fetching data

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardClick = (order) => {
    navigation.navigate("ViewOrder", { item: order });
  };

  const handleSortMethodChange = (method) => {
    setSortMethod(method);
    setIsPopoverOpen(false); // Close the Popover after selecting a sort method
    setOrders(sortOrders(orders, method));
  };

  return (
    <View style={styles.container}>
      <View style={styles.ordersContainer}>
        {loading && (
          <View style={styles.spinnerContainer}>
            <Spinner size="lg" />
          </View>
        )}
        <ScrollView>
          {!loading && (
            <>
              <HStack justifyContent="flex-end" mb={2}>
                <SortButton
                  sortMethod={sortMethod}
                  setSortMethod={setSortMethod}
                  isPopoverOpen={isPopoverOpen}
                  setIsPopoverOpen={setIsPopoverOpen}
                  handleSortMethodChange={handleSortMethodChange}
                />
              </HStack>
              {orders.length === 0 ? (
                <Text style={styles.noOrdersText}>No orders available.</Text>
              ) : (
                orders.map((item) => (
                  <TouchableOpacity
                    key={item?.id}
                    onPress={() => handleCardClick(item)}>
                    <OrderCard
                      orderId={item?.id}
                      supplierName={item.supplier?.name}
                      status="PENDING"
                      items={item?.items}
                      date={item?.deliverDate}
                      createdAt={item?.createdAt}
                    />
                  </TouchableOpacity>
                ))
              )}
            </>
          )}
        </ScrollView>
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
    flex: 1,
    minHeight: 100,
  },
  noOrdersText: {
    textAlign: "center",
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
  sortButton: {
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default SupplierPendingOrders;
