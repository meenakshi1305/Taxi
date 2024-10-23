import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { Divider } from "react-native-paper";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { i18n } from "../../../i18n";

const dimensionWindow = Dimensions.get("window");
const dimensionScreen = Dimensions.get("screen");

export default function Incentive() {
  const navigation = useNavigation();
  const incentives = [
    {
      id: 1,
      title: "Take 3 rides in first 2hrs",
      reward: "Get 1 day free subscription",
      additionalReward: "10",
      completed: false,
    },
    {
      id: 2,
      title: "Take 5 rides in first 3hrs",
      reward: "Get 2 day free subscription",
      additionalReward: "30",
      completed: false,
    },
    {
      id: 3,
      title: "Take 7 rides in first 5hrs",
      reward: "Get 2 day free subscription",
      additionalReward: "50",
      completed: false,
    },
    {
      id: 4,
      title: "Take 10 rides in 24 hrs",
      reward: "Get 1 day free subscription",
      additionalReward: "80",
      completed: true,
    },
    {
      id: 5,
      title: "Take 12 rides in 24 hrs",
      reward: "Get 1 day free subscription",
      additionalReward: "100",
      completed: false,
    },
    {
      id: 6, 
      title: "Take 15 rides in 24 hrs",
      reward: "Get 3 day free subscription",
      additionalReward: "150",
      completed: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back-ios" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}> {i18n.t("incentive")}</Text>
      </View>
      <Divider style={{ elevation: 5, marginTop: 10 }} />
      <ScrollView>
        <View style={styles.classification}>
          <LottieView
            source={require("../../../../../assets/car_animation.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          <View>
            <Text style={styles.heading1}>{i18n.t("incentiveHeading1")}</Text>
            <Text style={styles.heading2}>{i18n.t("incentiveHeading2")}</Text>
          </View>
        </View>
        <Text style={styles.challenges}>
        {i18n.t("incentiveAddOn")}
        </Text>
        <Text style={styles.challenges}>
        {i18n.t("incentiveFinal")}
        </Text>
        <FlatList
          data={incentives}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <View style={styles.listItem}>
                <View style={styles.stepper}>
                  <View style={styles.stepperLine} />
                  <MaterialCommunityIcons
                    name="circle-slice-8"
                    size={20}
                    color={item.completed ? "#008080" : "#e62c4b"}
                  />
                  <View style={styles.stepperLine} />
                </View>
                <View style={styles.itemContent}>
                  <Text
                    style={[
                      styles.itemText,
                      (item.id === 1 || item.id === 2) && styles.strikeThrough,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.rewardRow}>
                    <Text
                      style={[
                        styles.rewardLabel,
                        (item.id === 1 || item.id === 2) && styles.strikeThrough,
                      ]}
                    >
                      {i18n.t("reward")}
                    </Text>
                    <Text
                      style={[
                        styles.rewardText,
                        (item.id === 1 || item.id === 2) && styles.strikeThrough,
                      ]}
                    >
                      {item.reward}
                    </Text>
                  </View>
                </View>
                <FontAwesome6
                  name="indian-rupee-sign"
                  size={12}
                  style={{
                    color: item.completed ? "#008080" : "#e62c4b",
                    marginTop: 23,
                    marginLeft: 5,
                  }}
                />
                <Text
                  style={[
                    styles.itemCoinText,
                    { color: item.completed ? "#008080" : "#e62c4b" },
                    (item.id === 1 || item.id === 2) && styles.strikeThrough,
                  ]}
                >
                  {item.additionalReward}
                </Text>
              </View>
              <Divider />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  classification: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  animation: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  heading1: {
    fontSize: 14,
    fontWeight: "bold",
  },
  heading2: {
    fontSize: 14,
    color: "#666",
  },
  challenges: {
    paddingHorizontal: 15,
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  stepper: {
    alignItems: "center",
    marginRight: 10,
  },
  stepperLine: {
    width: 1,
    height: 20,
    backgroundColor: "black",
  },
  icon: {
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rewardLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  rewardText: {
    fontSize: 13,
    color: "#333",
  },
  itemCoinText: {
    fontSize: 15,
    marginLeft: 2,
    marginTop: 20,
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
