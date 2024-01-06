import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Authentication/Login";
import SignUp from "../screens/Authentication/SignUp";
import TabNavi from "../screens/Authentication/TabNavi";

const { Navigator, Screen } = createStackNavigator();

function AppNavigation(props) {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="TabNavi" component={TabNavi} />
    </Navigator>
  );
}
export const AppNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);
