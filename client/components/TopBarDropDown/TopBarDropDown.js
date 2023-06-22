import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton } from "@react-native-material/core";
import { styles } from "../style";

const TopBarDropDown = ({
  navigation,
  isDropdownVisible,
  setIsDropdownVisible,
}) => {
  const logOut = () => {
    setIsDropdownVisible(false);
    navigation.navigate("Login");
  };
  return (
    <View style={styles.dropdownContainer}>
      <View style={styles.Listcontainer}>
        <TouchableOpacity
          style={{ flexDirection: "row", backgroundColor: "#fff" }}
          onPress={() => logOut()}
        >
          <View style={[styles.centerElement, { width: 100 }]}>
            <View style={{ padding: 0 }}>
              <IconButton
                onPress={() => logOut()}
                icon={(props) => <Icon name="sign-out" {...props} />}
              />
            </View>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexShrink: 1,
              width: 100,
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 15 }}>LogOut</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBarDropDown;
