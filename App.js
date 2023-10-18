import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import Suppliers from "./src/screens/Suppliers";
import ViewOrders from "./src/screens/ViewOrders";
import PendingOrders from "./src/screens/PendingOrders";
import ApprovedOrders from "./src/screens/ApprovedOrders";
import RejectedOrders from "./src/screens/RejectedOrders";
import SupplierViewOrders from "./src/screens/SupplierViewOrders";
import OrderDetails from "./src/screens/OrderDetails";
import SupplierDashboard from "./src/screens/SupplierDashboard";
import SupplierApproved from "./src/screens/SupplierApproved";
import SupplierPending from "./src/screens/SupplierPending";
import SupplierRejected from "./src/screens/SupplierRejected";
import SupplierCompleted from "./src/screens/SupplierCompleted";
import Invoice from "./src/screens/Invoice";
import AppointmentsScreen from "./src/screens/AppointmentScreen";
import { ObjectHTMLAttributes } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ViewOrders">
            <Stack.Screen name="Suppliers" component={Suppliers} />
            <Stack.Screen name="ViewOrders" component={ViewOrders} />
            <Stack.Screen name="PendingOrders" component={PendingOrders} />
            <Stack.Screen name="ApprovedOrders" component={ApprovedOrders} />
            <Stack.Screen name="RejectedOrders" component={RejectedOrders} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen
              name="SupplierApproved"
              component={SupplierApproved}
            />
            <Stack.Screen name="Invoice" component={Invoice} />
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
              name="SupplierCompleted"
              component={SupplierCompleted}
            />
            <Stack.Screen
              name="SupplierRejected"
              component={SupplierRejected}
            />
            <Stack.Screen
              name="SupplierViewOrders"
              component={SupplierViewOrders}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </NativeBaseProvider>
    /*     <NavigationContainer>
      <Stack.Navigator initialRouteName="Suppliers">
        <Stack.Screen name="Suppliers" component={Suppliers} />
        <Stack.Screen name="ViewOrders" component={ViewOrders} />
      </Stack.Navigator>
    </NavigationContainer> */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0, // 0
  },
});
