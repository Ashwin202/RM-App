import * as React from "react";
import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomDial from "../CustomDial/CustomDial";
import LoginPage from "../LoginForm/LoginForm";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

function LogScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Log content</Text>
		</View>
	);
}

function ContactScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Contact content</Text>
		</View>
	);
}

const Tab = createMaterialTopTabNavigator();

export default function Dashboard() {
	return (
		<Tab.Navigator
			tabBarPosition="bottom"
			independent={true}
			tabBarOptions={{
				style: {
					height: 50,
					backgroundColor: "white",
					paddingBottom: 0,
					paddingHorizontal: 5,
				},
				indicatorStyle: {
					backgroundColor: "red",
				},
				tabStyle: {
					padding: 0,
					margin: 0,
				},
			}}
		>
			<Tab.Screen
				name="Contacts"
				options={{
					tabBarIcon: ({ color, size }) => (
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								padding: 0,
								margin: 0,
							}}
						>
							<FontAwesome name="address-book" size={16} color="black" />
						</View>
					),
					tabBarLabelStyle: { fontSize: 12, padding: 0, margin: 0 },
				}}
				component={ContactScreen}
			/>
			<Tab.Screen
				name="log"
				options={{
					tabBarIcon: ({ color, size }) => (
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								padding: 0,
								margin: 0,
							}}
						>
							<FontAwesome name="inbox" size={16} color="black" />
						</View>
					),
					tabBarLabelStyle: { fontSize: 12, padding: 0, margin: 0 },
				}}
				component={LogScreen}
			/>
			<Tab.Screen
				name="Keypad"
				options={{
					tabBarIcon: ({ color, size }) => (
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								padding: 0,
								margin: 0,
							}}
						>
							<Entypo name="dial-pad" size={16} color="black" />
						</View>
					),
					tabBarLabelStyle: { fontSize: 12, padding: 0, margin: 0 },
				}}
				component={CustomDial}
			/>
		</Tab.Navigator>
	);
}
