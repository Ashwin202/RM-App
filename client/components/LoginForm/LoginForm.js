import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios from 'axios'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { BASE_URL } from '@env'
export default function LoginForm({ navigation }) {
    const [username, setUsername] = useState("nithin@askerbot.com");
    const [password, setPassword] = useState("123456");
    const loginAgent = async () => {
        try {

            return navigation.navigate('Dashboard')
            const body = { username, password, userType: 'agent' }
            const config = { headers: { 'Content-Type': 'application/json' } }
            const result = await axios.post(`${BASE_URL}/api/login`, body, config)
            if (result.data.error)
                alert("Invalid Credentials")
            else
                navigation.navigate('Dashboard')
        }
        catch (error) {
            alert("Failed to Login")
            alert(error.message)
        }

    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/img/ryng8_red.png')} />
            <StatusBar style="auto" />


            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    value={username}
                    onChangeText={(email) => setUsername(email)}
                />

                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity onPress={() => loginAgent()} style={styles.loginBtn}>
                <Text style={styles.loginText}> AGENT LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        width: "44%",
        height: 45,
    },
    inputView: {
        borderRadius: 5,
        width: "80%",
    },
    TextInput: {
        width: '100%',
        height: 50,
        flex: 1,
        padding: 12,
        backgroundColor: "#f5f5f5",
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        outlineStyle: 'none',
    },
    loginBtn: {
        width: "80%",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F22F46",
    },
    loginText: {
        color: "#fff",
        fontSize: 20
    }
});