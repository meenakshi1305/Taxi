import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Snackbar,Button } from "react-native-paper";

  

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const SignUpPress = () => {
    setEmail("");
    setPassword("");
    navigation.navigate("Signup");
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
    // Valid credentials, navigate to Welcome page
    setEmail("");
    setPassword("");
    navigation.navigate("Welcome");
  }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,8}$/;
    return passwordRegex.test(password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login Now</Text>
      <Text style={styles.text1}>Please signin to continue using our app! </Text>
      <Text style={styles.text4}>Enter via social networks</Text>
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
      <Text style={styles.text5}>Or Login with Email</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.passwordInput}
        />
      </View>
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
      <Text style={styles.text3}>Forgot Password? </Text>
      <TouchableOpacity
        style={[
          styles.button,
          (email === "" || password === "") && styles.disabledButton,
        ]}
        onPress={SignInPress}
        disabled={email === "" || password === ""}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Snackbar
    visible={snackbarVisible}
    onDismiss={() => setSnackbarVisible(false)}
    duration={Snackbar.DURATION_SHORT} // Adjust duration as needed
    style={styles.snackbar} // Apply custom styles to Snackbar if needed
  >
    {snackbarMessage}
  </Snackbar>
      <View style={{ flexDirection: "row"}}>
        <Text style={styles.text2}>Don't have an account</Text>
        <TouchableOpacity onPress={SignUpPress}>
          <Text
            style={{
              marginVertical: 15,
              color: "#0d4269",
              fontWeight: "bold",
              fontSize: 15,
              paddingLeft: 10,
              paddingTop: 2,
            }}
          >
            SignUp!
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
    marginVertical: "1%",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 13,
    marginVertical:10,
    width: "90%",
  },
  image: {
    borderRadius: 10,
    alignSelf: "center",
    margin: "3%",
    alignItems: "center",
    borderRadius: 100,
    width: 70,
    height: 70,
    backgroundColor: "#FFF",
  },
  input: {
    padding: 10,
    height: "7%",
    width: 300,
    marginVertical: "2%",
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
    marginVertical: "1%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: "1%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    marginVertical: "2%",
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  passwordInput: {
    padding: 10,
    flex: 1,
  },
  eyeButton: {
    padding: 10,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: "3%",
  },
  text2: {
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: "5%",
  },
  text3: {
    fontSize: 15,
    textAlign: "right",
    margin: 20,
    marginRight:15,
    fontWeight:'bold',
  },
  text4: {
    fontWeight: "bold",
    fontSize: 12,
    marginVertical:20,
    alignSelf:'center',
    color:'#0d4269',
  },
  text5:{
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
