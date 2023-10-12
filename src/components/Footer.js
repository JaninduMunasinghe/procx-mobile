import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Footer = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon name="home" size={30} color="#3498db" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ViewOrders")}>
        <Icon name="list" size={30} color="#3498db" />
      </TouchableOpacity>
      {/* Add similar TouchableOpacity for other icons */}
      <Icon name="search" size={30} color="#3498db" />
      <Icon name="bell" size={30} color="#3498db" />
      <Icon name="user" size={30} color="#3498db" />
    </View>
  );
};

export default Footer;
