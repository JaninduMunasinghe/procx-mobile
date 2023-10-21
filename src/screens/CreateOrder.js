import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { API_PATHS, BASE_URL } from "../utils/constants";
import axios from "axios";
import { Button } from "native-base";
import ViewOrders from "./ViewOrders";
import { showAlert } from "../utils/helpers/common/showAlert";
import { getDistinctItems } from "../utils/helpers/supplier/getDistinctItems";
import LoadingSpinner from "../components/LoadingSpinner";

const CreateOrder = () => {
  const navigation = useNavigation();

  const [orderCreateLoading, setOrderCreateLoading] = useState(false);
  const [itemCreateLoading, setItemCreateLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(1);

  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const [fetchLoading, setFetchLoading] = useState(true);

  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const [numItems, setNumItems] = useState(1);

  const handleItemChange = (itemValue, itemKey) => {
    const item = allItems.find((item) => item.itemName === itemValue);
    if (item) {
      setSelectedItems((prevSelectedItems) => {
        const updatedSelectedItems = [...prevSelectedItems];
        const selectedItemIndex = updatedSelectedItems.findIndex(
          (item) => item.key === itemKey
        );
        if (selectedItemIndex !== -1) {
          updatedSelectedItems[selectedItemIndex] = {
            key: itemKey,
            itemId: item.id, // Store item ID
            itemName: itemValue,
            qty: updatedSelectedItems[selectedItemIndex].qty,
          };
        } else {
          updatedSelectedItems.push({
            key: itemKey,
            itemId: item.id,
            itemName: itemValue,
            qty: "",
          });
        }
        return updatedSelectedItems;
      });
    }
  };

  const handleQuantityChange = (quantity, itemKey) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      const selectedItemIndex = updatedSelectedItems.findIndex(
        (item) => item.key === itemKey
      );
      if (selectedItemIndex !== -1) {
        updatedSelectedItems[selectedItemIndex] = {
          key: itemKey,
          itemId: updatedSelectedItems[selectedItemIndex].itemId,
          itemName: updatedSelectedItems[selectedItemIndex].itemName,
          qty: quantity,
        };
      }
      return updatedSelectedItems;
    });
  };

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  const handleAddItem = () => {
    setNumItems((prevNumItems) => prevNumItems + 1);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios
      .get(`${BASE_URL}${API_PATHS.SUPPLIERS}`)
      .then((res) => {
        let distinctItems = getDistinctItems(res.data, "name");
        setAllSuppliers(distinctItems);
        fetchItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchItems = () => {
    axios
      .get(`${BASE_URL}${API_PATHS.ITEMS}`)
      .then((res) => {
        let distinctItems = getDistinctItems(res.data, "itemName");
        setAllItems(distinctItems);
        setFetchLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSupplierChange = (value) => {
    setSelectedSupplier(value);
  };

  const handleSubmit = () => {
    setOrderCreateLoading(true);
    // create empty order for supplier

    axios
      .post(`${BASE_URL}${API_PATHS.SUPPLIERS}/${selectedSupplier}/orders`, {
        orderNo: number,
        deliverDate: date,
      })
      .then((res) => {
        // showToast();
        setOrderCreateLoading(false);
        if (selectedItems.length > 0 && res.data.id) {
          createOrderItems(selectedItems, res.data.id);
        }
        showAlert("Success", "Order created successfully!");
        navigation.navigate("ViewOrders");
      })
      .catch((err) => {
        console.log(err);
      });

    // get order id + response

    // call create order items function
  };

  // create order items function
  // loop through the selected items array for each item and send an API request for each item
  const createOrderItems = (selectedItems, orderId) => {
    selectedItems.forEach((item, index) => {
      setItemCreateLoading(true);
      const selectedItem = allItems.find(
        (allItem) => allItem.id === item.itemId
      );

      if (selectedItem) {
        axios
          .post(`${BASE_URL}${API_PATHS.ORDERS}/${orderId}/items`, {
            itemName: selectedItem.itemName,
            restricted: selectedItem.restricted,
            description: selectedItem.description,
            imageUrl: selectedItem.imageUrl,
            price: selectedItem.price,
            qty: item.qty,
          })
          .then((res) => {
            console.log(res.data);
            setCurrentItem(index + 1);
            setItemCreateLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setItemCreateLoading(false);
          });
      }
    });
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Order created!",
      text2: "Your order has been created successfully!",
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cardContent}>
          <Text style={styles.heading}>Create Purchase Order</Text>
          {fetchLoading && <LoadingSpinner />}
          {orderCreateLoading && (
            <View style={styles.spinnerContainer}>
              <LoadingSpinner size="lg" />
              <Text style={styles.loadingText}>Creating order...</Text>
            </View>
          )}
          {itemCreateLoading && (
            <View style={styles.spinnerContainer}>
              <LoadingSpinner size="lg" />
              <Text style={styles.loadingText}>
                Adding items ({currentItem})...
              </Text>
            </View>
          )}
          {!fetchLoading && !orderCreateLoading && !itemCreateLoading && (
            <>
              <Text style={styles.label}>Order Reference:</Text>
              <TextInput
                style={styles.underlineInput}
                value={number}
                onChangeText={(text) => setNumber(text)}
                placeholder="Enter your order name"
              />

              <Text style={styles.label}>Required Date:</Text>
              <TextInput
                style={styles.underlineInput}
                value={date}
                onChangeText={(text) => setDate(text)}
                placeholder="Enter date"
              />
              <Text style={styles.label}>Select Supplier:</Text>
              <Picker
                selectedValue={selectedSupplier}
                onValueChange={(itemValue) => {
                  console.log("Picker Value Change:", itemValue);
                  handleSupplierChange(itemValue);
                }}
                style={styles.underlineInput}>
                {allSuppliers.map((supplier) => (
                  <Picker.Item
                    key={supplier.id}
                    label={supplier.name}
                    value={supplier.id}
                  />
                ))}
              </Picker>

              <Text style={styles.label}>Items</Text>

              <View>
                {Array.from({ length: numItems }, (_, index) => (
                  <View key={`itemRow${index}`} style={styles.itemRow}>
                    <Picker
                      key={`itemPicker${index}`}
                      selectedValue={selectedItems[index]?.itemName || ""}
                      onValueChange={(itemValue) =>
                        handleItemChange(itemValue, index)
                      }
                      style={styles.underlineInput}>
                      {allItems.map((item) => (
                        <Picker.Item
                          key={item.id}
                          label={item.itemName}
                          value={item.itemName}
                        />
                      ))}
                    </Picker>
                    <TextInput
                      key={`quantityInput${index}`}
                      style={styles.underlineInput}
                      value={selectedItems[index]?.qty || ""}
                      onChangeText={(text) => handleQuantityChange(text, index)}
                      placeholder="Enter quantity"
                      keyboardType="phone-pad"
                    />
                  </View>
                ))}

                <TouchableOpacity onPress={handleAddItem}>
                  <Icon name="plus" size={20} color="#3498db" />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <Button onPress={handleSubmit}>Submit</Button>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 20,
    height: "auto",
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
    minHeight: 40,
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
  itemRow: {
    backgroundColor: "#d4eafa",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  loadingText: {
    marginTop: 10,
  },
});

export default CreateOrder;
