import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Avatar, Dialog, TextInput, Button, Divider } from "react-native-paper";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Accordion from "../../Accordian/Accordian";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n } from "../../../i18n";
export default function IdCard({ dpName }) {
  const [image, setImage] = useState(undefined);
  const [isCollapsed, setIsCollapsed] = useState([true, true]);
  const navigation = useNavigation();

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
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "start",
          margin: "1%",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ left: 0, top: 0 }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={20}
            color="black"
            style={{ marginTop:24, marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}> {i18n.t("reevarIDcard")}</Text>
      </View>
      <Divider style={{elevation:5}}/>
      <View
        style={{
          height: "70%",
          margin: 20,
          borderRadius: 20,
          paddingTop: 20,
          borderWidth: 1,
          borderColor: "lightgrey",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "green" }}>
          Reevar
          </Text>
          <Text
            style={{
              fontWeight: 400,
              fontSize: 15,
              paddingTop: 3,
              marginLeft: 7,
            }}
          >
             {i18n.t("captain")}
          </Text>
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
        >
          <Avatar.Image
            size={120}
            source={{
              uri: image
                ? image
                : dpName
                ? process.env.REACT_APP_VIDEO_BASE_URL + "/v/dp/" + dpName
                : "",
            }}
          />
        </View>
        <View style={{ flexDirection: "row", margin: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>Dinesh Lal</Text>
          <MaterialCommunityIcons
            name="check-decagram"
            size={32}
            style={{ color: "green", paddingLeft: 10 }} // need to update color based on status of new captain
          />
        </View>

        <Divider />
        <View style={{flexDirection:'row'}}>
        <View>
        <Text
            style={{
              marginLeft: "5%",
              marginTop: "5%",
              fontWeight: "bold",
              fontSize: 15,
              color: "grey",
            }}
          >
           {i18n.t("reevarID")}
          </Text>
          <Text
            style={{
              marginLeft: "5%",
              marginTop: "2%",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
           #812849
          </Text>
          <Text
            style={{
              marginLeft: "5%",
              marginTop: "5%",
              fontWeight: "bold",
              fontSize: 15,
              color: "grey",
            }}
          >
            {i18n.t("mobileNumber")}
          </Text>
          <Text
            style={{
              marginLeft: "5%",
              marginTop: "2%",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            +91 73971 64872
          </Text>
        </View>
          <View>
          <Text
            style={{
              marginLeft: "5%",
              marginTop: "5%",
              fontWeight: "bold",
              fontSize: 15,
              color: "grey",
            }}
          >
           {i18n.t("DOJ")}
          </Text>
          <Text
            style={{
              marginLeft: "5%",
              marginTop: "2%",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
           16/07/2024
          </Text>
            <Text
              style={{
                marginLeft: "5%",
                marginTop: "5%",
                fontWeight: "bold",
                fontSize: 15,
                color: "grey",
              }}
            >
              {i18n.t("licenseNumber")}
            </Text>
            <Text
              style={{
                marginLeft: "5%",
                marginTop: "2%",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              +91 73971 64872
            </Text>
          </View>
          </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 45,
              width: "60%",
              margin: "5%",
              borderRadius: 6,
              backgroundColor: "#F3F7F9",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2, // Added borderWidth property
              borderColor: "black",
            }}
          >
            <MaterialCommunityIcons name="share" size={24} color="black" />
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{i18n.t("share")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    height: "25%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 18,
    marginBottom: 10,
  },
  header: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 20,
    color: "grey",
  },
});
