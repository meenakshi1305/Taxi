import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Switch,
  Dimensions,
  Platform,
} from "react-native";
import { Dialog, Paragraph, IconButton } from "react-native-paper";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { BottomSheet } from "react-native-elements";
import Profile from "../Profile/Profile";
import * as Location from "expo-location";
import { getLocales } from "expo-localization";
import { i18n } from "../../../i18n";

const deviceLanguage = getLocales()[0].languageCode;

export default function Landing() {
  // in scope variables
  let isNight =
    new Date().getHours() > 23 || new Date().getHours() < 6 ? true : false;

  // constants with dynamic values
  const navigation = useNavigation();
  const panelRef = useRef(null);

  // state constants
  const [mapRegion, setMapRegion] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [location, setLocation] = useState(undefined);
  const [isRideEnabled, setIsRideEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [bottomSheetStatus, setBottomSheetStatus] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetOpen(!bottomSheetOpen);
  };

  // methods for landing page..
  useEffect(() => {
    getLocation();
    async function setLocale() {
      i18n.locale = await AsyncStorage.getItem("locale");
    }
    setLocale();
    console.log("i18n.locale>> " + JSON.stringify(i18n.locale));
  }, []);

  const getLocation = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log("location prinitng>> " + JSON.stringify(location));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 12,
          marginBottom: 10,
          elevationBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={{ left: 0, top: 0 }}
        >
          <MaterialIcons
            name="menu"
            size={25}
            color="black"
            style={{ marginTop: "6%" }}
          />
        </TouchableOpacity>
        <View
          style={{
            height: "80%",
            borderRadius: 100,
            borderWidth: Platform.OS === "ios" ? 1.5 : 2,
            borderColor: isRideEnabled ? "#44a125" : "#d63a4a",
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: Platform.OS === "ios" ? 10 : 5,
            marginLeft:30,
           }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {isRideEnabled ? i18n.t("rideLater") : i18n.t("ridenow")}
          </Text>
          <Switch
            trackColor={{ false: "#d3d6d2", true: "#d3d6d2" }}
            thumbColor={isRideEnabled ? "#44a125" : "#d63a4a"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={(e) => {
              setIsRideEnabled(e);
              if (e) {
                setBottomSheetOpen(true);
              }
            }}
            value={isRideEnabled}
            style={{
              marginLeft: 10,
              // borderWidth: 1,
              // borderRadius: 10,
              // borderColor: "#3062b3",
            }}
          />
        </View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{marginRight:5}}>
          <Ionicons
            name="notifications-outline"
            size={25}
            style={{ color: "#3062b3"}}
            onPress={() => navigation.navigate("Details")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="information-outline"
            size={25}
            style={{ margin: "3%", color: "#3062b3" }}
            onPress={() => setShowDialog(true)}
          />
        </TouchableOpacity>
        </View>
      </View>
      <MapView
        style={styles.container}
        region={mapRegion}
        initialRegion={{
          latitude: 39.97343096953564,
          latitudeDelta: 0.0922,
          longitude: -75.12520805829233,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={(region) => setMapRegion(region)}
      >
        <Marker
          tracksViewChanges={false}
          coordinate={{
            latitude: 39.97343096953564,
            longitude: -75.12520805829233,
          }}
        />
      </MapView>
      <BottomSheet isVisible={bottomSheetOpen}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "white",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => setBottomSheetOpen(false)}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name={"minus"}
              style={{
                color: "grey",
                fontSize: 40,
              }}
            />
          </TouchableOpacity>
          {isNight && (
            <View
              style={{
                alignItems: "center",
                padding: 10,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Enjoy the moon while riding
              </Text>
              <Text style={{ paddingTop: 10, color: "grey", fontSize: 16 }}>
                {i18n.t("earn30ExtraLabel")}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.itemOnDuty}>
            <Text style={styles.itemOnDutyText}>{i18n.t("subscribeNow")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemOffDuty}>
            <Text style={styles.itemOffDutyText}>
              {i18n.t("subscribeOnRide")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.startLaterButton}
            onPress={() => {
              setBottomSheetOpen(false);
              setIsRideEnabled(false);
            }}
          >
            <Text style={styles.itemOffDutyText}>{i18n.t("rideLater")}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
        <Dialog.Content>
          <Paragraph>{i18n.t("info")}</Paragraph>
        </Dialog.Content>
      </Dialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "bold",
  },
  itemOnDuty: {
    height: 55,
    width: "100%",
    margin: "2%",
    borderRadius: 10,
    backgroundColor: "#3062b3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemOnDutyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  itemOffDuty: {
    height: 55,
    width: "100%",
    margin: "2%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  startLaterButton: {
    height: 55,
    width: "80%",
    margin: "2%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 100,
  },
  itemOffDutyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
