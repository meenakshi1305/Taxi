import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  DevSettings,
} from "react-native";
import { Avatar, Divider, Snackbar } from "react-native-paper";
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  SimpleLineIcons,
  Ionicons,
  FontAwesome6,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import * as Updates from "expo-updates";
import { i18n } from "../../../i18n";

const dimensionWindow = Dimensions.get("window");

export default function Profile({ dpName }) {
  useEffect(() => {
    async function setLocale() {
      let selectedLanguageAsync = await AsyncStorage.getItem("localeLanguage");
      setSelectedLanguage(selectedLanguageAsync);
    }
    setLocale();
  }, []);

  const [image, setImage] = useState(undefined);
  // const [isCollapsed, setIsCollapsed] = useState([true, true]);
  // const [showDialog, setShowDialog] = useState(false);
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(undefined);
  const [visible, setVisible] = useState(false);

  const languages = [
    { title: "English", locale: "en" },
    { title: "தமிழ்", locale: "ta" },
  ];

  const pickImage = async () => {
    let userId = await AsyncStorage.getItem("estUserId");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
      quality: 1,
    }).then((res) => {
      console.log("res.ass> " + res.assets[0].uri);
      setImage(res.assets[0].uri);
      var fileFixed = {
        name: res.assets[0].fileName,
        size: res.assets[0].fileSize,
        uri: res.assets[0].uri,
        type: "application/" + res.assets[0].type,
      };
      var re = /(?:\.([^.]+))?$/;
      var ext = re.exec(res.assets[0].fileName)[1];
      const data = new FormData();
      data.append("file", fileFixed);
      data.append("userid", userId);
      data.append("ext", ext);
      axios({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL + "/user/dp/upload",
        data: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {})
        .catch((e) => {
          console.log("upload exception" + e);
        });
    });
  };

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <SafeAreaView style={styles.container}>
       <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "5%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ left: 0, top: 0 }}
          >
            <MaterialIcons name="arrow-back-ios" size={20} color="Black" style={{marginTop:10}}/>
          </TouchableOpacity>
          <Text style={styles.heading}>{i18n.t("myprofileLabel")}</Text>
        </View>
        <Divider style={{elevation:5,marginTop:5,marginBottom:10}}/>
        <ScrollView>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar.Image
              size={100}
              style={{ marginLeft: 20 }}
              source={require("../../../../../assets/avatar.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: 250,
              marginBottom: "5%",
              marginTop: "5%",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
              >
                5
              </Text>
              <Text style={{ color: "grey" }}>{i18n.t("ratings")}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
              >
                127
              </Text>
              <Text style={{ color: "grey" }}>{i18n.t("orders")}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
              >
                4.4
              </Text>
              <Text style={{ color: "grey" }}>{i18n.t("year")}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            marginLeft: "7%",
            fontWeight: "bold",
            fontSize: 18,
            paddingTop: 10,
          }}
        >
          Dinesh Lal
        </Text>
        </View>
        <Text style={{ marginLeft: "7%", fontSize: 15 }}>#812849</Text>
        <TouchableOpacity
          style={styles.arrowTabA}
          onPress={() => navigation.navigate("General")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="settings-outline"
              size={28}
              style={{ color: "grey" }}
            />
            <Text style={{ fontSize: 18 ,paddingLeft: 20 }}>
              {i18n.t("generalSettingLabel")}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={17}
              style={{ color: "grey", paddingRight : 20 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowTabA}
          onPress={() => navigation.navigate("Incentive")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
              name="gift-outline"
              size={28}
              style={{ color: "grey" }}
            />
            <Text style={{fontSize: 18,paddingLeft: 20  }}>
            {i18n.t("incentive")}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={17}
              style={{ color: "grey", paddingRight: 20 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowTabA}
          onPress={() => navigation.navigate("Earnings")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
              name="currency-rupee"
              size={28}
              style={{ color: "grey" }}
            />
            <Text style={{ fontSize: 18,paddingLeft: 20  }}>
            {i18n.t("earnings")}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={17}
              style={{ color: "grey", paddingRight: 20 }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: 20,
            marginLeft: 3,
            marginRight: 3,
          }}
        >
          <TouchableOpacity
            style={styles.arrowTab}
            onPress={() => navigation.navigate("IdCard")}
          >
            <MaterialIcons
              name="person-outline"
              size={30}
              color="#3062b3"
              style={{}}
            />
            <Text style={styles.itemText}>{i18n.t("ID")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.arrowTab}
            onPress={() => navigation.navigate("Documents")}
          >
            <SimpleLineIcons name="docs" size={30} color="#3062b3" style={{}} />
            <Text style={styles.itemText}>{i18n.t("documents")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.arrowTab}
          >
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              size={30}
              color="#3062b3"
              style={{}}
            />
            <Text style={styles.itemText}>{i18n.t("work")}</Text>
          </TouchableOpacity>
        </View>
        <Divider style={{ marginTop: "5%" }} />
        <View style={{ marginTop: "5%" }}>
          <Text style={{ marginLeft: "7%", fontWeight: "bold", fontSize: 18 }}>
          {i18n.t("inAppSetting")}
          </Text>

          <SelectDropdown
            data={languages}
            onSelect={(selectedItem, index) => {
              console.log("selectedItem.locale>>" + selectedItem.locale);
              AsyncStorage.setItem("locale", selectedItem.locale);
              AsyncStorage.setItem("localeLanguage", selectedItem.title);
              setTimeout(() => {
                Updates.reloadAsync(); // In production we have to use this..
                // DevSettings.reload();
              }, 1500);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <TouchableOpacity style={styles.arrowTabA}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="language"
                      size={28}
                      style={{ color: "grey" }}
                    />
                    <Text style={{ paddingLeft: 20, fontSize: 18 }}>
                      {i18n.t("languageLabel")}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    {selectedLanguage && (
                      <Text style={{ paddingRight: 15, color: "grey" }}>
                        {selectedLanguage}
                      </Text>
                    )}
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={17}
                      style={{ color: "grey", paddingRight: 20 }}
                    />
                  </View>
                </TouchableOpacity>
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
                    <Text style={styles.dropdownItemTxtStyle}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      {item.locale}
                    </Text>
                  </View>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <TouchableOpacity style={styles.arrowTabA} onPress={() => navigation.navigate("Details")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="notifications-outline"
                size={28}
                style={{ color: "grey" }}
              />
              <Text style={{ paddingLeft: 20, fontSize: 18 }}>
                {i18n.t("detailLabel")}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={17}
                style={{ color: "grey", paddingRight: 20 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowTabA} onPress={onToggleSnackBar}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="customerservice"
                size={28}
                style={{ color: "grey" }}
              />
              <Text style={{ paddingLeft: 20, fontSize: 18 }}>
                {i18n.t("requestCall")}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="call"
                size={20}
                style={{ color: "grey", paddingRight: 20 }}
              />
            </View>
          </TouchableOpacity>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            style={{
              position: "absolute",
              bottom: 10,
              left: dimensionWindow.width / 16,
              width: "85%",
            }}
          >
            {i18n.t("callRequsetSnackbar")}
          </Snackbar>
          <TouchableOpacity style={styles.arrowTabA} onPress={() => navigation.navigate("EachOrder")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="notifications-outline"
                size={28}
                style={{ color: "grey" }}
              />
              <Text style={{ paddingLeft: 20, fontSize: 18 }}>
                Orders
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={17}
                style={{ color: "grey", paddingRight: 20 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.itemLogOut}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="logout" size={24} color="#e34459" style={{}} />
          <Text style={styles.itemLogOutText}>{i18n.t("logOut")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  arrowTabA: {
    paddingLeft: 20,
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowTab: {
    height: 80,
    width: "30%",
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d7d9d7",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: "6%",
    color: "black",
  },
  header: {
    fontSize: 15,
    fontWeight: "700",
    color: "grey",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginLeft: "3%",
    marginRight: "3%",
  },
  itemText: {
    fontSize: 16,
    paddingTop: 5,
    color: "#3062b3",
    fontWeight: "bold",
  },
  itemLogOut: {
    height: 55,
    width: "90%",
    marginLeft: "5%",
    marginBottom: "10%",
    marginTop: "10%",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e34459",
  },
  itemLogOutText: {
    fontSize: 22,
    color: "#e34459",
    fontWeight: "bold",
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
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: dimensionWindow.width / 4,
  },
  dropdownItemStyle: {
    width: 200,
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
