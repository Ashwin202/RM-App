import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginForm from "./components/LoginForm/LoginForm.js";
import UserDetailsDropdown from "./components/TopBarDropDown/TopBarDropDown.js";
import Icon from "react-native-vector-icons/FontAwesome";
import ContactList from "./components/campaign/contactList";

import {
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "@react-native-material/core";

const Stack = createStackNavigator();

const App = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="ContactDetails" component={ContactList} />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={({ navigation, route }) => ({
            headerShown: true,
            headerLeft: () => (
              <Image
                source={require("./assets/img/logo.png")}
                style={{ height: 20, width: 20, marginLeft: 10 }}
              />
            ),
            headerTitle: (props) => (
              <Text variant="h6" style={{ marginLeft: 2 }}>
                Dashboard
              </Text>
            ),
            headerRight: () => (
              <>
                <TouchableOpacity>
                  <IconButton
                    onPress={() => toggleDropdown()}
                    icon={(props) => <Icon name="ellipsis-v" {...props} />}
                  />
                  {isDropdownVisible && (
                    <UserDetailsDropdown
                      navigation={navigation}
                      isDropdownVisible={isDropdownVisible}
                      setIsDropdownVisible={setIsDropdownVisible}
                    />
                  )}
                </TouchableOpacity>
              </>
            ),
          })}
        />

      

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
