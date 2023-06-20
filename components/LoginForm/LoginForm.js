import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
export default function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginAgent = () => {
        console.log({ username, password })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('./ryng8_red.png')} />
            <StatusBar style="auto" />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Agent"
                    placeholderTextColor="#999999"
                    editable={false}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setUsername(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity onPress={() => loginAgent()} style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
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
        height: 38,
    },
    inputView: {
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 20
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#F22F46"
    },
    loginText: {
        color: "#fff",
        fontSize: 20
    }
});