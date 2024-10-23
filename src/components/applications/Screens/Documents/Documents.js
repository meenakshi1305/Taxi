import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { i18n } from "../../../i18n";

export default function Documents() {
  const navigation = useNavigation();

  const [drivingLicenseImageFront, setDrivingLicenseImageFront] = useState(null);
  const [drivingLicenseImageBack, setDrivingLicenseImageBack] = useState(null);
  const [vehicleRCImageFront, setVehicleRCImageFront] = useState(null);
  const [vehicleRCImageBack, setVehicleRCImageBack] = useState(null);
  const [vehicleISImageFront, setVehicleISImageFront] = useState(null);
  const [vehicleISImageBack, setVehicleISImageBack] = useState(null);
  const [aadharImageFront, setAadharImageFront] = useState(null);
  const [aadharImageBack, setAadharImageBack] = useState(null);
  const [panImageFront, setPanImageFront] = useState(null);
  const [panImageBack, setPanImageBack] = useState(null);

  const [showDrivingLicenseImages, setShowDrivingLicenseImages] = useState(false);
  const [showVehicleRCImages, setShowVehicleRCImages] = useState(false);
  const [showVehicleISImages, setShowVehicleISImages] = useState(false);
  const [showAadharImages, setShowAadharImages] = useState(false);
  const [showPanImages, setShowPanImages] = useState(false);

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPermission.status !== "granted" || mediaLibraryPermission.status !== "granted") {
      Alert.alert("Permission to access camera and media library is required!");
      return false;
    }
    return true;
  };

  const openImagePicker = async (setImage) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const openCamera = async (setImage) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const handleImagePicker = (setImage) => {
    Alert.alert(
      "Upload Document",
      "Choose an option below",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Image Library", onPress: () => openImagePicker(setImage) },
        { text: "Camera", onPress: () => openCamera(setImage) },
      ],
      { cancelable: true }
    );
  };

  const renderDocumentSection = (
    title,
    showSection,
    toggleSection,
    frontImage,
    backImage,
    setFrontImage,
    setBackImage
  ) => (
    <View style={[styles.sectionContainer, showSection && styles.sectionContainerExpanded]}>
      <TouchableOpacity style={styles.arrowTab} onPress={toggleSection}>
        <Text style={styles.itemText}>{title}</Text>
        <MaterialIcons name="photo-camera" size={24} style={{ color: "grey" }} />
      </TouchableOpacity>
      {showSection && (
        <View style={styles.imageRow}>
          <TouchableOpacity style={styles.selectImage} onPress={() => handleImagePicker(setFrontImage)}>
            {!frontImage && <Text style={styles.itemText}>Front</Text>}
            {frontImage && <Image source={{ uri: frontImage }} style={styles.selectedImage} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectImage} onPress={() => handleImagePicker(setBackImage)}>
            {!backImage && <Text style={styles.itemText}>Back</Text>}
            {backImage && <Image source={{ uri: backImage }} style={styles.selectedImage} />}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={20} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.heading}>{i18n.t("documents")}</Text>
      </View>
      <Divider style={{ elevation: 5 }} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {renderDocumentSection(
          i18n.t("drivingLicense"),
          showDrivingLicenseImages,
          () => setShowDrivingLicenseImages(!showDrivingLicenseImages),
          drivingLicenseImageFront,
          drivingLicenseImageBack,
          setDrivingLicenseImageFront,
          setDrivingLicenseImageBack
        )}
        {renderDocumentSection(
          i18n.t("vehicleRC"),
          showVehicleRCImages,
          () => setShowVehicleRCImages(!showVehicleRCImages),
          vehicleRCImageFront,
          vehicleRCImageBack,
          setVehicleRCImageFront,
          setVehicleRCImageBack
        )}
        {renderDocumentSection(
          i18n.t("vehicleIS"),
          showVehicleISImages,
          () => setShowVehicleISImages(!showVehicleISImages),
          vehicleISImageFront,
          vehicleISImageBack,
          setVehicleISImageFront,
          setVehicleISImageBack
        )}
        {renderDocumentSection(
          i18n.t("aadhar"),
          showAadharImages,
          () => setShowAadharImages(!showAadharImages),
          aadharImageFront,
          aadharImageBack,
          setAadharImageFront,
          setAadharImageBack
        )}
        {renderDocumentSection(
          i18n.t("pan"),
          showPanImages,
          () => setShowPanImages(!showPanImages),
          panImageFront,
          panImageBack,
          setPanImageFront,
          setPanImageBack
        )}

        <Divider style={{ margin: "5%" }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 100,
  },
  sectionContainer: {
    margin: "5%",
    padding: 10,
  },
  sectionContainerExpanded: {
    borderWidth: 1,
    borderRadius: 10,
  },
  arrowTab: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: "6%",
  },
  itemText: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "bold",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  selectImage: {
    height: 100,
    width: "45%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
  },
  backButton: {
    left: 0,
    top: 0,
  },
  backIcon: {
    marginTop: "6%",
  },
});
