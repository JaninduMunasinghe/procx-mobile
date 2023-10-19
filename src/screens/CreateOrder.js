import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { API_PATHS, BASE_URL } from "../utils/constants";
import axios from "axios";
import { Spinner } from "native-base";

const CreateOrder = () => {
  const navigation = useNavigation();

  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const [fetchLoading, setFetchLoading] = useState(true);

  // store fetched data
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const [supplierItems, setSupplierItems] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios
      .get(`${BASE_URL}${API_PATHS.SUPPLIERS}`)
      .then((res) => {
        setAllSuppliers(res.data);
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
        setAllItems(res.data);
        setFetchLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* const [itemDropdowns, setItemDropdowns] = useState([{ id: 1, value: "" }]); */
  // const [itemDropdowns, setItemDropdowns] = useState([
  //   { id: 1, item: "item 1", quantity: "" },
  // ]);

  const handleSupplierChange = (value) => {
    setSelectedSupplier(value);

    // Fetch items for the selected supplier
    const supplierId = allSuppliers.find(
      (supplier) => supplier.name === value
    )?.id;
    fetchSupplierItems(supplierId);
  };

  const fetchSupplierItems = (supplierId) => {
    axios
      .get(`${BASE_URL}${API_PATHS.SUPPLIERS}/${supplierId}${API_PATHS.ITEMS}`)
      .then((res) => {
        setSupplierItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // onchange for item dropdown -> add the selected item details to a state (array)
  const handleItemChange = (value) => {
    setSelectedItems((prevState) => [...prevState, value]);
  };

  const handleSubmit = () => {
    // create empty order for supplier
    axios
      .post(`${BASE_URL}${API_PATHS.ORDERS}`)
      .then((res) => {
        console.log(res);
        showToast();
        createOrderItems(selectedItems);
      })
      .catch((err) => {
        console.log(err);
      });

    // get order id + response

    // call create order items function
  };

  // create order items function
  // loop through the selected items array for each item and send an API request for each item
  const createOrderItems = (selectedItems) => {
    // use foreach to send the request for each item
    // send POST request with AXIOS
    // TODO: change the endpoint
    // axios
    //   .post(`${BASE_URL}${API_PATHS.ENDPOINT_HERE}`)
    //   .then((res) => {
    //     console.log(res);
    //     showToast();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
          {fetchLoading && (
            <View style={styles.spinnerContainer}>
              <Spinner size="lg" />
            </View>
          )}
          {!fetchLoading && (
            <>
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

              {/* <Text style={styles.label}>Quantity:</Text>
              <TextInput
                style={styles.underlineInput}
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
                placeholder="Enter quantity"
                keyboardType="phone-pad"
              />
              */}

              {/*               <Text style={styles.label}>Select Supplier:</Text>
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
                    value={supplier.name}
                  />
                ))}
              </Picker> */}

              {/* <Text style={styles.label}>Select Supplier:</Text>
            <Picker
              selectedValue={selectedCategory1}
              onValueChange={(itemValue) => setSelectedCategory1(itemValue)}
              style={styles.underlineInput}>
              <Picker.Item label="Supplier 1" value="Supplier 1" />
              <Picker.Item label="Supplier 2" value="Supplier 2" />
              <Picker.Item label="Supplier 3" value="Supplier 3" />
           
            </Picker> */}
              {/*
            <Text style={styles.label}>Item:</Text>
            {itemDropdowns.map((item) => (
              <View key={item.id}>
                <Picker
                  selectedValue={item.value}
                  onValueChange={(itemValue) =>
                    handleItemDropdownChange(item.id, itemValue)
                  }
                  style={styles.underlineInput}>
                  <Picker.Item label="Item 1" value="Item 1" />
                  <Picker.Item label="Item 2" value="Item 2" />
                  <Picker.Item label="Item 3" value="Item 3" />
                </Picker>
              </View>
            ))}
            <TouchableOpacity onPress={handleAddItemDropdown}>
              <Icon name="plus" size={20} color="#3498db" />
            </TouchableOpacity> */}

              {/*               <Text style={styles.label}>Item:</Text>
              <View>
                <Picker
                  selectedValue={selectedItems}
                  onValueChange={(itemValue) => handleItemChange(itemValue)}
                  style={styles.underlineInput}>
                  {supplierItems.map((item) => (
                    <Picker.Item
                      key={item.id}
                      label={item.itemName}
                      value={item.itemName}
                    />
                  ))}
                </Picker>
              </View> */}
              <TouchableOpacity>
                <Icon name="plus" size={20} color="#3498db" />
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
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
  spinnerContainer: {
    height: 500,
    flex: 1,
    justifyContent: "center",
  },
});

export default CreateOrder;
