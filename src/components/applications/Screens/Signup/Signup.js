import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import { Button, Dialog, Paragraph, Portal, Snackbar } from "react-native-paper";

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const SignUpPress = () => {
    // Valid credentials, navigate to Welcome page
    setEmail("");
    setPassword("");
    navigation.navigate("Signin");
  };

  const SignInPress = () => {
    if (!validateEmail(email)) {
      setSnackbarMessage("Invalid email");
      setSnackbarVisible(true);
      return;
    } else if (!validatePassword(password)) {
      setSnackbarMessage("Invalid password");
      setSnackbarVisible(true);
      return;
    } else {
      setEmail("");
      setPassword("");
      navigation.navigate("Welcome");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,8}$/;
    return passwordRegex.test(password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.text1}>Please register with email and signup to continue using our app</Text>
      <Text style={styles.text3}>Enter via social networks</Text>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Button style={{backgroundColor:'white',height:50,borderRadius:50,margin:5,justifyContent:'center',alignItems:'center',elevation:5}}>
        <MaterialCommunityIcons
            name="facebook"
            size={20}
            color="#aaa"
            style={styles.eyeButton}
          />
        </Button>
        <Button style={{backgroundColor:'white',height:50,borderRadius:50,margin:5,justifyContent:'center',alignItems:'center',elevation:5}}>
        <MaterialCommunityIcons
            name="twitter"
            size={20}
            color="#aaa"
            style={styles.eyeButton}
          />
        </Button>
      </View>
      <Text style={styles.text4}>Or Login with Email</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.passwordInput}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.passwordInput}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#aaa"
            style={styles.eyeButton}
            onPress={toggleShowPassword}
          />
        </View>
        <TouchableOpacity onPress={toggleDialog}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color="#aaa"
            style={styles.eyeButton}
          />
        </TouchableOpacity>
        <Portal>
          <Dialog visible={showDialog} onDismiss={toggleDialog}>
            <Dialog.Content>
              <Paragraph>
                Password expects one special character, one number, one upper
                case, one lower case and a limit of 5 to 8 characters.
              </Paragraph>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
      <CheckBox
        title="  I agree with privacy policy"
        checked={isPrivacyPolicyChecked}
        onPress={() => setIsPrivacyPolicyChecked(!isPrivacyPolicyChecked)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />
      <TouchableOpacity
        style={[
          styles.button,
          (email === undefined ||
            email == "" ||
            password === undefined ||
            password == "" ||
            !isPrivacyPolicyChecked) &&
            styles.disabledButton,
        ]}
        onPress={SignInPress}
        disabled={
          email === undefined ||
          email == "" ||
          password === undefined ||
          password == "" ||
          !isPrivacyPolicyChecked
        }
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text2}>Already have an account ? </Text>
        <TouchableOpacity onPress={SignUpPress}>
          <Text
            style={{
              marginVertical: 8,
              color: "#0d4269",
              fontWeight: "bold",
              fontSize: 15,
              paddingLeft: 10,
              paddingTop: 2,
            }}
          >
            Login!
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: "5%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#0d4269",
    marginVertical: 10,
  },
  text1: {
    fontWeight: "bold",
    fontSize: 12,
    marginVertical: 10,
    width: "90%",
  },
  image: {
    borderRadius: 10,
    margin: "3%",
    borderRadius: 100,
    width: 70,
    height: 70,
    backgroundColor: "#FFF",
  },
  input: {
    padding: 10,
    height: "7%",
    width: 300,
    marginVertical: 10,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#0d4269",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    width: 300,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    marginVertical: 10,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  passwordInput: {
    padding: 10,
    flex: 1,
    height: 50,
  },
  eyeButton: {
    marginLeft: 10,
    marginRight: 30,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  text2: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right",
    marginVertical: 10,
  },
  text3: {
    fontWeight: "bold",
    fontSize: 12,
    marginVertical:20,
    alignSelf:'center',
    color:'#0d4269',
  },
  text4:{
    fontWeight: "bold",
    fontSize: 12,
    marginVertical:20,
    alignSelf:'center',
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  checkboxText: {
    fontWeight: "normal",
    fontSize: 14,
    marginLeft: -5,
  },
});
