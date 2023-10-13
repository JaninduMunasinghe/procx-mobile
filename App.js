import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import Suppliers from "./src/screens/Suppliers";
import ViewOrders from "./src/screens/ViewOrders";
import PendingOrders from "./src/screens/PendingOrders";
import ApprovedOrders from "./src/screens/ApprovedOrders";
import RejectedOrders from "./src/screens/RejectedOrders";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ViewOrders">
          <Stack.Screen name="Suppliers" component={Suppliers} />
          <Stack.Screen name="ViewOrders" component={ViewOrders} />
          <Stack.Screen name="PendingOrders" component={PendingOrders} />
          <Stack.Screen name="ApprovedOrders" component={ApprovedOrders} />
          <Stack.Screen name="RejectedOrders" component={RejectedOrders} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
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
