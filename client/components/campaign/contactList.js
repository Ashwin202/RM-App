import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    Button,
    Provider,
    Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import { BASE_URL } from '@env'
import moment from 'moment'

const CallWindow = ({ route }) => {
    console.log({route})
    const campaigID = route.params?.campaigID

    const [visible, setVisible] = useState(false);
    const [selectedDisposition, setSelectedDisposition] = useState('');
    const [index, setIndex] = useState(0);
    const [calls, setCalls] = useState([])
    const [campaignInfo, setCampaignInfo] = useState([])

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



    useEffect(() => {
        const fetchCalls = async () => {
            const { data } = await axios.get(`${BASE_URL}/api/campaign/${campaigID}/calls`)
            setCalls(data?.data.calls)
            setCampaignInfo(data?.data.campaignInfo)
        }
        fetchCalls()
    }, [])

    const { height } = Dimensions.get('window')
    return (
        <Provider>
            <View style={styles.container}>
                {/* Top button bar */}
                <View style={styles.topContainer}>
                    <Icon name="gift" size={28} color="#393E41" />
                    <Text style={{ fontSize: 24, color: '#393E41', marginLeft: 5 }}>
                        {campaignInfo.name}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
                    <Text
                        style={{ flexBasis: '50%', marginVertical: 5, fontWeight: 'bold', color: '#252525' }}>
                        Contacts: <Text style={{ fontWeight: 'normal', color: '#252525' }}>{campaignInfo.num_calls}</Text>
                    </Text>
                    <Text
                        style={{ flexBasis: '50%', marginVertical: 5, fontWeight: 'bold', color: '#252525' }}>
                        Owner: <Text style={{ fontWeight: 'normal', color: '#252525' }}>{campaignInfo.createdBy}</Text>
                    </Text>
                    <Text
                        style={{ flexBasis: '50%', marginVertical: 5, fontWeight: 'bold', color: '#252525' }}>
                        Connectivity: <Text style={{ fontWeight: 'normal', color: '#252525' }}>25%</Text>
                    </Text>
                    <TouchableOpacity style={{ flexBasis: '50%', marginVertical: 5 }}>
                        <Text style={{ color: '#28A4DB' }}>Show more</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonBar}>
                    <View style={styles.searchContainer}>
                        <Icon name="search" style={styles.icon} />
                        <TextInput
                            placeholder="Search"
                            style={styles.input}
                        // Other props you may need
                        />
                    </View>
                    <Button
                        style={[
                            styles.buttonBarButtons,
                            index === 2 && styles.activeButton,
                        ]}
                        onPress={() => handleTabChange(2)}>
                        <Text style={{ color: '#fff' }}>+</Text>
                    </Button>
                </View>

                {/* Content */}
                <View style={styles.listContainer}>
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: height }}>
                            {!calls.length && <p>No Data Available</p>}
                            {calls.map((contact, index) => (
                                <View key={index} style={styles.contactItem}>
                                    <View style={styles.leftContainer}>
                                        <Text style={styles.contactName}>{contact.cust1 || contact.ph_num}</Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                            <Text style={styles.lastCallCount}>
                                                {contact?.log_count}{' '}
                                                {contact?.log_count === 1 ? 'call' : 'calls'}
                                            </Text>
                                            <Text style={styles.lastCallTime}>
                                                {contact?.call_started ? moment(contact?.call_started).fromNow() : ''}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.rightContainer}>
                                        <Ionicons
                                            name="call-outline"
                                            size={24}
                                            color="green"
                                            style={styles.actionIcons}
                                        />
                                        <Ionicons
                                            name="logo-whatsapp"
                                            size={24}
                                            color="green"
                                            style={styles.actionIcons}
                                        />
                                        <Ionicons
                                            name="ellipsis-vertical"
                                            size={24}
                                            color="gray"
                                            style={styles.actionIcons}
                                        />
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        marginHorizontal: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
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
    buttonBarButtons: {
        padding: 0,
        borderRadius: 5,
        backgroundColor: '#27AE60',
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
        color: '#555',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E8E6',
        paddingBottom: 10
    },
    leftContainer: {
        flex: 1,
        marginRight: 16,
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#393E41'
    },
    lastCallCount: {
        fontSize: 12,
        color: '#252525',
        marginBottom: 2,
    },
    lastCallTime: {
        fontSize: 12,
        color: '#252525',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcons: {
        marginHorizontal: 5,
    },
});

export default CallWindow;
