import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import {
    Button,
    Divider,
    Menu,
    Provider,
    BottomNavigation,
    Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const CallWindow = () => {
    const [visible, setVisible] = useState(false);
    const [selectedDisposition, setSelectedDisposition] = useState('');
    const [index, setIndex] = useState(0);

    const handleDispose = () => {
        // Logic for dispose button
    };

    const handleRedial = () => {
        // Logic for redial button
    };

    const handleMenuOpen = () => {
        setVisible(true);
    };

    const handleMenuClose = () => {
        setVisible(false);
    };

    const handleMenuItemSelect = (value) => {
        setSelectedDisposition(value);
        setVisible(false);
    };

    const handleTabChange = (tabIndex) => {
        setIndex(tabIndex);
    };

    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                {/* Top button bar */}
                <View style={styles.topContainer}>
                    <Text style={{ fontSize: 28, color: '#393E41' }}>Arun Raj</Text>
                    <Text style={{ fontSize: 14, color: '#393E41' }}>#12345</Text>
                </View>
                <View style={styles.buttonBar}>
                    <Button
                        style={[
                            styles.buttonBarButtons,
                            index === 0 && styles.activeButton,
                        ]}
                        onPress={() => handleTabChange(0)}>
                        <Icon name="phone" size={14} color="#393E41" />
                    </Button>
                    <Button
                        style={[
                            styles.buttonBarButtons,
                            index === 1 && styles.activeButton,
                        ]}
                        onPress={() => handleTabChange(1)}>
                        <Icon name="inbox" size={14} color="#393E41" />
                    </Button>
                    <Button
                        style={[
                            styles.buttonBarButtons,
                            index === 2 && styles.activeButton,
                        ]}
                        onPress={() => handleTabChange(2)}>
                        <Icon name="whatsapp" size={14} color="#393E41" />
                    </Button>
                    <Button
                        style={[
                            styles.buttonBarButtons,
                            index === 3 && styles.activeButton,
                        ]}
                        onPress={() => handleTabChange(3)}>
                        <Icon name="star-o" size={14} color="#393E41" />
                    </Button>
                    <Button
                        style={[
                            styles.buttonBarButtons,
                            index === 4 && styles.activeButton,
                        ]}
                        onPress={() => handleTabChange(4)}>
                        <Icon name="ellipsis-v" size={14} color="#393E41" />
                    </Button>
                </View>

                {/* Content */}
                <View style={styles.tabContainer}>
                    {index === 0 && (
                        <View style={{ height: '100%' }}>
                            <View style={styles.textTabBar}>
                                <Text style={{ ...styles.textBarTabs, fontWeight: 'bold' }}>
                                    About
                                </Text>
                                <Text style={styles.textBarTabs}>Notes</Text>
                                <Text style={styles.textBarTabs}>Call History</Text>
                                <Text style={styles.textBarTabs}>To Do List</Text>
                                <Text style={styles.textBarTabs}>To Do List</Text>
                            </View>

                            <View style={{ height: '100%' }}>
                                <View style={styles.card}>
                                    <Text style={styles.title}>Primary Contact #</Text>
                                    <Text style={styles.content}>+919995885021</Text>
                                </View>
                                <View style={styles.tabContainer}>
                                    <View style={{ ...styles.card, height: '90%' }}>
                                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                            <View style={styles.custVaues}>
                                                <Text style={styles.title}>Custom Field 1</Text>
                                                <Text style={styles.content}>Meta data 1</Text>
                                            </View>
                                            <View style={styles.custVaues}>
                                                <Text style={styles.title}>Custom Field 2</Text>
                                                <Text style={styles.content}>Meta data 2</Text>
                                            </View>
                                            <View style={styles.custVaues}>
                                                <Text style={styles.title}>Custom Field 4</Text>
                                                <Text style={styles.content}>Meta data 4</Text>
                                            </View>
                                            <View style={styles.custVaues}>
                                                <Text style={styles.title}>Custom Field 5</Text>
                                                <Text style={styles.content}>Meta data 5</Text>
                                            </View>
                                            <View style={styles.custVaues}>
                                                <Text style={styles.title}>Custom Field 6</Text>
                                                <Text style={styles.content}>Meta data 6</Text>
                                            </View>
                                            <View style={styles.custVaues}>
                                                <Text style={styles.title}>Custom Field 7</Text>
                                                <Text style={styles.content}>Meta data 7</Text>
                                            </View>
                                            <View style={styles.custVaues}>
                                                <Text style={styles.title}>Custom Field 8</Text>
                                                <Text style={styles.content}>Meta data 8</Text>
                                            </View>
                                            <View style={styles.custVaues}>
                                                <Text style={styles.title}>Custom Field 9</Text>
                                                <Text style={styles.content}>Meta data 9</Text>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    {index === 1 && <Text>Inbox Page</Text>}
                    {index === 2 && <Text>Whatsapp Page</Text>}
                    {index === 3 && <Text>Favourite Page</Text>}
                    {index === 4 && <Text>Profile Page</Text>}
                </View>

                {/* Bottom footer */}
                <View style={styles.footer}>
                    <View style={styles.footerSection}>
                        <Menu
                            visible={visible}
                            onDismiss={handleMenuClose}
                            anchor={
                                <Button
                                    mode="outlined"
                                    onPress={handleMenuOpen}
                                    style={styles.dispositionButton}>
                                    <Text style={{ color: '#393E41' }}>
                                        {selectedDisposition ? selectedDisposition : 'Disposition'}
                                    </Text>
                                </Button>
                            }>
                            <Menu.Item
                                onPress={() => handleMenuItemSelect('Disposition 1')}
                                title="Disposition 1"
                            />
                            <Menu.Item
                                onPress={() => handleMenuItemSelect('Disposition 2')}
                                title="Disposition 2"
                            />
                            <Menu.Item
                                onPress={() => handleMenuItemSelect('Disposition 3')}
                                title="Disposition 3"
                            />
                        </Menu>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.footerSection}>
                        <Button
                            mode="contained"
                            onPress={handleDispose}
                            color="#fff"
                            style={{
                                ...styles.footerButton,
                                backgroundColor: '#27AE60',
                                color: 'white',
                            }}>
                            <Text style={{ color: '#fff' }}>Dispose</Text>
                        </Button>
                        <Button
                            mode="contained"
                            onPress={handleRedial}
                            style={{ ...styles.footerButton, backgroundColor: '#FF9100' }}>
                            <Text style={{ color: '#fff' }}>Redial</Text>
                        </Button>
                    </View>
                </View>

            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        marginHorizontal: 10,
        marginTop: 20
    },
    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'f0f0f0',
    },
    activeButton: {
        backgroundColor: '#FF9100',
    },
    textTabBar: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    buttonBarButtons: {
        padding: 0,
        borderRadius: 5,
        backgroundColor: '#DCDCDC',
    },
    textBarTabs: {
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#393E41',
    },
    tabContainer: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    footerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: '70%',
        marginHorizontal: 10,
    },
    dispositionButton: {
        borderRadius: 5,
        flex: 1,
    },
    footerButton: {
        borderRadius: 5,
        marginLeft: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#252525',
    },
    content: {
        fontSize: 16,
        color: '#252525',
    },
    custVaues: {
        marginBottom: 20
    }
});

export default CallWindow;
