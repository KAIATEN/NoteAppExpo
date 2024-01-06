import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LoginHeader = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.heading}>{props.title}</Text>
      <Text style={styles.subHeading}>{props.subTitle}</Text>
    </View>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
  header: {
    height: "18%",
    width: "100%",
    paddingHorizontal: "5%",
    backgroundColor: "#023B54",
    justifyContent: "flex-end",
    paddingBottom: "5%",
  },
  heading: {
    fontSize: 25,
    color: "#fff",
    width: "80%",
    marginBottom: "1%",
  },
  subHeading: {
    fontSize: 12,
    color: "#fff",
  },
});
