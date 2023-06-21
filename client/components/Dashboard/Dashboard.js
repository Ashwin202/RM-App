import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomDial from '../CustomDial/CustomDial'
import LoginPage from '../LoginForm/LoginForm'
import Icon from 'react-native-vector-icons/FontAwesome';

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function Dashboard() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Custom Dial" options={{ tabBarIcon: ({ color, size }) => (<Icon name="phone" size={22} color="black" />) }} component={CustomDial} />
            <Tab.Screen name="Inbox" options={{ tabBarIcon: ({ color, size }) => (<Icon name="inbox" size={22} color="black" />) }} component={SettingsScreen} />
            <Tab.Screen name="Contacts" options={{ tabBarIcon: ({ color, size }) => (<Icon name="address-book" size={22} color="black" />) }} component={LoginPage} />
        </Tab.Navigator>
    );
}