import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "../components/Footer";

const Suppliers = () => {
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedCategory1, setSelectedCategory1] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted!");
    console.log("number:", number);
    console.log("date:", date);
    console.log("quantity:", quantity);
    console.log("Category1:", selectedCategory1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.heading}>Create Purchase Order</Text>

          <Text style={styles.label}>Order No:</Text>
          <TextInput
            style={styles.underlineInput}
            value={number}
            onChangeText={(text) => setNumber(text)}
            placeholder="Enter your order number"
          />

          <Text style={styles.label}>Date:</Text>
          <TextInput
            style={styles.underlineInput}
            value={date}
            onChangeText={(text) => setDate(text)}
            placeholder="Enter date"
          />

          <Text style={styles.label}>Quantity:</Text>
          <TextInput
            style={styles.underlineInput}
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            placeholder="Enter quantity"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Select Supplier:</Text>
          <Picker
            selectedValue={selectedCategory1}
            onValueChange={(itemValue) => setSelectedCategory1(itemValue)}
            style={styles.underlineInput}>
            <Picker.Item label="Supplier 1" value="Supplier 1" />
            <Picker.Item label="Supplier 2" value="Supplier 2" />
            <Picker.Item label="Supplier 3" value="Supplier 3" />
            {/* Add more categories as needed */}
          </Picker>

          <Text style={styles.label}>Item:</Text>
          <Picker
            selectedValue={selectedCategory2}
            onValueChange={(itemValue) => setSelectedCategory2(itemValue)}
            style={styles.underlineInput}>
            <Picker.Item label="Item 1" value="Item 1" />
            <Picker.Item label="Item 2" value="Item 2" />
            <Picker.Item label="Item 3" value="Item 3" />
            {/* Add more categories as needed */}
          </Picker>

          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  label: {
    marginBottom: 5,
    color: "#333",
  },
  underlineInput: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#3498db",
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "stretch", // Ensure the button takes the full width
  },
});

export default Suppliers;
