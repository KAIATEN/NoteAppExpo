import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../not/RouteNavi";
import Profile from "../User/Profile";
import Help from "../User/Help";

const Tab = createBottomTabNavigator();

const Dashboard = ({ route }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Ana Sayfa" component={Home} />
      <Tab.Screen
        name="Profil"
        component={Profile}
        initialParams={{
          email: route.params?.email,
          password: route.params?.password,
        }}
      />
      <Tab.Screen name="Yardım" component={Help} />
    </Tab.Navigator>
  );
};

export default Dashboard;
