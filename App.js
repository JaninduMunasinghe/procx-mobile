import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import ViewOrders from "./src/screens/ViewOrders";
import PendingOrders from "./src/screens/PendingOrders";
import ApprovedOrders from "./src/screens/ApprovedOrders";
import RejectedOrders from "./src/screens/RejectedOrders";
import OrderDetails from "./src/screens/OrderDetails";
import SupplierDashboard from "./src/screens/SupplierDashboard";
import SupplierApproved from "./src/screens/SupplierApproved";
import SupplierPending from "./src/screens/SupplierPending";
import SupplierCompleted from "./src/screens/SupplierCompleted";
import SupplierPendingOrders from "./src/screens/supplier/PendingOrders";
import ViewPendingOrder from "./src/screens/supplier/ViewPendingOrder";
import Invoice from "./src/screens/Invoice";
import AppointmentsScreen from "./src/screens/AppointmentScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import CreateOrder from "./src/screens/CreateOrder";
import SupplierRejectedOrders from "./src/screens/supplier/RejectedOrders";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerBackTitle: "Back",
            }}
            initialRouteName="ViewOrders">
            <Stack.Screen
              name="CreateOrder"
              component={CreateOrder}
              options={{ title: "Create Order" }}
            />
            <Stack.Screen name="ViewOrders" component={ViewOrders} />
            <Stack.Screen name="PendingOrders" component={PendingOrders} />
            <Stack.Screen name="ApprovedOrders" component={ApprovedOrders} />
            <Stack.Screen name="RejectedOrders" component={RejectedOrders} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen
              name="SupplierApproved"
              component={SupplierApproved}
            />
            <Stack.Screen
              name="Invoice"
              component={Invoice}
              options={{ title: "Delivery Note" }}
            />
            <Stack.Screen
              name="AppointmentScreen"
              component={AppointmentsScreen}
            />
            <Stack.Screen
              name="SupplierDashboard"
              component={SupplierDashboard}
              options={{ title: "Dashboard" }}
            />
            <Stack.Screen name="SupplierPending" component={SupplierPending} />
            <Stack.Screen
              options={{ title: "Completed Orders" }}
              name="SupplierCompleted"
              component={SupplierCompleted}
            />
            <Stack.Screen
              options={{ title: "Rejected Orders" }}
              name="SupplierRejectedOrders"
              component={SupplierRejectedOrders}
            />
            <Stack.Screen
              options={{ title: "Pending Orders" }}
              name="SupplierPendingOrders"
              component={SupplierPendingOrders}
            />
            <Stack.Screen
              name="ViewPendingOrder"
              component={ViewPendingOrder}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0, // 0
  },
});
