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
import { Divider, Button } from "react-native-paper";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { i18n } from "../../../i18n";
import { ScrollView } from "react-native-gesture-handler";

const dimensionWindow = Dimensions.get("window");
const dimensionScreen = Dimensions.get("screen");

export default function Earnings() {
  const navigation = useNavigation();
  const [selectedDateIndex, setSelectedDateIndex] = useState(6);
  const [selectedDate, setSelectedDate] = useState(moment());

  const currentEarnings = [
    {
      id: 1,
      heading: "Latest order",
      title: "Bike Taxi",
      time: "10:30 PM",
      rupee: "27.50",
      completed: true,
      distance: "3.25 km",
    },
    {
      id: 2,
      heading: "Order 4",
      title: "Bike Taxi",
      time: "11:00 PM",
      rupee: "30.00",
      completed: false,
      distance: "2.75 km",
    },
    {
      id: 3,
      heading: "Order 3",
      title: "Bike Taxi",
      time: "11:30 PM",
      rupee: "25.00",
      completed: true,
      distance: "3.50 km",
    },
    {
      id: 4,
      heading: "Order 2",
      title: "Bike Taxi",
      time: "12:00 AM",
      rupee: "40.00",
      completed: false,
      distance: "4.00 km",
    },
    {
      id: 5,
      heading: "Order 1",
      title: "Bike Taxi",
      time: "12:30 AM",
      rupee: "35.00",
      completed: true,
      distance: "3.00 km",
    },
  ];

  const historyDates = [
    {
      id: 1,
      date: moment().subtract(6, "d").date(),
      month: moment().subtract(6, "d").format("MMM"),
    },
    {
      id: 2,
      date: moment().subtract(5, "d").date(),
      month: moment().subtract(5, "d").format("MMM"),
    },
    {
      id: 3,
      date: moment().subtract(4, "d").date(),
      month: moment().subtract(4, "d").format("MMM"),
    },
    {
      id: 4,
      date: moment().subtract(3, "d").date(),
      month: moment().subtract(3, "d").format("MMM"),
    },
    {
      id: 5,
      date: moment().subtract(2, "d").date(),
      month: moment().subtract(2, "d").format("MMM"),
    },
    {
      id: 6,
      date: moment().subtract(1, "d").date(),
      month: moment().subtract(1, "d").format("MMM"),
    },
    { id: 7, date: moment().date(), month: "Today" },
  ];

  const renderCurrentEarnings = ({ item }) => (
    <View style={styles.currentEarningsContainer}>
      <View style={styles.currentEarningsHeader}>
        <Text style={styles.currentEarn}>{item.heading}</Text>
        <View style={styles.currentEarningsDistance}>
          <SimpleLineIcons
            name="location-pin"
            size={25}
            style={{ color: "darkblue" }}
          />
          <Text style={{ marginLeft: 2 }}>{item.distance}</Text>
        </View>
      </View>
      <Divider style={styles.currentEarningsDivider} />
      <View style={styles.locationDetails}>
        <Octicons
          name="dot-fill"
          size={20}
          style={{ color: "red", marginRight: 5 }}
        />
        <Text style={styles.locationText}>Pickup:123 Main st</Text>
      </View>
      <View style={styles.locationDetails}>
        <Octicons
          name="location"
          size={20}
          style={{ color: "green", marginRight: 5 }}
        />
        <Text style={styles.locationText}>Dropoff: 456 ILM st</Text>
      </View>
      <View style={styles.currentEarningsDetails}>
        <Text style={styles.itemText}>{item.title}</Text>
        <MaterialCommunityIcons
          name="clock-check-outline"
          size={20}
          style={{ color: "grey", marginRight: 10 }}
        />
        <Text style={styles.rupeeText}>{item.time}</Text>
        <MaterialCommunityIcons
          name="plus"
          size={20}
          style={{ color: "#4CBB17" }}
        />
        <Text style={styles.itemCoinText}>{item.rupee}</Text>
        <MaterialIcons
          name="currency-rupee"
          size={20}
          style={{
            color: "#4CBB17",
            marginRight: 5,
          }}
        />
      </View>
    </View>
  );

  const getFormattedDate = (index) => {
    return index === 6 ? "Today" : moment().subtract(6 - index, "d").format("DD/MM");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back-ios" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>{i18n.t("earnings")}</Text>
      </View>
      <Divider style={{ elevation: 5 }} />
      <ScrollView>
      <View style={{ height: 100 }}>
        <FlatList
          style={styles.earningsList}
          horizontal={true}
          contentContainerStyle={styles.earningsListContent}
          data={historyDates}
          getItemLayout={(data, index) => ({
            length: 700,
            offset: 100 * index,
            index,
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.dayButton,
                {
                  backgroundColor: selectedDateIndex == index ? "black" : "white",
                },
              ]}
              onPress={() => {
                setSelectedDateIndex(index);
                setSelectedDate(moment().subtract(6 - index, "d"));
              }}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  {
                    color: selectedDateIndex == index ? "white" : "black",
                  },
                ]}
              >
                {item.month}
              </Text>
              <Text
                style={[
                  styles.dayButtonText,
                  {
                    color: selectedDateIndex == index ? "white" : "black",
                  },
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.classification}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 15 }}>{getFormattedDate(selectedDateIndex)} {i18n.t("earnings")}</Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                name="currency-rupee"
                size={25}
                style={{
                  marginLeft: 5,
                  marginTop: 3,
                }}
              />
              <Text style={styles.rupeeHeader}>550.34</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 15 }}>{getFormattedDate(selectedDateIndex)} Order</Text>
            <Text style={styles.rupeeHeader}>5</Text>
          </View>
        </View>
      </View>
      <View style={styles.allOrdersButton}>
        <Text style={{ fontSize: 15 }}>Today's Earning</Text>
        <Button
          icon="history"
          mode="text"
          textColor="#6fa836"
          onPress={() => navigation.navigate("AllOrders")}
        >
          History
        </Button>
      </View>
      <FlatList
        data={currentEarnings}
        renderItem={renderCurrentEarnings}
        keyExtractor={(item) => item.id.toString()}
      />
      </ScrollView>
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
  earningsList: {
    height: 100,
  },
  earningsListContent: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  dayButton: {
    height: 60,
    width: 60,
    borderRadius: 100,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "grey",
  },
  dayButtonText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  classification: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 10,
  },
  earningsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  rupeeHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008080",
  },
  allOrdersButton: {
    borderRadius: 15,
    marginLeft: 25,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  allOrdersTextContainer: {
    flex: 1,
  },
  allOrdersText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginLeft: 10,
  },
  allOrdersSubText: {
    fontSize: 12,
    color: "grey",
    textAlign: "center",
    flex: 1,
  },
  allOrdersIcon: {
    alignSelf: "center",
    marginTop: 10,
  },
  listItem: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  itemCoinText: {
    fontSize: 16,
    color: '#4CBB17',
  },
  currentEarningsContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  currentEarningsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentEarningsDistance: {
    flexDirection: "row",
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
    fontSize: 16,
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
