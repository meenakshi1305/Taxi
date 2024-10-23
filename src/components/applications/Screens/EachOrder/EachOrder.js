import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Divider } from "react-native-paper";
import {
  MaterialIcons,
  Octicons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const dimensionWindow = Dimensions.get("window");
const dimensionScreen = Dimensions.get("screen");

export default function EachOrder() {
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
          <Text style={styles.heading}>Orders</Text>
        </View>
        <Divider style={{elevation:5,marginTop:5,marginBottom:10}}/>
      <View style={styles.currentEarningsContainer}>
        <View style={{ justifyContent: "center" }}>
          <View>
            <FontAwesome
              name="cab"
              size={25}
              style={{ color: "black", marginRight: 5, marginTop: 4 }}
            />
            <Text style={{ fontWeight: "bold", padding: 1, fontSize: 20, marginTop: 2 }}>
              Extra Rs 29 /-
            </Text>
          </View>
          <Divider style={{ elevation: 5, marginTop: 5, marginBottom: 10 }} />
          <View style={styles.locationContainer}>
            <View style={styles.iconWithLine}>
              <Octicons
                name="dot-fill"
                size={20}
                style={{ color: "red", }}
              />
              <View style={styles.verticalLine} />
              <Octicons
                name="location"
                size={20}
                style={{ color: "green", marginTop: 8 }}
              />
            </View>
            <View style={styles.locationDetails}>
              <View style={styles.locationItem}>
                <Text style={{ fontWeight: "500", padding: 1, fontSize: 13 }}>
                  Pickup in 1.6km
                </Text>
                <Text style={{ fontWeight: "bold", padding: 1, fontSize: 15, marginTop: 2 }}>
                  Periyar
                </Text>
                <Text style={{ color: 'grey', padding: 1, fontSize: 13, marginTop: 4 }}>
                  8b, Vaniyar 2nd street, Nethaji Road, Madurai.
                </Text>
              </View>
              <View style={styles.locationItem}>
                <Text style={{ fontWeight: "500", padding: 1, fontSize: 13 }}>
                  Drop-off in 3.8km
                </Text>
                <Text style={{ fontWeight: "bold", padding: 1, fontSize: 15, marginTop: 2 }}>
                  Aarapalayam
                </Text>
                <Text style={{ color: 'grey', padding: 1, fontSize: 13, marginTop: 4 }}>
                  13/21, Puttuthopu, Arapalayam, Madurai.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.declineButton}>
            <Entypo
                name="cross"
                size={50}
                style={{ color: "grey"}}>
            </Entypo>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    
    
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: "6%",
    color: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  currentEarningsContainer: {
    width: '90%',
    height: "50%",
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    shadowColor: "Black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconWithLine: {
    alignItems: "center",
    marginRight: 10,
  },
  verticalLine: {
    width: 2,
    height: 70,
    backgroundColor: "gray",
    marginVertical: 4,
  },
  locationDetails: {
    flex: 1,
  },
  locationItem: {
    marginBottom: 10,
  },
  buttonContainer: {
   flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
    
    },
  declineButton: {
  marginTop: 8,
  borderRadius: 5,
  height: 60,
  width: 70,
  alignItems: "center",
  justifyContent: 'center',
  shadowColor: "lightgrey", 
  shadowOffset: { width: 0, height: 2 }, 
  shadowOpacity: 0.8,
  shadowRadius: 1,
  elevation: 2, 
},
  acceptButton: {
    marginTop: 8,
    borderRadius: 20,
    height: 60,
    width: 200,
    alignItems: "center",
    backgroundColor: 'gold',
    justifyContent:'center',
  },
  buttonText: {
    color: 'black',
    fontSize:20,
    fontWeight:'bold',
  },
});

