import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomDial from './components/CustomDial/CustomDial'
import Icon from 'react-native-vector-icons/FontAwesome';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
function LogSettings() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Custom Dial" options={{tabBarIcon: ({ color, size }) => (<Icon name="phone" size={22} color="black" />)}} component={CustomDial} />
        <Tab.Screen name="Inbox" options={{tabBarIcon: ({ color, size }) => (<Icon name="inbox" size={22} color="black" />)}} component={SettingsScreen} />
        <Tab.Screen name="Contacts" options={{tabBarIcon: ({ color, size }) => (<Icon name="address-book" size={22} color="black" />)}} component={LogSettings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}