import React, { useCallback, useState, useEffect ,useRef} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {Divider} from "react-native-paper";
import {
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const dimensionWindow = Dimensions.get("window");

export default function notifications() {
  const navigation = useNavigation();

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
          <Text style={styles.heading}>Details</Text>
        </View>
        <Divider style={{elevation:5,marginTop:5,marginBottom:10}}/>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",

          }}
        >
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("Notifications")}>
          <Text>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("Instructions")}>
          <Text>Instructions</Text>
          </TouchableOpacity>
        </View>
        <Divider style={{elevation:5,marginTop:5,marginBottom:10}}/>
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
  button1:{
    fontSize: 14,
    margin:5,
    borderWidth:1,
    borderColor:'grey',
    height:50,
    width:150,
    alignItems:'center',
    justifyContent:"center",
    borderRadius:10,
  },
  button2:{
    fontSize: 14,
    margin:5,
    borderWidth:1,
    borderColor:'#FFD700',
    backgroundColor:'#FFD700',
    height:50,
    width:150,
    alignItems:'center',
    justifyContent:"center",
    borderRadius:10,
  }
 });
