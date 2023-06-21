import * as React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomDial from '../CustomDial/CustomDial'
import LoginPage from '../LoginForm/LoginForm'
import Icon from 'react-native-vector-icons/FontAwesome';

function InboxScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Inbox content</Text>
        </View>
    );
}

function ContactScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Contact content</Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

export default function Dashboard() {
    return (
        <Tab.Navigator tabBarPosition="bottom" independent={true}>
            <Tab.Screen name="Custom Dial" options={{ tabBarIcon: ({ color, size }) => (<Icon name="phone" size={22} color="black" />) }} component={CustomDial} />
            <Tab.Screen name="Inbox" options={{ tabBarIcon: ({ color, size }) => (<Icon name="inbox" size={22} color="black" />) }} component={InboxScreen} />
            <Tab.Screen name="Contacts" options={{ tabBarIcon: ({ color, size }) => (<Icon name="address-book" size={22} color="black" />) }} component={ContactScreen} />
        </Tab.Navigator>
    );
}