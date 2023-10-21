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
import {
  AlertDialog,
  Button,
  HStack,
  Heading,
  Stack,
  VStack,
} from "native-base";
import OrderItem from "../../components/OrderItem";
import { getDateTime } from "../../utils/helpers/supplier/getDateTime";
import { getDate } from "../../utils/helpers/supplier/getDate";
import { getNoOfDays } from "../../utils/helpers/supplier/getNoOfDays";
import { calculateOrderTotal } from "../../utils/helpers/supplier/calculateOrderTotal";
import { formatPrice } from "../../utils/helpers/supplier/formatPrice";
import {
  API_PATHS,
  BASE_URL,
  SUPPLIER_ORDER_STATUS,
} from "../../utils/constants";
import axios from "axios";
import { showAlert } from "../../utils/helpers/common/showAlert";

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();

  const { item } = route.params;

  const handleApprove = () => {
    axios
      .put(`${BASE_URL}${API_PATHS.ORDERS}/${item.id}`, {
        supplierstatus: SUPPLIER_ORDER_STATUS.APPROVED,
      })
      .then((res) => {
        showAlert("Order Approved", "Order has been accepted successfully");
        navigation.navigate("SupplierPendingOrders");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = () => {
    axios
      .put(`${BASE_URL}${API_PATHS.ORDERS}/${item.id}`, {
        supplierstatus: SUPPLIER_ORDER_STATUS.REJECTED,
      })
      .then((res) => {
        showAlert("Order Rejected", "Order has been rejected successfully");
        navigation.navigate("SupplierPendingOrders");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Stack space={2}>
          <Heading size="2xl" mb={4}>
            Order #{item?.id}
          </Heading>
          <HStack justifyContent="space-between">
            <Text>Supplier: {item?.supplier?.name || "Supplier"}</Text>
          </HStack>
          <Text>Ordered on: {getDateTime(item?.createdAt)}</Text>
          <Text>
            Deliver on: {getDate(item?.deliverDate)} (
            {getNoOfDays(item?.deliverDate)})
          </Text>
          <HStack mt={4} justifyContent="space-between" alignItems="baseline">
            <Heading size="lg">Order Total</Heading>
            <Heading color="green.600" size="lg">
              {formatPrice(calculateOrderTotal(item?.items))} LKR
            </Heading>
          </HStack>
          <Heading mt={4} size="sm" mb={2}>
            Ordered Items
          </Heading>

          {item?.items?.map((item) => (
            <OrderItem item={item} />
          ))}

          <VStack flex={1} mt={6} mb={10} justifyContent="space-between">
            <Button
              w={"100%"}
              colorScheme="green"
              onPress={() => {
                handleApprove();
              }}>
              Accept Order
            </Button>
            <Button
              w="100%"
              variant="outline"
              colorScheme="red"
              mt={2}
              onPress={() => {
                handleReject();
              }}>
              Reject Order
            </Button>
          </VStack>
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
