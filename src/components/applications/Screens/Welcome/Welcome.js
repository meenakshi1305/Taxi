import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  const navigation = useNavigation();

  const animationHandPress = () => {
    navigation.navigate("Signup");
  };

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Signup");
    }, 2500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <TouchableOpacity>
          <Text style={styles.title}>REEVAR</Text>
        </TouchableOpacity>
        <LottieView
          source={require("../../../../../assets/car_animation.json")} // Change the source to your animation JSON file
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.text}>Pick. Drop. Repeat!</Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3062b3",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#FFF",
    textAlign: "center",
    margin: "1%",
    fontWeight: "bold",
    width: "100%",
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    margin: "5%",
    fontWeight: "bold",
  },
});
