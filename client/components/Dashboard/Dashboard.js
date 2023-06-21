import React, { useState } from "react";
import { Text, View, Switch, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomDial from "../CustomDial/CustomDial";
import LoginPage from "../LoginForm/LoginForm";
import Icon from "react-native-vector-icons/FontAwesome";

function ContactScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Contact content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Tab = createMaterialTopTabNavigator();

export default function Dashboard() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  function InboxScreen() {
    return (
      <View style={styles.container}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  }

  return (
    <Tab.Navigator tabBarPosition="bottom" independent={true}>
      <Tab.Screen
        name="Custom Dial"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="phone" size={22} color="black" />
          ),
        }}
        component={CustomDial}
      />
      <Tab.Screen
        name="Inbox"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="inbox" size={22} color="black" />
          ),
        }}
        component={InboxScreen}
      />
      <Tab.Screen
        name="Contacts"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="address-book" size={22} color="black" />
          ),
        }}
        component={ContactScreen}
      />
    </Tab.Navigator>
  );
}
