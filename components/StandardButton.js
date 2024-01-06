import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";

const StandardButton = (props) => {
  return (
    <TouchableOpacity
      disabled={props?.loading ? true : false}
      style={styles.container}
      onPress={props.onPress}
    >
      {props.loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default StandardButton;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#023B54",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
