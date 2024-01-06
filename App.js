import React from "react";
import { AppNavigator } from "./routes/AppNavigator";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

export default function App() {
      const app = firebase.initializeApp(firebaseConfig);
      const auth = getAuth(app);


  return <AppNavigator />;
}
