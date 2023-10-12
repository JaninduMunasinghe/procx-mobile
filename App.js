import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import Suppliers from "./src/screens/Suppliers";
import ViewOrders from "./src/screens/ViewOrders";
import PendingOrders from "./src/screens/PendingOrders";
import ApprovedOrders from "./src/screens/ApprovedOrders";
import RejectedOrders from "./src/screens/RejectedOrders";
import "react-native-gesture-handler";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Suppliers /> */}
      <ViewOrders />
      {/* <PendingOrders /> */}
      {/* <ApprovedOrders /> */}
      {/* <RejectedOrders /> */}
      <StatusBar style="auto" />
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
