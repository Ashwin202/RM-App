import React, { useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton } from "@react-native-material/core";
import { Button, Provider } from "react-native-paper";
const tabsData = [
  { id: 1, title: "My Contact Books" },
  { id: 2, title: "Campaign by Org" },
];

const ContactBook = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleEllipsisPress = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <Provider>
      <View style={styles.contactBookContainer}>
        <View style={styles.contactList}>
          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>Ulloor Residence</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contactNumber}>123 contacts</Text>
                <Text style={styles.contactNumber}>96% dialled</Text>
              </View>
            </View>
            <IconButton
              onPress={() => handleEllipsisPress()}
              icon={(props) => (
                <Icon
                  style={styles.verticalEllipsis}
                  name="ellipsis-v"
                  {...props}
                />
              )}
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>Ulloor Residence</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contactNumber}>123 contacts</Text>
                <Text style={styles.contactNumber}>96% dialled</Text>
              </View>
            </View>
            <IconButton
              onPress={() => handleEllipsisPress()}
              icon={(props) => (
                <Icon
                  style={styles.verticalEllipsis}
                  name="ellipsis-v"
                  {...props}
                />
              )}
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>Ulloor Residence</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contactNumber}>123 contacts</Text>
                <Text style={styles.contactNumber}>96% dialled</Text>
              </View>
            </View>
            <IconButton
              onPress={() => handleEllipsisPress()}
              icon={(props) => (
                <Icon
                  style={styles.verticalEllipsis}
                  name="ellipsis-v"
                  {...props}
                />
              )}
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Provider>
  );
};
const Contacts = () => {
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(tabsData[0]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  const handleTabChange = (tabIndex) => {
    setIndex(tabIndex);
  };

  return (
    <Provider>
      <Text style={{ fontSize: 24, color: '#252525', marginLeft: 10, marginTop:3, fontWeight:"bold"}}>
                        Contact Book
                    </Text>
      <View style={styles.container}>
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
            onPress={() => handleTabChange(2)}
          >
            <Text style={{ color: "#fff" }}>+</Text>
          </Button>
        </View>
        <View style={styles.tabBar}>
          {tabsData.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabItem,
                activeTab.id === tab.id && styles.activeTabItem,
              ]}
              onPress={() => handleTabPress(tab)}
            >
              <Text style={styles.tabTitle}>{tab.title}</Text>
              {activeTab.id === tab.id && <View style={styles.activeLine} />}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tabContent}>
          {activeTab.id === 1 && <ContactBook />}
          {activeTab.id === 2 && <Text>Content for Tab 2</Text>}
          {activeTab.id === 3 && <Text>Content for Tab 3</Text>}
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 0,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#F22742",
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#252525",
  },
  activeLine: {
    width: 40,
    height: 0,
    marginTop: 2,
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  contactBookContainer: {
    flex: 1,
    marginTop:0
  },
  contactList: {
    flex: 1,
    marginTop: 0,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  contactAvatar: {
    width: 28,
    height: 28,
    borderRadius: 24,
  },
  contactDetails: {
    marginLeft: 8,
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#252525",
  },
  contactNumber: {
    fontSize: 12,
    color: "#252525",
    marginRight: 12,
  },
  dropdown: {
    position: "absolute",
    width: "40%",
    top: 70,
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownText: {
    fontSize: 14,
    color: "#252525",
  },
  verticalEllipsis: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "f0f0f0",
  },
  activeButton: {
    backgroundColor: "#FF9100",
  },
  buttonBarButtons: {
    padding: 0,
    borderRadius: 5,
    backgroundColor: "#27AE60",
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: "#555",
  },
});

export default Contacts;
