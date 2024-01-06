import React from "react";
import Home from "./Home";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteAdd from "./NoteAdd";
import Header from "./Header";
import Detail from "./Detail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => <Header name="Notlar" />,
            headerStyle: { backgroundColor: "#4c00b0", height: 120 },
          }}
        />
        <Stack.Screen
          name="NoteAdd"
          component={NoteAdd}
          options={{
            headerTitle: () => <Header name="Not Ekle" />,
            headerStyle: { backgroundColor: "#4c00b0", height: 120 },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTitle: () => <Header name="Notu Düzenle" />,
            headerStyle: { backgroundColor: "#4c00b0", height: 120 },
          }}
        />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
