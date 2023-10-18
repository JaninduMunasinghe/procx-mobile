import React, { useState } from "react";
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

const Suppliers = () => {
  const navigation = useNavigation();

  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCategory1, setSelectedCategory1] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");

  useEffect(() => {
    fetchSuppliers();
    fetchItems();
  }, []);

  const fetchSuppliers = () => {
    // send GET request with AXIOS
    axios
      .get(`${BASE_URL}${API_PATHS.SUPPLIERS}`)
      .then((res) => {
        setAllSuppliers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchItems = () => {
    // send GET request with AXIOS
    axios
      .get(`${BASE_URL}${API_PATHS.ITEMS}`)
      .then((res) => {
        setAllItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* const [itemDropdowns, setItemDropdowns] = useState([{ id: 1, value: "" }]); */
  const [itemDropdowns, setItemDropdowns] = useState([
    { id: 1, item: "item 1", quantity: "" },
  ]);

  const handleSupplierChange = (value) => {
    console.log("Selected Supplier:", value);
    setSelectedSupplier(value);
    console.log("State After Update:", selectedSupplier);
  };

  // Define the array of dropdown items
  const dropdownItems = ["Item 1", "Item 2", "Item 3"];

  const handleSubmit = () => {
    // send POST request with AXIO
    axios
      .post("https://procx-api-o9suw.ondigitalocean.app/api/orders", {
        orderNo: number,
        deliverDate: date,
        qty: quantity,
        supllier: selectedSupplier,
        item: "testItem2",
      })
      .then((res) => {
        console.log(res);
        showToast();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Order created!",
      text2: "Your order has been created successfully!",
    });
  };

  /*   const handleAddItemDropdown = () => {
    const newItemDropdown = {
      id: itemDropdowns.length + 1,
      value: "",
    };
    setItemDropdowns([...itemDropdowns, newItemDropdown]);
  }; */
  const handleAddItemDropdown = () => {
    const newItemDropdown = {
      id: itemDropdowns.length + 1,
      item: null,
      quantity: "",
    };
    setItemDropdowns([...itemDropdowns, newItemDropdown]);
  };

  /*   const handleItemDropdownChange = (id, value) => {
    const updatedItemDropdowns = itemDropdowns.map((item) =>
      item.id === id ? { ...item, value } : item
    );
    setItemDropdowns(updatedItemDropdowns);
  }; */
  const handleItemChange = (id, itemIndex) => {
    const updatedItemDropdowns = itemDropdowns.map((dropdown) =>
      dropdown.id === id
        ? { ...dropdown, item: dropdownItems[itemIndex] }
        : dropdown
    );
    setItemDropdowns(updatedItemDropdowns);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedItemDropdowns = itemDropdowns.map((dropdown) =>
      dropdown.id === id ? { ...dropdown, quantity } : dropdown
    );
    setItemDropdowns(updatedItemDropdowns);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
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
              selectedValue={selectedSupplier}
              onValueChange={(itemValue) => {
                console.log("Picker Value Change:", itemValue);
                handleSupplierChange(itemValue);
              }}
              style={styles.underlineInput}>
              {allSuppliers.map((supplier) => (
                <Picker.Item
                  key={supplier.value}
                  label={supplier.name}
                  value={supplier.name}
                />
              ))}
            </Picker>

            {/*             <Text style={styles.label}>Select Supplier:</Text>
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

            <Text style={styles.label}>Item:</Text>
            {itemDropdowns.map((item, index) => (
              <View key={item.id}>
                <Picker
                  selectedValue={dropdownItems.indexOf(item.item)}
                  onValueChange={(itemIndex) =>
                    handleItemChange(item.id, itemIndex)
                  }
                  style={styles.underlineInput}>
                  {dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <Picker.Item
                      key={dropdownIndex}
                      label={dropdownItem}
                      value={dropdownIndex}
                    />
                  ))}
                </Picker>

                <Text style={styles.label}>Quantity:</Text>
                <TextInput
                  style={styles.underlineInput}
                  value={item.quantity}
                  onChangeText={(text) => handleQuantityChange(item.id, text)}
                  placeholder="Enter quantity"
                  keyboardType="phone-pad"
                />
              </View>
            ))}
            <TouchableOpacity onPress={handleAddItemDropdown}>
              <Icon name="plus" size={20} color="#3498db" />
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
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
