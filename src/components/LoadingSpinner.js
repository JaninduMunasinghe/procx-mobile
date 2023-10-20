// SpinnerContainer.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Spinner } from "native-base";

const LoadingSpinner = ({ text }) => (
  <View style={styles.spinnerContainer}>
    <Spinner size="lg" />
    {text && <Text style={styles.loadingText}>{text}</Text>}
  </View>
);
const styles = StyleSheet.create({
  spinnerContainer: {
    height: 500,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
  },
});

export default LoadingSpinner;
