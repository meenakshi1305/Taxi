import React, { useCallback, useState, useEffect ,useRef} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  FlatList,
  Switch,
} from "react-native";
import { Avatar, Divider, Snackbar } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import * as Updates from "expo-updates";
import { i18n } from "../../../i18n";

const dimensionWindow = Dimensions.get("window");

export default function notifications() {
  const navigation = useNavigation();
  const [isRideEnabled, setIsRideEnabled] = useState(false);
  const panelRef = useRef(null);
  const taxDeduction = [
    {
      id: 1,
      heading: "Tax Deducted",
      title: "Balance update : Rs.1.45 deducted ",
      time: "10:30 PM",
    },
    {
      id: 2,
      heading: "Tax Deducted",
      title: "Balance update : Rs.2.05 deducted ",
      time: "11:10 PM",
    },
    {
      id: 3,
      heading: "Tax Deducted",
      title: "Balance update : Rs.3.00 deducted ",
      time: "12:48 PM",
    },
    {
      id: 4,
      heading: "Tax Deducted",
      title: "Balance update : Rs.3.25 deducted ",
      time: "1:17 PM",
    },
    {
      id: 5,
      heading: "Tax Deducted",
      title: "Balance update : Rs.2.45 deducted ",
      time: "2:22 PM",
    },
  ];
  const rendertaxDeduction = ({ item }) => (
    <View style={styles.taxContainer}>
      <View style={styles.taxHeader}>
      <Entypo
            name="message"
            size={20}
            style={{ color: "#3062b3",marginTop:2, }}
          />
        <Text style={styles.taxHeading}>{item.heading}</Text>
      </View>
      <View>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.taxTime}>{item.time}</Text>
      </View>
    </View>
  );

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
          <Text style={styles.heading}>Notifications</Text>
        </View>
        <Divider style={{elevation:5,marginTop:5,marginBottom:10}}/>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",

          }}
        >
          <Text style={{ fontSize: 14}}>
           Enable push notifications for new ride
          </Text>
          <Switch
            onValueChange={(e) => {
              setIsRideEnabled(e);
            }}
            value={isRideEnabled}
            style={{
              marginLeft: 10,
            }}
          />
        </View>
        <Divider style={{elevation:5,marginTop:5,marginBottom:10}}/>
        <ScrollView>
        <View>
        <Text style={{ fontSize: 20,marginLeft: "5%",fontWeight:'bold'}}>Today</Text>
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
    marginTop:10,
    padding: 10,
    backgroundColor:'#DAFFFF',
  },
  taxHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:2,
  },
  taxHeading: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft:2,
    marginTop:5,
  },
  taxTime: {
    marginLeft: 2,
    fontSize: 14,
    marginTop:5,
  },
});
