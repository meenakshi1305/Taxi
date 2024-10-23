import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { Divider } from "react-native-paper";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";

const dimensionWindow = Dimensions.get("window");

export default function Instructions() {
  const navigation = useNavigation();
  const [isRideEnabled, setIsRideEnabled] = useState(false);
  const panelRef = useRef(null);
  const videoRef = useRef(null);

  const taxDeduction = [
    {
      id: 1,
      heading: "Upload Pan or Aadhar card",
      title:
        "Hello Captain! According to the new government budget, we are going to cut a 5% tax on every income you make through Reevar from Sept 5. You can save 5% by uploading your PAN or Aadhar.",
      time: "10:30 PM",
    },
    {
      id: 2,
      heading: "Upload Pan or Aadhar card",
      title:
        "Hello Captain! According to the new government budget, we are going to cut a 5% tax on every income you make through Reevar from Sept 5. You can save 5% by uploading your PAN or Aadhar.",
      time: "10:30 PM",
    },
    {
      id: 3,
      heading: "Upload Pan or Aadhar card",
      title:
        "Hello Captain! According to the new government budget, we are going to cut a 5% tax on every income you make through Reevar from Sept 5. You can save 5% by uploading your PAN or Aadhar.",
      time: "10:30 PM",
    },
    {
      id: 4,
      heading: "Upload Pan or Aadhar card",
      title:
        "Hello Captain! According to the new government budget, we are going to cut a 5% tax on every income you make through Reevar from Sept 5. You can save 5% by uploading your PAN or Aadhar.",
      time: "10:30 PM",
    },
    {
      id: 5,
      heading: "Upload Pan or Aadhar card",
      title:
        "Hello Captain! According to the new government budget, we are going to cut a 5% tax on every income you make through Reevar from Sept 5. You can save 5% by uploading your PAN or Aadhar.",
      time: "10:30 PM",
    },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
  };

  const rendertaxDeduction = ({ item }) => (
    <View style={styles.taxContainer}>
      <View style={styles.taxHeader}>
        <Entypo
          name="message"
          size={20}
          style={{ color: "#3062b3", marginTop: 2 }}
        />
        <Text style={styles.taxHeading}>{item.heading}</Text>
      </View>
      <View>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.taxTime}>{item.time}</Text>
      </View>
      <View>
      <Video
          ref={videoRef}
          source={{
            uri: "https://www.w3schools.com/html/mov_bbb.mp4",
          }}
          style={styles.backgroundVideo}
          useNativeControls
          resizeMode="contain"
          isLooping
          onError={(e) => console.log("Error:", e)}
        />
        <Image
        source={{ uri: 'mini.jpg'}}
        style={styles.image}
      />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: "5%" }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ left: 0, top: 0 }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={20}
            color="black"
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Instructions</Text>
      </View>
      <Divider style={{ elevation: 5, marginTop: 5, marginBottom: 10 }} />
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        ></View>
        <View>
          <Text
            style={{ fontSize: 20, marginLeft: "5%", fontWeight: "bold" }}
          >
            Today
          </Text>
          <FlatList
            data={taxDeduction}
            renderItem={rendertaxDeduction}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          />
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
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: "6%",
    color: "black",
  },
  itemText: {
    fontSize: 14,
    paddingTop: 5,
  },
  taxContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#DAFFFF",
  },
  taxHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  taxHeading: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 2,
    marginTop: 5,
  },
  taxTime: {
    marginLeft: 2,
    fontSize: 14,
    marginTop: 5,
  },
  backgroundVideo: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', 
  },
});
