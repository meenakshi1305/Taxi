import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Divider, TextInput } from "react-native-paper";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { i18n } from "../../../i18n";

const dimensionWindow = Dimensions.get("window");
const dimensionScreen = Dimensions.get("screen");

export default function General() {
  const navigation = useNavigation();
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("7397164872");
  const [address, setAddress] = useState(
    "8B, Vaniyar 2nd street,Nethaji Road,Madurai"
  );
  const [email, setEmail] = useState("rmeenakshi821@gmail.com");
  const [gender, setGender] = useState("Female");
  const [selectedLanguage, setSelectedLanguage] = useState(undefined);

  const genderOptions = [
    i18n.t("male"),
    i18n.t("female"),
    i18n.t("notPreferToSay"),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={20}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>{i18n.t("generalSettingLabel")}</Text>
      </View>
      <Divider style={{elevation:5}}/>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.arrowTabA}>
          <View style={{ width: "100%" }}>
            {isEditingPhoneNumber ? (
              <TextInput
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
                mode="outlined"
                label={i18n.t("phoneNumber")}
                right={
                  <TextInput.Icon
                    icon="check"
                    style={{ marginTop: 10 }}
                    onPress={() => setIsEditingPhoneNumber(false)}
                  />
                }
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.itemText}>{i18n.t("phoneNumber")}</Text>
                  <Text style={styles.editText}>{phoneNumber}</Text>
                </View>

                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  style={{ marginTop: 10 }}
                  onPress={() => setIsEditingPhoneNumber(true)}
                />
              </View>
            )}
          </View>
        </View>
        <SelectDropdown
          data={genderOptions}
          onSelect={(selectedItem, index) => {
            setGender(selectedItem);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.arrowTabA}>
                <View>
                  <Text style={styles.itemText}>{i18n.t("gender")}</Text>
                  <Text style={styles.editText}>{gender}</Text>
                </View>
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <View style={styles.arrowTabA}>
          <View style={{ width: "100%" }}>
            {isEditingAddress ? (
              <TextInput
                style={[styles.textInput, { height: 80 }]}
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={4}
                mode="outlined"
                label={i18n.t("address")}
                right={
                  <TextInput.Icon
                    icon="check"
                    style={{ marginTop: 10 }}
                    onPress={() => setIsEditingAddress(false)}
                  />
                }
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 80,
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.itemText}>{i18n.t("address")}</Text>
                  <Text style={styles.editText}>{address}</Text>
                </View>

                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  style={{ marginTop: 10 }}
                  onPress={() => setIsEditingAddress(true)}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.arrowTabA}>
          <View style={{ width: "100%" }}>
            {isEditingEmail ? (
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                label={i18n.t("emailId")}
                right={
                  <TextInput.Icon
                    icon="check"
                    style={{ marginTop: 10 }}
                    onPress={() => setIsEditingEmail(false)}
                  />
                }
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.itemText}>{i18n.t("emailId")}</Text>
                  <Text style={styles.editText}>{email}</Text>
                </View>

                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  style={{ marginTop: 10 }}
                  onPress={() => setIsEditingEmail(true)}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
  },
  backButton: {
    left: 0,
    top: 0,
  },
  backIcon: {
    marginTop: "6%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: "6%",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 100,
  },
  arrowTabA: {
    height: 100,
    width: "90%",
    marginLeft: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  editText: {
    color: "grey",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  textInput: {
    height: 50,
    width: "100%",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
    paddingLeft: 5,
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: dimensionWindow.width / 4,
  },
  dropdownItemStyle: {
    width: 300,
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
