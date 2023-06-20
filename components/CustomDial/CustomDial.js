import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'react-native-axios'

const App = () => {
    const [dialedNumbers, setDialedNumbers] = useState('');

    const handlePress = (number) => {
        setDialedNumbers((prevDialedNumbers) => prevDialedNumbers + number);
    };

    const handleLongPress = () => {
        setDialedNumbers((prevDialedNumbers) => prevDialedNumbers + '+');
    };

    const handleClearPress = () => {
        setDialedNumbers((prevDialedNumbers) => '');
    };

    const handleRemove = () => {
        setDialedNumbers((prevDialedNumbers) => prevDialedNumbers.slice(0, -1));
    };

    const handleCall = async () => {
        if (false) {
            alert('Please insert correct contact number');
            return;
        }
        else {
            const body = {
                number: dialedNumbers
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            try {
                const result = await axios.post(`http://idfc.ryng.local/api/test-call-make`, body, config)

            }
            catch (error) {
                // console.log(error)
                alert(error.message)
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TextInput style={styles.dialedNumbers} value={dialedNumbers} editable={false} />
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
                        <Text style={styles.buttonText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
                        <Text style={styles.buttonText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
                        <Text style={styles.buttonText}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
                        <Text style={styles.buttonText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
                        <Text style={styles.buttonText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
                        <Text style={styles.buttonText}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
                        <Text style={styles.buttonText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
                        <Text style={styles.buttonText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
                        <Text style={styles.buttonText}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}>
                        <Text style={styles.buttonText}>*</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handlePress('0')}
                        onLongPress={() => handleLongPress()}
                        delayLongPress={500}
                    >
                        <Text style={styles.buttonText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('#')}>
                        <Icon name="hashtag" size={14} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>

                    <TouchableOpacity style={styles.callButton} onPress={() => handleCall()}>
                        <Icon name="phone" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    {dialedNumbers.length > 0 && (
                        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove()} onLongPress={handleClearPress} >
                            <Icon name="arrow-left" size={18} color="black" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 40,
    },
    buttonText: {
        fontSize: 24,
        color: 'black',
    },
    dialedNumbers: {
        width: '100%',
        height: 80,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: -95,
        width: 50,
        height: 50,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,

    },
    callButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: '#27ae60',
    },
});

export default App;