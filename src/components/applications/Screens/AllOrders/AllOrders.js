import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import { Divider } from "react-native-paper";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const dimensionWindow = Dimensions.get("window");
const dimensionScreen = Dimensions.get("screen");

const currentEarnings = [
  {
    id: 1,
    heading: "Current Earnings",
    title: "Bike Taxi",
    time: "10:30 PM",
    rupee: "27.50",
    completed: true,
    distance: "3.25 km",
    pickup: "123 Main St",
    dropoff: "456 Elm St",
  },
  {
    id: 2,
    heading: "Order 7",
    title: "Bike Taxi",
    time: "11:00 PM",
    rupee: "30.00",
    completed: false,
    distance: "2.75 km",
    pickup: "789 Pine St",
    dropoff: "321 Oak St",
  },
  {
    id: 3,
    heading: "Order 6",
    title: "Bike Taxi",
    time: "11:30 PM",
    rupee: "25.00",
    completed: true,
    distance: "3.50 km",
    pickup: "654 Maple St",
    dropoff: "987 Birch St",
  },
  {
    id: 4,
    heading: "Order 5",
    title: "Bike Taxi",
    time: "12:00 AM",
    rupee: "40.00",
    completed: false,
    distance: "4.00 km",
    pickup: "246 Spruce St",
    dropoff: "135 Cedar St",
  },
  {
    id: 5,
    heading: "Order 4",
    title: "Bike Taxi",
    time: "12:30 AM",
    rupee: "35.00",
    completed: true,
    distance: "3.00 km",
    pickup: "123 Main St",
    dropoff: "456 Elm St",
  },
  {
    id: 6,
    heading: "Order 3",
    title: "Bike Taxi",
    time: "1:00 AM",
    rupee: "25.00",
    completed: true,
    distance: "2.00 km",
    pickup: "789 Pine St",
    dropoff: "321 Oak St",
  },
  {
    id: 7,
    heading: "Order 2",
    title: "Bike Taxi",
    time: "1:30 AM",
    rupee: "70.00",
    completed: true,
    distance: "5.00 km",
    pickup: "654 Maple St",
    dropoff: "987 Birch St",
  },
  {
    id: 8,
    heading: "Order 1",
    title: "Bike Taxi",
    time: "2:00 AM",
    rupee: "45.00",
    completed: true,
    distance: "4.00 km",
    pickup: "246 Spruce St",
    dropoff: "135 Cedar St",
  },
];

export default function AllOrders() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(currentEarnings.map(() => false));

  const toggleExpand = (index) => {
    setExpanded((prevExpanded) =>
      prevExpanded.map((item, i) => (i === index ? !item : item))
    );
  };

  const renderCurrentEarnings = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleExpand(index)}>
      <View style={styles.currentEarningsContainer}>
        <View style={styles.currentEarningsHeader}>
          <Text style={styles.currentEarn}>{item.heading}</Text>
          <Text style={styles.rupeeText}>{item.time}</Text>
        </View>
        <Divider style={styles.currentEarningsDivider} />
        {expanded[index] && (
          <>
            <View style={styles.locationDetails} >
              <Octicons
                name="dot-fill"
                size={20}
                style={{ color: "red", marginRight: 5 }}
              />
              <Text style={styles.locationText}>Pickup: {item.pickup}</Text>
            </View>
            <View style={styles.locationDetails}>
              <Octicons
                name="location"
                size={20}
                style={{ color: "green", marginRight: 5 }}
              />
              <Text style={styles.locationText}>Dropoff: {item.dropoff}</Text>
            </View>
          </>
        )}
        <View style={styles.currentEarningsDetails}>
          <Text style={styles.itemText}>{item.title}</Text>
          <SimpleLineIcons
            name="location-pin"
            size={25}
            style={{ color: "darkblue" }}
          />
          <Text>{item.distance}</Text>
          <Text style={styles.itemCoinText}>{item.rupee}</Text>
          <MaterialIcons
            name="currency-rupee"
            size={20}
            style={{
              color: "#454545",
              marginRight: 5,
            }}
          />
        </View>
      </View>
      <MaterialIcons name="arrow-back-ios" size={25} color="black" style={{
              color: "#454545",
              marginLeft: 25,
            }} onPress={() => navigation.navigate("EachOrder")} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back-ios" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>All Orders</Text>
      </View>
      <Divider style={{ elevation: 5 }} />
      <FlatList
        data={currentEarnings}
        showsVerticalScrollIndicator={false}
        renderItem={renderCurrentEarnings}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  itemCoinText: {
    fontSize: 16,
    marginLeft: 30,
  },
  currentEarningsContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    shadowColor: "lightgrey",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  currentEarningsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentEarningsDivider: {
    marginVertical: 10,
  },
  currentEarningsDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentEarn: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rupeeText: {
    marginLeft: "auto",
    marginRight: 10,
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "lightgrey",
    borderRadius: 2,
    padding: 2,
  },
  locationDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: "grey",
  },
});
