import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from '../Screens/HomeScreen';
import Welcome from "../Screens/Welcome/Welcome";
import Landing from "../Screens/Landing/Landing";
import Profile from "../Screens/Profile/Profile";
import IdCard from "../Screens/IdCard/IdCard";
import General from "../Screens/General/General";
import Documents from "../Screens/Documents/Documents";
import Incentive from "../Screens/Incentive/Incentive";
import Earnings from "../Screens/Earnings/Earnings";
import AllOrders from "../Screens/AllOrders/AllOrders";
import EachOrder from "../Screens/EachOrder/EachOrder";
import Notifications from "../Screens/Notifications/Notifications";
import Details from "../Screens/Details/Details";
import Instructions from "../Screens/Instructions/Instructions";
import Signup from "../Screens/Signup/Signup";
import Signin from "../Screens/Signin/Signin";
const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Documents" component={Documents} />
        <Stack.Screen name="IdCard" component={IdCard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="General" component={General} />
        <Stack.Screen name="Incentive" component={Incentive} />
        <Stack.Screen name="Earnings"  component={Earnings}/>
        <Stack.Screen name="AllOrders"  component={AllOrders}/>
        <Stack.Screen name="EachOrder"  component={EachOrder}/>
        <Stack.Screen name="Notifications" component={Notifications}/>
        <Stack.Screen name="Details" component={Details}/>
        <Stack.Screen name="Instructions" component={Instructions}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Signin" component={Signin}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
