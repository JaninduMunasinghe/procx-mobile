// OrderDetails.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Footer from "../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { HStack, Heading, Stack } from "native-base";
import OrderItem from "../../components/OrderItem";
import { getDateTime } from "../../utils/helpers/supplier/getDateTime";
import { getDate } from "../../utils/helpers/supplier/getDate";
import { getNoOfDays } from "../../utils/helpers/supplier/getNoOfDays";

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();

  const navigateToPendingOrders = () => {
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <Stack space={2}>
          <Heading>Order #{item?.id}</Heading>
          <HStack justifyContent="space-between">
            <Text>Supplier: {item?.supplier?.name || "Supplier"}</Text>
          </HStack>
          <Text>Ordered on: {getDateTime(item?.createdAt)}</Text>
          <Text>
            Deliver on: {getDate(item?.deliverDate)} (
            {getNoOfDays(item?.deliverDate)})
          </Text>
          <HStack justifyContent="space-between">
            <Heading size="sm">Total Amount</Heading>
          </HStack>

          <Heading mt={6} size="sm">
            Ordered Items
          </Heading>
          <OrderItem item={item?.items[0]} />
          <OrderItem item={item?.items[1]} />
        </Stack>
      </ScrollView>

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
    // backgroundColor: "#ffffff",
  },
  mainContainer: {
    flex: 1,
    minHeight: 100,
  },
});

export default OrderDetails;
